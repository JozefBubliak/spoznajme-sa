# Audit XLSM-007/008 — trojky, skupiny a prekrývajúca sa dávka

Dátum: 2026-09-30. Obe prílohy boli prečítané celé. XLSM-008 nie je identická kópia XLSM-007: jadro MMF/FMF a otázky sa významovo silno prekrývajú, no XLSM-008 obsahuje dlhšie erotické naladenia, osobitné otázky na poskytovanie a prijímanie a niekoľko opakovaných mužských/ženských vetiev. Preto sa neimportovala druhýkrát ako nový modul; jedinečné detaily sa zlúčili do tej istej témy.

## XLSM-007 — „TROJKA – FANTÁZIE…“

| Bod | Zdrojový obsah | Výsledok |
|---|---|---|
| G01 | MMF predstava pre ženu | osobné ženské naladenie v `MMF.uvod` a rozšírenom texte túžby |
| G02 | MMF postoj ženy | `mmf_postoj`, plná päťstupňová škála + vlastná odpoveď |
| G03 | MMF predstava pre muža | osobné mužské naladenie v `MMF.uvod` |
| G04 | MMF postoj muža | rovnaké ID a hodnoty, mužské znenie cez `g()` |
| G05 | Dvaja muži iba pre ženu | `mmf_rozdelenie.len_jej` |
| G06 | Muži aj medzi sebou | `mmf_rozdelenie.aj_sebe` + detail `mmf_medzi_muzmi` |
| G07 | Jeden stredobod, druhý asistuje | `mmf_rozdelenie.jeden_asistuje` |
| G08 | Každý s každým | `mmf_rozdelenie.kazdy_kazdemu` |
| G09 | Žena prijíma bozky/hladenie/ruku/pomôcku/orál | `mmf_prijat` |
| G10 | Dvojitá penetrácia | `mmf_prijat.dvojita_penetracia` + samostatný `EDGE` |
| G11 | Žiadny kontakt s ďalším mužom | zrkadlená osobná možnosť v `mmf_prijat` |
| G12 | Muž prijíma kontakt od muža | `mmf_prijat`, osobitný detail `mmf_medzi_muzmi` |
| G13 | Stredobod ženy — sen/možno/rovnosť | `mmf_stredobod_pocit` |
| G14 | Dominantná/vyvážená/striedaná rola | `troj_roly` |
| G15 | FMF postoj ženy | `fmf_postoj` ženské znenie |
| G16 | FMF postoj muža | `fmf_postoj` mužské znenie |
| G17 | Ženy sa venujú mužovi aj sebe | `fmf_rozdelenie.dve_aj_sebe` |
| G18 | Ženy iba mužovi | `fmf_rozdelenie.dve_len_jemu` |
| G19 | Respondent ako stredobod | `fmf_rozdelenie.ja_stredobod` |
| G20 | Druhá žena ako stredobod | `fmf_rozdelenie.druha_stredobod` |
| G21 | Každý každému | `fmf_rozdelenie.kazdy_kazdemu` |
| G22 | Iba pozorovanie | `fmf_rozdelenie.pozorovatel` a `POZOROVANIE` |
| G23 | Aktivity partnera s treťou osobou | personalizované `hr_aktivity_partner_treti` |
| G24 | Bozk/orál/penetrácia/pomôcky | všetky explicitné voľby |
| G25 | Pozorovanie alebo aktívne zapojenie partnera | voľby v matici a rolách |
| G26 | Zdrojový tabu checklist | premenený na obsahový zoznam erotických turn-offov `hr_tabu` |
| G27 | Vidieť partnera s treťou osobou | personalizované `hr_vidiet_partnera` |
| G28 | Viac párov a výmena | `skup_scenare` |
| G29 | Gangbang | `GANGBANG`, postoj, rola, aktivity a motivácie |
| G30 | Bukkake | oddelený význam, postoj, miesta, vizuál a motivácie |
| G31 | Skupinový orál | `skup_scenare.oralny_gang` |
| G32 | Orgia každý s každým | personalizovaný `orgie_postoj` |
| G33 | Pasívny pozorovateľ | personalizovaný `voyeur_postoj` |
| G34 | Rozdiel gangbang vs. bukkake | nový vysvetľujúci text `gb_bk_rozdiel` |
| G35 | DP/DAP/DVP | rozšírené na šesť konkrétnych variantov `edge_typy` |
| G36 | Fantázia/možno/realita pri DP | `edge_dp`, bez všeobecného safety rámca |
| G37 | Pomôcky pri simulácii | `edge_typy.pomocka`, `.dve_pomocky` |
| G38 | Foto/video | `bk_zaznam` + repurposed `ramec_foto` |
| G39 | Vetting tretej osoby | `ramec_vyber_osoby`, `ramec_preco_osoba` — chémia, energia, známosť, vzhľad |
| G40 | Súkromie a záznamy | obsahová otázka na erotický vzťah k záznamu; právne/safety poučky neprenesené |
| G41 | Zdravotné podmienky, ochrana, hygiena | neprenesené; patria do vlastnej témy |
| G42 | Alkohol/látky | safety pravidlá neprenesené; existujúce ID premenené na mieru plánovania |
| G43 | Matica aktivít ja–partner–tretia osoba | nová skupina `matica_interakcii` s troma samostatnými otázkami |
| G44 | Stop-slovo, exit, semafor | neprenesené; staré prvky `RAMEC` premenené na choreografiu scény |
| G45 | Miesto | personalizovaný výber erotickej atmosféry `ramec_miesto` |
| G46 | Dynamika pozornosti | rozšírená v `troj_dynamika`, MMF/FMF a matici |
| G47 | Aftercare/debrief | zachované iba ako tematický dozvuk a reflexia `ramec_aftercare` |
| G48 | Swingers odkazy | významovo patria do `swinging.ts`; nevytvorená duplicita |
| G49 | Hotwife/cuckold/kandalizmus | patria do `zdielanie-partnera.ts`; motivácia cuckold/compersion je prelinkovaná v `gb_motivacia` |
| G50 | Gangbang žena — postoj | personalizovaný `gb_postoj` |
| G51 | Gangbang muž — sledovanie | mužská verzia `gb_postoj` |
| G52 | Prítomnosť partnera ako divák/účastník | `gb_partner_pritomnost`, `gb_partner_rola` |
| G53 | Gangbang ako rozmaznávanie/stredobod | `gb_motivacia.stredobod`, `.rozmaznavanie` |
| G54 | Objektivizácia, tabu, intenzita | explicitné motivácie bez moralizovania |
| G55 | Bukkake žena — postoj | ženské znenie `bk_postoj` |
| G56 | Bukkake muž — sledovanie/účasť | mužské znenie `bk_postoj` |
| G57 | Cumshot telo/tvár/prsia/zadok/vlasy | `bk_miesta` |
| G58 | Bukkake: moc, exhibícia, messy estetika | `bk_vizual` |
| G59 | Benefity pre ženu a muža | autorsky nahradené konkrétnymi motiváciami, nie univerzálnym sľubom |
| G60 | Pozorovanie skupiny | `POZOROVANIE` s naladením |
| G61 | Aktívne sledovanie partnera | personalizovaný `watch_partner_postoj` |
| G62 | Žiarlivosť a zmiešané pocity | `EMOCIE`, text + sedem konkrétnych spúšťačov |
| G63 | Pocit vylúčenia | `emo_spustace.bokom`, matica a choreografia stredobodu |
| G64 | Compersion | nová otázka `emo_compersion` a zdroje v hlavičke |
| G65 | Partnerovo gesto/pohľad | `emo_hinty` prepísané na erotické znovuprepojenie |
| G66 | Výskumný problém 2+1 namiesto trojky | riešený rozdelením pozornosti, striedaním stredobodu a maticou |
| G67 | Opakovaný Face sitting — definícia | už spracované v `face-sitting.ts` a audite XLSM-006 |
| G68 | Face sitting — dve roly | už rozšírené a personalizované |
| G69 | Face sitting — moc/služba/pohltenie | už pokryté detailnými skupinami |
| G70 | Face sitting — mýty | už pokryté `tech_myty`, `fant_normalizacia`, vôňa a dych |
| G71 | Face sitting safety/hygiena | neprenesené; v XLSM-006 boli staré vsuvky odstránené |

