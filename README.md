# Spoznajme sa

Modern Next.js web app providing interactive questions and mini‑games for building deeper connections.

## Features

- Slovak and English localisation
- Realtime team quiz with responsive mobile-first UI
- Animations, sounds and confetti for a playful experience
- Jest and Cypress tests for core flows

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

### Supabase configuration for quiz API

The realtime quiz uses a Supabase backend. Create an `.env` file inside `src/app/api/kviz` based on `.env.example` and provide your project credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Restart the Expo client after changing these values.

## Ako upraviť dizajn

Hlavné farby, medzery, rádiusy a animácie sú definované ako CSS premenné v súbore [`src/app/globals.css`](src/app/globals.css). Úprava hodnôt v bloku `:root` (a zodpovedajúcich tmavých variantov v `.dark`) mení vzhľad celého projektu. Štýly jednotlivých prvkov sú zoskupené v komponentoch v adresári `src/components/`.

### Príklady použitia

```html
<section class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-[var(--space-xl)]">
  <h2 class="gradient-text text-[var(--font-size-3xl)]">Nadpis sekcie</h2>
  <div class="card-modern p-[var(--space-lg)] mt-[var(--space-lg)]">
    <p>Obsah karty…</p>
    <button class="btn-hero mt-[var(--space-md)]">Primárne tlačidlo</button>
  </div>
</section>
```

V ukážke sa používajú premenné ako `--background`, `--foreground` či veľkosti z `--space-*` a `--font-size-*`. Pre rýchle skladanie rozhraní sú k dispozícii aj triedy komponentov ako `card-modern`, `card-connection`, `btn-hero` alebo `btn-warm`.

## Checklist

- [x] Removed obsolete root placeholder files.
- [x] Consolidated components and hooks under `src/`.
- [x] Documented repository layout and entry points.
- [x] Modern landing page with animated hero and remote Unsplash images (`next.config.ts`).

