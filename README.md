# Biological Sciences Graduate Student Association at Virginia Tech — Starter Website

A simple static website designed for free hosting with GitHub Pages.

## Pages

- `index.html` — Home
- `people.html` — Officer profiles
- `events.html` — Events/calendar
- `connect.html` — Contact and community links
- `merch.html` — Merchandise catalog + support QR placeholder
- `styles.css` — All styling
- `script.js` — Mobile navigation + automatic copyright year

## What to edit first

Search the project files for these obvious placeholders:

- `YOUR-BGSA-EMAIL@vt.edu`
- `ADD OFFICER PHOTO`
- `Officer Name`
- `Program / Lab`
- `ADD COMMUNITY INVITE LINK`
- `ADD SOCIAL HANDLE`
- `ADD GOOGLE FORM LINK`
- `ADD T-SHIRT PHOTO`
- `$XX`
- `Google Calendar goes here`

## Add officer photos

1. Put image files in the `assets` folder, for example `assets/jane-smith.jpg`.
2. In `people.html`, replace:

```html
<div class="profile-photo">ADD OFFICER PHOTO</div>
```

with:

```html
<img class="profile-photo" src="assets/jane-smith.jpg" alt="Jane Smith">
```

## Embed a Google Calendar

1. Create a shared BGSA Google Calendar.
2. In Google Calendar settings, find the calendar's embed code.
3. In `events.html`, replace the entire `calendar-placeholder` block with the Google `<iframe>` embed code.
4. Add `style="border:0;width:100%;height:700px"` to the iframe if needed.

## Add merchandise photos

Put the photo in `assets`, then replace a merchandise placeholder such as:

```html
<div class="merch-image">ADD T-SHIRT PHOTO</div>
```

with:

```html
<img class="merch-image" src="assets/bgsa-shirt.jpg" alt="BGSA T-shirt">
```

## Add a donation/support QR code

Only after BGSA confirms the appropriate organization-controlled payment/donation method:

1. Save the QR image as `assets/support-qr.png`.
2. In `merch.html`, replace the `qr-placeholder` block with:

```html
<img src="assets/support-qr.png" alt="QR code to support BGSA" style="max-width:300px;margin:auto">
```

## Publish free with GitHub Pages

1. Create a GitHub repository, e.g. `bgsa-website`.
2. Upload all files in this folder to the repository root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. GitHub will provide a free address similar to:
   `https://YOUR-USERNAME.github.io/bgsa-website/`

You can later connect a custom domain if desired.

## Branding note

The starter uses Virginia Tech's Chicago maroon (`#861F41`) and burnt orange (`#E87722`) color palette, but it does not include an official university logo or lockup. Before using official Virginia Tech trademarks, confirm the student organization's recognition/permissions and current university brand/licensing rules.
