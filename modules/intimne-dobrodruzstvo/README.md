# Intímne dobrodružstvo — súkromný modul DeepTalks

Vstup: `/sk/apps/intimne-dobrodruzstvo`. Samostatné herné rozhranie: `/intimne-dobrodruzstvo/`.

Integrované 2026-09-11 z `D:\Projekty\intimne-dobrodruzstvo`. Pôvodný priečinok zostal nedotknutý. Desať módov sa zachovalo v React/Vite module; Next.js zabezpečuje prihlásenie a vydávanie všetkých zostavených súborov. Nejde o obsah vo verejnom priečinku `public`.

## Prístup

`src/lib/adventure-access.ts` v hlavnom projekte overuje Supabase používateľa cez existujúce `getSession()` / `auth.getUser()`. Vyžaduje potvrdený e-mail `jozef.bubliak@gmail.com`. Žiadna všeobecná admin výnimka ani heslo v prehliadači. Kontrola pokrýva vstupnú stránku, HTML, JS, CSS aj API úloh. Odpovede majú `private, no-store`; vyhľadávače majú zákaz indexácie. Starý verejný build je archivovaný v `legacy-dist/`.

## Obsah a stav

- Pôvodné úlohy v ôsmich herných moduloch sú zachované bez zmeny znenia.
- Hlavná hra načítava existujúce úlohy z `/api/intimne-dobrodruzstvo/tasks`. Zmeny obľúbených a prejdených položiek zostávajú lokálne; nemenia texty v databáze.
- 58 záznamov katalógu pochádza bez prepisovania textov z pôvodného `polohy.html`; celý pôvodný HTML dokument je tiež zachovaný.
- Záložná banka 32 úloh pochádza zo staršieho buildu už prítomného v Spoznajme sa. Použije sa iba pri úspešnej prázdnej odpovedi API, nie pri chybe alebo zamietnutí prístupu.
- Base44 konfigurácia v zdrojovom projekte neobsahovala pripojenie AI služby. AI generovanie je viditeľne označené ako nepripojené; aplikácia nič negeneruje ani neposiela do náhradnej služby.
- Nastavenia a priebeh sa ukladajú lokálne v prehliadači. Prihlásenie konkrétneho používateľa a živý databázový tok je potrebné overiť v jeho relácii.

## Zostavenie

Z koreňa hlavného projektu:

```sh
npm --prefix modules/intimne-dobrodruzstvo ci
npm --prefix modules/intimne-dobrodruzstvo run build
npm run build
node scripts/verify-adventure.cjs
```

Adresár `dist/` je súčasťou odovzdávaného modulu a Next.js ho pribaľuje cez `outputFileTracingIncludes`. Pri úprave modulu vždy obnoviť aj `dist/`. `node_modules/` sa neukladá do Gitu. Pôvodný Base44 SDK ani jeho autentifikácia sa nepoužívajú v runtime nového buildu.

## Overenie

Vite build a TypeScript hlavného projektu. Testy oprávnení zahŕňajú anonymného návštevníka, iný účet, nepotvrdený e-mail, vlastníka, HTML/JS, zákaz API, zákaz prechodu na ľubovoľné súbory a hlavičky cache. Vlastník je v izolovaných testoch simulovaný; produkčný kód nemá testovaciu výnimku. Prehliadačom overené desktopové aj mobilné rozloženie, filtrovanie a katalóg.

Lokálne zmeny nie sú automaticky publikované na produkciu.
