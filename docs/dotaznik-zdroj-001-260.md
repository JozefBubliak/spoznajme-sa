# Odseky P1–P260 — spracovanie do kódu

Rozsah je uzavretá obsahová dávka, nie uzavretie tém. Všetky odseky vrátane prázdnych a každá explicitná odpoveď majú záznam v sprievodnom JSON. Poradie je pôvodné, bez deduplikácie. Čísla P nie sú strany ani tematické hranice.

Zdroj: `zdroj.docx`, SHA256 `F9B5B3B747E2D439D50A56BA7ED3C6E34F5E6AFE6C305134EE1918C915BE5AA8`. Kód: `src/lib/dotaznik/obsah/`.

## Mapa významových blokov

| Odseky | Konkrétne bloky | Spracovanie |
|---|---|---|
| P1–4 | `predohra-naladenie:priprava`, `predohra-naladenie:pri_vzhlad_info` | Nadpisy a tematické označenia spracované v nadpise skupiny; číslovanie sa neprenáša ako otázka. |
| P5–8 | `predohra-naladenie:pri_telo` | Štyri položky starostlivosti zodpovedajú kupel/parfum/vlasy/intimne. |
| P9–13 | `predohra-naladenie:pri_oblecenie_ja`, `predohra-naladenie:pri_oblecenie_partner` | Rovnaké kategórie bielizen/kostym/pohodlne/nahota; odlíšené vlastné nosenie a videnie na druhom. |
| P14–15 | `predohra-naladenie:pri_vzhlad_info`, `predohra-naladenie:pri_sebavedomie` | Sebavedomie a vzhľad: vysvetľujúci text aj otázka. |
| P16–22 | `predohra-naladenie:pri_oblecenie_ja`, `predohra-naladenie:pri_oblecenie_partner` | Rodové návrhy nie sú zrkadlové: žena opisuje vlastné oblečenie, muž partnerkino. Oba smery dostupné obom; žiadna interpretácia starej spoločnej odpovede. |
| P23–32 | `dlhodoba-intimita:ini_uvod` | Nadpis, úvod a rodové označenia; význam vedenia/prijímania je v úvode, rodové nadpisy nie sú samostatné otázky. |
| P33–35 | `dlhodoba-intimita:ini_formy_prijimam` | Prijímanie: päť kategórií, všetky príklady z oboch verzií zlúčené. |
| P36–38 | `dlhodoba-intimita:ini_formy_poskytujem` | Poskytovanie: štyri formy a kombinácia podľa nálady; výraz naliehanie adaptovaný na vedenie po dohode bez nátlaku. |
| P39–41 | `dlhodoba-intimita:spo_pocit`, `dlhodoba-intimita:spo_pocit_ine` | Postoj k spontánnosti, vrátane vlastnej odpovede. |
| P42–44 | `dlhodoba-intimita:ini_kedy`, `dlhodoba-intimita:ini_kedy_ine` | Štyri časové/situačné možnosti a vlastná odpoveď. |
| P45–49 | `dlhodoba-intimita:ini_formy_prijimam` | Mužská verzia prijímania zlúčená s P33–34, masáž a jasné signály zachované. |
| P50–52 | `dlhodoba-intimita:ini_formy_poskytujem` | Mužská verzia poskytovania: budovanie atmosféry, vedenie, nové nápady a návrhy zachované. |
| P53–55 | `dlhodoba-intimita:spo_pocit`, `dlhodoba-intimita:spo_pocit_ine` | Samostatne zachované podľa nálady aj preferujem plánovanie; nie sú zlúčené s neistotou/nepohodlím. |
| P56–58 | `dlhodoba-intimita:ini_faza`, `dlhodoba-intimita:ini_faza_ine` | Fáza zbližovania oddelená od času dňa; doplnená aj možnosť iniciatívu nepreberať. |
| P59–64 | `dlhodoba-intimita:ini_tipy` | Tri experimenty zachované v samostatných odsekoch; doplnené dobrovoľné pozvanie a zmeniteľnosť dohody. |
| P65–75 | `dlhodoba-intimita:ini_dynamika_popis`, `dlhodoba-intimita:ini_dynamika` | Popis a štyri dynamiky; rodové opakovania zlúčené. |
| P76–83 | `dlhodoba-intimita:ini_aktivita` | Tri úrovne aktivity; mužské aj ženské znenie. |
| P84–87 | `dlhodoba-intimita:ini_situacie` | Tri scenáre zachované ako voľby bozk_bez_varovania/pevne_objatie/dotyky_pri_cinnosti. |
| P88–98 | `dlhodoba-intimita:ini_formy_popis`, `dlhodoba-intimita:ini_formy` | Všeobecné formy vzrušujúcej iniciatívy sú odlišné od otázok prijímam/poskytujem. Rovnaké rodové opakovania zlúčené. |
| P99–106 | `dlhodoba-intimita:ini_gesta` | Päť gest vrátane príkladov; rodové opakovania zlúčené. |
| P107–117 | `dlhodoba-intimita:spo_info`, `dlhodoba-intimita:spo_pocit`, `dlhodoba-intimita:spo_pocit_ine` | Text o novosti, rutine a slobode redakčne bez zaručeného účinku. Otázka/opcie opakujú P39–40, nie nový formulár. |
| P118–126 | `dlhodoba-intimita:spo_situacie` | Štyri kontexty, vrátane príkladov; pridané vysvetlenie súhlasu po prebudení a súkromia. |
| P127–135 | `predohra-naladenie:sig_info`, `predohra-naladenie:sig_nepriame` | Text, tri formy a vlastná odpoveď; signál neinterpretujeme ako automatický súhlas. |
| P136–141 | `predohra-naladenie:sig_reakcia`, `predohra-naladenie:sig_reakcia_ine` | Tri reakcie a vlastná odpoveď. |
| P142–147 | `predohra-naladenie:sig_frekvencia`, `predohra-naladenie:sig_frekvencia_ine` | Tri frekvencie a vlastná odpoveď. |
| P148–154 | `predohra-naladenie:sig_info`, `predohra-naladenie:sig_ocny_kontakt`, `predohra-naladenie:sig_ocny_kontakt_ine` | Tichý dialóg spracovaný v texte; tri postoje a vlastná odpoveď. |
| P155–159 | `predohra-naladenie:sig_pozvanie_formy` | Štyri stručné podnety rozvinuté do telesné/slovné/priame/hravé pozvanie. |
| P160–163 | `predohra-naladenie:sexting_intro` | Komunikácia, hlas, správa, pohľad a dotyk, očakávanie aj nadviazanie pri stretnutí; záruka realizácie nahradená dobrovoľnosťou. |
| P164–169 | `predohra-naladenie:sex_zaujem`, `predohra-naladenie:sex_zaujem_ine` | Tri postoje a vlastná odpoveď. |
| P170–175 | `predohra-naladenie:sex_intenzita`, `predohra-naladenie:sex_intenzita_ine` | Dve intenzity a vlastná odpoveď. |
| P176–182 | `predohra-naladenie:sex_formy_pouzivam` | Otázka explicitne na terajšie používanie kanálov; hlas/video/iba text a vlastná odpoveď. |
| P183–185 | `predohra-naladenie:sex_zaujem`, `predohra-naladenie:sex_formy_pouzivam` | Správa cez deň, fotografia a lístoček v taške explicitne zachované. |
| P186–190 | `predohra-naladenie:ini_dohoda`, `predohra-naladenie:ini_dohoda_info` | Tri dohodnuté formy; doplnené odlíšenie iniciátora od dominantnej roly. |
| P191–194 | `predohra-naladenie:ini_mimo_info`, `miesta-prostredie:osv_info` | Nadpis a vysvetlenie možností miesta, hračiek a podporných pomôcok. |
| P195–198 | `predohra-naladenie:ini_polohy_mimo` | Päť možností a Iné; slovo polohy opravené na miesta podľa skutočných odpovedí. |
| P199–202 | `predohra-naladenie:ini_pomocky_polohy` | Tri typy pomôcok, odmietnutie a Iné. |
| P203–208 | `miesta-prostredie:osv_info` | Celý význam vysvetlenia svetla a prostredia spracovaný; tvrdenie prehlbuje dôveru zmenené na môže pri rešpektovaní hraníc. |
| P209–214 | `miesta-prostredie:osv_typ`, `miesta-prostredie:osv_typ_ine` | Štyri typy osvetlenia a Iné. |
| P215–220 | `miesta-prostredie:osv_intenzita`, `miesta-prostredie:osv_intenzita_ine` | Dve intenzity a Iné. |
| P221–227 | `miesta-prostredie:dom_kupelna`, `miesta-prostredie:dom_kuchyna`, `miesta-prostredie:dom_obyvacka`, `miesta-prostredie:dom_spalna` | Štyri miestnosti a všetky príklady rozdelené do štyroch otázok; každá umožňuje Iné. |
| P228–236 | `miesta-prostredie:osv_poriadok_dolezitost`, `miesta-prostredie:osv_poriadok_dolezitost_ine`, `miesta-prostredie:osv_priprava_detaily`, `miesta-prostredie:osv_detaily_info` | Opravený nesúlad zdrojovej otázky a možností: dôležitosť zvlášť, čistota a dekorácie samostatne kombinovateľné. Iné na oboch osiach. |
| P237–243 | `miesta-prostredie:osv_pohodlie`, `miesta-prostredie:osv_materialy` | Mäkké materiály vrátane hodvábu/saténu a optimálna teplota ako voľby; Iné aj pôvodný voľný text zostávajú. |
| P244–244 | `miesta-prostredie:pri_na_dosah`, `miesta-prostredie:osv_detaily_info` | Pripravené pomôcky a hračky sú v pri_na_dosah (lubrikant/ochrana/uterak/voda/hracky). |
| P245–245 | `miesta-prostredie:osv_teplota`, `miesta-prostredie:osv_pohodlie`, `miesta-prostredie:osv_detaily_info` | Teplota a klimatizácia explicitne v otázke aj texte. |
| P246–246 | `miesta-prostredie:osv_vizualne_podnety`, `miesta-prostredie:osv_detaily_info` | Fotografie a obrazy sú explicitné možnosti. |
| P247–255 | `miesta-prostredie:ext_info`, `miesta-prostredie:ext_skusenost_spokojnost`, `miesta-prostredie:ext_ochota`, `miesta-prostredie:ext_ochota_ine` | Päť významov pôvodnej zmiešanej škály rozdelených na skúsenosť/spokojnosť a aktuálnu ochotu; Iné zachované. Nová ochota používa štyri používateľom určené možnosti bez migrácie starých dát. |
| P256–260 | `miesta-prostredie:ext_miesta_prehlad` | Kúpeľňa/príroda/auto/swingers klub a Iné v jednom prehľade; podrobnosti existujú v ďalších blokoch. |

