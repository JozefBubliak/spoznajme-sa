# Zdroj P261–P440 — obsahové spracovanie

Súvisle prečítaná a implementovaná dávka; témy sa neuzatvárajú. P441+ nečítané. Čísla P sú 1-based w:body//w:p v pôvodnom DOCX, vrátane prázdnych odsekov. SHA256 zdroja nezmenený oproti dávke 1–260. Podrobný JSON uchováva pôvodné znenie každého odseku, každej odpovede a priradenie ku kódu.

| Odseky | Bloky v src/lib/dotaznik/obsah | Spracovanie |
|---|---|---|
| P261–268 | `miesta-prostredie:ext_techniky` | Tri podoby mimo spálne: rýchlovka, zmysly (vrátane teploty), dotyk/bozk/šepot; Iné. Rýchlovka nie je návod na verejný sex. |
| P269–275 | `miesta-prostredie:ext_novost_info`, `miesta-prostredie:ext_nove_miesta` | Záujem o konkrétne nové miesta: les/pláž, hotel/apartmán, kúpeľňa/sprcha. Obe rodové verzie rovnaký význam; jedna otázka s rovnakými hodnotami. |
| P276–282 | `miesta-prostredie:ext_prostredie_najviac`, `miesta-prostredie:ext_prostredie_najviac_ine` | Odlišná otázka na najlákavejšie prostredie: hory, romantický hotel, sviečky/nové obliečky doma. Neredukovať na predchádzajúci zoznam miest. |
| P283–287 | `miesta-prostredie:ext_frekvencia`, `miesta-prostredie:ext_frekvencia_ine` | Tri frekvencie vrátane príkladu raz mesačne a vlastná odpoveď. |
| P288–295 | `miesta-prostredie:ext_pomocky_info`, `miesta-prostredie:ext_pomocky_skusenost`, `miesta-prostredie:ext_pomocky_ochota`, `miesta-prostredie:ext_pomocky_ine` | Päť významov rozdelených na skúsenosť/spokojnosť a súčasnú ochotu. Nová štvorica chcem/rád ak chceš/možno/nie; starý ext_diskretne_pomocky ostáva bez premapovania dát. |
| P296–303 | `miesta-prostredie:ext_dobrodruzstvo_dolezitost`, `miesta-prostredie:ext_dobrodruzstvo_dolezitost_ine`, `miesta-prostredie:ext_dovera_info` | Štyri postoje, Iné a text o dôvere/rutine. Dôvera chápaná ako osobne vnímaný prínos, nie dokázaný účinok dobrodružstva. |
| P304–310 | `miesta-prostredie:ext_miesta_prehlad`, `miesta-prostredie:ext_info` | Významovo zhodné s P256–260; odkazy na ten istý blok a každú možnosť, bez novej duplicitnej otázky. |
| P311–319 | `miesta-prostredie:ext_techniky` | Opakovanie P264–268 so všetkými tromi rovnakými možnosťami a Iné. |
| P320–327 | `miesta-prostredie:net_scenare_zdroj`, `miesta-prostredie:net_predstava_ramec` | Všetkých šesť možností aj maskovaná párty z podnadpisu: kino/dotyky, park/napätie, hotel/jacuzzi/krb/dekorácie, párty/klub, výťah/strecha, kancelársky roleplay. Redakčne odlíšené predstavy a realizácia bez nechcených svedkov. |
| P328–337 | `miesta-prostredie:ext_skusenost_spokojnost`, `miesta-prostredie:ext_ochota`, `miesta-prostredie:ext_ochota_ine` | Opakovanie P250–254; päť významov už mapovaných na skúsenosť a ochotu, nič nepremigrované. |
| P338–340 | `miesta-prostredie:hot_typ_priestoru`, `miesta-prostredie:ext_nove_miesta`, `miesta-prostredie:ext_miesta_prehlad`, `miesta-prostredie:net_scenare_zdroj`, `miesta-prostredie:net_predstava_ramec` | Krátke položky explicitne pokryté vrátane chaty a bezpečnej/dovolenej realizácie v prírode. |
| P341–343 | `miesta-prostredie:pri_rusive_prvky`, `miesta-prostredie:pri_na_dosah` | Organizácia: odstránenie rušenia, pripravené uteráky/osušky a občerstvenie. Konkrétne príklady rušenia sú redakčné rozvinutie krátkej poznámky. |
| P344–354 | `zmyslova-hra:slu_hudba_info`, `zmyslova-hra:slu_hudobny_zaner`, `zmyslova-hra:slu_hudobny_zaner_ine` | Text o rytme a atmosfére; R&B/jazz, klavír, rytmické melódie, ambient/relaxačné zvuky, bez hudby a Iné. Nie iba všeobecná otázka na hudbu na pozadí. |
| P355–356 | `miesta-prostredie:osv_typ` | Lampy a sviečky explicitne v možnosti tlmene. |
| P357–360 | `zmyslova-hra:zrak`, `zmyslova-hra:zra_co` | Nadpisy a stručné vizuálne podnety: odhaľujúci aj zahaľujúci odev, striptíz. |
| P361–366 | `digitalna-intimita:porno`, `digitalna-intimita:por_info` | Úvod k spoločnému sledovaniu: komfort, svetlo/vôňa, držanie rúk a objatie, zvedavosť, fantázie/rozhovor, pomalé objavovanie a hranice. Poetické záruky účinku a realizácie nepreberané ako fakty. |
| P367–372 | `digitalna-intimita:por_pocit_predstava`, `digitalna-intimita:por_pocit_predstava_ine` | Pocit pri predstave nie je to isté ako skúsenosť por_spolocne. Tri pôvodné odpovede, mužská/ženská neistota a Iné. |
| P373–380 | `digitalna-intimita:por_typ` | Šesť typov/odmietnutie, vrátane realistické, príbeh/estetika, amatérske a fantázie/fetiše. Iné pridané. |
| P381–388 | `digitalna-intimita:por_ocakavanie`, `digitalna-intimita:por_ocakavanie_ine` | Štyri očakávania vrátane len zvedavosti bez zaradenia do intímneho života. Iné pridané. |
| P389–396 | `digitalna-intimita:por_hranice_jasnost`, `digitalna-intimita:por_hranice_jasnost_ine` | Nová otázka o jasnosti hraníc: viem / potrebujem rozhovor / nezáujem; rodové varianty a Iné. |
| P397–404 | `digitalna-intimita:por_priebeh`, `digitalna-intimita:por_priebeh_postoj` | Päť spôsobov zachovaných vrátane vína/pohodlia a sólo/vzájomnej masturbácie; neviem ale otvorený a nepáči sa oddelené do postoja, aby sa nemiešali s konkrétnymi spôsobmi. Iné pri por_priebeh. |
| P405–414 | `zmyslova-hra:slu_hlas_info`, `zmyslova-hra:slu_verbalne_prikazy`, `zmyslova-hra:slu_verbalne_prikazy_ine` | Text o príkazoch, šepote a dohodnutých zákazoch, štyri postoje vrátane jemného vedenia a odmietnutia, vlastná odpoveď. Bez tvrdenia, že autorita musí vzrušovať každého. |
| P415–420 | `zmyslova-hra:slu_povzbudenie`, `zmyslova-hra:slu_povzbudenie_ine` | Počúvanie povzbudenia: áno / možno ak prirodzené / ticho; nie ekvivalent vlastného hovorenia. |
| P421–427 | `zmyslova-hra:slu_pouzivat_slova`, `zmyslova-hra:slu_pouzivat_slova_ine` | Vlastné používanie slov, príkazov, oslovení: áno / možno skúsiť / nie, rodové varianty a Iné. |
| P428–430 | `zmyslova-hra:slu_co`, `zmyslova-hra:slu_verbalne_prikazy`, `zmyslova-hra:slu_zvuky` | Šepot, hlasové príkazy, hudba na pozadí a vlastné zvuky explicitne pokryté. |
| P431–435 | `zmyslova-hra:cuch`, `zmyslova-hra:cuc_info` | Prirodzená vôňa kože, dychu a vlasov, autenticita a blízkosť opísané ako osobné vnímanie, nie zaručené afrodiziakum. Opravené aj nepodložené účinky konkrétnych olejov v existujúcom úvode. |
| P436–440 | `zmyslova-hra:cuc_prirodzena_postoj`, `zmyslova-hra:cuc_prirodzena_postoj_ine` | Päť odlišných odpovedí (milujem/vzrušuje/parfum/situácia/nevenujem pozornosť) a Iné. Milujem nezlúčené s vnímam ako afrodiziakum; obe sú subjektívne. |

