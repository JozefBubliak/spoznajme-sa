# zdroj.docx — postupná extrakcia po dávkach (stav)

> Účel: `zdroj.docx` je obrovský „mišmaš" dokument (49 630 odsekov vo Worde), z ktorého sme doteraz
> vyťahali len 2 sekcie (`pomocky-hracky.ts`, `rovnake-pohlavie.ts`) na základe nadpisov. Keďže
> formátovanie je rozbité a nadpisy nie sú spoľahlivý signál (otázky často chýbajú, témy sa opakujú
> v rôznej kvalite na rôznych miestach), ideme ho teraz prejsť **systematicky, po malých dávkach**,
> s priebežným zápisom postupu, aby sa dalo kedykoľvek pokračovať bez opätovného načítania celku.

## Prečo nie doslovne „2 strany"

Skutočné zalomenie strán vo Worde nie je uložené v `document.xml` (rieši ho renderer pri tlači/zobrazení).
V celom dokumente sú len **3 tvrdé page-breaky** na 49 630 odsekov — takže presné strany sa nedajú
rekonštruovať zo suchého XML bez LibreOffice/Wordu (nie sú k dispozícii v tomto prostredí).

**Praktická náhrada:** dávka = **~250 riadkov** extrahovaného textu (`zdroj_v2.txt`, 67 590 riadkov,
extrakcia zachováva delenie na odrážky/riadky lepšie než pôvodná verzia). Pri hustote tohto dokumentu
to zodpovedá zhruba 2–4 stranám pôvodného textu. Veľkosť dávky sa dá kedykoľvek prehodnotiť.

## Zdrojový súbor

- `zdroj.docx` → extrahované do `zdroj_v2.txt` (scratchpad, session `13ce2856-...`) príkazom:
  `unzip -p zdroj.docx word/document.xml | perl -pe 's{<w:br[^/]*/>}{\n}g; s{</w:p>}{\n}g; s{•}{\n•}g; s{<[^>]+>}{}g; s{&amp;}{&}g; s{&quot;}{"}g; s{&apos;}{\x27}g;'`
- Ak sa scratchpad stratí (nová session), treba znova extrahovať tým istým príkazom — súbor sa nemenil (2 716 438 B, jún 2026).

## Postup na dávku

1. Prečítať riadky `[posledny_riadok+1, posledny_riadok+250]` zo `zdroj_v2.txt`.
2. Pre každú zmysluplnú položku (otázku, tému, blok) v dávke:
   - Ak **obsahovo** (nie len podľa nadpisu) zodpovedá už existujúcej téme v `src/lib/dotaznik/obsah/*.ts` → preskočiť, poznačiť kam patrí.
   - Ak je to **nová** otázka/uhol pohľadu → pridať do zodpovedajúcej existujúcej témy (alebo založiť novú, ak žiadna nesedí), v štýle domu (m/z zrkadlenie, `Moznost[]` škály, nie voľný text ak sa dá vyjadriť výberom).
   - Ak dávka obsahuje **len názov témy bez skutočných otázok** → dohľadať všeobecne známy rámec danej témy (sexuológia/vzťahová prax) a navrhnúť primerané otázky sám, jasne označené v commit správe ako autorský obsah (nie prepis).
3. Zapísať do tabuľky nižšie: rozsah riadkov, zistená téma, verdikt, kam (ak pridané).
4. Po nazbieraní zmysluplného množstva nového obsahu (nie nutne po každej dávke) spustiť `npm run typecheck && npm run build`, commit, push na `main`.
5. Aktualizovať `Posledný spracovaný riadok` nižšie.

## Stav

**Posledný spracovaný riadok: 67589 / 67589** — celý dokument zmapovaný a overený obsahovým vzorkovaním
(nie len podľa nadpisov). Nájdená a doplnená jediná chýbajúca celá téma (`13_Nepenetrativne_aktivity` →
nový modul B7 `nepenetrativne-trenie.ts`) + jeden menší nový blok („rýchly/surový sex" → doplnené do
`vaginalna-penetracia.ts`). Zvyšok dokumentu potvrdený ako duplicita už postavených tém.

**Ak sa objaví nový/iný `zdroj.docx`** (zmenená veľkosť súboru oproti 2 716 438 B), tento log stráca
platnosť a treba znova prejsť mapou sekcií — postup v tomto súbore ostáva rovnaký.