## Kontrola jednotlivých odpovedí

191 explicitných volieb 🔘 a 42 polí ✍️ v pôvodných rodových/opakovaných verziách má samostatnú väzbu v JSON. Pri jedno-výberových otázkach je vlastná odpoveď samostatný textový blok: renderer tam `inePovolene` nezobrazuje. Pri checklistoch funguje existujúce pole `ine`. Počet zahŕňa opakovania; nie je to počet nových otázok.

## Redakčné rozhodnutia a staré dáta

- Rodové verzie významovo zjednotené len tam, kde sa pýtajú na to isté. Rozdielne príklady a odpovede zachované. Oba smery oblečenia a iniciatívy ponúknuté obom pohlaviam.
- Pôvodné `pri_oblecenie` a `osv_upravenost` už nie sú zobrazované; nahradené otázkami s novými ID. Ich historické dáta sa nemenia ani nemapujú odhadom. Zmena je zámerná: ich odpoveď neurčuje oddelené významy.
- Nové otázky o skúsenosti/ochote mimo spálne majú nové ID. Už to robíme a som spokojný/á je skúsenosť, nie stupeň ochoty. Nová ochota má štyri používateľom schválené možnosti. Žiadna plošná migrácia škál.
- „Naliehanie“ pri iniciatíve adaptované na dohodnuté vedenie bez nátlaku. Poetické záruky realizácie fantázie a zlepšenia dôvery upravené na možnosť; zachovaný zmysel vysvetlení, nie nepravdivý prísľub.
- Nadpisy, označenia muža/ženy, ikony a čísla sú štruktúra, nie ďalšie otázky. Prázdne odseky ostávajú evidované. Krátke vecné položky (klimatizácia, obrazy, pripravené hračky) sú explicitne spracované.
- Nové možnosti „žiadne“, „nepreberám“, zmiešaná skúsenosť a vysvetlenia dobrovoľnosti sú označené redakčné doplnenia, nie doslovný prepis.

