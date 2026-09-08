# Dotazník intímnych preferencií — návrh stromu (v1)

> **Náš vlastný návrh.** Štruktúru z pôvodných „strom" dokumentov nepreberáme — tie boli
> len náznak / mišmaš a slúžia už len ako **zdroj obsahu pre L4** (konkrétne položky).
>
> **Cieľ dotazníka:** zmapovať, čo sa každému partnerovi **páči / nepáči / je neutrálne**,
> bez hodnotenia a bez zahanbenia (princíp Double Blind — zhoda sa ukáže len keď chcú obaja).
>
> Stav: **návrh na revíziu.** Kód (`src/lib/dotaznik/strom.ts` + stránky) sa vygeneruje až po odsúhlasení.

---

## 1. Úrovne stromu (koľko „levelov")

| Úroveň | Čo to je | Príklad | Počet |
|---|---|---|---|
| **L1 — Doména** | 9 veľkých blokov, poradie od jemných po citlivé | „Telo, dotyk a zmysly" | **9** |
| **L2 — Modul** | samostatná karta so screeningom „Chcem to skúmať? Áno / Ešte nie / Nie" | „Orálna stimulácia penisu" | **54** |
| **L3 — Okruh** | pod-oblasť v rámci modulu | „Hĺbka a hrdlo" | **~210** |
| **L4 — Položka** | konkrétna praktika / variant = **jednotka hodnotenia** | „hlboké hrdlo s držaním za hlavu" | seed **~540**, cieľ 1200+ |

**Ortogonálne osi** (neťahajú sa ako vetva, ale platia pri L3/L4):

| Os | Hodnoty |
|---|---|
| **Rola** (len ⇄ moduly) | *prijímam* · *poskytujem* · *oboje* — zrkadlové otázky sa počítajú zvlášť |
| **Postoj (škála L4)** | Páči sa mi · Skôr áno · Neutrálne · Skôr nie · Nie (hranica) · Neskúšal(a) – zaujíma ma |
| **Parametre** | tempo · tlak/intenzita · hĺbka · trvanie · poloha · komunikačný štýl |
| **Kontext** | kde · kedy · s čím kombinované · spontánne / plánované / rituál |
| **Semafor hraníc** | 🟢 áno · 🟡 možno / za podmienok · 🔴 tvrdá hranica |

**Sekčná kostra modulu** (ako sa modul prechádza — 17 sekcií, drží `strom.ts`, nie tento dokument):
Kontext · Základné parametre · Hranice (🟢🟡🔴) · Naladenie · Chcem? · Skúsenosť · Preferencie ·
Techniky · Scenáre (S0/S1/S2) · Zrkadlo rolí* · Uvoľnenie · Keď nevieme ako na to · Pocity ·
Bezpečne · Rizikové praktiky* · Párový súhrn · Session card.  *(len ak relevantné)*

### Legenda značiek
`⇄` zrkadlový modul (rola prijímam/poskytujem) · `🔒` rizikové (bezpečnostný rámec + kontraindikácie) ·
`🌶️1 / 🌶️2 / 🌶️3` citlivosť (jemné / stredné / citlivé–tabu) · `★` odporúčané do **Tier 1 (Warm)**.

---

## 2. Prehľad domén (L1)

| # | Doména | Modulov | Citlivosť | Tier 1 |
|---|---|---|---|---|
| A | Naladenie a rámec | 5 | 🌶️1 | 5 ★ |
| B | Telo, dotyk a zmysly | 7 | 🌶️1–2 | 4 ★ |
| C | Orál | 4 | 🌶️2 | 2 ★ |
| D | Penetrácia a priebeh aktu | 7 | 🌶️2 | 3 ★ |
| E | Pomôcky a hračky | 6 | 🌶️2 | 2 ★ |
| F | Moc, rola a scéna | 8 | 🌶️3 | 0 |
| G | Fetiše a špecifické záujmy | 6 | 🌶️3 | 0 |
| H | Otvorenosť a ďalší ľudia | 8 | 🌶️3 | 0 |
| I | Hranice, zdravie a telo | 3 | 🌶️1–2 | 3 ★ (povinné) |
| | **Spolu** | **54** | | **19** |

---

# L1 · A — NALADENIE A RÁMEC  🌶️1

*Všetko „pred" a „okolo" fyzického. Bez tejto domény zvyšok nefunguje.*

## A1 · Mentálna príprava a túžba  ★
- **A1a Vnútorné naladenie** — fantazírovanie a vizualizácia scén; spomínanie na predošlé zážitky; erotické príbehy v mysli; mentálne hry so „zakázaným"; mindfulness a dych pred sexom
- **A1b Práca s blokmi** — uvoľnenie stresu; hanba „nie som dosť dobrý/á"; tlak na výkon; telo-image počas aktu; rozptýlená myseľ / „to-do list v hlave"
- **A1c Libido a chuť** — úroveň túžby; rozdiel medzi nami; spontánna vs responzívna túžba; čo chuť spúšťa; čo ju spoľahlivo zabíja
- **A1d Brzdy a spúšťače (dual control)** — kontexty, ktoré zapínajú; kontexty, ktoré vypínajú; strach z následkov; hnev/nevyriešený konflikt; únava; alkohol