## Fáza 2 — hlbšia revízia podľa skutočných strán Wordu (od 2026-09-16)

Používateľ do `zdroj.docx` pridal Wordovo číslovanie strán (footer field `PAGE`). Cez Word COM
automatizáciu (PowerShell, `Documents.Open` → `GoTo(1,1,N)` → `Range.Text`) viem teraz vytiahnuť
**skutočný, Wordom prepočítaný text presne pre zvolený rozsah strán** — žiadne odhadovanie podľa
riadkov. Dokument má **2 595 strán** (aktuálna verzia, veľkosť 2 710 759 B, zo 16. 9. 2026).

**Zistenie z Fázy 1 platí ďalej** (33 zreťazených zdrojov + master-outline), ALE Fáza 1 kontrolovala
len či otázky/možnosti už poznáme — **nekontrolovala text/rady/tipy/scenáre a normalizačné rámce**,
ktoré sa v zdroji tiež nachádzajú a v našich témach chýbajú. Fáza 2 preto ide stranu po strane (dávky
do 10 strán, nikdy nepretŕhajúc tému) a pre každú dávku vyťažuje:
1. Otázky a možnosti (aj bez otáznika, ak je z kontextu jasné, že ide o otázku).
2. Text/rady/tipy/scenáre ako `druh: 'text'` bloky (nie len ako otázky s možnosťami).
3. Obavy/mýty vhodné na normalizáciu (napr. „análna stimulácia u muža ≠ homosexualita").
4. Kde zdroj mlčí na jasnú tému → dohľadanie vo všeobecných zdrojoch (čo ľudí reálne priťahuje a prečo).

Skript na vytiahnutie ľubovoľného rozsahu strán (uložiť ako `.ps1` a spustiť cez PowerShell nástroj):
```powershell
$src = "C:\Users\-A-L-O-H-A-\OneDrive\Documenten\dotazník\zdroj.docx"
$out = "<scratchpad>\zdroj_pX_Y.txt"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open($src, $false, $true)
$pStart = ($doc.GoTo(1,1,<PRVA_STRANA>)).Start
$pEnd   = ($doc.GoTo(1,1,<POSLEDNA_STRANA+1>)).Start
[System.IO.File]::WriteAllText($out, $doc.Range($pStart,$pEnd).Text, [System.Text.Encoding]::UTF8)
$doc.Close(); $word.Quit()
```
(Dôležité: bez `[ref]` wrapperov — COM late-binding v PowerShell ich nepotrebuje a s nimi `GoTo` vracia zlý index.)

### Log dávok (strany podľa Wordu)

| Strany | Obsah | Nájdené chýbajúce | Kam doplnené |
|---|---|---|---|
| 1-10 | 09_Predohra_a_naladenie: starostlivosť o telo, oblečenie, iniciatíva (formy/tipy/dynamika/situácie/kedy), spontánny sex, signály pripravenosti, očný kontakt, sexting | „Tipy na experimentovanie" (3 scenáre), „Kedy je ideálne začať iniciatívu", „Situácie ktoré podporujú iniciatívu" (inšpiratívne príklady) | `dlhodoba-intimita.ts` (INICIATIVA: ini_tipy, ini_kedy, ini_situacie) |
| — | (naprieč Fázou 1, príklad chýbajúceho normalizačného rámca) | análna stimulácia u muža ≠ homosexualita | `analna-penetracia.ts` (psychologicky_ramec) |

| 11-20 | pokrač. 09_Predohra: sexting formy, vedomá iniciácia, 5️⃣ prostredie a atmosféra (osvetlenie, domáce miesta, exteriér, netradičné, kluby, psychológia dobrodružstva) | Osvetlenie (typ/intenzita), upravenosť miestnosti + materiály, frekvencia experimentovania s prostredím, dôležitosť pocitu dobrodružstva, diskrétne pomôcky mimo spálne | `miesta-prostredie.ts` (nový blok OSVETLENIE; doplnky do EXTERIER) |

| 21-30 | pokrač. 5️⃣ organizácia prostredia (hudba), 6️⃣ zmyslová predohra: zrak (erotické filmy — celá podtéma), sluch (verbálne príkazy), čuch (prirodzená vôňa, oleje, aromaterapia) | Hudobný žáner ako preferencia, verbálne príkazy (tón autority), erotické filmy spolu (typ/očakávania/priebeh — celá podtéma chýbala), vedomé privoniavanie ako rituál, konkrétne vône/oleje | `zmyslova-hra.ts` (SLUCH, CUCH doplnené), `digitalna-intimita.ts` (PORNO rozšírené o por_typ/por_ocakavanie/por_priebeh) |

| 31-40 | pokrač. čuch (konkrétne vône, erotická masáž), 6.4 chuť (jedlo, tekutiny, alkohol), 6.5 hmat, spoločné aktivity ako predohra, budovanie napätia a zdržovanie (+ tipy) | Kombinácia tekutín s chuťou, alkohol v hrách, spoločné aktivity ako predohra (varenie/kúpeľ/erotické listy/tanec/prechádzka — celý koncept chýbal), pauzy pri predohre, verbálne dráždenie, 3 konkrétne scenáre zdržovania | `zmyslova-hra.ts` (CHUT), `dlhodoba-intimita.ts` (AKTIVITY rozšírené), `predohra-naladenie.ts` (DLZKA_TEMPO rozšírené) |

| 41-50 | Kreatívne hry, dynamika moci/BDSM-light (viazanie, disciplína, kontrola času, prekvapenie, pomôcky), tempo/psychológia predohry | „Love treasure hunt", erotický denník (named hry), stupňované tipy (začiatočník/pokročilý/zvedavý). Zvyšok (viazanie/disciplína/kontrola/prekvapenie) potvrdený ako duplicita `bdsm.ts` | `roleplay.ts` (RITUALY), `tempo-intenzita.ts` (SCENARE — stupňované tipy) |

**Konvencie potvrdené/pridané počas Fázy 2 (aplikovať aj spätne pri príležitosti):**
- Možnosti výberu vždy v poradí pozitívne → neutrálne → odmietavé (nie na konci) — `POSTOJ` vzor to už robí.
- Pri témach, kde zdroj mlčí, použiť `WebSearch` (dostupný) na dohľadanie odborných štúdií aj laickej diskusie o tom, čo ľudí reálne priťahuje a prečo — nie len zoznam toho, čo odmietajú.

| 51-60 | Dotyky/tempo/orgazmus (jemné vs intenzívne), dynamika predohry (tempo), 7️⃣ predohra cez hravosť: erotické hry (kocky/karty/hádanky/„Nikdy som ešte"/výzvy), senzuálne hry na verejnosti, kreslenie na telo | Celá kategória „erotické hry" (párty-štýl hry, nie roleplay postáv) chýbala | `roleplay.ts` (nový blok HRY) |

| 61-70 | pokrač. 5️⃣-7️⃣: spoločné aktivity ako predohra, dynamika (pauzy/zdržovanie), prostredie/osvetlenie, erotické hry (kocky/karty/„Nikdy som ešte"/výzvy), dotykové hry a masáže, neverbálna komunikácia (pohľady/dych/telesná odozva), hravosť/spontánnosť, pravidelná komunikácia o potrebách | Masáž ako vlastná téma (klasická/erotická, oleje, kombinácie) — jediná skutočná medzera, zvyšok potvrdený ako duplicita (osvetlenie, erotické hry, verbálna navigácia, spontánnosť už postavené) | `predohra-naladenie.ts` (nový blok MASAZ) |

| 71-80 | pokrač. rituály intimity, erotické filmy, dĺžka predohry, príprava, mentálna príprava, budovanie očakávania, romantické gestá, oslovovanie, sexting, znova erotické hry, „11 RITUÁLY INTIMITY" (sprcha pred maznaním, masáž ako úvod, **prechod od maznania k sexu — signály že partner je pripravený, dohoda kedy prejsť na penetráciu**) | **Explicitná dohoda/signál na prechod k penetrácii** — SIGNALY riešil len všeobecné signály náklonnosti, nie tento konkrétny prechodový bod. (Prvý prechod bol pri druhom, dôkladnejšom prejdení tejto dávky — pri prvom prejdení som to nesprávne označil ako „100% duplicita", čo bola chyba spôsobená plytkým porovnávaním podľa témy namiesto konkrétneho grep overenia každého bodu.) | `predohra-naladenie.ts` (SIGNALY: nová otázka sig_prechod_penetracia) |

| 81-90 | roleplay scenáre (šéf/sekretárka, lekár/pacient...), BDSM dynamika moci (príkazy, kontrola času/edging, **hranie s prekvapením a nečakanými prvkami** — zmena polohy bez upozornenia, nová hračka ako prekvapenie, nečakaný dotyk, hlasová kontrola), prechod na „08_Dlhodoba_intimita" | **Prekvapenie v rámci vopred dohodnutých hraníc** — celý koncept "súhlas s TÝM, že ma partner môže prekvapiť" (nie s konkrétnou vecou) v `bdsm.ts` chýbal | `bdsm.ts` (nový blok PREKVAPENIE) |

| 91-100 | dokončenie „08_Dlhodoba_intimita" (denné gestá, iniciatíva, spontánny sex), **prelínanie fantázií a reality — ako by si rada začala s ich realizáciou (malými krokmi / spontánne / len keď obaja pripravení)**, rôznorodosť prostredí, „VEĽKÝ ZOZNAM TÉM K PREDOHRE" (znova) | **Tempo prístupu k realizácii fantázie** (postupné kroky vs. spontánne vs. až keď pripravení) — `fantazie.ts` PREKLAD mal len odkaz na „Pilot" kartu, nie túto konkrétnu voľbu štýlu | `fantazie.ts` (PREKLAD: nová otázka pre_pristup) |

| 101-110 | opakovanie romantických gest, dôvery/očného kontaktu, verbálnych prejavov, spontánnosti, fantázií a reality (m/z varianty) | Overené znova cez grep (ťahanie za vlasy → `dlhodoba-intimita.ts` ✅, kontrola polôh dominantným partnerom → dostatočne pokryté cez `rola_dom`/`rola_ktora` v `bdsm.ts`) — žiadna ďalšia nová medzera nad rámec vyššie uvedených 3 opráv | — |

| 111-120 | opakovanie (rutina/dôvera/rituály/experimentovanie), vizualizácia (zrkadlá/osvetlenie/kostýmy), **dlhý zoznam holých názvov tém bez rozpracovania** (práca s hanbou "nie som dosť dobrý/á", meditácia, slow burn, flirtovanie v dlhodobom vzťahu, odhaľovanie zraniteľnosti...), neverbálna komunikácia, šepkané oslovenia, príprava vzhľadu (vlasy/make-up/**šperky/podpätky/bosé nohy**) | Konkrétne doplnky k sebavedomiu (podpätky/bosé nohy, šperky) a pomenovaný pocit "nie som dosť dobrý/á" v hanbe. Zvyšok holých názvov (meditácia, slow burn, flirtovanie) overený ako dostatočne pokrytý existujúcim obsahom (tantra-slow-sex.ts MEDITACIA, predohra TEASING_DEN/SEXTING) | `predohra-naladenie.ts` (PRIPRAVA: pri_doplnky), `telo-hanba.ts` (HANBA: han_nie_dost_dobry) |

| 121-140 (prvá 20-stranová dávka) | opakovanie (šperky/podpätky, mentálna príprava, dôvera, oslovenia, romantické gestá, spontánnosť, fantázie→realita, emocionálna+fyzická prepojenosť, meditácia/dych, dominant kontroluje tempo) — a 3 nové konkrétne body: erotické čižmy ako doplnok, **spoločné vzdelávanie o intimite** (workshopy/knihy/videá — odlišné od erotického obsahu), **pravidelné prehodnocovanie fantázií v čase** (menia sa, ako často to preberať), vedenie spoločného denníka fantázií (už pokryté cez roleplay.ts rit_eroticky_dennik) | 3 potvrdené medzery doplnené; zvyšok (dôvera/oslovenia/meditácia/tempo kontrola) overený grep-om ako už pokrytý | `predohra-naladenie.ts` (pri_doplnky: cizmy), `dlhodoba-intimita.ts` (nový blok VZDELAVANIE), `fantazie.ts` (PREKLAD: pre_prehodnocovanie) |

| 141-160 | opakovanie (miesta mimo spálne, verejné prostredia, techniky/pomôcky mimo spálne — časti tejto dávky sa v rámci nej samotnej opakovali 2-3×), detailná štruktúra domácich priestorov (posteľ/matrac, zrkadlo, kúpeľňa/kuchyňa/obývačka), netradičné prostredia (výťah/balkón/garáž/kancelária/**sauna**/kluby/párty), teplotné hry so zónami tela, textúry, senzorická deprivácia | **Verejná sauna/wellness** ako samostatná venue chýbala (výťah/balkón/garáž/kancelária/kino/park už boli pokryté). Pevnosť matraca vedome vynechaná — nie je to niečo, na čo pár môže v danej chvíli reagovať. Zvyšok (teplotné zóny, textúry, deprivácia) overený ako pokrytý | `miesta-prostredie.ts` (NETRADICNE: nová možnosť sauna) |

| 161-180 | masívne opakovanie zmyslovej hry (hmat/zrak/sluch/čuch/chuť, synchronizácia zmyslov, deprivácia, preťaženie zmyslov) — rovnaké bloky sa v rámci týchto 20 strán opakovali 3-4×; podrobná verbálna komunikácia počas sexu vrátane explicitných príkladov degradačných fráz (m/z, dávanie/prijímanie); dych, vôňa/aromaterapia | **Tón hlasu ako vlastná preferencia** (jemný/dominantný/hlboký — odlišné od OBSAHU dirty talk, ktorý už bol pokrytý) — jediná potvrdená medzera. Explicitné degradačné frázy vedome nereplikované doslovne (naša úroveň abstrakcie cez `verb_ponizovanie` + `verb_tabu` v bdsm.ts je dostatočná, netreba grafické príklady). Zvyšok (dych spolu, vône/rituál, audioknihy) overený ako pokrytý | `zmyslova-hra.ts` (SLUCH: nová otázka slu_ton_hlasu) |

| 181-200 | opäť masívne opakovanie (vône/aromaterapia 4-5×, hmat/dotyková mapa, teplota, chuť/hranie s jedlom), potom veľmi podrobný štruktúrovaný osnovný prehľad "PREDOHRA, MENTÁLNA PRÍPRAVA A SENZORIKA" (1.1-6.4) s konkrétnymi pomenovanými technikami | **Predávanie tekutiny z úst do úst** (víno/šampanské/sladký nápoj počas bozku) — celá samostatná prax chýbala. **Konkrétne pomenované masážne techniky** ("palm glide", mačacie pazúriky, miesenie, skalp masáž) — MASAZ blok mal len všeobecné typy, nie konkrétne techniky. Zvyšok (dotyková mapa, teplota, chuť/jedlo) overený ako pokrytý (najmä `CELOTELOVA_MAPA` v bozky-dotyky.ts) | `bozky-dotyky.ts` (BOZKY_USTA: boz_predavanie_tekutin), `predohra-naladenie.ts` (MASAZ: mas_techniky) |

| 201-220 | **DÔLEŽITÉ ZISTENIE:** táto dávka je autorský "master outline"/obsah pripravovaného diela s explicitne označenými "todo"/"nedopracovaná" sekciami (Tantra & slow-sex, Tech & digitálna intimita, Mikroscény) — potvrdzuje, že veľká časť nášho už postaveného obsahu (tantra-slow-sex.ts, face-sitting.ts, nepenetrativne-trenie.ts) presne zodpovedá plánu samotného zdroja. Nové položky: OnlyFans/platformy na tvorbu obsahu, body-writing, edging/tease-deny protokoly, "inspection" power-play | **Platformy na tvorbu plateného obsahu (OnlyFans)** — riziká reputácie/anonymity/financií/súhlasu, úplne chýbalo. **Body-writing** (písanie slova na kožu, partner háda) — chýbalo. Zvyšok (snowballing, tantra, mikroscény, tease-deny) overený ako už pokrytý | `digitalna-intimita.ts` (nový blok PLATFORMY), `roleplay.ts` (RITUALY: rit_body_writing) |

| 221-240 | ďalšia master-outline TOC (dotyková mapa, manuál, nepenetratívne, análne warm-up, polohy, pomôcky, BDSM bezpečnosť) — potom 5. doslovné opakovanie "VEĽKÝ ZOZNAM TÉM K PREDOHRE" | **A-bod** (hlboký predný bod blízko krčka, odlišný od G-bodu) — chýbal. **48-hodinová pauza pred opakovaním silnejšieho impact play na tú istú zónu** (bezpečnostná poznámka o kontrole modrín) — chýbala. Bezpečnostné nožnice pri bondáži už boli pokryté (bond_boundaries), moje prvé hľadanie to minulo nepresným výrazom | `vaginalna-penetracia.ts` (TECHNIKY: a_bod), `bdsm.ts` (IMPACT: bezpečnostný text imp_bezpecnost_modriny) |

| 241-260 | doslovné opakovanie obsahu už spracovaného v dávkach 91-140 (denné gestá, prelamovanie rutiny, dôvera, rituály, iniciatíva/dynamika, spontánny sex, nepriame signály, sexting) — teraz systematicky v m/z pároch | Žiadna — overené porovnaním s už spracovaným obsahom, ide o doslovný duplikát | — |

| 261-280 | doslovné opakovanie obsahu už spracovaného v dávkach 141-180 (miesta/prostredie, osvetlenie, hudba, čuch/vône, verbálne prejavy) — teraz systematicky v m/z pároch | Žiadna — overené porovnaním, doslovný duplikát | — |

| 281-300 | doslovné opakovanie (vône/aromaterapia, jedlo/tekutiny, hmat/tempo, erotické hry) — teraz systematicky v m/z pároch, vrátane už doplnenej „predávanie tekutín" otázky | Žiadna — overené porovnaním, doslovný duplikát | — |

| 301-340 | pokrač. duplikát (erotické hry/roleplay/BDSM-light dynamika — 3. výskyt), potom nové bloky: „Predohra s novým partnerom" (budovanie dôvery od nuly), „Predohra vo viacnásobných vzťahoch" | **Predohra s úplne novým/neznámym partnerom potrebuje iný prístup** (viac času, postupné skúšanie hraníc) — chýbalo. Predohra pri zdravotnom obmedzení už bola pokrytá (`kon_zdravotne`) | `swinging.ts` (RAMEC: ra_novy_partner_tempo) |

**🔍 PRIESKUM VZORIEK ĎALEJ V DOKUMENTE (str. 350-2500):** vzorkovanie odhalilo, že "predohra" duplicitná slučka končí približne okolo strany 400-450, potom nasleduje SKUTOČNE NOVÝ obsah: gangbang (~450), zdieľanie partnera/hotwife (~600), sofistikovaný UI/interakčný dizajn s posuvníkmi 0-100 a "zrkadlom rolí" ktoré sa partnerovi odhalí len pri jeho súhlase (~800 — zaujímavý náznak zamýšľaného dizajnu, nie len obsahu), citované štatistiky s odkazom na "PLOS" (~1000), dvojitá penetrácia/strap-on/pegging (~1300), štruktúrovaný BDSM rámec so SSC/RACK terminológiou (~1600), fetiše (~1900), petting/nepenetratívne aktivity (~2500). Pokračujeme lineárne, ale toto potvrdzuje, že za duplicitnou zónou je bohatý nový materiál.

| 341-360 | doslovné opakovanie zmyslovej hry (teplota, textúry, deprivácia, zrkadlá, tma, sviečky, synchronizácia dychu/zmyslov) — teraz systematicky v m/z pároch | Žiadna — overené porovnaním, doslovný duplikát. Potvrdzuje, že "predohra" slučka pokračuje aspoň do str. 360 | — |

| 361-400 | dokončenie predohra/zmyslová slučka (duplikát), potom **prechod na „25_Swingers_a_vymena_partnerov"** — Voyeuristický full swap, accept/provide checklisty pre iného muža/ženu | Žiadna — overené, `swinging.ts` (VOYEUR_FS, PARTNER_AKT) je postavený priamo z tejto presnej sekcie, vrátane doslovných fráz | — |

**Od strany 121 ďalej: dávky po 20 stranách** (so súhlasom používateľa), pri zachovaní rovnakej dôkladnosti — každá otázka a možnosť sa musí prejsť a overiť cez grep, nielen posúdiť podľa témy.

**Poznámka k metóde (dôležitá, po spätnej väzbe používateľa):** pri prvom prejdení strán 71-110 som viacero bodov označil ako duplicitu len na základe podobnosti TÉMY s už postaveným obsahom, bez toho, aby som každý konkrétny bod overil cez `grep`. To bola chyba — pri druhom, dôkladnom prejdení sa našli 3 reálne medzery (prechod k penetrácii, prekvapenie v BDSM, tempo realizácie fantázie). Odteraz každý konkrétny bod/otázku zo zdroja overiť cez `grep` v `obsah/*.ts`, nie len posúdiť „znie to povedome".

**Ďalší krok: strany 111-120.**

**Druhá korekcia metódy (po ďalšej spätnej väzbe používateľa, po dávkach do str. 400):** aj po prvej korekcii som pri viacerých dávkach (121-140, 161-180, 181-200, 341-360, 361-380) písal „žiadny nový nález" na základe overenia len **existencie témy/kľúčového slova** cez `grep` (napr. „existuje niekde `masáž`?"), nie porovnania **skutočného textu, otázok a možností** zo zdroja s tým, čo je na webe. To je presne ten istý druh chyby ako predtým, len o úroveň jemnejšia.

Skutočná oprava: pre každú dávku som teraz (1) extrahoval z Wordu surový text danej stránky, (2) prečítal ho celý — vrátane dlhých „Čo to prináša?" inšpiračných odsekov, nie len otázky, (3) porovnal vetu po vete s obsahom v `obsah/*.ts`, (4) až potom doplnil, čo reálne chýbalo. Výsledky tejto opravy pre už „uzavreté" dávky:

| Strany | Čo sa predtým prehliadlo (len keyword-check) | Kam doplnené |
|---|---|---|
| 121-140 | Celý blok „mentálna príprava" (fantazírovanie, zdieľanie túžob vopred, vizualizácia ako mentálne aktivity) — mali sme len fyzickú prípravu tela, nie psychickú. Jemné oslovenia počas maznania („miláčik", „moja kráska") s otázkou smeru (dávať/prijímať/oboje). Konkrétna otázka na obsah intímneho denníka. | `predohra-naladenie.ts` (nový blok MENTALNA_PRIPRAVA), `komunikacia-pocas-po.ts` (osl_mazna), `roleplay.ts` (rit_dennik_temy) |
| 161-180 | „Úplná tma" ako koncept odlišný od zaviazaných očí (tma = obom, páska = jednému). Maska (estetika/anonymita) ako odlišný koncept od pásky (deprivácia). Kategorizácia druhov verbálnych prejavov (nežné/dirty talk/opisovanie/roleplay/vulgárne/ticho) — mali sme len 1 všeobecnú možnosť. Inšpiračný text pri vôňach (konkrétne oleje, „voňavý rituál") — mali sme prázdne textové pole bez kontextu. Krok-za-krokom návod na „zmyslový rituál". | `zmyslova-hra.ts` (ZRAK rozšírený o tma/maska/oblečenie, SLUCH o slu_druhy_prejavov, CUCH o info text, LAYERING o rituál tip) |
| 181-200 | „Jemné obmedzenie reči" (pásik cez ústa) ako kombinovateľná senzorická položka popri páske/štupliach/kukle — mali sme len samostatný BDSM „gag" ako nástroj dominancie, nie ako súčasť jemnej zmyslovej kombinácie. | `bdsm.ts` (SENZORIKA → sen_prostriedky) |
| 341-360 | „Chladené kovové predmety" ako teplotný podnet — iný pocit než ľad (pomalšie sa zohrieva). | `zmyslova-hra.ts` (HMAT → hma_teplota) |
| 361-380 | Overené — skutočne duplikát, žiadny ďalší nový nález nad rámec vyššie. | — |

