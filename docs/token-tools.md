# Úsporné nástroje (lokálna inštalácia 2026-09-18)

- RTK 0.49.0: https://github.com/rtk-ai/rtk — oficiálny Windows release, SHA256 overené proti GitHub release digestu. Skracuje diagnostické výstupy, nie celú konverzáciu. Prvý git status: odhad 170 → 72 tokenov (57,6 %); bytes/4, nie fakturácia ani meranie celkového limitu.
- QMD 2.8.3: https://github.com/tobi/qmd — oficiálny npm balík @tobilu/qmd, lokálny BM25 index. Dokumentácia dotazníka a vyskum/*.md. Bez vzdialeného LLM, embeddingy/hybridné modely zatiaľ neaktivované.
- Posúdená Serena https://github.com/oraios/serena: symbolové čítanie kódu; zatiaľ neinštalovaná. Zbytočne nespúšťať tri rôzne integrácie naraz.

Inštalácia: %USERPROFILE%\Documents\Codex\tools (mimo webového balíka).

## Použitie pre Codex aj Claude

```powershell
node scripts/token-tools.cjs rtk git status
node scripts/token-tools.cjs rtk git diff --stat
node scripts/token-tools.cjs rtk gain
node scripts/token-tools.cjs qmd search "hľadaný pojem" -c dotaznik-docs -n 3 --json
node scripts/token-tools.cjs qmd get "qmd://dotaznik-docs/nazov.md:20:35"
node scripts/token-tools.cjs qmd update
```

QMD poskytuje navigáciu do už existujúcich poznámok, nie dôkaz úplnosti. Po úpravách dokumentov index obnoviť. Bez automatického hooku: výstupy zdrojového čítania sa nesmú potichu skracovať. Nie je potrebný reštart aplikácie pre tieto CLI nástroje; nejde o novú položku MCP.

## Pravidlá úspory bez straty obsahu

1. Zdroj DOCX čítať naďalej celý v poradí po menších dávkach. Žiadne vynechávanie na základe QMD, kľúčových slov alebo sumarizácie.
2. Na dokumentáciu QMD max. 3 krátke výsledky, potom iba potrebný rozsah. Kód najprv lokalizovať cez rg, načítať konkrétny blok, nie opakovane celé súbory.
3. RTK používať na status/log/diff a diagnostiku. Pri pochybnosti načítať presný výstup. Nikdy RTK read ako dôkaz úplného obsahového auditu.
4. Logy inštalácie/buildov ukladať do súborov; do kontextu iba výsledok alebo chybu. Typové a regresné kontroly neopakovať bez dôvodu.
5. Stručné handoffy a odpovede. Nespúšťať subagentov bez požiadania. Nevkladať obrovské README do kontextu.

Nástroje znižujú objem vstupov, nie spotrebu všetkých systémových inštrukcií, histórie či uvažovania. Úsporu vyhodnocovať na reálnych úlohách, nie reklamnom percente.
