# Diagnostika dostupnosti otázok v kvíze

Keď sa pri štarte kola zobrazí chyba `NOT_ENOUGH_QUESTIONS`, môžete si overiť, koľko otázok je pre danú konfiguráciu naozaj dostupných pomocou diagnostického endpointu.

## GET `/api/games/[code]/rounds/debug`

Diagnostiku teraz nájdete priamo v administrácii kvízu v sekcii „Diagnostika otázok“. Panel načítava tieto údaje pomocou nasledujúceho API, takže informácie v UI zodpovedajú tomu, čo vracia server.

Endpoint vracia prehľad všetkých kôl v hre vrátane:

- `localePrefix` – prefix lokalizácie, ktorý sa použije pri filtrovaní otázok.
- `configuredCount` – počet otázok, ktoré má kolo podľa konfigurácie očakávať.
- `availableCount` – počet otázok, ktoré Supabase vie poskytnúť pre danú kategóriu a locale.
- `rpcIds` – zoznam ID otázok, ktoré vrátila funkcia `random_herd_questions`.
- `storedQuestionIds` – ID otázok, ktoré sú uložené priamo pri kole.
- `runNumber` – poradové číslo behu otázok (H1, H2, …), ktoré sa zvýši po resete.
- `usageRecordedIds` / `usageRecordedCount` – otázky zapísané v tabuľke `herd_question_usage`, teda tie, ktoré sa už v danom behu nemajú zobraziť.
- `usageMissingIds` – ID otázok, ktoré sú síce uložené pri kole, ale v databáze zatiaľ nemajú záznam o použití (napr. kolo nebolo spustené).

- `usageTrackingDisabled` – ak je `true`, backend nenašiel tabuľky na sledovanie behov a zvolil dočasný fallback, pri ktorom sa otázky vyberajú náhodne bez zapisovania použitia.


### Ako endpoint zavolať

1. **V prehliadači (prihlásený admin):**
   - Otvorte novú kartu a zadajte URL vo formáte `https://<váš-hostiteľ>/api/games/<KÓD_HRY>/rounds/debug`.
   - Ak ste prihlásený v administrácii, prehliadač zobrazí JSON s diagnostikou.

2. **Cez konzolu / terminál:**
   - Uistite sa, že máte platný session cookie (napr. skopírovaný z prehliadača), inak server vráti `401 Unauthorized`.
   - Potom môžete spustiť príkaz:

     ```bash
     curl \
       -H "Cookie: <nazov_cookie>=<hodnota>" \
       https://<váš-hostiteľ>/api/games/<KÓD_HRY>/rounds/debug
     ```

3. **S obmedzením na konkrétne kolo:**
   - Do query parametra `index` môžete zadať číslo kola (index od 0).

     ```bash
     curl https://<váš-hostiteľ>/api/games/<KÓD_HRY>/rounds/debug?index=1
     ```

### Ako interpretovať výsledky

- Ak `availableCount` je menší ako `configuredCount`, v databáze nie je dosť otázok pre zvolenú kategóriu a locale.
- Ak `rpcIds` je prázdne, RPC funkcia nenašla žiadne otázky (skontrolujte `rpcError`).
- Ak `storedQuestionIds` obsahuje menej položiek než očakávate, štart kola neuložil všetky otázky – skontrolujte logy endpointu `/rounds/start`.
- Ak `usageMissingIds` nie je prázdne, otázky sa síce zobrazujú v kole, ale ešte nie sú označené ako použité pre daný beh. Skontrolujte, či bolo kolo reálne spustené.


Ak Supabase ešte neobsahuje nové tabuľky `herd_game_runs` a `herd_question_usage`, backend automaticky prepne do fallback režimu. Otázky sa načítajú priamo z `herd_questions`, nastavenia kola si pamätajú vybranú sadu ID (`questions`) a flag `usageTrackingDisabled: true`, ale nezapisujú sa nové riadky do `herd_question_usage`. V praxi to znamená, že kolo pôjde spustiť aj na staršej databáze, len sa nebude sledovať história použitia otázok.

V administrácii pribudlo tlačidlo **Reset otázok**, ktoré zavolá endpoint `/api/games/[code]/runs/reset`. Reset vytvorí nový beh (napr. H2), vymaže uložené otázky pri kolách a umožní znovu zaradiť už odohrané otázky do výberu.

Týmto spôsobom rýchlo zistíte, či problém spôsobuje konfigurácia kola, chýbajúce dáta, nezapísaná história použitia otázok alebo samotné RPC.

