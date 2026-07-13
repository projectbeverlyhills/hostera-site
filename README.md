# Hostera

Static, framework-free site: vanilla HTML/CSS/JS, no build step. Every page is a plain
`.html` file at the root, so the URLs are exactly the file names and any web server can
host the folder as-is. Styles and scripts live under `assets/`, named after the surface
they belong to.

## Layout

```
index.html          Landing page
explore.html …      Guest cabinet (8 pages: explore, booking, events, restaurant,
                    profile, private-dining, table-moments, taste-profile)
dashboard.html      Restaurant backoffice
distributor.html    Distributor cabinet

assets/
  css/
    base.css        Design tokens (:root) + shared components. Landing + guest.
    guest.css       Guest cabinet
    restaurant.css  Restaurant backoffice
    distributor.css Distributor cabinet
  js/
    auth.js         Session, shared by every surface (see "Sign-in and sessions")
    landing.js      Landing page
    guest.js        Guest cabinet
    guest-data.js   Mock restaurant/booking data for the guest cabinet
    restaurant.js   Restaurant backoffice
    distributor.js  Distributor cabinet
  img/              Empty for now — photos currently load from Unsplash
                    (favicon.svg lives here)

winegallery/        Copy of the live menu app (see "The live menu")
docs/               Russian README, distributor handoff notes
sync-menu.sh        Refreshes winegallery/ from the menu's own repository
serve.sh            Local preview
```

Each surface owns one CSS and one JS file, and `assets/js/auth.js` is the only thing they share —
so a page's dependencies are readable straight from its `<head>`.

## Sign-in and sessions

`assets/js/auth.js` holds the whole session in one localStorage record, so every page agrees on
who is signed in. Credentials are checked against the `ACCOUNTS` list at the top of that
file — currently one pilot account, `Novikov` / `La24`, which opens the Novikov Beverly
Hills backoffice.

**This is a gate, not security.** The password sits in a file the browser downloads, so
anyone who opens the page source can read it. It keeps the cabinet out of reach of a
passer-by and nothing more — do not put anything sensitive behind it until a server
checks the password. When that backend exists, only `signIn()`/`getSession()` change;
the pages talk to nothing but this module.

Current release ships **Restaurant** only. The Guest and Distributor tabs in the sign-in
modal are disabled and marked "soon" — their pages still exist and still work if you
re-enable the tabs in `index.html`.

A page protects itself declaratively, which redirects signed-out visitors before paint:

```html
<script src="assets/js/auth.js" data-require="Restaurant"></script>
```

## The live menu (`winegallery/`)

`winegallery/` is a **copy** of the standalone menu app, which is developed in its own
repository. It ships with the site because the Restaurant backoffice links into it.

The menu app and Waste Mode are two separate tools, so the backoffice has one entrance
each and neither passes through a chooser screen. Routes are
`#/<restaurantId>/<menu|waste>`, built in `assets/js/restaurant.js` from the session:

| Backoffice | Button | Opens |
|---|---|---|
| Menu → Guest preview | Open live menu | `#/novikov_bh/bar` — the restaurant's `defaultMenu` |
| Waste & Inventory | Open Waste Mode | `#/novikov_bh/waste` |

The menu always opens in the light theme: it remembers the guest's choice under the
`theme` localStorage key, and since it now shares an origin with the backoffice,
`assets/js/restaurant.js` clears that key when the "Open live menu" link is clicked.

Refresh the copy with:

```sh
./sync-menu.sh                          # from the default source path
MENU_SRC=/path/to/winegallery ./sync-menu.sh
```

Two things it needs from the server:

- It must be served at **`/winegallery/`** — its PWA and asset paths are absolute.
- **Do not** set a `Service-Worker-Allowed: /` header. The menu's service worker asks
  for site-wide scope and falls back to `/winegallery/` on its own; granting the wider
  scope would let it control the Hostera pages too.

Menu content (dishes, prices, photo URLs) is pulled live from published Google Sheets —
see the `csvUrl` fields in `winegallery/configs/*.json`. Nothing to deploy for content
changes. Note the item photos are hosted on Google Drive and Google rate-limits them
(HTTP 429) when a menu page requests them all at once, so photos often come up blank;
rehosting them is the fix.

## How to preview

No build step needed. Serve the folder — do not open `index.html` from the filesystem,
because the session and the menu both need a real origin:

```sh
./serve.sh                # then open http://localhost:8000
```

## Integrating into an existing project

Copy the three files (`index.html`, `assets/css/base.css`, `assets/js/landing.js`) into your target folder and
adjust the `<link>`/`<script>` paths in `index.html` if your build tool expects a
different structure (e.g. Vite/webpack asset imports instead of plain `<link>` tags).
The CSS and JS have no external dependencies and no build-time requirements, so they
should drop into most setups (plain static site, Next.js `public/`, etc.) with minimal
changes.

## Design tokens

All colors, radii, and the max content width are defined once in `assets/css/base.css` under
`:root`. To re-theme the page (e.g. switch to one of the other two palette directions —
Obsidian & Sandstone or Monolith & Pinot), only the token values need to change; no
component rule references a raw hex value directly.

| Token | Role | Current value |
|---|---|---|
| `--bg` / `--bg-soft` | Base (60%) — page background | Titanium White `#F5F5F7` |
| `--panel` / `--ink` | Secondary (30%) — text, dark surfaces | Graphite Black `#1C1C1E` |
| `--accent` / `--accent-deep` | Accent (10%) — CTAs, focal points | Aged Amber `#C76B28` |
| `--line` | Borders, dividers | `#D8D8DB` |
| `--radius-s/m/l` | Corner radii | `6px / 12px / 20px` |

## Known placeholders — replace before launch

These are intentionally left as placeholders and are marked `[in square brackets]` or
called out below so they're easy to find with a text search:

- **Hero value proposition** (`index.html`, hero section) — one-sentence value prop,
  not yet finalized.
- **Restaurant names and photos** — currently `[Restaurant name]` / `[Pilot restaurant
  name]` with Unsplash stock photography. Swap in real pilot restaurant content
  (menu photos, name, city) when available.
- **"Trusted by" logos** — currently rendered as styled text (`Maison Ètoile`, etc.),
  not real logos. Replace with actual partner logos once you have permission to
  display them, or remove the section until then.
- **Legal entity name** — footer shows `[Company legal name placeholder]` in two
  places (brand blurb and copyright line). Update once the entity is incorporated.
- **Privacy Policy / Terms of Service / Cookie Policy** — footer links currently
  point to `#` anchors. These need real pages before collecting any personal data
  in production (the apply form already includes a CCPA-style consent checkbox that
  links to `#privacy`).
- **City list / map** — the US map is an illustrative SVG, not a real geographic
  map. The city dropdown and map pins are hardcoded to 6 example cities, not pulled
  from real data.
- **Apply form submission** — `assets/js/landing.js` currently prevents default submit and shows
  an inline "design preview" message. Replace with a real handler (fetch/POST to
  your backend, or a form service) before launch, including server-side validation.
- **Sign-in form** — the modal is visual only; it does not call any auth endpoint yet.

## Accessibility notes

A skip link, visible focus outlines, `aria-label`s on icon-only buttons, and alt text
on images are already in place as a baseline. This is not a substitute for a full
accessibility audit — recommended before launch given ADA litigation exposure in
California.

## Browser support

Uses modern but widely-supported CSS (`backdrop-filter`, CSS custom properties, CSS
grid/flexbox). No polyfills included. `backdrop-filter` on the sticky header
degrades gracefully to a solid background in browsers that don't support it.