## A2 · Iniciácia a signalizácia  ★
- **A2a Kto a ako začína** — striedanie iniciácie; vždy jeden; dohodnutý signál; „nikdy neiniciujem, chcem byť zvedený/á"
- **A2b Neverbálne signály** — pohľady; dotyk; priblíženie; obliekanie/vyzliekanie; poloha v posteli
- **A2c Verbálne pozvanie** — priame („chcem ťa"); náznakom; hravé; správa cez deň; kód/heslo
- **A2d Odmietnutie s láskou** — ako povedať „nie teraz"; čo potrebujem počuť pri odmietnutí; náhradná blízkosť bez sexu
- **A2e Hravé formy** — erotická fotka; lístoček; hra/stávka; „date night" ako signál

## A3 · Prostredie a atmosféra  ★
- **A3a Priestor** — spálňa; iná izba; kúpeľňa; kuchyňa/gauč; vonku (legálne); auto; hotel/chata
- **A3b Zmysly priestoru** — svetlo (tma / sviečky / plné svetlo); hudba; vôňa; teplota; posteľná bielizeň
- **A3c Súkromie a rušenie** — deti doma; tenké steny; telefóny preč; časový tlak vs „máme celú noc"
- **A3d Príprava priestoru** — pripravené pomôcky/uterák; nápoj; playlist; „režisérska" príprava vs spontánne

## A4 · Predohra a stupňovanie  ★
- **A4a Dĺžka a tempo** — quickie; stredná; dlhá „slow" predohra; viac krátkych vĺn počas dňa
- **A4b Slow sex prvky** — tease & denial; odkladanie penetrácie; sústredenie na dych; synchronizácia
- **A4c Poradie** — od jemného k dravému; striedanie; „preskočiť rovno na…"; čo musí prísť ako prvé
- **A4d Naladenie po konflikte** — „zmierovací" sex áno/nie; potreba najprv doriešiť; vedomé prepnutie režimu

## A5 · Komunikácia počas a po  ★
- **A5a Počas aktu** — ticho; zvuky a dych; slovné pokyny; pochvala/povzbudenie; smiech je OK
- **A5b Spätná väzba** — priebežná; až po akte; dohodnuté signály „viac/menej/stop"
- **A5c Po akte** — objatie a rozhovor; ticho; usnúť; sprcha; „debrief" čo bolo super / čo inak
- **A5d Aftercare (jemná úroveň)** — čo potrebujem po bežnom sexe; ako dlho; slová vs dotyk vs samota

---

# L1 · B — TELO, DOTYK A ZMYSLY  🌶️1–2

*Nepenetratívne. Väčšina párov tu má najviac „skrytého" priestoru.*

## B1 · Bozky  ★  ⇄
- **B1a Typy** — jemné „motýlie"; francúzsky/hlboký; hryzenie pier; sanie pier
- **B1b Zóny** — pery; krk a kľúčna kosť; uši; brucho; vnútorné stehná; chrbát; prsty/dlaň
- **B1c Intenzita a tempo** — pomalé a zmyselné; striedavé; dravé; od jemných k hrubým
- **B1d Bozk ako vedenie** — pevný úchop hlavy/vlasov; „povedz, že ma chceš, potom ťa pobozkám"; bozk ako začiatok dominancie
- **B1e Kontext** — na privítanie; počas dňa bez pokračovania; len počas sexu; s očným kontaktom

## B2 · Dotyky, hladenie a maznanie  ★  ⇄
- **B2a Jemné dotyky** — prechádzanie prstami po tvári/vlasoch; obťahovanie pier; kreslenie tvarov na koži; nechtami po chrbte
- **B2b Tlak a stisk** — striedanie hladenia a pevného stisku; „mačací pazúrik"; hrubšie chytenie; plesknutie po zadku (jemné)
- **B2c Zóny tela** — krk/ramená; chrbát/kríže; zadok/stehná; lýtka/chodidlá; brucho; vnútro lakťov a kolien
- **B2d Objatia a blízkosť** — dlhé objatie; „lyžičky"; hlava na hrudi; prepletené nohy; váha tela na mne
- **B2e Kontext maznania** — nesexuálne počas dňa; ako predohra; po sexe; pri usínaní; pri sledovaní filmu

## B3 · Masáž  ⇄  🌶️2
- **B3a Nesexuálna** — chrbát; nohy; hlava/vlasy; ruky; s olejom; teplé uteráky
- **B3b Zmyselná** — celotelová s prechodom k erotogénnym zónam; „nedotýkať sa genitálií, kým nepoviem"
- **B3c Erotická** — priamy prechod ku genitáliám; yoni/lingam masáž; masáž hrádze
- **B3d Nástroje** — ruky; olej; pierko/rukavica; masážna hlavica; horúci vosk (nízkoteplotný 🔒)

## B4 · Zmyslová hra  🌶️2  🔒(deprivácia)
- **B4a Zrak** — zaviazané oči; striptease; sledovanie v zrkadle; vizuálne podnety; „pozeraj sa mi do očí"
- **B4b Sluch** — šepot; dirty talk (jemný); hudba; sluchová deprivácia (slúchadlá/biely šum) 🔒
- **B4c Čuch** — prirodzená vôňa tela a pohlavia; parfum/olej; feromóny; „vôňa po sexe"
- **B4d Chuť** — bozky s ochutnávaním; jedlo (ovocie, šľahačka, med); nápoj; telesné tekutiny (opt-in, viď G3)
- **B4e Hmat / teplota / textúra** — ľad; teplý olej; hodváb/koža/latex na koži; pierko; vibrácia; striedanie teplôt
- **B4f Layering a deprivácia** — kombinácia (oči zaviazané + zvuk + dotyk); postupné odoberanie zmyslov 🔒

## B5 · Prsia, bradavky a torzo  ★  ⇄
- **B5a Techniky** — krúživé pohyby okolo bradaviek; jemné štípanie; sanie; hryzenie; ťahanie
- **B5b Intenzita** — jemná; stredná; ostrá (svorky 🔒 — patrí aj do F)
- **B5c Zóny** — bradavky; podprsie; kľúčna kosť; boky; brucho; „happy trail"
- **B5c Citlivosť a orgazmus** — stimulácia až k orgazmu z bradaviek; precitlivenosť pred menštruáciou/po pôrode

## B6 · Manuálna stimulácia (ruky a prsty)  ★  ⇄
- **B6a Vulva/klitoris** — krúženie; hore-dole; „písanie abecedy"; nepriamo cez pysky; tlak dlaňou; s lubrikantom; kombinácia s penetráciou prstami
- **B6b G-oblasť / vnútorné body** — „come hither" pohyb; tlak; rytmus; 1–2–3 prsty; kombinácia s klitorisom (obojručne)
- **B6c Penis** — úchop a rytmus; točenie na hlavičke; „twist"; obojručne; s lubrikantom; tempo edging; „nasucho" vs mokro
- **B6d Semenníky a hrádza** — jemné držanie; ťahanie; tlak na hrádzu; „perineum press" pri orgazme
- **B6e Vzájomne / spoločne** — vzájomná masturbácia; „ukáž mi, ako to robíš sám/sama"; ruka na ruke (vedenie)
- **B6f Sledovanie (solo pred partnerom)** — masturbovať a byť sledovaný/á; sledovať partnera; bez dotyku

## B7 · Nepenetratívne trenie  ⇄  🌶️2
- **B7a Frottage / „dry humping"** — cez oblečenie; cez bielizeň; nahí bez penetrácie
- **B7b Intercrural / stehná** — penis medzi stehnami; s lubrikantom; poloha
- **B7c Tribbing / vulva na vulve / na tele** — na stehno; na zadok; na telo partnera
- **B7d Grinding** — sedieť na stehne/kolene; na tvári (viď C4); rytmické trenie do orgazmu

---

# L1 · C — ORÁL  🌶️2

## C1 · Orál na vulvu a klitoris  ★  ⇄
- **C1a Techniky jazyka** — široké olizovanie; hrot jazyka; krúženie; „abeceda"; bzučanie/vibrácia jazykom; sanie klitorisu; striedanie
- **C1b Tempo a rytmus** — pomalé budovanie; stály rytmus (nemeniť tesne pred orgazmom); vlny; rýchle finále
- **C1c Kombinácie** — s prstami vo vnútri; s prstom v aných; s vibrátorom; držať pysky roztiahnuté; ruka na bruchu/tlak
- **C1d Poloha** — partner leží; na kolenách nad tvárou (→ C4); z boku; nohy na pleciach; state (na kraji postele)
- **C1e Dokončenie a po** — orál až do orgazmu; prestať tesne pred (edging); pokračovať po orgazme (overstim) áno/nie; viacnásobný
- **C1f Rámce** — hygiena/sprcha pred; prirodzená chuť; počas menštruácie (opt-in); bariéra (koferdam)

## C2 · Orál na penis  ★  ⇄
- **C2a Techniky** — sanie; jazyk na uzdičke/hlavičke; krúženie; ruka + ústa súčasne; „hollow cheeks"; pomalé vs rýchle
- **C2b Hĺbka a hrdlo** — plytko; stredne; hlboké hrdlo; držanie za hlavu (partner vedie) 🔒; dávivý reflex — riešenie/limit
- **C2c Semenníky a okolie** — lízanie/sanie semenníkov; hrádza; „ballad" (ruky + ústa + semenníky)
- **C2d Poloha** — partner leží; kľačí nad tvárou; state; auto/„na kolenách"; face-fucking (opt-in 🔒)
- **C2e Dokončenie** — dokončiť ústami; prehltnúť / vypľuť / na telo / na tvár (opt-in); prestať pred a dokončiť inak; edging
- **C2f Rámce** — hygiena; chuť; bariéra (kondóm na orál)

## C3 · Anilingus („rimming")  ⇄  🔒  🌶️3
- **C3a Techniky** — vonkajšie olizovanie; krúženie; penetrácia jazykom; s prstom súčasne; striedanie s vulvou/penisom
- **C3b Roly** — dávam; dostávam; oboje
- **C3c Rámce** — dôkladná hygiena/klystír; bariéra (koferdam); nikdy z aných späť k vulve; riziko a limity

## C4 · Kombinácie a polohy s dynamikou  ⇄  🔒(face-sitting/dych)
- **C4a 69** — klasické; z boku; kto je „hore"; nerovnaká pozornosť je OK
- **C4b Face-sitting** — hover (bez váhy); „trón" (váha na kolenách); plný kontakt s oporou; plná váha 🔒; reverse; side-saddle
- **C4c Dynamika moci pri oráli** — partner vedie tempo rukou vo vlasoch; príkazy; „uctievanie"; edging pod kontrolou
- **C4d Dych pri face-sittingu** — žiadne obmedzenie (default); krátke „smother" momenty 🔒 (opt-in, safe signál)

---

# L1 · D — PENETRÁCIA A PRIEBEH AKTU  🌶️2

## D1 · Vaginálna penetrácia  ★  ⇄(prsty/hračka vs penis)
- **D1a Nábeh** — lubrikácia; pomalý vstup; „počkaj, kým poviem"; plytké ťahy na začiatku; dýchať
- **D1b Techniky** — plytké vs hlboké; „angling" (uhol na prednú stenu); „rocking"/grinding (bez ťahov); krúženie; striedanie hĺbky; kombinácia s klitorisom
- **D1c Hĺbka a náraz** — plytká hra; stredná; hlboko; naráž na krčok — príjemné / nepríjemné / limit
- **D1d Čím** — prsty (1–2–3); penis; dildo; strap-on (⇄ rola); striedanie
- **D1e Rytmus** — stály; zrýchľovanie; „stop-start"; vlny; „nehýb sa, len tak zostaň"

## D2 · Análna penetrácia  ⇄  🔒  🌶️3
- **D2a Príprava** — hygiena/klystír; veľa lubrikantu; postupné otváranie (prst → 2 → plug → viac); relaxácia/dych; „nikdy netlač ty, ja sa nasadím"
- **D2b Čím** — prst(y); plug (nosenie pred aktom); dildo; penis; strap-on (⇄)
- **D2c Techniky a tempo** — veľmi pomaly; zastať pri odpore; plytko dlho; hlboko až keď poviem; žiadne prekvapenia
- **D2d Polohy pre anál** — na bruchu; „doggy"; na chrbte (vidím ťa); na boku; ja hore (mám kontrolu)
- **D2e Bezpečnosť** — nič z aných späť k vulve; hračky so stopérom/základňou; bolesť = stop, nie „pretlačiť"; frekvencia a regenerácia

## D3 · Polohy  ★
- **D3a Základné** — misionárska (+ varianty: nohy hore/na pleciach/prekrížené); „doggy"; jazdkyňa; reverzná jazdkyňa; lyžičky; state
- **D3b Prístup a kontakt** — očný kontakt vs bez; hĺbka podľa polohy; prístup ruky ku klitorisu; bozkávanie počas
- **D3c Kontrola** — kto vedie pohyb; „pin down" (pritlačiť ruky); ja úplne pasívny/a; striedanie kto je hore
- **D3d Komfort a ergonómia** — vankúš pod boky; opora o čelo postele; kolená/chrbát/zápästia; dĺžka v jednej polohe
- **D3e Nábytok a priestor** — posteľ; kraj postele; stolička; sprcha/vaňa 🔒(šmykľavé); stôl; podlaha; „sex nábytok"/klin

## D4 · Tempo, rytmus a „choreografia"  ★
- **D4a Krivka** — pomaly a stále; postupné stupňovanie; vlny (rýchlo–pomaly); dlhá plošina; rýchle finále
- **D4b Edging a stop-start** — koľko „takmer"; kto rozhoduje o pauze; predĺžená plošina; „ruined" (dráždiť a prestať)
- **D4c Prechody** — plynulé vs „prestávky na zmenu polohy"; orál → penetrácia → orál; ruka medzi
- **D4d Pauzy** — pauza na vodu/dych; „reset" keď je to príliš; pauza ako súčasť hry (tease)

## D5 · Orgazmus a jeho kontrola  ⇄  🌶️3(kontrola)
- **D5a Cesta k orgazmu** — z klitorisu; z penetrácie; kombinovaný; z bradaviek; z aных; „nezáleží, nemusí prísť"
- **D5b Poradie a počet** — ja prvý/á; on/ona prvý/á; súčasne (ak vyjde); viacnásobný (ona); pauza a druhé kolo (on)
- **D5c Kontrola (D/s prvok)** — „nesmieš, kým nedovolím" (denial); „teraz" (na povel); počítanie; zákaz na dni; „forced" (nútený viacnásobný/overstim) 🔒
- **D5d Po orgazme** — precitlivenosť (nedotýkať sa); pokračovať (overstim); okamžite objať; „nechaj ma chvíľu"

## D6 · Ukončenie aktu a dokončenie  ⇄
- **D6a Kde dokončí (on)** — vo vnútri; von + na telo/tvár/prsia/zadok; do úst (→ C2); do kondómu; „nezáleží"
- **D6b Antikoncepcia / „pull-out"** — spoľahlivá metóda; „pull-out" ako hra vs riziko; „creampie" ako preferencia (opt-in)
- **D6c Po dokončení** — utrieť/sprcha; zostať spojení; „stay inside"; kто ide po uterák

## D7 · Aftercare a debrief  ★
- **D7a Fyzicky** — objatie; deka; voda; sprcha spolu; jedlo; ticho a spánok
- **D7b Emočne** — uistenie/slová; „ako ti bolo"; humor; potreba samoty a to je OK
- **D7c Po náročnejšej scéne (D/s, anál, breath)** — dlhší aftercare; „drop" na druhý deň; check-in správa; čo NErobiť hneď po

---

# L1 · E — POMÔCKY A HRAČKY  🌶️2

## E1 · Vibrátory a stimulátory  ★
- **E1a Klitorálne** — tyčinkové; „rabbit"; prikladacie (wand); saco-tlakové („air-pulse"); jazýčkové
- **E1b Vnútorné / G** — zahnuté; „rabbit"; vibračné vajíčko; dvojité
- **E1c Použitie** — sólo; partner ovláda; počas penetrácie (medzi telami); počas orálu; „hands-free" počas iných činností
- **E1d Intenzita a vzory** — nízka a stála; vysoká; pulzovanie; „edging" cez zapínanie/vypínanie; precitlivenosť

