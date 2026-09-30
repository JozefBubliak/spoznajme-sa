# Zdroj `dotaznik-odseky-duplicity.xlsm` — postup od konca

Zdroj: `OneDrive\Documenten\dotazník\dotaznik-odseky-duplicity.xlsm`, hárok „Odseky (2)", stĺpce
A = ID odseku (P, číslovanie Wordu), B = Pôvodný text, C = Druh (Názov/Otázka/Odpoveď).
22 033 riadkov, P1–P49624. Používateľ vkladá kusy textu do chatu **od konca tabuľky smerom hore**.

Pravidlá (používateľ 2026-09-30): súhlas/bezpečnosť v témach neriešiť (vlastná sekcia); bitie, facky,
ponižovanie = bežné preferencie; chýbajúci obsah dotvoriť.

## Spracované

### XLSM-006 — Face sitting (2026-09-30)

Celá príloha od screeningu po záverečné motto bola rozdelená na **100 logických bodov**. Presná mapa každého bodu je v `docs/dotaznik-xlsm-reaudit-006.md`.

| Oblasť | Výsledok |
|---|---|
| Skúsenosť a fantázia | skúsenosť, miera, frekvencia a reflexia pre obe roly; fantázia sa teraz pýta každého, nielen ľudí bez skúsenosti |
| Rola hore | motívy, tri vnemy, vedenie, frázy, tabu, turn-off, +2 body, skúsenostná reflexia a jednovetové zhrnutie |
| Rola dole | servis/uctievanie/submisivita, spätná väzba, mentálne bloky, aktívna/pasívna rola, čo chce počuť, ťažko vysloviteľné túžby a ideálna prvá verzia |
| Spoločné preferencie | tlak, tempo vrátane návalov, komunikácia, worship/service, vôňa/chuť, váha a pohltenie, konkrétne rozhovorové body |
| Textový obsah | normalizácia fantázie, mýty o váhe/vôni/ponižovaní a sedemstupňový experimentálny rebrík |
| Safety/hygiena | všeobecné vsuvky, stop-signály a hygienické poučky neprenesené; staré bloky premenené na tematické preferencie |
| Technika | duplicitné použitie `smother_uvod` odstránené; pôvodné ID zachované, druhá rola má nové textové ID |

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 117 statických ID v `face-sitting.ts` je unikátnych. Presný P rozsah zostáva otvorený pre zámok zdrojového XLSM. Bez commitu a pushu.

### XLSM-005 — sliny, stehná, masáž a kontrola manuálnych „gapov“ (2026-09-30)

Príloha bola prečítaná celá od „Téma Sliny“ po nedokončený záverečný nadpis „Témy, ktoré v dokumente chýbajú“. Sploštený zdroj bol rozdelený na **80 logických buniek/odsekov**. Úplné priradenie každého bodu je v `docs/dotaznik-xlsm-reaudit-005.md`.

| Téma | Výsledok |
|---|---|
| Sliny | pôvodný checklist rozšírený na naladenie, screening, zrkadlené roly, realita/fantázia/možno/nie, motivácie, množstvo, miesta, scenáre, mýty a tri výstupy pre rozhovor |
| Stehná | nová samostatná skupina: jemné aj intenzívne techniky, kombinovanie, teasing, vlastné odpovede, experiment a mýtus |
| Masáž | postoj, typy, presné dotyky, materiály, oleje, kombinácie, telesné zóny, dotyková cesta a mýty; zahŕňa relaxačný aj intenzívny opak |
| Handjob/G-bod/prostata/bradavky/teploty/análny warm-up | všetky zdrojové návrhy skontrolované oproti konkrétnym existujúcim otázkam a možnostiam; chýbajúce vysvetlenia a varianty doplnené v predchádzajúcom reaudite alebo tejto dávke, druhé moduly nevytvorené |
| Hygiena, stop-signály, deep-throat safety a všeobecné hranice | podľa pokynu neprenesené do tém; patria do samostatných tém |

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; unikátnosť ID PASS (`fetise.ts` 58, `bozky-dotyky.ts` 98, `predohra-naladenie.ts` 114). Presný P rozsah zostáva otvorený pre zámok zdrojového XLSM. Bez commitu a pushu.

