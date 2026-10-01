# XLSM-022 — zapojenie iných osôb a opakovaný veľký tematický strom

Rozsah: **P36690–P37389**. Príloha je export staršej konverzácie: obsahuje tri nové námety, opakované tematické zoznamy a veľa meta-dialógu o Word dokumente. Všetky bunky boli prečítané v poradí; obsahová mapa je nižšie.

| P rozsah | Obsah | Výsledok a cieľ |
|---|---|---|
| P36690–P36822 | Zapojenie iných osôb; „fluffers“, symbolické prijatie do skupiny, viac rúk a tiel; následný meta-dialóg | **Výrazne doplnené** v `trojky-skupiny.ts` → `choreografia_skupiny`: warm-up a servisné roly, vedenie scény, pomôcky, sedem prijímacích rituálov, osem multisenzorických choreografií, vlastná rola, reakcia na partnerovu túžbu a mýty. Meta-vety a ponuky ďalšieho spracovania sa vedome nepreniesli. |
| P36824–P36978 | Katalóg erotických pomôcok: vibrátory, dildá, análne, penisové a párové pomôcky, BDSM, senzorika, diaľkové hračky, stroje, vákuum, elektro, lubrikanty a starostlivosť | **Už podrobnejšie pokryté a zlúčené bez duplicity** v `pomocky-hracky.ts`, `analna-penetracia.ts`, `bdsm.ts` a `zmyslova-hra.ts`; katalóg bol už auditovaný v XLSM-017. Generické bezpečnostné a hygienické bloky patria samostatným témam. |
| P36980–P37109 | Rovnaké pohlavie, tabu praktiky, hranice fantázie a reality | **Už pokryté** v `rovnake-pohlavie.ts`, `tabu-mantinely.ts`, `fetise.ts`, `voyeur-exhib.ts`, `roleplay.ts` a príslušných praktických témach. Nezakladali sa druhé screeningy. |
| P37111–P37183 | Starý zoznam údajných medzier: emócie, telo, trauma, životné obdobia, tantra, technológie, kultúra, vzdelávanie a reflexia | **Porovnané s aktuálnym stavom**: vybrané oblasti používateľa sú už implementované podľa globálneho gap auditu v samostatných témach. Starý návrh neprepisuje neskorší výslovný výber „ostatné nie“. Meta-ponuky na ďalšiu tvorbu sa nepreniesli. |
| P37185–P37199 | Otázky a prísľuby o vytvorení Word dokumentu | **Meta-dialóg, vedome neprenesený** do dotazníka. |
| P37201 | Jedna rozsiahla bunka s celým starým stromom: predohra, dotyky, penetrácia, fetiše, viac osôb, pomôcky, rovnaké pohlavie, tabu a gap zoznam | **Bunka bola porovnaná po tematických blokoch.** Všetky praktiky sú už rozdelené v data-driven témach; jediná nájdená medzera boli pomocné skupinové roly, prijímacie rituály a multisenzorika, doplnené v `trojky-skupiny.ts`. |
| P37202–P37354 | Meta-konverzácia o H1/H2/H3, generovaní DOCX, čakaní a ručnom formátovaní; krátky opak mentálnej prípravy | **Vedome neprenesené**. Mentálna príprava bola podrobne doplnená v XLSM-021; požiadavka tejto dávky nie je tvorba Word dokumentu. |
| P37356–P37389 | Názvy vaginálnej vlhkosti, chuť, vôňa, pery a telo | **Už podrobnejšie pokryté** v `fetise.ts` → `vlhkost` po XLSM-020/021. Poetické označenia „šťava rozkoše“ a „nektár“ sa nepoužili ako hlavný termín; presný a príjemný názov „vaginálna vlhkosť“ nepredstiera, že fyziologická reakcia je dôkaz túžby. |

## Cielená rešerš

- kvalitatívny výskum skupinových scén ako hry s rolami, telesnými hranicami a prostredím: https://pubmed.ncbi.nlm.nih.gov/34729896/
- komunitná skúsenosť so striedaním stredobodu a okraja skupiny: https://www.reddit.com/r/nonmonogamy/comments/t1bdo3/
- komunitná diskusia o podpornej, vedúcej a rotujúcej roli: https://www.reddit.com/r/nonmonogamy/comments/zqxn3j/

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 85 statických ID v `trojky-skupiny.ts` je unikátnych; rodový diff-sken aj `git diff --check` PASS. Bez commitu a pushu.