## E2 · Dildá a penetračné pomôcky  ⇄  🌶️2
- **E2a Typy** — hladké; s textúrou/žilami; zahnuté (G/P); dvojité; realistické vs abstraktné; sklo/kov (teplota)
- **E2b Veľkosť a progresia** — malé/stredné/veľké; „size play" ako fantázia; postupné zväčšovanie
- **E2c Strap-on (⇄ rola)** — ona penetruje jeho (pegging 🔒); ona penetruje ju; „vac-u-lock"; bezremeňové; „strapless"
- **E2d Použitie** — namiesto penisu; popri; pri oráli; „double penetration" s partnerom (opt-in 🔒)

## E3 · Análne pomôcky  🔒  🌶️3
- **E3a Plugy** — malý „na nosenie"; stredný; veľký; vibračné; „tail"/šperkové; nosenie počas dňa / počas vaginálneho sexu
- **E3b Guľôčky a progresívne** — anal beads; „vyťahovanie pri orgazme"
- **E3c Bezpečnosť** — VŽDY základňa/stoper; veľa lubrikantu (vodný na silikón); čistenie; materiál (silikón/sklo/kov); nezdieľať bez umytia/kondómu

## E4 · Penisové a párové pomôcky  🌶️2
- **E4a Krúžky** — erekčný krúžok; s vibráciou (stimuluje ju); pár-krúžok; čas na tele (limit)
- **E4b Návleky / extendery** — textúrované návleky; predlžovacie; „hollow" (opt-in, citlivé na ego → komunikácia)
- **E4c Masturbátory** — pre neho sólo; partner používa na ňom; „strokery"
- **E4d Párové vibrátory** — nositeľné počas penetrácie (napr. „C-tvar")

## E5 · Lubrikanty, oleje a doplnky  ★
- **E5a Typy** — vodný (univerzál); silikónový (dlhý, nie na silikónové hračky); hybridný; olejový (nie s kondómom)
- **E5b Špeciálne** — hrejivý/chladivý; „anal" (hustejší); ochucený (na orál); s CBD; „numbing" — prečo NIE pri aných
- **E5c Doplnky** — masážne sviečky; uteráky/podložka; menštruačný disk na sex; „liquid latex"/farby

## E6 · Nositeľné a diaľkové  🌶️2–3
- **E6a Ovládané partnerom** — vibračné vajíčko/nohavičky s appkou; na diaľku; „daj mi telefón"
- **E6b Verejné hranie** — v reštaurácii/kine/na prechádzke (legálne, diskrétne); pravidlá a safe-word
- **E6c Chastity (→ F7)** — klietka pre neho; kľúč u nej; časové rámce

---

# L1 · F — MOC, ROLA A SCÉNA  🌶️3

*Konsenzuálna hra s mocou. Vyžaduje safe-words, dôveru a aftercare (D7).*

## F1 · Dominancia / submisia (D/s)  ⇄  🌶️3
- **F1a Dynamika** — „vanilla s korením" (občas) vs vyhradené scény vs 24/7 prvky; kто je Dom / sub / switch
- **F1b Prejavy dominancie** — vedenie tempa; príkazy; „nesmieš sa hýbať/vydávať zvuk"; oslovenie (Pane/Pani/meno); povolenie na dotyk
- **F1c Prejavy submisie** — poslúchať; prosiť; „service" (obliekať, nosiť); pokľaknutie; čakať v polohe
- **F1d Protokoly** — pravidlá na scénu; rituál začiatku/konca; „high protocol" vs voľné

## F2 · Bondage a znehybnenie  ⇄  🔒  🌶️3
- **F2a Pomôcky** — šatka/kravata; putá (klasické/plyšové); popruhy pod posteľ; lano (shibari — základné 🔒); klietka/spreader bar; bondage tape
- **F2b Rozsah** — ruky spolu; ruky o posteľ; roztiahnuté; „hogtie"; o stoličku; state
- **F2c Prvky** — zaviazané oči; roubík (opt-in 🔒 — nikdy sám/pri riziku dýchania); polohové držanie bez pút („nehýb sa")
- **F2d Bezpečnosť** — nikdy sám v miestnosti; nožnice po ruke; kontrola prstov/farba; časový limit; safe-gesto keď nemôže hovoriť

## F3 · Impact play  ⇄  🔒  🌶️3
- **F3a Ruka** — plesknutie po zadku; stehná; „warm-up" pravidlo
- **F3b Nástroje** — paddle; flogger; prút/trstica; opasok; „pinwheel" (viď F5)
- **F3c Intenzita a zóny** — len zadok/stehná (bezpečné); NIE obličky/chrbtica/kĺby; „od jemného, pýtať si viac"; počítanie úderov
- **F3d Význam** — „funkčná" (rozohriatie) vs „trestová" scéna vs katarzia; slzy sú OK ako uvoľnenie

## F4 · Deprivácia zmyslov a hrany dychu  🔒🔒  🌶️3
- **F4a Deprivácia** — kukla/klapky + slúchadlá; postupné; dezorientácia
- **F4b Breath play** — „smother" (telo/ruka), NIE tlak na krk pri bežnom páre; len opt-in, len krátko, jasný safe-signál; kontraindikácie (srdce, tehotenstvo, panika); toto je najrizikovejšia položka celého dotazníka

## F5 · „Edge" senzorika  ⇄  🔒  🌶️3
- **F5a Ostré vnemy** — svorky na bradavky/pysky; pinwheel; nechty; hryzenie (silné); vosk (nízkoteplotný)
- **F5b Teplota** — ľad; horúci vosk; kontrastné striedanie
- **F5c Elektro** — TENS/„violet wand" (opt-in 🔒, nikdy nad pásom/pri srdci)

## F6 · Dirty talk, oslovenia a slovný priestor  ⇄  🌶️2–3
- **F6a Tón** — jemné povzbudenie; vulgárne; rozprávanie príbehu/scenára; ticho a len rozkazy
- **F6b Obsah** — pochvala („si úžasná"); komandovanie; „ponižovanie" (opt-in — presné slová dohodnúť, čo je 🔴); „uctievanie"; degradačné vs adorujúce
- **F6c Oslovenia** — meno; „zlato"; „Pane/Pani"; „miláčik"; pet-names; čo je absolútne mimo
- **F6d Jazyk tela partnera** — hovoriť o tele partnera — čo áno, čo je citlivé/hranica

## F7 · Kontrola a pravidlá  ⇄  🌶️3
- **F7a Orgasm control** — denial (zákaz); permission (na povel); „ruined"; kvóty; nahlasovanie masturbácie
- **F7b Chastity** — klietka; časové rámce (hodiny/dni/týždne); kľúč u partnera; „key holder" dynamika
- **F7c Úlohy a rituály** — dané úlohy; „rules" počas dňa; správy; oblečenie/bielizeň na povel; poloha pri čakaní
- **F7d Tresty a odmeny** — dohodnutý systém; čo je odmena; čo je „trest" (a čo NIE je nikdy trest)

## F8 · Roleplay a scenáre (bez tretej osoby)  🌶️2–3
- **F8a Mocenské** — šéf/podriadený; učiteľ/študent (dospelí); vypočúvanie; „prísny" tréner
- **F8b Situačné** — neznámi v bare („pick-up"); dlho odlúčení; „zakázané" (susedia); lekár/pacient; masér/klient
- **F8c Príbehové** — únos-fantázia (CNC — opt-in 🔒🔒, prísne rámce); „služobníčka"; historické/kostýmové; sci-fi/fantasy
- **F8d Prvky** — kostýmy; rekvizity; „scéna" s dejom; improvizácia vs scenár; kde sa to odohráva

---

# L1 · G — FETIŠE A ŠPECIFICKÉ ZÁUJMY  🌶️3

## G1 · Časti tela  🌶️2–3
- **G1a Chodidlá** — masáž; bozkávanie/lízanie; „foot job"; obuv/podpätky/pančuchy ako súčasť
- **G1b Ruky** — prsty v ústach; manikúra; rukavice
- **G1c Vlasy** — ťahanie (→ B1d); česanie; vôňa; dĺžka/účes ako preferencia
- **G1d Ďalšie** — krk; brucho; zadok; svaly; „belly"/„navel"; slina; pot
- **G1e Vzhľad a úprava** — ochlpenie (áno/holené/úprava) — moje aj partnerovo; make-up; opálenie; tetovania

## G2 · Materiály a oblečenie  🌶️2–3
- **G2a Materiály** — latex/gumа; koža; hodváb/saténí; čipka; denim; kožušina; punčochy/silon
- **G2b Kúsky** — erotická bielizeň; body/korzet; podväzky; vysoké podpätky; uniformy; „office" outfit; kostýmy
- **G2c Kто nosí** — ona; on; oboje; crossdressing (opt-in); „sissy" dynamika (opt-in 🌶️3)
- **G2d Stav oblečenia** — úplne oblečení (CMNF/CFNM); čiastočne; „roztrhať"; nechať topánky/pančuchy

## G3 · Telesné tekutiny a prirodzenosť  🔒  🌶️3
- **G3a Prirodzenosť** — vôňa/chuť partnera ako afrodiziakum; pot; sliny; „po sexe" stav
- **G3b Semeno** — v ústach/prehltnúť; na tele/tvári; „creampie"; „felching" (🔒 hygiena)
- **G3c Ženská ejakulácia / „squirting"** — ako cieľ; ako bonus; nezáujem; podložka
- **G3d Menštruačná krv** — sex počas menštruácie; „period play"; disk/uterák; úplné NIE
- **G3e Watersports** — „golden shower" (opt-in 🔒🔒, hygiena/hydratácia, nie na rany/tvár bez dohody); len „talk"/fantázia

## G4 · Zvuky a reč  🌶️2
- **G4a Zvuky partnera** — vzdychy; hlasné; ticho; „chcem ťa počuť"; slovný komentár
- **G4b Konkrétne slová** — vulgarizmy áno/nie; cudzí jazyk; „prosím/ďakujem"; číselné počítanie
- **G4c ASMR / šepot** — pomalý hlas; do ucha; nahrávka/audio porno spolu

## G5 · Objekty, situácie a rituály  🌶️2–3
- **G5a Situačné spúšťače** — konkrétne miesto; ročné obdobie/sviatok; „po hádke"; „ráno"; uniforma z práce
- **G5b Rituály** — vždy rovnaká pieseň/sviečka; „rozkaz" formulka; poradie krokov; „náš" scenár
- **G5c Objekty** — konkrétny kus nábytku; zrkadlo (sledovať sa); polaroid; denník preferencií

## G6 · Špecifické telesné/vzhľadové preferencie  🌶️2
- **G6a Typ postavy / proporcie** — čo ma priťahuje (bez tlaku na partnera — citlivé, formulovať opatrne)
- **G6b „Size" fantázie** — rozdiel výšky/sily; „size play" (hračky); nie ako kritika partnera
- **G6c Tehotenstvo / laktácia** — priťahuje ako fáza; „preggo"; „milk" (opt-in)
- **G6d Vek-hra (len dospelí, len roleplay)** — „mladší/starší" dynamika ako roleplay; „daddy/mommy" oslovenie (opt-in) — jasne oddeliť od čohokoľvek nelegálneho (🔴 absolútna hranica)

---

# L1 · H — OTVORENOSŤ A ĎALŠÍ ĽUDIA  🌶️3

*Väčšinou najprv ako fantázia. Rozlišuj „vzrušuje ma to v predstave" vs „chcem to reálne".*

## H1 · Bi-zvedavosť / rovnaké pohlavie  ⇄  🌶️3
- **H1a Rovina** — len fantázia; „talk" počas sexu; reálne
- **H1b Aktivity** — bozk; dotyky; orál; penetrácia/strap-on; „kто s kým" pri viacerých
- **H1c Kontext** — pri trojke; sólo (bez partnera, s dohodou); pred partnerom
- **H1d Pocity a identita** — čo to pre mňa znamená; žiarlivosť; podmienky; „len raz na vyskúšanie"

## H2 · Voyeurizmus a exhibicionizmus  ⇄  🌶️3
- **H2a Sledovať** — partnera sólo; partnera s iným (→ H6); porno spolu; iný pár (klub); „live"
- **H2b Byť sledovaný** — partnerom; iným párom; skupinou; kamera (len pre nás — viď H8)
- **H2c Semi-public** — okno/balkón; klubové „play" zóny; zrkadlové izby; auto; „skoro nachytali nás"
- **H2d Miera rizika** — striktne súkromné; „safe" verejné (klub); reálne riziko (🔴 legálne hranice)

## H3 · Trojky a malé skupiny  🔒  🌶️3
- **H3a Konfigurácia** — MŽŽ; ŽMM; MŽM; ŽMŽ; bi/hetero mix; kto sa koho dotýka
- **H3b Tretí človek** — neznámy (klub/app); kamarát/ka (riziko na vzťah); „unicorn"; profesionál/ka
- **H3c Pravidlá** — čo je dovolené (bozk? penetrácia? orgazmus s tretím?); kondómy; „veto" právo; kто organizuje
- **H3d Emócie** — žiarlivosť; „compersion" (radosť z partnerovej radosti); po-debrief; frekvencia

## H4 · Skupinový sex a eventy  🔒  🌶️3
- **H4a Formáty** — malá skupina (známi); párty (súkromný byt); klub/„lifestyle" akcia; „play party" (kink)
- **H4b Miera účasti** — len pozerať; „soft" (s vlastným partnerom, iní vedľa); plná účasť; „same room only"
- **H4c Bezpečie a pravidlá** — bariéry vždy; „nie je nie"; odchod kedykoľvek; alkohol/drogy limit; anonymita/diskrétnosť

## H5 · Swinging / výmena partnerov  🔒  🌶️3
- **H5a Typ swapu** — „soft" (bez penetrácie); „full"; „same room" vs „separate rooms"; „soft swinging" (vedľa seba, sex so svojím)
- **H5b Formát** — súkromné „meet & play"; kluby; tematické noci; online zoznamovanie párov
- **H5c Dohody** — čo sa smie; frekvencia; „len spolu, nikdy oddelene"; komunikácia pred/po; STI protokol

## H6 · Zdieľanie partnera (hotwife / cuckold / candaulizm)  ⇄  🔒  🌶️3
- **H6a Motív** — pýcha/„stag & vixen" (bez ponižovania); cuckold/cuckquean (s prvkami ponižovania/tabu); candaulizm (vzrušenie z „ukazovania")
- **H6b Rovina** — „dirty talk" fantázia; sledovanie; reálne stretnutia; „date" bez partnera + rozprávanie po
- **H6c Roly a slová** — „bull"/„tretí"/„lover"; oslovenia; čo hovoriť počas; hranice ponižovania
- **H6d Pravidlá** — kondómy; výber tretieho; info pred/po („don't ask don't tell" vs plná transparentnosť); veto

## H7 · CNM/ENM a vzťahové štruktúry  🌶️3
- **H7a Model** — striktná monogamia; „monogamish" (malé výnimky); otvorený vzťah; swinging ako lifestyle; polyamoria; relationship anarchy
- **H7b Politika informovania** — plná transparentnosť; „DADT"; „hall pass" (dohodnuté výnimky)
- **H7c Poly tvary** — „V"; triáda/throuple; quad; hierarchická (primárny/sekundárny) vs nehierarchická; „solo poly"; polyfidelita
- **H7d Praktické** — čas; bývanie („nesting partner"); pravidlá „safer sex"; „metamour" vzťahy; žiarlivosť a „compersion"

## H8 · Digitálna a diaľková intimita  🌶️2–3
- **H8a Sexting** — texty; hlasovky; fotky (tvár áno/nie); video; frekvencia; kто iniciuje
- **H8b Ukladanie a riziko** — kde sa to ukladá; mazanie; „nikdy tvár"; dôvera; „revenge" riziko (🔴)
- **H8c Porno spolu** — spoločné pozeranie; výber; „čo z toho by sme skúsili"; individuálne porno a hranice
- **H8d Kamera / VR / hračky na diaľku** — nahrávať seba (len pre nás); videohovor sex (odlúčenie); VR; appkou ovládané hračky (→ E6); platformy (súkromie)

---

# L1 · I — HRANICE, ZDRAVIE A TELO  🌶️1–2

*Povinný rámec. Prechádza sa v „Atlase" pred modulmi aj priebežne.*

## I1 · Súhlas, safe-words a signály  ★
- **I1a Safe-word systém** — jedno slovo (STOP) vs semafor (zelená/žltá/červená); neverbálny signál (keď nemôže hovoriť — napr. 3× stisk / pustiť predmet)
- **I1b „Nie teraz" kultúra** — ako odmietnuť bez zranenia; ako prijať odmietnutie; „check-in" počas
- **I1c Súhlas vopred vs priebežný** — čo si dohodneme pred scénou; právo zmeniť názor kedykoľvek; „veto" na osoby/aktivity
- **I1d Alkohol a substancie** — kde je naša hranica „ešte OK / už nie"; pravidlo pri nových veciach (triezvi)

## I2 · Zdravie, ochrana a hygiena  ★
- **I2a Antikoncepcia** — metóda; zodpovednosť; „pull-out" ako (ne)spoľahlivosť; núdzová
- **I2b STI** — testovanie (kedy naposledy, ako často); status; kondómy (vždy/pri niektorých aktivitách/nie); pri otvorenom vzťahu protokol
- **I2c Hygiena** — sprcha pred/po; intímna hygiena; hračky (čistenie, materiály, zdieľanie); anál → nikdy späť k vulve; ruky/nechty
- **I2d Bolesť vs nepohodlie** — čo je „dobrá" intenzita a čo je varovanie; suchosť; bolesť pri penetrácii (kедy k lekárovi); po akte pálenie/UTI prevencia

## I3 · Telo, hanba a citlivé miesta  ★
- **I3a Telo-image** — čo o svojom tele neznesiem počuť/vidieť; svetlo; zrkadlá; polohy, ktoré ma zneisťujú
- **I3b Hanba a bloky** — z čoho mám hanbu; čo mi pomáha ju znížiť; „nehodnotiaci" jazyk partnera
- **I3c Spúšťače a história** — slová/dotyky/situácie, ktoré vypnú alebo vyvolajú zlú spomienku; ako signalizovať „potrebujem pauzu"; čo NErobiť keď sa to stane
- **I3d Špecifické obdobia** — stres/rodičovstvo; tehotenstvo a po pôrode; menštruácia; menopauza; zdravotné stavy/lieky; vek a únava; dlhé odlúčenie

---

## 3. Zhrnutie počtov

| Úroveň | Počet |
|---|---|
| L1 domény | 9 |
| L2 moduly | 54 |
| — z toho zrkadlové ⇄ | 24 |
| — z toho rizikové 🔒 | 14 |
| L3 okruhy | ~215 |
| L4 položky (tento návrh, seed) | ~550 |
| L4 položky (cieľ po naplnení z „mišmaš" dokumentov) | 1200–1600 |

## 4. Tier 1 „Warm" — čo spustiť ako prvé (19 modulov)

A1 A2 A3 A4 A5 · B1 B2 B5 B6 (jemná časť) · C1 C2 · D1 D3 D7 · E1 E5 · I1 I2 I3

= jemné a stredné, žiadne 🔒, pokrýva „bežný" intímny život páru. Zvyšok (D–H advanced, F, G, H) sa
odomyká po Tier 1 a vždy s per-modul screeningom.

## 5. Ako sa to premietne do kódu

- `src/lib/dotaznik/strom.ts` — dnes má 11 zjednodušených modulov. **Prepíše sa** podľa tohto dokumentu:
  `Domena[] → Modul[] → Okruh[] → Polozka[]` + flagy (`zrkadlovy`, `rizikovy`, `citlivost`, `tier`).
- Stránky stromu (`/[lang]/dotaznik/**`) sa nemenia štruktúrou — pribudne len úroveň **L3 okruh**
  medzi `temy` a `s/[sekcia]` (napr. `/m/[modul]/o/[okruh]`), L4 položky sú obsah sekcie „Preferencie/Techniky".
- Obsah L4 (a znenie otázok) sa doťahuje z prekonvertovaných `.md` (markitdown) — modul po module.

## 6. Otvorené otázky na rozhodnutie

1. **Hĺbka pre v1** — ísť po L4 všade, alebo v1 = len po L3 + „Preferencie" ako voľný priestor?
2. **Rola pri ⇄** — pýtať sa vždy zvlášť „prijímam/poskytujem", alebo len tam, kde to naozaj mení odpoveď?
3. **G6d / F8c (vek-hra, CNC)** — necháme ako opt-in s tvrdým rámcom, alebo úplne vypustíme z v1?
4. **H doména** — samostatný „modul navyše" za paywallom, alebo súčasť hlavného stromu?
5. **Počet L2** — 52 je veľa. Zlúčiť niektoré (napr. E4+E6, G5+G6, H4+H5)? Cieľ ~40?
