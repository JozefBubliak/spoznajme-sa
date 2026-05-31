# Otázková architektúra JSON v1

Tento balík oddeľuje:

1. **question_archetypes** – základné typy otázok a odpovedí.
2. **question_blocks** – stavebné bloky dotazníkov.
3. **module_types** – šablóny modulov podľa typu témy.
4. **topic_module_map** – mapovanie taxonómie tém na modulové typy.
5. **pilot_topic_modules_from_docs** – ručne definované pilotné moduly podľa ukážkových dokumentov.
6. **simple_version_schema** – schéma pre jednoduchý režim.
7. **advanced_version_schema** – schéma pre rozšírený režim.
8. **module_generation_rules** – pravidlá, ako z toho generovať aplikáciu.

Vygenerované: 2026-05-30T21:11:22

## Hlavná myšlienka

Otázky nemajú byť rovnaké pre všetky témy. Každá téma dostane `module_type`, ktorý určí, aké bloky otázok sa použijú v jednoduchej a rozšírenej verzii.

## Odporúčané použitie

- `topic_module_map_v1.json` použiť ako základ pre aplikáciu.
- `pilot_topic_modules_from_docs_v1.json` použiť ako ručne overené vzory.
- `question_blocks_v1.json` použiť ako knižnicu stavebných blokov.
- Excel/korpus nepoužívať ako finálny strom, ale ako zdroj techník, variantov a možností do blokov.
