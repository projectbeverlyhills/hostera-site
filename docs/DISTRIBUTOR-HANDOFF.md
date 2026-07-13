# Hostera — Segment 3: Distributor Cabinet (handoff)

Static, framework-free B2B surface for distributor partners, built to the same
architecture contract as the Restaurant Backoffice (Segment 2). Vanilla HTML/CSS/JS,
desktop-first, no build step: open `distributor.html` in a browser or serve the folder
(`npx serve .` / `python3 -m http.server`).

Demo account: **Burgundy Wine Co.** — a fictional LA fine-beverage distributor
(wine core + spirits, specialty coffee, water/NA) on the mid **Signals** plan, chosen
deliberately so the demo shows both unlocked analytics *and* the upsell lock. The
account mirrors the distributor already referenced in the Restaurant Backoffice
("Burgundy Wine Co. — 1,240 SKUs synced"; orders #HO-3091 / #HO-3086 from Novikov LA),
so the two cabinets tell one story from both sides of the bridge.

## Files

```
distributor.html   Markup — all 8 pages in one document (SPA-style page switching)
assets/css/distributor.css           All styles. Fully isolated: --dist- tokens, dist-/ds- classes.
                   Does NOT load or inherit from assets/css/base.css / assets/css/guest.css / assets/css/restaurant.css.
                   Cross-reference map documented in the file header.
assets/js/distributor.js            Theme toggle, sidebar navigation, module tabs, plus two demo-only
                   interactions (order confirm, availability confirm).
```

`assets/js/landing.js` (landing) was updated: the Distributor tab in the sign-in modal now routes
to `distributor.html` (previously a "coming soon" note).

## Modules

| Page id        | Module                | Notes |
|----------------|-----------------------|-------|
| `page-overview`| Overview              | KPIs (GMV, listings, win rate, open orders), CSS-only GMV chart, "Needs attention" feed, Signals digest teaser |
| `page-catalog` | Catalog (hybrid model)| SKU table with card-link statuses: `Linked` / `In curation` / `Unlinked`. The SKU↔curated-card mapping is the primary entity for the future two-way base connect (Hostera curated card base ↔ distributor DBs) |
| `page-connector`| Connector (leads side)| Tabs: Leads (match appearances, switches, availability requests, losses) and Promoted placements (flat weekly Featured slots; never alter match scores) |
| `page-orders`  | Orders                | Pipeline New → Confirmed → In transit → Fulfilled + History. No logistics module by design — delivery stays on the distributor's own fleet. Statuses shown here are what the restaurant sees in Segment 2 Procurement |
| `page-signals` | Demand Signals        | Monetization core. Tabs: Search demand, Gap report, Win/Loss (open on Signals plan), Market Intelligence (locked upsell card) |
| `page-profile` | Profile & Settings    | Company profile incl. CA ABC license placeholder, service territories (LA/OC/SD), categories, team access |
| `page-billing` | Billing & Subscription| Three-tier plan grid (Foundation $0 / Signals $349 / Market Intelligence $1,190), invoices, platform-fee card (1.5%, waived during pilot) |
| `page-support` | Help & Support        | Pilot contact + guides |

## Product rules encoded in the UI

- **Anonymization contract:** restaurants are identified only where they acted on the
  distributor's listing (switched, ordered). All other demand data is aggregated.
- **Promo integrity:** Featured placements reorder within an equal match-score tier
  only; the score itself is never inflated. Stated verbatim in the Promoted tab.
- **Hybrid catalog:** distributor owns SKUs/price/stock; Hostera curates the cards.
  Unlinked SKUs carry reduced match weight — a soft data-quality lever.
- **Clean B2B:** nothing on this surface leaks to the Guest segment.

## Connected vs mock

Everything is hardcoded mock. Interactive today (front-end state only):
theme toggle, page navigation, module tabs, cross-module `data-goto` deep links,
"Confirm" on New orders (flips pill to Confirmed), "Confirm availability" on leads.

Backend integration points, marked with `TODO` comments in the source:
- Paginated SKU list + search/filter (Catalog)
- SKU↔curated-card linking flow (Catalog, unlinked tab)
- Order confirmation API + status webhooks to Segment 2 Procurement (Orders, assets/js/distributor.js)
- Availability response API + restaurant notification (assets/js/distributor.js)
- Auth: sign-in modal routes without credential checks (assets/js/landing.js)

## Design system

Titanium & Cognac. Tokens prefixed `--dist-`, declared in `:root` /
`[data-theme="light"]` and `[data-theme="dark"]`. Dark theme is a separate muted
token set, not an inversion (accent `#D9883F` dark vs `#C76B28` light — same rule
as `--d-accent` in assets/css/restaurant.css). Fonts: Inter (UI) + IBM Plex Mono (data), matching
the other B2B surface. B2B buttons are 10px rounded rectangles, not pills.
ADA baseline: skip link, `:focus-visible` outlines, `aria-label`s on icon buttons,
`role="switch"` on the theme toggle, `role="img"` + labels on CSS charts.

## Placeholders to replace before launch

- CA ABC license number (`[license number placeholder]`, Profile)
- All company/restaurant names are fictional except pilot content carried over
  from Segment 2 (Novikov LA)
- Pricing figures ($349 / $1,190 / $90 / 1.5%) are strategy proposals, not final
