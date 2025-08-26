# Spoznajme sa

Modern Next.js web app providing interactive questions and mini‑games for building deeper connections.

## Repository structure

```
.
├── content/        # static text and translations
├── public/         # images and other static assets
├── src/
│   ├── app/        # Next.js routes and API handlers
│   ├── components/ # shared UI components
│   ├── hooks/      # custom React hooks
│   ├── lib/        # utilities and Supabase client
│   └── types/      # shared TypeScript types
└── ...             # configuration files
```

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Pages live in `src/app/` and UI components in `src/components/`. Edits reload automatically while the dev server runs.

## Checklist

- [x] Removed obsolete root placeholder files.
- [x] Consolidated components and hooks under `src/`.
- [x] Documented repository layout and entry points.
- [x] Modern landing page with animated hero and remote Unsplash images (`next.config.ts`).

