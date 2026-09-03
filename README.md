# RiSips Admin Portal

Admin console for the RiSips mutual fund distribution platform — centralised control,
compliance oversight and operational visibility for the MFD business.

This is the **UI layer only**. Every screen runs on typed mock data in `src/data/`; there
are no API calls yet.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · lucide-react.
Charts are hand-rolled SVG — no charting dependency.

## Running it

```bash
bun install
bun run dev
```

Then open http://localhost:3000. `bun run typecheck` and `bun run build` both need to stay
clean before a push.

## Screens

| Route | What it does |
| --- | --- |
| `/signin` | Sign-in (UI only, no auth wired) |
| `/dashboard` | AUM and SIP flows, compliance queue, tagged investors, agent league table |
| `/buckets` | Rule-based segments — investors fall in by personality and behaviour, and each bucket carries the funds its members get suggested |
| `/model-portfolios` | Curated baskets per risk profile, plus the five-step create/edit wizard |
| `/investors` | Directory, wealth profiling and portfolio assignment |
| `/agents`, `/sub-admins` | Sub-broker directory and delegated portal access |
| `/compliance` | Pending KYC, mandates, SIP failures and licence expiries |
| `/review-meetings` | Meeting log and note capture that drives profile changes |
| `/risip-bot` | In-app assistant threads and escalations |

## Layout

```
src/
  app/          routes; (portal) holds the authenticated shell
  components/   ui/ primitives, layout/ shell, charts/ SVG charts
  features/     one folder per domain, components + logic
  data/         mock data, stands in for the API
  types/        domain types
  utils/        formatting, class merging, badge tones
```

Dependency direction is one way: `app` → `features` → `components` → `utils`. Feature
folders never import from each other's internals.

## Brand

The mark is taken from the mobile app's construction figures
(`mobile-app/src/components/brand-mark.tsx`) rather than redrawn, and the blues match the
values the app draws its icons in, so the portal and the investor app read as one product.