Dávky 1-120 a 201-340 (predtým označené ako duplicitné) **ešte neprešli touto druhou, prísnejšou kontrolou** — len prvou korekciou (téma+niektoré konkrétne body cez grep). Toto je otvorená položka, na ktorú treba nadviazať pred ďalším postupom vpred v dokumente.

## Kľúčové zistenie (po prečítaní obsahu, nie len nadpisov)

`zdroj.docx` je doslovné **zreťazenie všetkých 33 číslovaných zdrojových súborov za sebou** (každý
uvedený vlastným menom ako značka na začiatku svojej sekcie), preložené úryvkami toho istého
„master outline" dokumentu (`strom.docx` / `Finalny_strom_tem_komplet.docx` štýl), ktorý už bol
tento session preverený a potvrdený ako duplicitný. Overené **čítaním skutočného obsahu na viacerých
miestach naprieč celým dokumentom**, nielen podľa nadpisov (presne kvôli obave, že nadpis môže klamať).

Mapa sekcií (riadky v `zdroj_v2.txt`, 67 590 riadkov spolu):

| Riadky | Sekcia | Stav |
|---|---|---|
| 1-2553 | 09_Predohra_a_naladenie | ✅ `predohra-naladenie.ts` |
| 2554-5813 | 08_Dlhodoba_intimita_vo_vztahu | ✅ `dlhodoba-intimita.ts` |
| 5814-10715 | master-outline úryvky (senzorika/fetiše/BDSM/roleplay/predohra) | ✅ duplicita (zmyslova-hra.ts, roleplay.ts, predohra-naladenie.ts) — overené vzorkovaním |
| 10716-17559 | 25_Swingers_a_vymena_partnerov | ✅ `swinging.ts` |
| 17560-27357 | 17_Anal_a_stimulacia_zadku (1. kópia) | ✅ `analna-penetracia.ts` |
| 27358-39600 | Mišmaš: zvyšky anál Q&A, celý `Finalny_strom_tem_komplet.docx` (od r. ~32013), „rýchly/surový sex" + aftercare, BDSM bondage/disciplína počas penetrácie, fetiše (bielizeň, sledovanie, pančuchy, latex, opätky, nohy) | ✅ overené vzorkovaním na 5+ miestach — duplicita (`analna-penetracia.ts`, `bdsm.ts`, `fetise.ts`) OKREM „rýchly/surový sex", ktorý bol skutočne nový → **pridané** ako blok SUROVY do `vaginalna-penetracia.ts` |
| 39601-50980 | 22_BDSM_a_mocenska_dynamika (label), ale obsahuje aj mišmaš „Polohy/adaptácie" obsah (r. ~45000+) | ✅ BDSM časť = `bdsm.ts` (postavené priamo z originálu). Polohy/mobilita časť = `polohy.ts` VARIACIE (už pokryté, malý prekryv, netreba doplniť) |
| 50981-53668 | 21_Fetise | ✅ `fetise.ts` |
| 53669-55620 | 26_Hotwifing_a_cuckolding_CNM | ✅ `zdielanie-partnera.ts` |
| 55621-57282 | 18_Pomocky_a_hracky (DP konfigurácie, análne kolíky ako Q&A) | ✅ overené — `pomocky-hracky.ts` už má DP blok aj análne kolíky |
| 57283-60237 | 14_Oralna_intimita | ✅ `oralna-intimita.ts` |
| 60238-62577 | 24_Trojky_skupiny_a_gangbang | ✅ `trojky-skupiny.ts` |
| 62578-64127 | 19_Tempo_intenzita_a_orgazmus | ✅ `tempo-intenzita.ts` |
| 64128-64732 | 12_Masturbacia_a_solo_aktivity | ✅ `masturbacia.ts` |
| 64733-65576 | 10_Bozky_dotyky_a_maznanie | ✅ `bozky-dotyky.ts` |
| 65577-66101 | 13_Nepenetrativne_aktivity | ❌ **žiadna rich téma zatiaľ** (modul B7 má len holé L4 seedy) |
| 66102-66541 | 20_Roleplay_a_scenare | ✅ `roleplay.ts` |
| 66542-66817 | 29_Miesta_a_prostredie | ✅ `miesta-prostredie.ts` |
| 66818-67127 | 15_Vaginalna_penetracia | ✅ `vaginalna-penetracia.ts` |
| 67128-67337 | 16_Polohy_a_ergonomia | ✅ `polohy.ts` |
| 67338-67510 | 23_Interakcie_s_rovnakym_pohlavim | ✅ `rovnake-pohlavie.ts` |
| 67511-67589 | zvyšné prázdne/krátke súbory (07,01,02,31,03,30,06,27,28,04,11,05) | ✅ všetky spracované (viď predošlé commity) |

**Ďalší krok:** dokončiť `13_Nepenetrativne_aktivity` (jasná medzera), spot-check zdvojenej anál sekcie a `18_Pomocky_a_hracky`.

## Log dávok

| Riadky | Téma (zistená) | Verdikt | Kam pridané |
|---|---|---|---|
| 1-250 | 09_Predohra_a_naladenie (starostlivosť o telo, oblečenie, iniciatíva, spontánny sex, dynamika, nepriame prejavy) | 100% duplicita | `predohra-naladenie.ts` (PRIPRAVA, SIGNALY) + `dlhodoba-intimita.ts` (INICIATIVA, SPONTANNY) |
| 251-500 | pokrač. 09_Predohra (očný kontakt, sexting, vedomá iniciácia, prostredie/osvetlenie/miesta/exteriér) | 100% duplicita | `predohra-naladenie.ts` (SIGNALY, SEXTING, INICIACIA) + `miesta-prostredie.ts` (DOMACE, EXTERIER) |
