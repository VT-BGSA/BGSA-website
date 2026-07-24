#!/usr/bin/env python3
"""Build data/events.json from a published Outlook/Microsoft 365 ICS calendar.

The ICS URL is read from the OUTLOOK_ICS_URL environment variable. Recurring
calendar events are expanded for the next 365 days. The output is intentionally
simple so a static GitHub Pages site can render it without exposing credentials
or calling a calendar API from visitors' browsers.
"""

from __future__ import annotations

import json
import os
import re
import sys
import urllib.request
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from icalendar import Calendar
import recurring_ical_events

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "events.json"
LOCAL_TZ = ZoneInfo("America/New_York")
LOOKAHEAD_DAYS = 365
MAX_EVENTS = 100


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def fetch_ics(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "VT-BGSA-GitHub-Pages-Calendar-Sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        if response.status != 200:
            fail(f"Outlook calendar returned HTTP {response.status}")
        return response.read()


def normalize_datetime(value: Any, *, all_day_end: bool = False) -> tuple[str, bool, datetime]:
    """Return serialized value, all-day flag, and sortable UTC datetime."""
    if isinstance(value, datetime):
        dt = value
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=LOCAL_TZ)
        return dt.isoformat(), False, dt.astimezone(timezone.utc)

    if isinstance(value, date):
        # RFC5545 all-day DTEND is exclusive. Sorting uses local midnight.
        dt = datetime.combine(value, time.min, tzinfo=LOCAL_TZ)
        return value.isoformat(), True, dt.astimezone(timezone.utc)

    fail(f"Unsupported calendar date value: {value!r}")
    raise AssertionError


def clean_text(value: Any) -> str:
    if value is None:
        return ""
    return str(value).replace("\\n", "\n").strip()


RSVP_LINE_RE = re.compile(
    r"(?im)^[ \t]*(?:RSVP|RSVP\s+LINK)[ \t]*:[ \t]*(https?://\S+)[ \t]*$"
)


def extract_rsvp(description: str) -> tuple[str, str]:
    """Return display description and an optional RSVP URL.

    Officers opt an event into website RSVP by adding a standalone line such as:
    RSVP: https://forms.office.com/...

    The RSVP line is removed from the description shown on the website so visitors
    see a clean button instead of a raw URL.
    """
    if not description:
        return "", ""

    match = RSVP_LINE_RE.search(description)
    rsvp_url = match.group(1).rstrip('.,);]') if match else ""
    cleaned = RSVP_LINE_RE.sub("", description)
    # Remove excess blank lines left behind by the extracted RSVP line.
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned).strip()
    return cleaned, rsvp_url


def event_url(component: Any) -> str:
    # Outlook-published ICS feeds may expose URL or X-MICROSOFT-CDO-* fields.
    for key in ("URL", "X-ALT-DESC"):
        value = component.get(key)
        if value and key == "URL":
            return clean_text(value)
    return ""


def build_events(calendar: Calendar) -> list[dict[str, Any]]:
    now_local = datetime.now(LOCAL_TZ)
    window_start = now_local - timedelta(days=1)
    window_end = now_local + timedelta(days=LOOKAHEAD_DAYS)

    try:
        occurrences = recurring_ical_events.of(calendar).between(window_start, window_end)
    except Exception as exc:  # pragma: no cover - defensive for malformed feeds
        fail(f"Could not expand recurring events: {exc}")

    events: list[dict[str, Any]] = []
    seen: set[tuple[str, str]] = set()

    for component in occurrences:
        dtstart_prop = component.get("DTSTART")
        if not dtstart_prop:
            continue
        start_value = dtstart_prop.dt
        start_serialized, all_day, start_sort = normalize_datetime(start_value)

        dtend_prop = component.get("DTEND")
        if dtend_prop:
            end_value = dtend_prop.dt
            end_serialized, _, end_sort = normalize_datetime(end_value, all_day_end=all_day)
        elif all_day:
            end_value = start_value + timedelta(days=1)
            end_serialized, _, end_sort = normalize_datetime(end_value, all_day_end=True)
        else:
            end_sort = start_sort
            end_serialized = start_serialized

        # Keep events that are ongoing or upcoming.
        if end_sort < now_local.astimezone(timezone.utc):
            continue

        uid = clean_text(component.get("UID"))
        key = (uid, start_serialized)
        if key in seen:
            continue
        seen.add(key)

        raw_description = clean_text(component.get("DESCRIPTION"))
        display_description, rsvp_url = extract_rsvp(raw_description)

        events.append(
            {
                "title": clean_text(component.get("SUMMARY")) or "BGSA Event",
                "start": start_serialized,
                "end": end_serialized,
                "allDay": all_day,
                "location": clean_text(component.get("LOCATION")),
                "description": display_description,
                "url": event_url(component),
                "rsvpUrl": rsvp_url,
                "_sort": start_sort.isoformat(),
            }
        )

    events.sort(key=lambda item: item["_sort"])
    for event in events:
        event.pop("_sort", None)
    return events[:MAX_EVENTS]


def main() -> None:
    url = os.environ.get("OUTLOOK_ICS_URL", "").strip()
    if not url:
        fail("OUTLOOK_ICS_URL is not set. Add it as a GitHub Actions repository secret.")
    if not url.lower().startswith(("https://", "http://")):
        fail("OUTLOOK_ICS_URL must be an http(s) URL.")

    raw = fetch_ics(url)
    calendar = Calendar.from_ical(raw)
    new_events = build_events(calendar)

    old_payload: dict[str, Any] = {"generatedAt": None, "events": []}
    if OUTPUT.exists():
        try:
            old_payload = json.loads(OUTPUT.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass

    if old_payload.get("events") == new_events:
        generated_at = old_payload.get("generatedAt")
    else:
        generated_at = datetime.now(timezone.utc).isoformat()

    payload = {"generatedAt": generated_at, "events": new_events}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(new_events)} upcoming event(s) to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
