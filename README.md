# Auto Stocker — Marketing site

Public landing page for **Auto Stocker**: workshop inventory, sales flows, and PDF invoicing for managers and staff. The site is a small React app (TypeScript, Vite, Tailwind) with **English (`en-US`) and Spanish (`es-ES`)** copy via i18next.

## How this repo relates to the backend

The live API and hosting live in **auto-stocker-backend** (Deno Fresh + Supabase). That app **serves this marketing site at `/`**: it reads `static/landing/index.html` from disk and returns it for the root route (see `routes/index.tsx` there).

To produce the files the backend expects, the backend repo includes a Vite project under `landing/` whose build:

- sets `base: "/landing/"` so asset URLs work behind Fresh’s static file handler
- writes output to `../static/landing`

From the backend root:

```bash
deno task build:landing
```

That runs `npm ci` and `npm run build` inside `landing/` and refreshes `static/landing/`. For a full production bundle (landing + API), use `deno task build:all`.

If you develop **here** as the source of truth, keep this tree aligned with the backend’s `landing/` app (or copy the build output / subtree as your workflow requires), and **match** the backend’s [`landing/vite.config.ts`](../auto-stocker-backend/landing/vite.config.ts) for `base` and `outDir` when building artifacts that ship inside `auto-stocker-backend`. This repo’s default Vite config targets standalone dev with assets at `/` and output in `dist/`.

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

## Configuration

Optional environment variables (Vite `VITE_*`) are documented in [`src/config/site.ts`](src/config/site.ts): release download base URL and demo video URL.

## i18n

Locale JSON lives in [`src/locales/`](src/locales/). The backend’s embedded landing uses the same pattern; see [`../auto-stocker-backend/AGENTS.md`](../auto-stocker-backend/AGENTS.md) for notes on language detection and `?lng=` overrides.