## XLSM-008 — „Trojky — Popis…“ a kontrola duplicity

| Bod | Zdrojový obsah | Posúdenie |
|---|---|---|
| H01 | Trojka ako prvý krok do skupinových aktivít | nový rámec, zlúčený do konfigurácií a skupinovej progresie |
| H02 | Dôvody: novosť | už v `preco_trojka`; text rozšírený bez sľubu, že trojka posilní každý vzťah |
| H03 | Dôvody: stredobod | už pokryté, obohatené o ženské/mužské naladenie |
| H04 | Dôvera/komunikácia | generický kazateľský rámec neprenesený |
| H05 | Objavenie túžob | rozšírené o rovnaké pohlavie, voyeurizmus, službu a dominanciu |
| H06 | Jedna osoba stredobod | duplicita `troj_dynamika` |
| H07 | Rovnaká pozornosť | duplicita `troj_dynamika` |
| H08 | Dve osoby pre tretiu | duplicita `troj_dynamika` |
| H09 | Pozorovateľ | duplicita s osobitným postojom |
| H10 | Aktívna/pasívna rola | existujúce znenie opravené na osobné m/ž varianty |
| H11 | Dlhé erotické naladenie MMF pre ženu | nebolo identickou duplicitou; využité pri novom `tuzba_trojka` a ženských textoch |
| H12 | Žena ako kráľovná/stredobod | pokryté `mmf_stredobod_pocit`, mýtmi a textom túžby |
| H13 | MMF postoj ženy | duplicita `mmf_postoj` |
| H14 | MMF rozdelenie pozornosti | duplicita `mmf_rozdelenie` |
| H15 | Žena prijíma od druhého muža | duplicita `mmf_prijat` |
| H16 | Žena poskytuje druhému mužovi | nový explicitnejší dôkaz; už existovalo `mmf_poskytnut`, znenie ponechané |
| H17 | MMF všeobecné roly | zlúčené s `troj_dynamika` a `troj_roly` |
| H18 | Dlhé naladenie FMF | jedinečná textová vrstva; využitá v `tuzba_trojka` |
| H19 | Muž ako stredobod FMF | pokryté rozdelením a stredobodovým pocitom |
| H20 | Žena objavuje príťažlivosť k žene | pokryté ženským FMF úvodom, prijímaním a poskytovaním |
| H21 | FMF rozdelenie pozornosti | významová duplicita `fmf_rozdelenie` |
| H22 | Žena prijíma od ženy | duplicita `fmf_prijat_ona` |
| H23 | Žena poskytuje žene | duplicita `fmf_poskytnut_ona` |
| H24 | „Ako to urobiť príjemné“ — generické rady | podľa bodov 3, 5 a 6 neprenesené ako šablóna; nahradené konkrétnou choreografiou túžby |
| H25 | Aktivity partner–tretia osoba | významová duplicita, personalizované cez `g()` |
| H26 | Tabu checklist | zachovaný ako turn-off, nie všeobecný hranicový protokol |
| H27 | Vidieť partnera s treťou osobou | duplicita, doplnená dimenzia partnerovej túžby a compersion |
| H28 | Záver a tlak na otvorenie témy | reklamný nátlak neprenesený; záver normalizuje fantáziu aj neochotu realizovať ju |
| H29 | Mužský MMF dlhý scenár | nebol identickou duplicitou; použitý pri mužskom naladení a postoji k partnerkinej túžbe |
| H30 | Muž prijíma kontakt muža | duplicita `mmf_prijat`/`mmf_medzi_muzmi` |
| H31 | Muž poskytuje kontakt mužovi | explicitne overené v `mmf_poskytnut` |
| H32 | Muž sleduje partnerku ako stredobod | `mmf_stredobod_pocit`, `partner_tuzba_mmf` |
| H33 | Mužský FMF scenár | použitý pri osobnom mužskom texte túžby |
| H34 | FMF postoj muža | duplicita `fmf_postoj` |
| H35 | FMF pozornosť pre muža | duplicita `fmf_rozdelenie` |
| H36 | Záverečné opakovanie MMF/FMF škál | nezduplikované; rovnaké ID a hodnoty ostali kanonické |
| H37 | Interakcia medzi mužmi | nezduplikovaná; presná osobitná mužská mapa ostáva |
| H38 | Mýtus: fantázia znamená nespokojnosť | nový text `myty_trojka` |
| H39 | Mýtus: každý musí robiť všetko | nový text `myty_trojka` + matica |
| H40 | Mýtus: žiarlivosť ruší túžbu | nový text + `emo_compersion` |
| H41 | Mýtus: rovnakopohlavný dotyk určuje identitu | nový text bez hanby |
| H42 | Čo chce respondent sám | pôvodné MMF/FMF škály a matica |
| H43 | Ako reaguje na túžbu partnera | nová povinná druhá dimenzia `partnerova_tuzba` |
| H44 | Personalizácia muž/žena | všetky dotknuté otázky a možnosti prešli cez `g()`; odstránené lomkové tvary |
| H45 | Pevná šablóna | nepoužitá; štruktúra vznikla z výskumu témy, zdrojov, rolí, pozornosti, emócií a praxe |

## Rešerš a redakčný výsledok

Do hlavičky `trojky-skupiny.ts` boli zapísané akademické a komunitné zdroje. Z výskumu sa do témy premietli najmä: pocit vylúčenia, nerovnováha pozornosti, compersion, súbeh vzrušenia a žiarlivosti, príťažlivosť k páru ako celku a rozdiel medzi fantáziou a realizáciou. Všeobecná bezpečnosť, súhlas, STI, ochrana, hygiena, stop-signály a látky sa do témy nepreniesli.