## Externé overenie a miestny výskum

Prečítané index a súhrn 05-komunikacia-a-spokojnost z používateľovho priečinka `C:/Users/-A-L-O-H-A-/OneDrive/Documenten/dotazník/vyskum`. Ich značky pokrytia nie sú dôkazom. Z primárneho lokálneho exportu PMC7058563 prečítané úvodné vymedzenie a limity štúdie: prierezové dáta neoprávňujú tvrdiť príčinnosť ani prenášať výsledok jedného respondenta na oboch partnerov. Nepreberáme neoverené percentá ani označenie inej štúdie za meta-analýzu zo súhrnu.

- Vowels & Mark (2020), [Strategies for Mitigating Sexual Desire Discrepancy in Relationships](https://doi.org/10.1007/s10508-020-01640-y), miestny primárny export `original/PMC7058563-desire-discrepancy-17-strategies.md`: kontext komunikácie a rozdielnej chuti; nepoužitý ako dôkaz zaručeného účinku našich rád.
- [RAINN – Consent 101](https://rainn.org/5-rules-for-getting-consent/): vyhľadaný oficiálny zdroj podporuje priebežný súhlas a neodvodzovanie súhlasu z oblečenia/flirtu. Priame načítanie stránky timeout; použitá iba dostupná informácia výsledku vyhľadávania. Na tomto základe stručné doplnenia pri gestách a iniciatíve.

## Rozsah overenia

Kontrola mapy overuje 260/260 odsekov, všetky 🔘 a ✍️, existenciu referencovaných blokov/možností, jedinečné ID v téme a dostupnosť vlastnej odpovede v existujúcom rendereri. Významové priradenie vykonal Codex čítaním; automatická kontrola sama nepreukazuje sémantickú správnosť. Kontrola typov a diff sa zaznamená v spoločnom denníku. Bez nasadenia a bez čítania P261+.

Doplnenie k historickým dátam: aj neurčitá otázka sex_formy bola nahradená novým ID sex_formy_pouzivam, keďže nové znenie jednoznačne zisťuje terajšie používanie. Staré odpovede sa nepreinterpretujú ako skúsenosť. Nejde o migráciu ani zmazanie dát.