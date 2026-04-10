# Auto Stocker — Marketing site

Public marketing site for **Auto Stocker**: workshop inventory, sales flows, and PDF invoicing for managers and staff. The site is a small React app (TypeScript, Vite, Tailwind) with **English (`en-US`) and Spanish (`es-ES`)** copy via i18next.

## How this repo relates to the backend

The live API and hosting live in **auto-stocker-backend** (Deno Fresh + Supabase). That app **serves this site at `/`**: it reads `website/dist/index.html` from the git submodule checkout and returns it for the root route, and serves hashed assets from `website/dist` (see `routes/index.tsx` and `main.ts` there).

This repository is linked from the backend at `website/` (git submodule). Vite builds to `dist/` with `base: '/'`. From the **backend** repository root:

```bash
deno task build:website
```

That runs `npm ci` and `npm run build` inside `website/` and refreshes `website/dist`. For a full production bundle (site + API), use `deno task build:all`.

## Local development

```bash
npm install
npm run dev
```

## Build (standalone)

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## i18n

Locale JSON lives in [`src/locales/`](src/locales/). See [`../auto-stocker-backend/AGENTS.md`](../auto-stocker-backend/AGENTS.md) for notes on language detection and `?lng=` overrides.
