# Audit XLSM-005 — sliny a manuálne techniky, bod po bode

Dátum: 2026-09-30. Príloha bola vložená ako sploštený text bez pôvodných hraníc buniek. Čísla preto označujú logické zdrojové bunky/odseky v poradí prílohy. Každý bod bol porovnaný s konkrétnym textom, otázkou a možnosťami v kóde; samotná existencia názvu témy sa nepovažovala za spracovanie.

| Bunka | Zdrojový bod | Výsledok | Cieľ |
|---|---|---|---|
| C01 | Názov „Sliny — moc, vlhkosť a intimita“ | pôvodný krátky checklist prestavaný na hlbokú samostatnú skupinu | `fetise.ts` `sliny` |
| C02 | Naladenie bez hanby | nový normalizačný úvod a vysvetlenie rozdielu medzi bozkom, vlhkosťou, stekaním a prvkom moci | `sliny.uvod`, `sliny_naladenie` |
| C03 | Sliny ako lubrikant aj symbol odovzdania/nadvlády | zachované oba póly, doplnená neha, spontánnosť, tabu a zmyslovosť | `sliny_naladenie`, `sliny_myty` |
| C04 | Screening „otvoriť tému?“ | nová otázka áno/možno/preskočiť; ďalší obsah sa vetví | `sliny_screening`, `SLINY_OPEN` |
| C05 | Vysvetlenie zrkadlenia rolí | nový text o rozdiele prijímať a používať sliny | `sliny_role_info` |
| C06 | Prijímateľ: sliny ako vlhkosť | samostatná Y/F/M/N otázka | `sliny_prij_lub` |
| C07 | Prijímateľ: mokrý bozk | samostatná Y/F/M/N otázka; nesprávny termín snowballing neprebratý | `sliny_prij_bozk` |
| C08 | Prijímateľ: tvár/ústa a moc | samostatná Y/F/M/N otázka | `sliny_prij_usta_tvar` |
| C09 | Aktér: sliny ako vlhkosť | samostatná Y/F/M/N otázka | `sliny_akt_lub` |
| C10 | Aktér: stekanie/pľuvnutie na telo | samostatná Y/F/M/N otázka | `sliny_akt_telo` |
| C11 | Aktér: sila/nadvláda | samostatná Y/F/M/N otázka | `sliny_akt_moc` |
| C12 | Kódy realita/fantázia/možno/nie | prenesené významovo a pomenované plnými vetami | `SLINY_YFMN` |
| C13 | Existujúce formy slín | ponechané pôvodné ID a pridané vetvenie; nevymazané odpovede | `sliny_lubrikant` až `sliny_kombinacia` |
| C14 | Motivácia: živočíšnosť | explicitná možnosť | `sliny_pohon.zivocisnost` |
| C15 | Motivácia: prepojenie | explicitná možnosť | `sliny_pohon.prepojenie` |
| C16 | Motivácia: moc | explicitná možnosť | `sliny_pohon.moc` |
| C17 | Motivácia: zmysly | rozšírené o chuť a mokrý pocit | `sliny_pohon.zmysly` |
| C18 | Motivácia: tabu | explicitná možnosť | `sliny_pohon.tabu` |
| C19 | Zdrojový limit max. 3 | zachovaný ako nápoveda; navyše vizuál a spontánnosť | `sliny_pohon` |
| C20 | Množstvo symbolicky až intenzívne | rozšírené na päť konkrétnych úrovní | `sliny_mnozstvo` |
| C21 | Miesta: genitálie, telo/prsia, tvár, ústa | všetky prenesené a rozšírené o brucho, zadok/hrádzu a celé telo | `sliny_miesta` |
| C22 | Hygienický check-in | zámerne neprenesený; patrí do samostatnej hygienickej témy | — |
| C23 | Scenáre so slinami | autorsky doplnené naslinenie prstov, mokrý bozk, stekanie, dominancia, zlíznutie, wet look a slovná fantázia | `sliny_scenare` |
| C24 | Význam slín | zachované pôvodné ID; prirodzenosť, dôvera, moc a estetika | `sliny_vyznam` |
| C25 | Jumping-off pri zhode | nový konkrétny rozhovor o okamihu a podobe scény | `sliny_rozhovor_zhoda` |
| C26 | Jumping-off pri „možno“ | nová doplňovacia veta a konkrétne parametre | `sliny_rozhovor_mozno` |
| C27 | Jumping-off pri fantázii | nový slovný experiment bez realizácie | `sliny_rozhovor_fantazia` |
| C28 | Fantázia verzus realita | samostatne zachytené v škále aj mýte | `SLINY_YFMN`, `sliny_myty` |
| C29 | Psychologická motivácia namiesto mechanického zoznamu | implementovaná cez motívy a význam, nie iba checklist aktov | `sliny_pohon`, `sliny_vyznam` |
| C30 | Premena výsledkov na rozhovor | implementované troma výsledkovými textami | `sliny_rozhovor_*` |
| C31 | Manuálne techniky: penis, ejakulácia, grip, tempo, frenulum, edging | overené až na úroveň jednotlivých možností; samostatný text, úchopy, ciele, pohyby, tlak, tempo, edging a finále | `bozky-dotyky.ts` `mnp` |
| C32 | Sucho, lubrikant, sliny, vibrácie | vlhkosť a rozdiel sliny/lubrikant sú explicitné; vibrácie pokrýva spoločná mapa pomôcok | `mnp_info`, `mnp_vlhkost`, `pomocky-hracky.ts` |
| C33 | Vagína/G-bod: hĺbka, hook, duet s klitorisom | overené a rozšírené v predchádzajúcom reaudite o uhol, tlak, rytmus a pauzy | `bozky-dotyky.ts` `mvn` |
| C34 | Bradavky a súbežná stimulácia | overené detailné techniky, citlivosť, nástroj, experiment a mýtus | `bozky-dotyky.ts` `spol_zony` |
| C35 | Úvod k stehnám a približovanie sa | nová samostatná skupina, úvod a predstavový text | `stehna`, `steh_predstav` |
| C36 | Stehná: jemné bozky a hladkanie | explicitné možnosti | `steh_techniky` |
| C37 | Stehná: hryzenie a sanie | explicitné intenzívne možnosti | `steh_techniky` |
| C38 | Stehná: striedanie dotyku a tlaku | explicitné techniky + štvorstupňová intenzita | `steh_techniky`, `steh_intenzita` |
| C39 | Rodové verzie otázky na stehná | jedna zrkadlená m/z otázka bez zbytočného duplikovania možností | `steh_techniky` |
| C40 | Škrabanie/prieskum prstami | doplnené oboje | `steh_techniky` |
| C41 | Kombinácia bozkov so škrabaním | pokrytá viacnásobným výberom techník a vlastnou kombináciou | `steh_techniky`, `steh_kombinovanie_ine` |
| C42 | Kombinácia bozkov a masáže | pokrytá rovnakou mapou a samostatným postojom ku kombinovaniu | `steh_techniky`, `steh_kombinovanie` |
| C43 | Možno podľa nálady / jedna technika | obe voľby prenesené | `steh_kombinovanie` |
| C44 | Dĺžka teasingu stehien | doplnené nad zdroj: krátko, dlhšie, vo vlnách alebo ako hlavná hra | `steh_teasing` |
| C45 | Stehná — tip a búranie mýtu | nový kontrastný experiment a vysvetlenie, že nejde iba o cestu ku genitáliám | `steh_tipy_myty` |
| C46 | Masáž ako úvod, relax aj vášeň | nový vysvetľujúci text | `predohra-naladenie.ts` `mas_info` |
| C47 | Klasická, zmyslová, erotická masáž | všetky explicitné možnosti | `mas_typ` |
| C48 | Masáž s pomôckou | explicitná možnosť | `mas_typ.pomocky` |
| C49 | Postoj k masáži v predohre | nová škála od dôležitej intimity po neerotickú preferenciu + vlastná odpoveď | `mas_postoj`, `mas_postoj_ine` |
| C50 | Materiály: oleje, pierka, textílie, holé ruky | všetky prenesené a rozšírené | `mas_materialy` |
| C51 | Aromatický, teplý, neutrálny olej | explicitné možnosti; zachované aj existujúce účinky oleja | `mas_materialy`, `mas_oleje` |
| C52 | Kombinácia masáže s bozkami | explicitná možnosť | `mas_kombinacie_konkretne.bozky` |
| C53 | Teplotný experiment | explicitný teplý aj chladný kontrast | `mas_kombinacie_konkretne.teplota`, `mas_materialy` |
| C54 | Striedanie masáže s intenzívnym dotykom | explicitná technika a intenzívny opak | `mas_techniky.striedanie`, `mas_myty` |
| C55 | Typy dotyku: hladenie/pierko | explicitné materiály a dlhé ťahy | `mas_materialy`, `mas_techniky.palm_glide` |
| C56 | Citlivé zóny krk, ramená, stehná | prenesené do mapy zón | `mas_zony` |
| C57 | Pevné stláčanie a škrabanie | explicitné intenzívne techniky | `mas_techniky` |
| C58 | Dotyková mapa tela | všetky menované oblasti prenesené a zoskupené bez straty významu | `mas_zony` |
| C59 | Oblasti, ktorým sa vyhnúť | neprenesené ako ďalšia všeobecná hranicová otázka; rieši ich osobitná téma | — |
| C60 | Hra „Dotyková cesta“ | nový hotový experiment s poradím, textúrami, tlakom a spätnou väzbou | `mas_experiment` |
| C61 | Textúry: pierko, hodváb, masážna sviečka, jednoduchý dotyk | všetky sú možnosti materiálov | `mas_materialy` |
| C62 | Masáž ako samostatný hlavný akt | doplnená možnosť aj mýtus/realita | `mas_postoj.samostatne`, `mas_myty` |
| C63 | Súhrn bozkov, hladkania, pettingu, orálu, face-sittingu, zadku, fisting | porovnané s konkrétnymi skupinami; druhé moduly nevytvorené | príslušné existujúce témy |
| C64 | Gap: samostatný handjob | už podrobne realizovaný; doplnené vysvetlenie a presné praktiky | `mnp_info`, `mnp_*` |
| C65 | Gap: samostatný G-bod | už podrobne realizovaný vrátane hook, uhla, tlaku, pulzov, pauzy a klitorisu | `mvn_gbod_*` |
| C66 | Gap: prostata priamo/nepriamo | overené detailne v análnej téme a cez hrádzu v handjobe | `analna-penetracia.ts`, `mnp_perineum_*` |
| C67 | Gap: detail bradaviek | overené až na jednotlivé techniky vrátane vibrácie a twist/pull | `spol_zony` |
| C68 | Gap: teploty a materiály | overené vo všeobecnej zmyslovej téme a rozšírené v masáži | `zmyslova-hra.ts`, `mas_materialy` |
| C69 | Gap: hygiena rúk/nechtov | zámerne neprenesené; vlastná hygienická téma | — |
| C70 | Gap: deep-throat bezpečnostné signály | zámerne neprenesené; všeobecná bezpečnosť patrí do vlastnej témy | — |
| C71 | Gap: análny manuálny warm-up | overené externé krúženie, prsty, tempo, tlak a hĺbka | `analna-penetracia.ts` |
| C72 | Návrh A handjob: úchopy, tlak, tempo, lubrikácia | každá položka porovnaná; všetky pokryté alebo rozšírené | `mnp_uchopy`, `mnp_ciele`, `mnp_pohyby`, `mnp_tlak`, `mnp_tempo`, `mnp_vlhkost` |
| C73 | Návrh B G-bod: hook, tlak/pauzy, pulzy, klitoris | každá položka porovnaná; všetky pokryté | `mvn_gbod_*` |
| C74 | Návrh C prostata | preferenčný obsah pokrytý; zdrojové rukavice/stop-slovo neprenesené | `analna-penetracia.ts`, `mnp_perineum_*` |
| C75 | Návrh D bradavky | všetky techniky a intenzity pokryté, doplnené ďalšie varianty | `sz_bradavky*` |
| C76 | Návrh E teplotné hry | lokality a teplo/chlad pokryté v zmysloch a masáži | `zmyslova-hra.ts`, `mas_*` |
| C77 | Návrh F hygiena | neprenesené podľa záväzného pravidla | — |
| C78 | Návrh G deep throat | technické safety signály neprenesené podľa záväzného pravidla | — |
| C79 | Návrh H análny warm-up | významovo overené v existujúcej bohatej téme; bez duplicity | `analna-penetracia.ts` |
| C80 | Záverečný nadpis „ďalšie chýbajúce témy“ bez obsahu | zdroj sa končí nadpisom; nebolo čo významovo preniesť | — |

## Redakčné zásahy nad zdroj

- Pri slinách pribudla mapa konkrétnych scenárov, vizuálny a spontánny motív, mýty a tri rozhovorové výstupy.
- Pri stehnách pribudla škála intenzity, dĺžka teasingu, samostatnosť zóny, kontrastný experiment a mýtus.
- Pri masáži pribudli pevný tlak, hnetenie, tlak predlaktím, mapa kombinácií, celotelový experiment a dva mýty.
- Existujúce ID zostali zachované. Všeobecná hygiena, súhlas, stop-signály a hranicové protokoly sa do tematických súborov nepreniesli.