### REAUDIT dvoch dávok pod ≤P47090 — bunka po bunke (2026-09-30)

Používateľ odmietol pôvodný postup, ktorý pri viacerých bodoch overil iba existenciu hlavnej techniky a príliš rýchlo ich označil ako duplicity. Obe prílohy boli preto znovu prečítané celé a rozdelené na **69 + 44 logických buniek/odsekov**. Úplná mapa každého bodu je v `docs/dotaznik-xlsm-reaudit-003-004.md`.

| Téma | Nové rozšírenie |
|---|---|
| Energia a intenzita | text spektra; samostatne jemné/intenzívne prijímanie a intenzívne poskytovanie + vlastné odpovede; mapy prijímam/poskytujem; viazanie, impact, polohy a kontrasty |
| Tempo a orgazmus | psychofyzický text; tempo penetrácie/predohry; psychológia, roly, zvuky a teasing; edging vysvetlenie; násobné vlny, cesty a mýty |
| Manuálna stimulácia | G-bod — uhol, tlak, rytmus a text; handjob — samostatný text, tlak a nové pohyby; hrádza; tlakové body panvy/bedier/krížov |
| Bradavky | techniky, citlivosť, preferovaný nástroj, „nie“, vlastná odpoveď, experiment, rodovo neutrálne búranie mýtu |
| Polohy | konkrétne prechody, výmena vedenia, mapa energie polohy a vysvetlenie; praktický blok prepísaný bez všeobecného safety rámca |
| Predohra | konkrétna kombinovaná stimulácia prijímam/poskytujem; neverbálna komunikácia; konflikt, nový partner, zdravotné obmedzenie a viac partnerov; vysvetľujúce texty |
| Masturbácia | remote formy a miesta; pocit po spoločnej sólo hre + normalizačný text |
| Existujúce bohaté sekcie | prostata, análna manuálna stimulácia, orálne polohy, prostredie, zmysly, roleplay, slow sex a rituály boli preverené až na úroveň možností; presné ciele sú v reaudit mape |
| Bezpečnosť/hygiena | podľa pokynu neprenesené; pri upravených témach odstránené alebo prepísané všeobecné vsuvky pri zachovaní existujúcich ID |

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; unikátnosť ID PASS (`tempo-intenzita` 64, `bozky-dotyky` 89, `polohy` 41, `predohra-naladenie` 106, `masturbacia` 70, `orgazmus-kontrola` 30); `git diff --check` PASS. Pôvodné záznamy XLSM-003 a XLSM-004 pod týmto bodom sú historické a nahrádza ich tento reaudit.

### Ďalší kus pod ≤P47090 — manuálne techniky, energia a tempo (2026-09-30)

Vstup bol prečítaný celý od „Handjob ako samostatný modul…“ cez zdroj `19_Tempo_intenzita_a_orgazmus` po „Experimentovanie s energiou / Úvod“. Presný P rozsah zostáva otvorený pre exkluzívny zámok zdrojového XLSM.

| Obsah | Cieľ | Rozhodnutie |
|---|---|---|
| Preferovaná intenzita pri prijímaní a poskytovaní | `tempo-intenzita.ts` `energia_dotyku` | dve nové samostatné otázky; jemná, pevná, intenzívna a striedaná energia |
| Škrabanie | `energia_dotyku` | nová škála intenzity vrátane značenia + mapa miest: chrbát, ramená, zadok, stehná, hrudník, boky |
| Tempo penetrácie a predohry, zmeny a pauzy | `tempo-intenzita.ts` `tempo_rytmus` | nová skupina so základnou preferenciou, stabilným rytmom, kontrastmi a prestávkami |
| Psychologické prvky rytmu | `tempo_rytmus` | očný kontakt, budovanie, pomalé hlboké aj rýchle pohyby, zmena hĺbky, nečakaná pauza, prevzatie rytmu; tipy a mýtus |
| Bradavky | `bozky-dotyky.ts` `spol_zony` | rozšírené o hladenie, sanie, ťapkanie, pootočenie/ťah, hryzenie, vibráciu a striedanie; pridaná citlivosť, preferovaný nástroj, experiment a mýtus bez rodového stereotypu |
| Handjob, G-bod, prostata/hrádza, análna manuálna stimulácia, teplota, orálne polohy, edging, sliny | existujúce témy | významové duplicity aktuálnych podrobných otázok; druhé moduly nevytvorené |
| Hygiena rúk, deep-throat bezpečnosť a všeobecné bezpečnostné protokoly | — | podľa pokynu neprenesené; staré všeobecné hygienické/semaforové vsuvky v `bozky-dotyky.ts` odstránené alebo prepísané na technické a preferenčné otázky bez zmeny existujúcich ID |

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; `tempo-intenzita.ts` má 49 a `bozky-dotyky.ts` 77 unikátnych ID bez duplicít; `git diff --check` PASS.

