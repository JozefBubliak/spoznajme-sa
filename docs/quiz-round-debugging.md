# Diagnostika dostupnosti otázok v kvíze

Keď sa pri štarte kola zobrazí chyba `NOT_ENOUGH_QUESTIONS`, môžete si overiť, koľko otázok je pre danú konfiguráciu naozaj dostupných pomocou diagnostického endpointu.

## GET `/api/games/[code]/rounds/debug`

Endpoint vracia prehľad všetkých kôl v hre vrátane:

- `localePrefix` – prefix lokalizácie, ktorý sa použije pri filtrovaní otázok.
- `configuredCount` – počet otázok, ktoré má kolo podľa konfigurácie očakávať.
- `availableCount` – počet otázok, ktoré Supabase vie poskytnúť pre danú kategóriu a locale.
- `rpcIds` – zoznam ID otázok, ktoré vrátila funkcia `random_herd_questions`.
- `storedQuestionIds` – ID otázok, ktoré sú uložené priamo pri kole.

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

Týmto spôsobom rýchlo zistíte, či problém spôsobuje konfigurácia kola, chýbajúce dáta alebo samotné RPC.