## Úplnosť tejto dávky

180 odsekov, 164 explicitných volieb 🔘 a 40 polí ✍️ vrátane rodových opakovaní. Všetky majú konkrétne ciele; počet nie je počet nových otázok. Rodové varianty sú buď neutrálne spoločné znenie, alebo objekt m/z s rovnakými hodnotami. Nové otázky majú nové ID; staré typy ani hodnoty sa nepreinterpretujú. Samostatné textové bloky zabezpečujú Iné pri type jeden, kde inePovolene renderer nepodporuje.

## Redakčné doplnenia

Výskum nenahrádza otázky ani odpovede v zdroji. Zdroje a rozhodnutia:

- [Planned Parenthood – Porn](https://www.plannedparenthood.org/learn/teens/sex/porn), oficiálny výsledok vyhľadávania s obsahom načítaný 2026-09-18 (priame open 403). Film nie je vzor skutočnej intimity ani porovnávania tiel; stručne doplnené do por_info. Nepreberaná vekovo špecifická rada pre tínedžerov, produkt je pre dospelé páry.
- [RAINN – Consent 101](https://rainn.org/5-rules-for-getting-consent/), dostupný oficiálny výsledok: dobrovoľná priebežná dohoda bez tlaku. Použité pri hlasových príkazoch, voľbe aktivít a odlíšení predstavy od realizácie.
- [NCCIH – Aromatherapy](https://www.nccih.nih.gov/health/aromatherapy), stránka priamo prečítaná 2026-09-18: nepodporuje konkrétne zaručené erotické účinky jazmínu/ylang-ylangu/santalu, ktoré tvrdil pôvodný repo úvod. Preto cuc_info tieto účinky už neprezentuje ako fakt; nevyvodzujeme z toho dôkaz neúčinnosti ani nereprodukujeme zdravotné odporúčania. Subjektívna odpoveď vnímam ako afrodiziakum zostáva.
- Miestny vyskum/05-komunikacia-a-spokojnost.md, časť dirty talk a použitie pre dotazník: použitá ako navigačný podklad, nie ako overený dôkaz uvádzaných percent. Neoverené štatistiky nedoplnené.

Nové príklady rušenia, možnosti inej skúsenosti/žiadnej skúsenosti a rámce súkromia sú redakčné doplnenia. Víno zo zdroja ostáva voliteľný príklad atmosféry, nie podmienka ani odporúčanie na zníženie zábran. Zoznam verejných miest je evidencia predstáv s rozlíšením realizácie, nie praktický návod obchádzať súkromie iných. Neuvádzame právne závery pre konkrétnu krajinu.

## Kontrola

Skript verify-dotaznik-261-440.cjs kontroluje nadväznosť, všetky odpovede a Iné, dostupnosť cieľov a oboch rodových textov. Významové priradenie je výsledkom čítania, automatické počty ho samy nedokazujú. Finálne typové a diff overenie sa zapisuje do progress dokumentu.