### Ďalší kus pod ≤P47090 — energia dotyku, tempo a stromové duplicity (2026-09-30)

Vstup bol prečítaný celý od „Hranie s energiou zahŕňa…“ po karty `12_Masturbacia_a_solo_aktivity`. Presný P rozsah ostáva dočasne otvorený, pretože zdrojový XLSM je naďalej exkluzívne uzamknutý iným procesom.

| Obsah | Cieľ | Rozhodnutie |
|---|---|---|
| Jemnosť, tlak, stisk a ťah | `tempo-intenzita.ts` `energia_dotyku` | nová skupina: postoj k jemným pohybom, 10 konkrétnych foriem energie, spôsob striedania, vlastná odpoveď |
| Jemnosť verzus intenzita | `energia_dotyku` `ene_tipy_myty` | doplnené praktické kontrasty, vplyv polohy, intenzívny opak, mýtus a normalizácia bez hanby |
| Kontrola orgazmu | `tempo-intenzita.ts` `edging` | nová mapa: spomalenie, úplná pauza, zmena zóny, jemná pomôcka, kombinácia tempa a pomôcky, partner riadi tempo |
| Bezpečnostný blok | `tempo-intenzita.ts` | odstránené všeobecné poučky a „tvrdé NIE“; zachovaný iba obsahový dozvuk po intenzívnej vlne |
| Polohy, prostredie, zmysly, roleplay, bozky, masáž, slow sex, petting, orál, dominancia, maznanie, rituály, masturbačné karty | existujúce témy | významové duplicity aktuálneho kódu; nezakladané druhé otázky |
| Bezpečnosť, hranice, stop signály a hygiena zo stromov | — | podľa pokynu neprenášané do obsahových tém |

`npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS; 38 ID v `tempo-intenzita.ts` je unikátnych.

### ≤P47090 — Masturbácia v páre + začiatok zmyslovej deprivácie (2026-09-30)

Presné ID prvého odseku ostáva dočasne otvorené: oba tabuľkové súbory boli počas spracovania exkluzívne uzamknuté iným procesom, preto parser nemohol načítať riadky. Horná hranica nadväzuje na checkpoint: **P47090**. Vstup bol prečítaný celý od „MASTURBÁCIU & SÓLO“ po začiatok „Úvod do dotazníka Preskúmajte“.

| Obsah | Cieľ | Rozhodnutie |
|---|---|---|
| Sledovanie partnera/partnerky pri masturbácii | `masturbacia.ts` `voyeur` | opravené chybné zrkadlenie ženskej verzie; doplnené vzrušenie z vedomého sledovania, kontroly, dychu, rastúceho vzrušenia, pomôcok, spontánnej predohry a prechodu do spoločnej aktivity |
| Byť sledovaný/á | `masturbacia.ts` `exhib` | nová mapa `exh_co_vzrusuje`: očný kontakt, partnerova vlastná stimulácia, postupné zapojenie, dych/slová, zrkadlo, vzrušenie pozorovateľa, intenzívne príkazy |
| Spoločná masturbácia | `masturbacia.ts` `spolocna` | nová mapa foriem: obaja naraz, striedanie, napodobňovanie, nové uhly/polohy, hravá súťaživá verzia |
| Pomáhanie a hračky | `masturbacia.ts` `guided`, `hracky` | zdroj už pokrytý; ponechané existujúce rozšírenia (ruka na ruke, zvyšok tela, hračka, aktívna/pasívna rola) |
| Zmyslová deprivácia | `zmyslova-hra.ts` `layering` | už pokrytá páskou/slúchadlami; doplnený intenzívny opak, mýtus vs. realita a normalizácia bez hanby |
| Všeobecná bezpečnosť/súhlas | oba súbory | podľa pokynu odstránené tematické bezpečnostné rámce a poučky; zdrojový blok „Bezpečnostné aspekty“ sa neprenášal |

Doplnené nad zdroj: súťaživá spoločná hra, explicitné komentáre a príkazy, kombinácia viacerých odobratých zmyslov, mýtus „deprivácia = iba tvrdé BDSM“. `npx tsc --noEmit --incremental false` PASS; všetkých 6 `verify-dotaznik-*.cjs` PASS. Bežný `npm run typecheck` bol blokovaný iba cudzím zámkom na `tsconfig.tsbuildinfo`.

### P49385–P49624 (2026-09-30)
| Odseky | Cieľ | Rozhodnutie |
|---|---|---|
| 49385–49386 Edging | `orgazmus-kontrola.ts`, `tempo-intenzita.ts` | už pokryté |
| 49387–49388 Tantra, BDSM | `tantra-slow-sex.ts`, `bdsm.ts` | už pokryté |
| 49388 Sex vo vode | `miesta-prostredie.ts` skupina `voda` | nové: prostredia, skúsenosť, čo robiť, polohy, lubrikant, teplota, brzdy |
| 49389 Experimentovanie s polohami | `polohy.ts` skupina `experiment` | nové: ochota, náročné polohy, pomôcky, zrkadlo, výzvy, brzdy |
| 49390–49392 Sumár + plán | `sumar.ts` → automaticky v `zaver` každej témy (`index.ts`) okrem súhlasu a kontextu | nové |
| 49395–49483 Rovnaké pohlavie | `rovnake-pohlavie.ts` | doplnené karty: škála zvedavosť↔prax, soft bi, hard bi (prsty/strap-on/penis, top/bottom, tempo), preklik na Pomôcky, reálny rozsah, podmienky, integrácia; odstránené bezpečnostné zásady |
| 49484–49514 Zoznam 31 modulov | `strom.ts` | všetky existujú; 31 Tabu → nový modul I5 |
| 49516–49540 Hranie s tabu | `tabu-mantinely.ts` (presun z `fantazie.ts`, rovnaké ID) | + čo vzrušuje, scenáre |
| 49543–49589 Bezpečnosť, metodika, súhlas | — | podľa pokynu neriešené (samostatná sekcia) |
| 49610–49613 Mantinely & nikdy | `tabu-mantinely.ts` `mapa` | mriežka praktík a tekutín (nikdy/fantázia/možno/áno/už), absolútne nie, podmienky; psychologický rámec |
| 49615–49624 Prázdne nadpisy | — | témy existujú |

### P48624–P49384 (2026-09-30)
| Odseky | Cieľ | Rozhodnutie |
|---|---|---|
| 48624–48631 Psychológia roleplay | `roleplay.ts` `skusenost` (+ milujem, otvorený/á potrebujem skúsenosti, nekomfort, `skusenost_ine`), `co_je` text | doplnené; nová skupina `tipy` (mýty, ako začať); odstránené stop-slovo/18+ vsuvky |
| 48646–48751 Miesta — úvod „Predstavte si" | `miesta-prostredie.ts` uvod `predstavte` + `myty` | nahradilo bezpečnostný `ramec` |
| 48825–48840 Karty | `karty` (sprcha/vaňa ako často + čo, jedlo & miesto), `klu_podmienky`; date out = `hot_frekvencia`, diskrétnosť = `ext_hranica` | doplnené |
| 48920–49078 Vaginálny fisting | `vaginalna-penetracia.ts` `fis_postoj` m/z znenie, + `ak_chces`, `fis_postoj_ine`, `fis_myty` | doplnené |
| 49154–49200 Face sitting | `face-sitting.ts` skupina `techniky` (pocit hore/dole, techniky z/m, polohy z/m, poskytovanie, kombinácie, mýty/tipy) | doplnené + anilingus, kinging, semenníky, hrádza, vibrátor |
| 49202–49384 Polohy | `polohy.ts` `kla_ktore` (+ lotos, zadná so sklonom, experimentálne, kombinácia; cowgirl m/z), `kla_zmena_pocas_ine`, `kla_obluba`, `ora_69_info`, `ora_69_ako`, `myty` | doplnené |
| — Tabu tekutiny | `tabu-mantinely.ts` `mapa_tekutiny_info` | doplnené búranie tabu (sliny, moč, pľuvanie, menštruácia) |

### P48466–P48623 Roleplay (2026-09-30)
Zdroj: role (+ vojak, zvodkyňa, spoznaní milenci, kráľ/kráľovná, rytier/čarodejnica), opisy rolí, kostýmy (plné znenie + `kos_zaujem_ine`), dynamika (plné znenie + `dyn_volba_ine`), `komb_zaujem`, `komb_hry_zaujem`, `komb_hry_ktore`, `komb_maznanie_ktore`, `rp_zaujem` (robíme/túžim/ak chceš/možno/nie + Iné), svetlá a hudba, tip „vlastný príbeh".
Doplnené: ďalšie roly (fotograf, masér, dozorca, taxikár, cudzinci v hoteli, bývalí, prvý raz, výmena, upír, pirát, zlodej), `rp_frekvencia`, `rp_kto_vymysla`, escape room, kocky. Odstránené: stop-slovo, „okno z reality", 18+/riziko vsuvky.

### P48013–P48465 Petting, nepenetratívne, roleplay karty (2026-09-30)
Zdroj → `nepenetrativne-trenie.ts`: nová skupina `petting` (druhy, experimentovanie, ideálny, 4 m/z otázky + Iné, tipy); frottage/interkrurálny/tribbing/titjob plné m/z znenia + Iné + „Prečo vzrušuje"; karty outercourse, no-goal frekvencia (`ram_nogoal_frekvencia`). Edging, bozky, senzorika = existujúce témy. Roleplay karty → `roly_medical`, `roly_autorita_kedy`; ostatné karty už pokryté.
Doplnené: `outercourse` (hotdogging, hlavička o klitoris, kĺzanie vulvy, vibrátor medzi, kde dokončiť, mýty), interkrurálne polohy, mýty pri scissoringu a titjobe.

### P47323–P48012 Bozky, manuálne techniky, petting (2026-09-30)
Zdroj → `bozky-dotyky.ts`: bozky ústa/francúzske/hryzenie/krk m/z znenia + agresívne a intenzívne voľby + Iné, zóny (+ bradavky, nie), typy bozkov, tipy „večer bozkov"; A-bod, U-bod, zadná klenba; odkaz na Polohy/Pomôcky. Koruna/uzdička/strany a stop-start už boli. Petting = duplicita predošlého kusu.
Nadpisy bez obsahu → dotvorené: `RUKY_RITUALY` (kombinácie + masáž, mýty), `polohy.ts` `zena_hore` (čo robiť hore, on zdola, hanba, mýty), `komunikacia-pocas-po.ts` `zaciatok` (mikrokroky dirty talku).
Doplnené: 6-sekundový bozk, bozk počas sexu, bozk po oráli, vlasy/tvár, nové zóny, mýty o bozkávaní.

### P47091–P47322 Masturbácia + bozky (duplicita) (2026-09-30)
Zdroj → `masturbacia.ts`: `voy_zaujem`, `exh_zaujem`, `spol_zaujem`, `guid_zaujem`, `guid_dat` (m/z, robíme/túžim/ak chce/možno/nie + Iné), `guid_formy`, `spol_hracky_zaujem`, skupina `situacie` (situácie, tipy), úvodný text. Bozky = duplicita predošlého kusu (+ poznámka používateľa „ak dáš jemne, daj aj opak").
Doplnené: prikazuj/komentuj pri sledovaní, inštrukcie, zákaz dotyku, na telo, prichytenie, porno/videohovor, mýty. Odstránené: bezpečnostný úvod, otázka o súkromí.

**Ďalší kus: P47090 a nižšie.**
