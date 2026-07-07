# Hostera — landing page (Titanium & Cognac)

Static, framework-free first page for Hostera: vanilla HTML/CSS/JS. Built to be dropped
into an existing project folder (e.g. `public/`, `src/landing/`, or served as-is).

## Files

```
index.html     Markup only — no inline styles or scripts
styles.css      All styles, driven by CSS custom properties (tokens) in :root
main.js        All interactivity, grouped into self-contained sections
assets/images/  Empty for now — restaurant photos currently load from Unsplash
```

Other surfaces in this folder: Guest cabinet (`explore.html` + `guest.css`/`guest.js`),
Restaurant Backoffice (`dashboard.html` + `dash.css`/`dash.js`), and the Distributor
Cabinet (`distributor.html` + `dist.css`/`dist.js` — see `DISTRIBUTOR-HANDOFF.md`).
The sign-in modal routes all three roles: Guest → explore, Restaurant → dashboard,
Distributor → distributor cabinet.

## How to preview

No build step needed. Either:
- Open `index.html` directly in a browser, or
- Serve the folder locally, e.g. `npx serve .` or `python3 -m http.server`, and visit
  `http://localhost:<port>/index.html`

## Integrating into an existing project

Copy the three files (`index.html`, `styles.css`, `main.js`) into your target folder and
adjust the `<link>`/`<script>` paths in `index.html` if your build tool expects a
different structure (e.g. Vite/webpack asset imports instead of plain `<link>` tags).
The CSS and JS have no external dependencies and no build-time requirements, so they
should drop into most setups (plain static site, Next.js `public/`, etc.) with minimal
changes.

## Design tokens

All colors, radii, and the max content width are defined once in `styles.css` under
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
- **Apply form submission** — `main.js` currently prevents default submit and shows
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
