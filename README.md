# Claims SmartApp (LM)

A claims-handling dashboard demo built with **React + Vite**. Ported from a single static
HTML prototype into a component-based app with CSS Modules.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Scripts

- `npm run dev` — start the dev server with hot reload
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build locally

## Project structure

```
src/
├── main.jsx                 # entry point
├── App.jsx                  # layout + app state (modals, reserve flow)
├── App.module.css
├── data/claims.js           # seed claim data + business constants
├── utils/format.js          # currency parsing / formatting helpers
├── styles/global.css        # design tokens + shared primitives (buttons, pills, modal chrome)
└── components/
    ├── Sidebar/             # left navigation
    ├── Topbar/              # user bar
    ├── StatCards/           # top KPI cards
    ├── ClaimsByStage/       # lifecycle distribution panel
    ├── TriageConsistency/   # auto-routing donut
    ├── RecentClaims/        # claims table (opens claim modal)
    ├── ClaimModal/          # claim decision card (Overview/Triage/Analysis/Reserve/Attachments)
    ├── ReserveModal/        # reserve setting form + authority checks
    ├── ReserveSummaryModal/ # recommendation summary + approval routing
    └── Toast/               # transient confirmation toast
```

Each component owns a `*.module.css` for its unique styles; cross-cutting design primitives
live in `src/styles/global.css`.

## Deploy to Vercel

Import the repo at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Vite —
build command `npm run build`, output directory `dist`. Every push to `main` auto-deploys.
