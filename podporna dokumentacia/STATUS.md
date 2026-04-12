# Stav spracovania dokumentácie

Tento súbor je pracovná mapa, aby sa nič nevynechalo.

## Spracované a presunuté do `spracovane/`

- `deeptalks_mapa_a_homepage.html`
  - homepage a hlavná navigácia
  - web: `src/components/MarketingHomePage.tsx`, `src/components/SiteHeader.tsx`, `src/app/[lang]/page.tsx`
- `deeptalks_b2b.html`
  - B2B vetva a produktové prepojenia
- `deeptalks_produkty_struktura.html`
  - produktová mapa
  - web: `src/app/[lang]/produkty/page.tsx`
- `deeptalks_pary_stranka.html`
  - párová vetva
  - web: `src/app/[lang]/skupiny/pary/page.tsx`, `src/app/[lang]/produkty/pary/page.tsx`
- `deeptalks_rodic_dieta.html`
  - rodič–dieťa vetva
  - web: `src/app/[lang]/skupiny/rodic-dieta/page.tsx`, `src/app/[lang]/produkty/rodic-dieta/page.tsx`
- `hadacka_detail_stranka.html`
  - detail Hádanky
  - web: `src/app/[lang]/apps/hadacka/page.tsx`
- `spontanky_landing_page.html`
  - landing Spontánok
  - web: `src/app/[lang]/komunita/spontanky/page.tsx`
- `couplesync_analyza.html`
- `couplesync_mockup.html`
  - landing CoupleSync
  - web: `src/app/[lang]/apps/couplesync/page.tsx`
- `daily_connection_fullpage.html`
  - landing Daily Connection
  - web: `src/app/[lang]/apps/daily-connection/page.tsx`
- `herdvote_analyza.html`
- `herdvote_page_mockup.html`
  - public landing Herd Vote + admin rozdelenie
  - web: `src/app/[lang]/apps/herd-vote/page.tsx`, `src/app/[lang]/apps/herd-vote/admin/page.tsx`

## Spracované v tejto iterácii

- `kompas_temy_globalny_prehlad.html`
  - mapping tém, publík a živých vetiev Kompasu
  - web:
    - `src/app/[lang]/kompas/page.tsx`
    - `src/app/[lang]/kompas/temy/page.tsx`
    - `src/app/[lang]/kompas/tema/[slug]/page.tsx`
    - `src/app/[lang]/kompas/pary/page.tsx`
    - `src/app/[lang]/kompas/rodic-dieta/page.tsx`
    - `src/app/[lang]/kompas/deti/page.tsx`
    - `src/app/[lang]/kompas/publikum/[aud]/page.tsx`
    - `src/components/Kompas.tsx`
    - `src/components/KompasAudiencePage.tsx`
    - `src/lib/kompas-content.ts`
- `deeptalks_kompas_mockup.html`
  - interaktívny Kompas pre publikum, témy a situácie
  - web:
    - `src/app/[lang]/kompas/page.tsx`
    - `src/components/Kompas.tsx`
- `deeptalks_karticky_system.html`
  - kartičkový systém, edície, mechanika a mapping na existujúce vetvy
  - web:
    - `src/app/[lang]/produkty/karticky/page.tsx`
    - `src/app/[lang]/produkty/page.tsx`
    - `src/app/[lang]/apps/spoznajme-sa/page.tsx`
- `deeptalks_apps_mockup.html`
  - mapa nástrojov a hier s otázkou dňa, live vetvami a roadmape kartami
  - web:
    - `src/app/[lang]/apps/page.tsx`
- `deeptalks_apps_rozvoj.html`
  - roadmapa apps vetvy, otázka dňa a prepojenie nových app konceptov
  - web:
    - `src/app/[lang]/apps/page.tsx`
    - `src/app/[lang]/apps/otazka-dna/page.tsx`
    - `src/app/[lang]/produkty/page.tsx`
- `deeptalks_legacy.html`
  - Legacy vetva pre seniorov, rodinné spomienky a knihu po roku
  - web:
    - `src/app/[lang]/produkty/legacy/page.tsx`
    - `src/app/[lang]/skupiny/seniori/page.tsx`
    - `src/app/[lang]/produkty/predplatne/page.tsx`
    - `src/app/[lang]/produkty/darcekovy-poukaz/page.tsx`
    - `src/app/[lang]/produkty/page.tsx`
    - `src/components/MarketingHomePage.tsx`
- `deeptalks_tricko_texty.html`
  - merch vetva a textové línie pre tričká DeepTalks
  - web:
    - `src/app/[lang]/produkty/tricka/page.tsx`
    - `src/app/[lang]/produkty/page.tsx`
- `deeptalks-homepage.html`
- `deeptalks_homepage_sitemap.html`
- `deeptalks_sitemap.html`
- `deeptalks-mapa-webu.html`
- `deeptalks-mapa-webu-v2.html`
  - homepage, footer, manifest a mapa webu
  - web:
    - `src/components/MarketingHomePage.tsx`
    - `src/components/SiteHeader.tsx`
    - `src/app/[lang]/o-nas/page.tsx`

## Zostáva prejsť

- `deeptalks_apps_mockup.html`
- `herd_categories_schema.html`
- `herd_vote_kategorie_final.html`
- `herd-vote-kategorie-widget.html`
- `kategorie-widget-standalone.html`
- `quiz_kategorie_deeptalks.html`
- `quiz_kategorie_deeptalks_saved.html`
- `quiz_kategorie_deeptalks (1).html`
- `spontanky_flow.html`
- `claude-code-prompt-kategorie.md`
- `Textový obsah pre DeepTalks web - Claude.mhtml`
- `DeepTalks_Master_Dokument.docx`

## Poznámka

Pri ďalšej iterácii je dobré po dokončení presunúť aj novovybavené dokumenty do `spracovane/`, aby root priečinok ostal len ako inbox nespracovaných podkladov.
