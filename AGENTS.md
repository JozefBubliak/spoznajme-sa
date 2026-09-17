# DeepTalks / „Spoznajme sa“ — znalostný dokument

> Jediný referenčný súbor pre prácu na tomto repozitári. Ak niečo z tohto prestane platiť, oprav to tu.
> Doména: **deeptalks.eu** · Claim: *„Pretože realita je lepšia ako obrazovka.“*
> Posledná revízia: 2026-09-08

---

## 1. Čo je DeepTalks

Hnutie a sada nástrojov na **návrat k reálnej, živej komunikácii** — v páre, rodine, priateľstve, tíme, škole, medzi generáciami. Nie e-shop, nie „appka na otázky“. Web má návštevníka nechať **zažiť** hlboký rozhovor už pri prvej návšteve.

Cieľové skupiny (v poradí priority): **Páry → Rodič a dieťa → Priatelia → Práca → Škola → Seniori → Ťažké situácie.**

Strategický kontext, benchmarky (WNRS, Esther Perel, School of Life, Paired, StoryWorth, Before I Die, Big Talk) a monetizačná mapa sú v `DeepTalks_Master_Dokument.docx` a `podporna dokumentacia/spracovane/`. **Prečítaj ich pred väčšími produktovými rozhodnutiami.**

---

## 2. Stack a spustenie

| | |
|---|---|
| Framework | **Next.js ^16** (App Router, RSC, Turbopack dev) |
| React | 19 |
| Styling | Tailwind **3.4** + CSS premenné v `src/app/globals.css` |
| Animácie | framer-motion 12 |
| DB / auth | **Supabase** (projekt `uoochdvpvjlcuxwlyhnb`) |
| Platby | Stripe (`src/app/api/checkout`, `src/app/api/stripe-webhook`) |
| i18n | vlastný — pozri §4 |
| Testy | Jest (2 súbory) + Cypress (1 e2e) — **pokrytie ~0** |
| Deploy | Vercel projekt `deeptalks`, `main` = prod, iné vetvy = preview. Detaily v auto-memory `deploy-setup`. |

```bash
npm install
npm run dev        # next dev --turbopack
npm run typecheck  # tsc --noEmit  — MUSÍ prejsť (build ho spúšťa)
npm run build      # typecheck + next build
npm test           # jest
```

`.env.local` existuje lokálne; vzor v `.env.example`. Kľúče: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Stripe kľúče.

---

## 3. Mapa routovania (`src/app`)

**Jedna vrstva stránok: `src/app/[lang]/**`.** Jazyk je URL segment (`/sk/...`, `/en/...`).

