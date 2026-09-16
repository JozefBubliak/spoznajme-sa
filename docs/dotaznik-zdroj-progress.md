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

**Posledný spracovaný riadok: 0** (ešte nezačaté)

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
| 27358-39600 | 17_Anal_a_stimulacia_zadku (2. kópia, opakuje sa) | ⏳ treba spot-check na odchýlky |
| 39601-50980 | 22_BDSM_a_mocenska_dynamika | ✅ `bdsm.ts` (veľká sekcia, ~11 380 r. — spot-check odporúčaný) |
| 50981-53668 | 21_Fetise | ✅ `fetise.ts` |
| 53669-55620 | 26_Hotwifing_a_cuckolding_CNM | ✅ `zdielanie-partnera.ts` |
| 55621-57282 | 18_Pomocky_a_hracky | ⏳ overiť voči `pomocky-hracky.ts` (ten bol postavený z menšieho úryvku) |
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
