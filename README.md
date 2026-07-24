# BGSA Website — Maintainable GitHub Pages Edition

Website for the **Biological Sciences Graduate Student Association at Virginia Tech**.

## Designed for easy officer transitions

Most routine content is controlled from one file:

`site-config.js`

Future officers generally do not need to edit HTML to update:

- leadership names, roles, photos, affiliations, or bios
- organization contact information
- homepage wording
- merchandise
- social/community links
- the public Outlook calendar link

See `EDITING-GUIDE.md` for step-by-step instructions.

## Events

Events are managed in the shared BGSA Outlook/Microsoft 365 calendar.

A scheduled GitHub Action reads the published Outlook ICS feed and updates:

- the next three homepage events
- the full Events-page agenda

The published ICS URL is stored as the GitHub Actions repository secret:

`OUTLOOK_ICS_URL`

The public Outlook browser/HTML link can be entered in `site-config.js`.

## Formal governance content

The Bylaws page is kept as a static governance page rather than routine configuration content. The package includes the supplied bylaws document in `documents/`.

## Main files

- `site-config.js` — **main routine editing file**
- `EDITING-GUIDE.md` — simple update instructions
- `index.html` — homepage layout
- `about.html` — About page
- `events.html` — event agenda
- `people.html` — leadership page generated from `site-config.js`
- `bylaws.html` — formal bylaws page
- `merch.html` — merchandise generated from `site-config.js`
- `connect.html` — contact links generated from `site-config.js`
- `styles.css` — design and responsive layout
- `script.js` — generates dynamic site content
- `.github/workflows/update-calendar.yml` — Outlook calendar sync
- `tools/update_outlook_calendar.py` — ICS parser/sync tool

## Publishing changes

After editing locally:

**GitHub Desktop → Commit to main → Push origin**

GitHub Pages will republish automatically.
## Optional event RSVPs

The Outlook calendar integration supports optional Microsoft Forms RSVP buttons with no HTML editing.

For an event that needs registration, put a standalone line in the Outlook event description:

```text
RSVP: https://forms.office.com/...
```

The calendar sync extracts that link into `rsvpUrl`, removes the raw RSVP line from the displayed description, and the site automatically renders an **RSVP** button on the homepage and Events page. Events without that line have no RSVP button.

A separate form is recommended only for events that actually need RSVPs; routine meetings and open events do not need one.

