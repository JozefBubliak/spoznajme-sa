# CoupleSync: intímne preferencie

Pilotný modul je migrovaný ako samostatný Vite balík v
`integrated-apps/couplesync-intimity` a publikovaný pod URL
`/couplesync-intimity`.

## Lokálny build

Hostiteľský skript načíta verejné Supabase premenné z koreňového
`.env.local`, zostaví vnorený balík a doplnkovo skopíruje výstup do
`public/couplesync-intimity`:

```powershell
npm run build:couplesync-intimity
```

Skript zámerne nemaže staršie súbory. Pri pilotnej prevádzke tak nič
z existujúcich podkladov alebo build výstupov nezanikne.

## Supabase

Základná schéma modulu je pripravená v
`supabase/migrations/20260531_010_couplesync_intimity.sql`. Doplnkové
vzťahové nástroje, ich RLS politiky a bezpečné odhaľovacie RPC funkcie sú
v `supabase/migrations/20260531_012_couplesync_companion_tools.sql`. Po
aplikovaní migrácií sa taxonómia importuje z pôvodných podkladov:

```powershell
supabase db push --dry-run
supabase db push

cd integrated-apps/couplesync-intimity
npm run import:taxonomy
```

`supabase db push` potrebuje lokálnu premennú `SUPABASE_DB_PASSWORD`.
Import potrebuje serverovú premennú `SUPABASE_SERVICE_ROLE_KEY`. Ani jednu
z nich nikdy nevkladajte do browserového bundlu alebo do Gitu.

## Zabudované nástroje

Vedľa pôvodných intímnych dotazníkov sú v jednom vnorenom balíku dostupné
aj denné impulzy, karty rozhovoru, spoločný zoznam, tajné odkazy, zhody bez
odmietnutia, 36 otázok, vzťahový kompas, párový denník, vzájomný profil,
plánovač rande, ťažké rozhovory a párová hra. Modul `Nezabudni na ňu` je
v tejto prihlásenej aplikácii cloudová verzia; lokálny súkromný zápisník
hostiteľa pod `/<lang>/apps/nezabudni` ostáva samostatný.

## Dočasný prístupový kód

Serverový zámok potrebuje dve tajné premenné v lokálnom `.env.local` a vo
Vercel environment variables:

```text
COUPLESYNC_PREVIEW_PASSWORD=...
COUPLESYNC_PREVIEW_TOKEN=...
```

`COUPLESYNC_PREVIEW_TOKEN` má byť dlhá náhodná hodnota. API po správnom
kóde nastaví `httpOnly` cookie a proxy chráni:

- `/<lang>/apps/couplesync/play`
- `/<lang>/apps/couplesync/intimity`
- `/couplesync-intimity`
- `/intimne-dobrodruzstvo`
