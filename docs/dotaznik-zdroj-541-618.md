# Zdroj P541–P618 — obsahové spracovanie

Súvisle prečítané bez deduplikácie; všetky významy porovnané s kódom. Checkpoint implementácie P619. P619–620 len nadpis ďalšieho úseku, ešte nespracované. Žiadna téma globálne uzavretá.

| Odseky | Konkrétne bloky | Rozhodnutie |
|---|---|---|
| P541–549 | zmyslova-hra:hmat, zmyslova-hra:hma_dotyky_info, zmyslova-hra:hma_dotyky_preferencia, zmyslova-hra:hma_dotyky_preferencia_ine | Tri preferencie: hladenie prstami/pierkom, stláčanie stehien/ramien, kombinácia a Iné. Existujúce dot_jemne/dot_tlak nezisťujú túto celkovú preferenciu; nová otázka. |
| P550–556 | zmyslova-hra:hma_nove_dotyky, zmyslova-hra:hma_nove_dotyky_ine | Záujem objavovať citlivé miesta druhého, oboznámiť sa, alebo zostať pri známom. Mužská/ženská formulácia bez predpokladu pohlavia druhého; všetky tri odpovede a Iné. |
| P557–558 | zmyslova-hra:hma_dotyky_info, bozky-dotyky:dot_jemne, bozky-dotyky:dot_tlak | Krátke položky hladenie/tlak/stisk/škrabanie: existujúci konkrétny obsah pokrýva dot_jemne a dot_tlak; vysvetlenie v hma_dotyky_info. Nevytvárať ďalšiu zhodnú otázku. |
| P559–560 | zmyslova-hra:hma_teplota, zmyslova-hra:hma_obklady_info | Doslovné Teplé/kryté obklady je nejasná pracovná poznámka. Zachovaný výslovný teplý obklad a krytie ochrannou vrstvou; bez domýšľania, že kryté znamená studené. Ochranná vrstva a limity tepla sú externé bezpečnostné doplnenie, nie rozlúštenie autorovho úmyslu. |
| P561–567 | predohra-naladenie:map_fyzicka_info, predohra-naladenie:map_dotyky_prijimam, predohra-naladenie:map_dotyky_poskytujem | Atmosféra, telesná aj emocionálna blízkosť; bozky krku/uší/tela, relaxačná/intímna masáž, bradavky/vnútorné stehná. Poetické záruky nahradené možným individuálnym účinkom. |
| P568–578 | dlhodoba-intimita:akt_info, dlhodoba-intimita:akt_ktore | Päť aktivít vrátane tanca v spálni a prechádzky už existovalo v akt_ktore. Použité rovnaké ID/voľby a Iné, doplnené detaily listov a tanca, text o naladení aj bez pokračovania k sexu. Žiadna nová duplicitná otázka. |
| P579–582 | dlhodoba-intimita:akt_pravidelny_program, dlhodoba-intimita:akt_pravidelny_program_ine | Pravidelne/občas/neláka a Iné. Pôvodné akt_frekvencia nemá odmietnutie a p akt_zaviest mieša skúsenosť so záujmom; nová presná otázka bez migrácie starých hodnôt. |
| P583–595 | dlhodoba-intimita:akt_info, dlhodoba-intimita:akt_ktore | Rodové opakovanie prvých troch aktivít z P577; rovnaké existujúce voľby. List/poznámka pre druhého zachováva obe formulácie bez heterosexuálneho predpokladu. Tu nie je explicitné Iné, existujúce pole však zostáva dostupné. |
| P596–603 | dlhodoba-intimita:akt_pravidelny_program, dlhodoba-intimita:akt_pravidelny_program_ine | Rodové opakovanie otázky na pravidelný program, tie isté tri možnosti. Nové otázky nevznikajú. |
| P604–610 | predohra-naladenie:map_fyzicka_info | Fyzická predohra/neha, postupné očakávanie a blízkosť. Text vysvetľuje možnosť, nie povinné vzrušenie/pripravenosť tela. |
| P611–614 | predohra-naladenie:map_dotyky_prijimam | Prijímanie: bozky krku/uší/pier; masáž šije/chrbta/stehien; bradavky/vnútorné stehná; nechty/pierko, Iné. Pierko redakčne označené ľahký dotyk, nie škrabanie. |
| P615–618 | predohra-naladenie:map_dotyky_poskytujem | Poskytovanie: bozkávanie tela, masáž/hladenie, citlivé miesta rukami, kombinácia intenzít, Iné. Nezlúčené s prijímaním, iniciatívou alebo všeobecnou obľubou masáže. |

## Pokrytie

78 odsekov, 40 explicitných možností a 10 polí Iné vrátane opakovaní. JSON uchováva celé pôvodné znenie a jednotlivé mapovania. Mužská/ženská verzia alebo neutrálne znenie, pri type jeden samostatné Iné; pri viac inePovolene. Nové otázky majú nové ID, existujúce uložené dáta nepremigrované. Čísla sú výskyty v zdroji, nie počet nových otázok.

## Externé doplnenia a neistoty

- [Gloucestershire Hospitals NHS: Ice and heat treatment](https://www.gloshospitals.nhs.uk/your-visit/patient-information-leaflets/ice-and-heat-treatment/), načítané 2026-09-18: jemné teplo, ochranná vrstva, kontrola kože. Použité iba všeobecné opatrenia, nie liečebný režim či prísľub erotického účinku.
- [Royal Devon NHS: Heat and cold for management of hand pain](https://www.royaldevon.nhs.uk/media/fcpdunyq/patient-information-leaflet-heat-and-cold-for-management-of-hand-pain-or-stiffness-rde-21-084-001.pdf), oficiálny výsledok vyhľadávania: nepoužívať pri zníženej citlivosti. Neprenesené časovanie ani liečebné indikácie.
- [Devon Sexual Health: Genital hygiene](https://www.devonsexualhealth.nhs.uk/your-sexual-health/genital-hygiene/), načítané 2026-09-18: parfumované prípravky môžu dráždiť genitálnu pokožku. Pri kúpeli sú bublinky/vôňa voliteľné.

P559 doslova uvádza Teplé/kryté obklady. Bez ďalšieho dôkazu nemožno tvrdiť, že autor myslel studené. Táto neistota zostáva v mape; do kódu je zapracované minimum jednoznačného významu (teplý obklad), doplnené ochranné krytie nie je vydávané za opravu zdroja.

Opakovania aktivít mapované na dlhodoba-intimita:akt_ktore. Predohra obsahuje samostatný zoznam prijímania a poskytovania, pretože existujúce iniciatívne gestá ani zoznam masáží nerozlišujú tieto konkrétne preferencie. Nové širšie empirické tvrdenia o účinkoch predohry neboli pridávané.

## Overenie

verify-dotaznik-541-618.cjs kontroluje nadväznosť, každú možnosť a Iné, existenciu cieľov aj obe rodové znenia. Významový audit je výsledkom čítania, nie samotných počtov. Finálny typecheck a regresie zaznamenané v progress dokumente; browser QA sa touto kontrolou nenahrádza.
