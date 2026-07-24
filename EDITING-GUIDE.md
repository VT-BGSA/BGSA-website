# BGSA Website — Simple Editing Guide

You should be able to handle most routine updates without editing HTML.

## The one file you will edit most often

Open:

`site-config.js`

This file controls:

- current and previous leadership
- officer photo filenames
- officer affiliations and bios
- BGSA email
- treasurer email
- social/community/feedback links
- homepage wording
- homepage group photo
- merchandise names, prices, photos, and descriptions
- the public Outlook calendar browser link

The file is divided into clearly labeled sections.

## Change an officer

Find the officer under:

`leadership.current`

Example:

```js
{
  role: "President",
  name: "Michael Beall",
  photo: "assets/leader-01.svg",
  affiliation: "",
  bio: ""
}
```

Change only the values inside quotation marks.

## Add a real officer photo

1. Put the image in the `assets` folder.
2. Give it a simple filename, for example `michael-beall.jpg`.
3. In `site-config.js`, change:

```js
photo: "assets/leader-01.svg"
```

to:

```js
photo: "assets/michael-beall.jpg"
```

## Add or remove leadership cards

Each `{ ... }` block inside `leadership.current` creates one leadership card.

- Add another block to create another card.
- Delete a block to remove a card.
- Reorder the blocks to change the order on the page.

## Update contact information

In `site-config.js`, edit:

```js
email: ""
treasurerEmail: ""
```

and the links under:

```js
links: {
  communityChat: "",
  social: "",
  feedbackForm: "",
  publicOutlookCalendar: ""
}
```

Leave a link blank (`""`) to hide it from the Connect page.

## Update merchandise

Edit the objects inside:

`merchandise.items`

Set:

```js
visible: false
```

to hide an item temporarily.

## Update events

Do NOT edit HTML for routine events.

Officers update the shared BGSA Outlook calendar. The GitHub Action reads the published ICS feed and updates:

- the next three events on the homepage
- the full Events page

The private published ICS URL should be stored in the GitHub repository secret named:

`OUTLOOK_ICS_URL`

## Add an RSVP to an event

You do **not** need an RSVP form for every event. Create a Microsoft Form only for events that need registration, headcounts, dietary information, limited seating, or similar responses.

For an event that needs an RSVP:

1. Create or copy an event-specific Microsoft Form.
2. Copy the form's response link.
3. Open the event in the shared BGSA Outlook calendar.
4. Add a standalone line anywhere in the event description using exactly this pattern:

```text
RSVP: https://forms.office.com/...
```

5. Save the Outlook event.

The next calendar sync will automatically:

- detect the RSVP link
- remove the raw `RSVP:` line from the description shown on the website
- add an **RSVP** button to the homepage card when the event is among the next three
- add an **RSVP** button to the full Events page

Events without an `RSVP:` line display normally with no RSVP button.

For consistency, keep a master BGSA RSVP form template and make a copy for each event that needs its own registration list.

## Update the bylaws

The bylaws are intentionally NOT generated from `site-config.js` because they are a formal governance document.

To formally update them:

1. Approve/revise the bylaws through the organization’s required process.
2. Replace `documents/BGSA-Bylaws-2023-2024.docx` with the approved document.
3. Update `bylaws.html` to match the approved wording.
4. Update the revision date shown on the page.

## Publish any website changes

1. Save your edits.
2. Open GitHub Desktop.
3. Review the changed files.
4. Enter a short commit summary.
5. Click **Commit to main**.
6. Click **Push origin**.
7. GitHub Pages will republish automatically.
