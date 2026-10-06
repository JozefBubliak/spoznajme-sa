# Dotazník — režimy / vrstvy nad jedným obsahom (návrh 2026-10-06)

Zdroj: návrh používateľa (7 režimov: auto/kartičky, rýchly screening, stredná verzia, hĺbkový, terapeutický, double-blind, denný mikro) + posúdenie Claude.

## Kľúčová myšlienka (súhlasím)
Jeden obsah, viac výstupov podľa energie páru. Rieši to najväčšie riziko projektu — dotazník je už teraz obrovský (59 modulov, stovky otázok) a väčšina párov by ho celý nevyplnila.

## Čo už existuje (nestavať znova)
| Návrh | Stav v kóde |
|---|---|
| Double-blind zhoda | **hotové** — párovanie `/dotaznik/par`, vyhodnotenie + Mapa (`_mapa.tsx`, `.../vyhodnotenie`) |
| Rýchly screening | **čiastočne** — screening „chcem" na stránke témy (`_screening.tsx`), ale nie ako samostatný rýchly prechod všetkými témami |
| Naživo (spolu na jednom zariadení) | **hotové** — `/dotaznik/nazivo` |
| Hĺbkový / expertný | **to, čo teraz budujeme** — „kniha + dotazník" v `obsah/*.ts` |
| Kartičky / auto | **produkt už existuje mimo dotazníka** — `apps/spoznajme-sa` (kartičky), `apps/ano-nie-hm` |
| Denný mikro | **rozpracované mimo dotazníka** — `apps/otazka-dna`, `apps/daily-connection` |
| Terapeutický | prekrýva sa s `suhlas-bezpecie.ts`, `telo-hanba.ts`, `brzdy-spustace.ts` |
| Rozhovor po výsledkoch | **chýba** — Mapa ukazuje zhody, ale nedáva „o tomto sa porozprávajte" |

## Odporúčanie: 4 režimy pre používateľa + 2 výstupy
Sedem režimov je pre používateľa veľa. Navrhujem:

**Režimy vypĺňania**
1. **Kartičky** — téma + 1 veta popisu + 1 otvorená otázka, tlačidlá Ďalej / Zastaviť sa / Uložiť. Bez ukladania odpovedí. (Napojiť na existujúce kartičky, nie nová appka.)
2. **Erotický kompas (rýchly screening)** — každá téma jedna otázka: Áno / Možno / Iba fantázia / Chcem sa porozprávať / Nie. Double-blind. 59 tém za ~10 minút.
3. **Štandard** — téma + 4–6 základných otázok (chcem? fantázia vs. realita? čo láka? čo je hranica? postoj k túžbe partnera). Default pre bežný pár.
4. **Hĺbka** — celá „kniha + dotazník" (súčasný obsah), vetvenie, skúsenosť, roly, mýty. Otvára sa **len pre témy, kde obaja v kompase dali Áno/Možno**.

**Výstupy**
5. **Mapa zhody** (existuje) — obaja áno / áno + možno / obaja možno; „Nie" sa nikdy nezobrazí.
6. **Rozhovor po výsledkoch** (nové) — pre každú zhodu 2–3 otvorené otázky a jeden malý prvý krok.

Denný mikro-režim a terapeutický režim nedávať do dotazníka ako ďalšie režimy: mikro patrí do `otazka-dna` (môže čerpať otázky z kariet), terapeutický obsah je súčasťou tém citlivosti a hraníc.

## Čo to znamená pre obsah (dôležité pre Codex aj Claude)
Každá téma v `obsah/*.ts` potrebuje navyše:
- `karta` — 1 veta popisu + 1 otvorená otázka (m/ž),
- `kompas` — jedna screeningová otázka (m/ž),
- označenie, ktoré otázky patria do **Štandardu** (napr. pole `uroven: 'standard' | 'hlbka'` na otázke; bez označenia = hĺbka).

Technicky: rozšíriť `TemaObsah` v `typ.ts` o `karta?` a `kompas?` a `OtazkaBlok` o `uroven?`; renderer `_kniha.tsx` filtruje podľa zvoleného režimu. Toto je potrebné rozhodnúť **skôr**, než sa prepíše ďalších 50 tém, aby sa nemuseli prechádzať znova.

## Otvorené rozhodnutia pre používateľa
1. Súhlasíš so zúžením na 4 režimy + 2 výstupy, alebo chceš všetkých 7?
2. Kompas ako povinný prvý krok (hĺbka sa odomkne až po zhode), alebo voliteľný?
3. Kartičky: napojiť na existujúci produkt kartičiek, alebo samostatne v dotazníku?
