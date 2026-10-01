# XLSM-018 — fetiše a netradičné techniky (P38657–P38888)

Príloha bola nájdená ako jeden súvislý úsek v zdrojovom XLSM a prečítaná bunka po bunke. Opakujúci sa mix definícií, katalógu a rozpracovaných tém bol zlúčený podľa významu, nie kopírovaný ako druhé otázky.

| XLSM rozsah | Obsah buniek | Výsledok a cieľ |
|---|---|---|
| P38657–P38667 | definícia a fyzické/dynamické/psychologické typy | **Doplnené a prepísané:** túžobný úvod `FETISE.uvod` a kategórie v `FETIS_SCREENING` v `fetise.ts` |
| P38668–P38676 | prvý screening a opakované úvody | **Doplnené:** predmety, časti tela, forma skúmania a realita verzus fantázia v `FETIS_SCREENING` |
| P38677–P38717 | opak definícií, materiály, obuv, časti tela, moc a roleplay | **Zlúčené:** konkrétne voľby v `FETIS_SCREENING`, `MATERIALY`, `CASTI_TELA`; generická komunikácia a súhlas neprenesené |
| P38718–P38732 | voyeurizmus, exhibicionizmus, verejnosť, dokumentovanie, breath play | **Už pokryté:** `voyeur-exhib.ts`; breath play v `bdsm.ts`; bezpečnostné poučky neprenesené |
| P38733–P38766 | tabu, dôvera, reflexia, opakovanie pozorovania a natáčania | **Doplnené/zlúčené:** normalizácia a mýty v `fs_mytus`; scenáre vo `voyeur-exhib.ts` |
| P38767–P38775 | katalóg častí tela, chodidlá, ruky, vlasy, intenzity | **Doplnené:** mapa častí tela, formy foot play, spôsoby použitia a partnerova túžba v `CASTI_TELA` |
| P38776–P38786 | latex, koža, hodváb, pančuchy, obuv, uniformy, masky, zmysly | **Doplnené:** podnety oddelené od spôsobu použitia v `FETIS_SCREENING` a `MATERIALY` |
| P38787–P38798 | tekutiny, menštruácia a pohľad/byť videný | **Už podrobnejšie pokryté:** `SLINY` až `POT` a `voyeur-exhib.ts`; hygiena/safety neprenesené |
| P38799–P38804 | normalizácia a opak definície | **Doplnené:** `co_su`, `ako_zacat`, `fs_mytus` hovoria o túžbe a detaile bez patologizácie |
| P38805–P38819 | foot fetish, masáž, bozky, prsty, pančuchy, moc, footjob | **Doplnené:** `foot_davam`, `foot_dostavam`, `foot_formy` a dynamika v `CASTI_TELA` |
| P38820–P38826 | hodváb, satén, koža, latex a práca látkou | **Doplnené:** `MATERIALY.mat_typ`, `mat_ako` a kontexty použitia |
| P38827–P38851 | chodidlá; ruky, nechty, vlasy, ťahanie a vedenie | **Doplnené/zlúčené:** `CASTI_TELA`; existujúce vlasové otázky sa neduplikovali |
| P38852–P38863 | stručný voyeur/exhib/verejný katalóg | **Už podrobnejšie pokryté:** `voyeur-exhib.ts` z XLSM-017 |
| P38864–P38881 | túžobný voyeur text, partner, iné páry, spoločná erotika | **Zlúčené:** rola diváka, partner, dohodnuté publikum a médiá vo `voyeur-exhib.ts` |
| P38882–P38888 | zrkadlové otázky na partnera a erotické filmy | **Zlúčené bez duplicity:** m/ž varianty vo `voyeur-exhib.ts` a `digitalna-intimita.ts` |

## Rozšírenie nad zdroj

- `FETIS_SCREENING` oddeľuje **čo** priťahuje od toho, **ako** sa má podnet použiť a či má zostať fantáziou.
- Nová skupina `NOHAVICKY`: druh a stav bielizne, pohľad, ponechanie na tele, vyzliekanie, nosenie pri sebe, vôňa, tvár, páska na oči, trenie, výmena, výber, fotografia a zbierka.
- Hlavné okruhy obsahujú postoj k partnerovej túžbe. Mýty oddeľujú materiál, rodovú hru, orientáciu a príťažlivosť k človeku.
- Rešerš: Scorolli et al. 2007, Sagarin et al. a komunitné Yes/No/Maybe checklisty; odkazy sú v hlavičke `fetise.ts`.

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 106 statických ID v `fetise.ts` je unikátnych; rodový sken a `git diff --check` PASS. Bez commitu a pushu.