- `src/proxy.ts` (Next 16 „middleware") — koreň `/` presmeruje na jazyk podľa `Accept-Language` / cookie `dl_lang` (fallback `en`); chráni `couplesync/play` cez cookie `cs_dev`.
- `src/app/page.tsx` — už len `redirect('/sk')` (fallback pre boty, ktoré proxy púšťa ďalej).
- Voľné root routy (mimo `[lang]`): `login/`, `register/`, `auth/`, `admin/`, `play/[code]/`, `free/`, `upgrade/`, `history/`, `favorites/`, `thank-you/`, `apps/hadacka/*`, `landing/`. Utility/legacy — nie sú lokalizované.
- `src/app/layout.tsx` — len `<html>` + fonty + `Providers`. **Žiadna globálna hlavička** (rieši `[lang]/layout.tsx` → `SiteHeader`, `herd-vote/layout.tsx` má vlastnú).
- **Zrušené 2026-09-08:** `src/app/(marketing)/**` (5 EN stub stránok — poskladané do `[lang]`), `src/app/[lang]/apps/quiz/**` (starý offline kvíz — nahradený Herd Vote). Oboje má 301 redirecty v `next.config.ts`.

Presmerovania v `next.config.ts`: `/pomocky → /kompas`, `/apps/herd-vote/* → /herd-vote/*`, `/app`,`/play` → kartičky, `/about`→`/o-nas`, `/contact`→`/kontakt`, `/pricing`→`/produkty/predplatne`, `/privacy`→`/ochrana-sukromia`, `/terms`→`/podmienky`, `/[lang]/apps/quiz* → /[lang]/herd-vote`.

### Živé produkty (`status: 'Live'` v `src/app/[lang]/apps/page.tsx`)
- **Kartičky „spoznajme-sa“** — `/[lang]/apps/spoznajme-sa` (+ `/play`)
- **CoupleSync** — partnerský dotazník `/[lang]/apps/couplesync`
- **Herd Vote** — skupinový kvíz s moderátorom, hub `/[lang]/herd-vote` (pozri §5)
- **Hádačka** — `/[lang]/apps/hadacka`
- **Áno–Nie–Hm** — party hra `/[lang]/apps/ano-nie-hm`

### Neverejné pracovné vetvy — `/[lang]/dotaznik/**` (intímny dotazník pre páry)
Cieľ: čo sa komu páči/nepáči/neutrál, Double Blind. Na prod, **admin-only** (`dotaznik/layout.tsx`: `getSession`+`isAdminEmail`+fallback list, `force-dynamic`, non-admin → 404). noindex + `robots.ts` disallow, mimo `sitemap.ts`/navigácie.
- **Strom (`src/lib/dotaznik/strom.ts`):** implementovaný podľa `docs/dotaznik-strom-navrh.md` — **9 domén (`DOMENY`) → 57 modulov (`MODULY`, s `kod`/`domena`/`zrkadlovy`/`rizikovy`/`tier1`; I4 „Kontext vzťahu a životná situácia", A6 „Fantázie — screening a preklad do reality" a A7 „Tantra, slow sex a spiritualita" pridané nad rámec pôvodného návrhu) → ~215+ okruhov (`temy`, každý s L4 `polozky[]`) → 17-sekciová kostra**. `/moduly` grupuje podľa domén. Sekcia bez vlastnej banky v `otazky.ts` → otázky sa **vygenerujú z `tema.polozky`** (`preferencie`/`techniky`/`scenare` = `postoj`, `hranice` = `semafor`) v `s/[sekcia]/page.tsx` → `SekciaOtazky otazky={...}`. Screening `chcem` je zlúčený do stránky témy; modulový screening zrušený; `/chcem`, `/temy` sú `redirect()`.
- **Obsah tém — 2 režimy:** (a) generický „section walker" `otazky.ts` + `_odpovede.tsx` (pevná kostra sekcií); (b) **„kniha + dotazník" data-driven** — `src/lib/dotaznik/obsah/**` (`typ.ts` schéma blokov + `podmienka` vetvenie vrátane `pohlavie`/`jeNiektora` + `m`/`z` gender varianty, `index.ts` registr) + renderer `_kniha.tsx` (+ výber pohlavia, autosave). Téma v registri → screening vedie na `/t/[tema]/kniha`, preskočí `rola`. 1:1 témy z podkladov: `face-sitting.ts`, `trojky-skupiny.ts`, `zdielanie-partnera.ts` (hotwife/cuckold/kandalizmus), `swinging.ts`.
- **Strom — návrh + počty:** `docs/dotaznik-strom-navrh.md` (9 domén → 54 modulov → ~215 okruhov → ~550 seed L4). **Implementované** v `strom.ts`. Ešte pred nami: samostatný route level `/m/[modul]/o/[okruh]` (teraz `okruh = tema`), doťahovanie znenia L4 z podkladov.
- **Anonymné párovanie (hotové):** `supabase/migrations/20260908_dotaznik.sql` (**spustená na Supabase 2026-09-10** — `dotaznik_pary/stav_temy/odpovede/zdielania`, RLS bez policies = len service-role, `dotaznik_gc()`). Server helper `src/lib/dotaznik/server.ts` (kód+secret, sha256, `overPar`). API `src/app/api/dotaznik/**` (pary create/join/get/stav/odpoved/zmazat, `gc` cron). Klient `_par.ts` (localStorage), `/dotaznik/par` (create/join), `/dotaznik/p/[kod]` (dashboard, share-link, zmazať všetko). `vercel.json` cron → `/api/dotaznik/gc` denne.
- **Ďalej (`docs/dotaznik-rezimy-a-odpovede.md` §6):** 8 komponentov typov odpovedí → screening lock logika (real-time) → L3 okruh → Double-Blind vyhodnotenie + Mapa → Režim A (Naživo) → Režim C.

### Rozpracované / duplicitné herné implementácie
- `apps/spoznajme-sa` vs `produkty/karticky` vs `apps/cards` — stále **tri vstupy do kartičiek** (nezjednotené).
- `play/[code]` (root aj `[lang]`) + `herd-vote/play/[code]` — orchestrácia živej hry.
- `apps/nudge/**`, `apps/daily-connection`, `apps/otazka-dna`, `apps/kompas`, `apps/kocky`, `apps/misie`, `apps/rande`, `apps/car-games`, `apps/nezabudni`, `apps/rozbi-rutinu` — rôzne štádiá rozpracovanosti.
- `kompas/**` — Komunikačný kompas (vety pre situácie), obsah v `src/lib/kompas-content.ts`, `src/config/kompas-*.ts`, `src/data/kompas`.
- `komunita/spontanky/**` — plánovanie komunitných akcií (má API).
- `b2b/**`, `skupiny/**`, `produkty/**`, `pomocky/**`, `indexy/**`, `vekove-mapy/**` — marketingové/obsahové vetvy z master dokumentu.

---

## 4. i18n

- **Aktívny systém:** `src/i18n/dictionaries/*.json` + `src/i18n/server.ts` (`getDictionary`) + `src/i18n/config.ts` (`SUPPORTED_LOCALES`, `Locale`). Klientský kontext: `src/components/IntlProvider.tsx` (`IntlProvider` / `useI18n`), montovaný v `src/app/[lang]/layout.tsx`.
- `sk.json` (~163 r.) a `en.json` (~161 r.) sú naplnené; `cs/de/es/fr/hu/pl/ru/uk` majú len **~36 riadkov** (kostry).
- **Zrušené 2026-09-08:** `src/i18n/index.tsx` + `src/i18n/locales/*.json` + `LanguageSwitcher.tsx` (starý, nepoužívaný `I18nProvider`).
- Ešte zostáva: `src/components/LangProvider.tsx` v `providers.tsx` (root) — samostatný od `IntlProvider`, zvážiť zlúčenie.
- Veľa stránok má slovenský text **natvrdo v JSX** (`MarketingHomePage.tsx`, `apps/page.tsx` …), takže `/en` je z veľkej časti po slovensky. `SUPPORTED_LOCALES` má 10 jazykov, reálne preložené **2**.

---

## 5. Herd Vote (skupinový kvíz) — aktuálny stav

Kahoot-style: moderátor + hráči cez kód. Detaily a DB realita sú v auto-memory `herd-vote-state`; zhrnutie:

- Orchestrátor: `src/app/[lang]/play/[code]/_Join.tsx`, feel vrstva `_fx.ts`; API `src/app/api/games/[code]/**`.
- DB: `herd_questions` 2674 riadkov, **všetky `locale='sk'`, `classic=true`**, `correct_answer` = `'A'|'B'|'C'|'D'`, `fun_fact` naplnené. `herd_categories` 170, ale **len 23 má ≥5 otázok** — API filtruje `question_count >= 5`.
- RPC `random_herd_questions` **v prod neexistuje** → `rounds/start` má JS fallback (filter + shuffle + slice). Funguje bez RPC.
- **„World-class feel" je zmergované do `main`** (PR #271–#274, `origin/main` @ `dba2dec`): Web-Audio SFX, haptika, 3-2-1 odpočet, speed+streak skórovanie, fun-fact karta, konfety, leaderboard delty. Vetva `feat/herd-vote-worldclass` je hotová.

---

## 6. Známy technický dlh (stav 2026-09-08)

### ✅ Vyriešené 2026-09-08 (vetva `chore/web-structure-cleanup`)
- 3 vrstvy stránok → **1** (`[lang]/**`); `(marketing)` group zmazaný + redirecty
- Dvojitá hlavička odstránená (root `layout.tsx` už bez `<header>`/`AuthStatus`)
- 2 klientské i18n systémy → **1** (`i18n/locales`, `i18n/index.tsx`, `LanguageSwitcher` zmazané)
- Mŕtve závislosti preč: `vite`, `@vitejs/plugin-react`, `react-router-dom`, `lovable-tagger`, `vite.config.ts`; `package-lock.json` prepočítaný
- Zmazané: 10× `.bak`, `apps/cards/page (2).tsx`, `apps/quiz/**` (→ redirect na herd-vote), `./integrated-apps/` (1,3 GB)
- `./spoznajme-sa/` (druhý klon) — už predtým zmazané používateľom

### Zostáva
| Oblasť | Problém |
|---|---|
| **Supabase klienti** | 12 modulov s rôznymi názvami exportov/signatúrami: `src/lib/supabase.ts` (`supabase`, `localStorage` na module-level → padá pri SSR importe, hardcoded kľúče), `supabase-client.ts` (`createBrowserClient`), `supabase-server.ts` (`createServerClient`), `supabaseClient.ts` (`supabase`+`syncAuthCookie`), `supabaseAdmin.ts` (`supabase`, hardcoded service key), `src/lib/supabase/{admin,browser,client,server,rel-browser}.ts`, `src/integrations/supabase/{client,server}.ts`. Cieľ: **1 browser + 1 server + 1 admin** (+ `rel-browser` ako výnimka pre `rel` schému). Konsolidácia = codemod cez ~60 import miest → vlastné PR. **Pozor: `supabase.ts` a `supabaseAdmin.ts` majú hardcoded JWT kľúče priamo v kóde.** |
| **Text natvrdo v JSX** | `/en` je z väčšiny po slovensky; treba vyťahať do `dictionaries/{sk,en}.json`. |
| **3 vstupy do kartičiek** | `apps/spoznajme-sa` vs `produkty/karticky` vs `apps/cards` — nezjednotené. |
| **Globálny footer** | `[lang]/layout.tsx` nemá footer; jediný reálny je inline vo `MarketingHomePage.tsx`. Vyťahať do shared komponentu a dať do layoutu. |
| **Rozrobené app stránky** | ~10 pod `apps/` v rôznych štádiách (`nudge`, `daily-connection`, `otazka-dna`, `kocky`, `misie`, `rande`, `car-games`, `nezabudni`, `rozbi-rutinu`) — produktové rozhodnutie čo žije / čo zmazať. |
| **Typová bezpečnosť** | ~106 výskytov `: any` / `as any`. |
| **Logy** | ~41 `console.log/warn/error` v `src/`. |
| **Analytika** | **žiadna** — nič sa nemeria (ani Plausible/PostHog). |
| **Testy** | 2 unit + 1 e2e; kritické toky (auth, hra, checkout) nepokryté. |
| **Vetvy** | ~200 `codex/*` vetiev na origine — repo history je chaotická. |
| **`bun.lock`** | v repo popri `package-lock.json`; pravdepodobne stale — over a zmaž. |

---

## 7. Dizajnový systém

Všetko v `src/app/globals.css` (543 r.) — **dark-first**, `:root` == `.dark`. Paleta: near-black `#0C0C0C` pozadie, teplá zlatá `#C5A880` primárna, off-white text. Nadpisy `h1–h3` = Instrument Serif; telo = Geist. Tokeny: `--space-*`, `--font-size-*`, `--radius: 12px`, `--gradient-*`, `--shadow-*`, `--transition-*`. Utility triedy: `gradient-text`, `card-modern`, `card-elegant`, `card-connection`, `btn-hero`, `btn-warm`. Fotky cez `next/image`, remote len `images.unsplash.com`.

---

## 8. Pracovné pravidlá pre tento repo

1. **`npm run typecheck` musí prejsť** pred commitom (build ho vynúti).
2. Nové linky **vždy s `/${lang}` prefixom** (`[lang]` router).
3. Nový UI text → do `src/i18n/dictionaries/{sk,en}.json`, nie natvrdo do JSX.
4. Nová stránka pod `[lang]/` → vzor: `generateMetadata` + `generateStaticParams` + `normalizeUrlLocale` + `notFound()` guard (pozri `ochrana-sukromia/page.tsx`).
5. Koreň `/` a jazyková logika = `src/proxy.ts` (nie `middleware.ts` — Next 16).
6. Herné/produktové zmeny konfrontuj s `DeepTalks_Master_Dokument.docx` a `docs/`.
7. `main` push = produkcia na deeptalks.eu. Rob PR, over na preview. Lokálny `main` býva pozadu za `origin/main` — pred prácou `git fetch && git merge --ff-only origin/main`.

---

## 9. Odkazy

- `DeepTalks_Master_Dokument.docx` — stratégia, benchmarky, monetizácia, komunita, obsah, AI avatar
- `docs/homepage-strategy.md` — štruktúra a copy homepage (SK/EN), SEO, A/B varianty, eventy
- `docs/karticky-vizia-produkt.md` — cieľová vízia kartičiek (schéma DB, deck selector, tiers)
- `docs/herd-vote-dokumentacia.md`, `docs/quiz-round-debugging.md` — kvíz
- `docs/BUILD_nudge_engine.md` — nudge engine
- `podporna dokumentacia/STATUS.md` — mapa „ktorý HTML mockup → ktorý súbor“
- `podporna dokumentacia/spracovane/*.html` — pôvodné mockupy a sitemapy
- Auto-memory: `deploy-setup`, `herd-vote-state`
