import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Bozky, dotyky a manuálna stimulácia — modul B1 „Bozky".
// Zdroj: „10_Bozky_dotyky_a_maznanie". Bozky (ústa/krk/telo, francúzske,
// hryzenie, bozk ako vedenie) + dotyky a maznanie + manuálna stimulácia
// rukami (pre ňu: klitoris/pysky/G-bod; pre neho: úchopy/skrotum; spoločné
// zóny; tempo/edging; ergonómia). z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie, neláka ma to' },
  { v: 'zvedavy', label: g('Neskúšal som, zaujíma ma to', 'Neskúšala som, zaujíma ma to') },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})
const VLHKOST: Moznost[] = [
  { v: 'sucho', label: 'Nasucho' },
  { v: 'sliny', label: 'Sliny' },
  { v: 'lubrikant', label: 'Lubrikant' },
]
const INT5: Moznost[] = [
  { v: '1', label: '1 — veľmi jemné' },
  { v: '2', label: '2' },
  { v: '3', label: '3 — stredné' },
  { v: '4', label: '4' },
  { v: '5', label: '5 — výrazné' },
]

// ── Bozky ────────────────────────────────────────────────────────────
// Zdroj + xlsm P47323–48012 (bozky m/z, typy bozkov, tipy, manuálne body A/U/
// fornix, orphan nadpisy „kombinácie a rituály", „prepojenie s masážou").
const BOZKY_USTA: Blok = {
  druh: 'skupina', id: 'bozky_usta', nadpis: 'Bozky — ústa',
  uvod: 'Bozk vie byť nežný ako pohladenie, drsný ako rozbúrené more, alebo provokatívny a hravý. Niekedy je predohrou, inokedy samotným centrom zážitku.',
  bloky: [
    {
      druh: 'text', id: 'boz_typy', nadpis: 'Typy bozkov a ich energia',
      telo:
        'Jemné a romantické — pomalé, mäkké dotyky pier, vnímanie dychu a tepla; ideálne na začiatok. ' +
        'Intenzívne a vášnivé — hlbšie spojenie pier a jazyka, rýchlejší rytmus, pevnejší tlak; prebúdzajú túžbu. ' +
        'Agresívne a dráždivé — silné zovretie pier, jemné alebo intenzívne hryzenie, vzrušujúci kontrast bolesti a potešenia.',
    },
    {
      druh: 'otazka', id: 'boz_usta', typ: 'jeden',
      text: g(
        'Predstav si, že ju držíš za šiju a vaše pery sa spoja v hlbokom, hladnom bozku. Ako máš rád bozky na ústa?',
        'Predstav si, že jeho pery len letmo prechádzajú po tvojich, zastavia sa a potom ťa nežne pobozkajú. Ako máš rada bozky na ústa?',
      ),
      moznosti: [
        { v: 'jemne', label: 'Jemné a krátke — nežnosť a romantika' },
        { v: 'vasnive', label: 'Intenzívne a vášnivé, dlhotrvajúce — rozohriatie túžby' },
        { v: 'kombinacia', label: 'Kombinácia jemných a intenzívnych' },
        { v: 'agresivne', label: 'Agresívnejšie — silný tlak, pritlačenie pier, zovretie, hryzenie' },
      ],
    },
    { druh: 'otazka', id: 'boz_usta_ine', typ: 'text', text: 'Vlastná odpoveď — bozky na ústa (voliteľné):' },

    {
      druh: 'otazka', id: 'boz_francuzske', typ: 'jeden',
      text: g(
        'Predstav si, že jej jazyk sa dotkne tvojho a váš dych sa spojí. Ako vnímaš francúzske bozky?',
        'Predstav si, ako jeho jazyk jemne vkĺzne medzi tvoje pery a začne sa s tvojím hrať. Vzrušujú ťa francúzske bozky?',
      ),
      moznosti: [
        { v: 'ano', label: 'Áno, milujem ich — veľmi ma vzrušujú' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'nie', label: 'Nie, nevyhľadávam ich' },
      ],
    },
    { druh: 'otazka', id: 'boz_francuzske_ine', typ: 'text', text: 'Vlastná odpoveď — francúzske bozky (voliteľné):' },

    {
      druh: 'otazka', id: 'boz_hryzenie_pier', typ: 'jeden',
      text: g(
        'Predstav si, že jej zuby sa zľahka zahryznú do tvojej pery. Láka ťa hryzenie pier?',
        'Predstav si, že pri bozku jemne hryzne tvoju peru — len tak, aby si cítila jeho vášeň. Ako ti vyhovuje hryzenie pier?',
      ),
      moznosti: [
        { v: 'milujem', label: 'Jemné hryzenie milujem — mierne dráždenie' },
        { v: 'intenzivne', label: 'Intenzívnejšie hryzenie — divokosť, láka ma alebo chcem skúsiť' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'nie', label: 'Nepreferujem hryzenie pier' },
      ],
    },
    { druh: 'otazka', id: 'boz_hryzenie_pier_ine', typ: 'text', text: 'Vlastná odpoveď — hryzenie pier (voliteľné):' },
    p('boz_6_sekund', 'Denný „6-sekundový bozk" — dlhší bozk pri odchode a príchode, nie len cmuk'),
    p('boz_pocas_sexu', 'Bozkávanie počas celého sexu, nielen na začiatku'),
    p('boz_po_orali', 'Bozk po oráli — ochutnať sa na perách partnera/ky'),
    p('boz_hlava_vlasy', 'Ťahanie za vlasy alebo držanie tváre pri bozku'),
    p('boz_ocny_kontakt', 'Bozkávanie s hlbokým pohľadom do očí'),
    {
      druh: 'otazka', id: 'boz_miera_vlhkosti', typ: 'jeden',
      text: 'Miera „vlhkosti" bozku, ktorá mi je príjemná',
      moznosti: [
        { v: 'suchsie', label: 'Skôr suchšie, jemné pery' },
        { v: 'jemne_vlhke', label: 'Jemne vlhké' },
        { v: 'velmi_vlhke', label: 'Veľmi vlhké, vášnivé' },
        { v: 'snowballing', label: '„Snowballing" — vedomé predávanie slín z úst do úst' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_predavanie_tekutin', typ: 'jeden',
      text: 'Predávanie tekutiny z úst do úst počas bozku (dúšok vína, šampanského, sladkého nápoja)',
      moznosti: [
        { v: 'robime', label: 'Už to robíme a som spokojný/á' },
        { v: 'tuzim', label: 'Túžim to vyskúšať' },
        { v: 'mozno', label: 'Možno, za istých okolností' },
        { v: 'nie', label: 'Nie, neláka ma to' },
      ],
    },
  ],
}

const BOZKY_TELO: Blok = {
  druh: 'skupina', id: 'bozky_telo', nadpis: 'Bozky — krk a telo',
  bloky: [
    {
      druh: 'otazka', id: 'boz_krk', typ: 'jeden',
      text: g(
        'Predstav si, že jej pery a zuby sa dotýkajú tvojho krku a ty len zavrieš oči. Ako vnímaš bozkávanie krku?',
        'Predstav si, že ti pery blúdia po krku a sem-tam jemne nasajú pokožku. Ako máš rada bozky na krku?',
      ),
      moznosti: [
        { v: 'jemne', label: 'Jemné, šteklivé bozky — príjemné uvoľnenie' },
        { v: 'intenzivne', label: 'Intenzívne sanie a hryzenie — vášeň a stopa' },
        { v: 'kombinacia', label: 'Kombinácia jemných a dravých, striedavo' },
        { v: 'nie', label: 'Nie, bozkávanie krku nevyhľadávam' },
      ],
    },
    { druh: 'otazka', id: 'boz_krk_ine', typ: 'text', text: 'Vlastná odpoveď — bozky na krk (voliteľné):' },

    p('boz_znacenie', 'Značenie (cumlík / hryznutie, ktoré zanechá stopu)'),
    {
      druh: 'otazka', id: 'boz_zony', typ: 'viac', inePovolene: true,
      text: g('Kde najradšej prijímam bozky', 'Ktoré miesta na tele mám rada, keď ma bozkáva'),
      moznosti: [
        { v: 'usi', label: 'Uši (bozkávanie, dýchanie, hryzenie lalôčikov)' },
        { v: 'bradavky', label: 'Hrudník a bradavky (bozky, jemné hryzenie)' },
        { v: 'brucho', label: 'Brucho (bozkávanie, sanie pokožky)' },
        { v: 'stehna', label: 'Vnútorné stehná' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'chrbat', label: 'Chrbát' },
        { v: 'kluc_kost', label: 'Kľúčna kosť' },
        { v: 'prsty', label: 'Prsty a dlaň' },
        { v: 'zatylok', label: 'Zátylok a lopatky' },
        { v: 'podbrusko', label: 'Podbruško tesne nad genitáliami' },
        { v: 'chodidla', label: 'Chodidlá a členky' },
        { v: 'nie', label: 'Nepreferujem bozky na iných miestach' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_intenzivne_hryzenie', typ: 'viac',
      text: 'Kde je intenzívne hryzenie OK',
      moznosti: [
        { v: 'bradavky', label: 'Bradavky' },
        { v: 'stehna', label: 'Stehná' },
        { v: 'krk', label: 'Krk' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'nikde', label: 'Nikde' },
      ],
    },
  ],
}

const BOZKY_TIPY: Blok = {
  druh: 'skupina', id: 'bozky_tipy', nadpis: 'Tipy a mýty o bozkávaní',
  bloky: [
    {
      druh: 'text', id: 'boz_vecer', nadpis: 'Večer bozkov',
      telo:
        'Zhasnite, zapáľte sviečky a sústreďte sa len na pery a jazyk. Začnite jemne na perách, pomaly prejdite na krk, uši a hrudník. ' +
        'Zaviažte partnerovi oči — so zavretými očami vníma každý dotyk citlivejšie. Striedajte jemné bozky, vášnivé sanie aj hryzenie, ' +
        'sledujte, kde sa mu/jej rozbúcha srdce najviac. Pridajte jemné ťahanie za vlasy alebo dýchnutie na pokožku po bozku.',
    },
    {
      druh: 'text', id: 'boz_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Po rokoch vzťahu sa bozkávanie prirodzene vytratí." — Realita: páry, ktoré sa denne bozkávajú dlhšie ako pár sekúnd, hlásia vyššiu spokojnosť aj chuť na sex. Stačí to vedome obnoviť. ' +
        'Mýtus: „Veľa jazyka = vášnivý bozk." — Realita: väčšina ľudí chce menej jazyka, než dostáva; vášeň robí tlak pier, tempo a pauzy. ' +
        'Mýtus: „Ochutnať sa po oráli je nechutné." — Realita: pre mnohých je to jeden z najintímnejších a najvzrušujúcejších momentov. Nie je za čo sa hanbiť. ' +
        'Mýtus: „Cumlík je trápny." — Realita: pre niekoho je stopa tajným znakom, ktorý pripomína noc ešte celý deň.',
    },
  ],
}

const BOZK_VEDENIE: Blok = {
  druh: 'skupina', id: 'bozk_vedenie', nadpis: 'Bozk ako vedenie',
  bloky: [
    p('boz_uchop_hlavy', 'Pevný úchop hlavy alebo vlasov pri bozku'),
    p('boz_zaciatok_dominancie', '„Povedz, že ma chceš, potom ťa pobozkám" — bozk ako začiatok dominancie'),
  ],
}

// ── Dotyky a maznanie ───────────────────────────────────────────────
const DOTYKY: Blok = {
  druh: 'skupina', id: 'dotyky', nadpis: 'Dotyky a maznanie',
  bloky: [
    {
      druh: 'otazka', id: 'dot_jemne', typ: 'viac',
      text: 'Jemné dotyky, ktoré ma lákajú',
      moznosti: [
        { v: 'tvar_vlasy', label: 'Prechádzanie prstami po tvári / vlasoch' },
        { v: 'pery', label: 'Obťahovanie pier' },
        { v: 'tvary', label: 'Kreslenie tvarov na koži' },
        { v: 'nechty_chrbat', label: 'Nechtami po chrbte' },
        { v: 'pierko', label: 'Pierko-ľahké dotyky' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_tlak', typ: 'viac',
      text: 'Tlak a stisk',
      moznosti: [
        { v: 'striedanie', label: 'Striedanie hladenia a pevného stisku' },
        { v: 'pazurik', label: '„Mačací pazúrik"' },
        { v: 'chytenie', label: 'Hrubšie chytenie' },
        { v: 'placnutie', label: 'Jemné plesknutie po zadku' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_zony', typ: 'viac',
      text: 'Zóny tela',
      moznosti: [
        { v: 'krk', label: 'Krk / ramená' },
        { v: 'chrbat', label: 'Chrbát / kríže' },
        { v: 'zadok', label: 'Zadok / stehná' },
        { v: 'lytka', label: 'Lýtka / chodidlá' },
        { v: 'brucho', label: 'Brucho' },
        { v: 'lakte', label: 'Vnútro lakťov a kolien' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_objatia', typ: 'viac',
      text: 'Objatia a blízkosť',
      moznosti: [
        { v: 'dlhe', label: 'Dlhé objatie' },
        { v: 'lyzicky', label: '„Lyžičky"' },
        { v: 'hrud', label: 'Hlava na hrudi' },
        { v: 'nohy', label: 'Prepletené nohy' },
        { v: 'vaha', label: 'Váha tela na mne' },
      ],
    },
    {
      druh: 'otazka', id: 'dot_kontext', typ: 'viac',
      text: 'Kontext maznania',
      moznosti: [
        { v: 'den', label: 'Nesexuálne počas dňa' },
        { v: 'predohra', label: 'Ako predohra' },
        { v: 'po_sexe', label: 'Po sexe' },
        { v: 'usinanie', label: 'Pri usínaní' },
        { v: 'film', label: 'Pri filme' },
      ],
    },
  ],
}

// ── Manuálna stimulácia — pre ňu ──────────────────────────────────
const MVN: Blok = {
  druh: 'skupina', id: 'mvn', nadpis: 'Manuálna stimulácia — vulva a vagína',
  bloky: [
    {
      druh: 'text', id: 'mvn_info', nadpis: 'Ruka vie meniť smer, tlak aj vrstvu stimulácie', ton: 'info',
      telo:
        'Manuálna stimulácia nemusí byť iba jeden pohyb na klitorise alebo vo vagíne. Vonkajší dotyk, tlak dlane na panvu a vnútorný pohyb sa dajú vrstviť alebo striedať. ' +
        'Najväčší rozdiel často neurobí nová technika, ale uhol prstov, stabilný rytmus a to, či sa pohyb tesne pred vrcholom nemení.',
    },
    {
      druh: 'otazka', id: 'mvn_klitoris', typ: 'viac', inePovolene: true,
      text: 'Klitoris (externé) — techniky',
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie' },
        { v: 'tahy', label: 'Horizontálne aj vertikálne ťahy' },
        { v: 'tapping', label: 'Ťukance („tapping")' },
        { v: 'orbit', label: '„Orbit" — okolo, nie priamo' },
        { v: 'kapucna', label: 'Jemné odkrytie kapucne' },
        { v: 'pinch_roll', label: '„Pinch & roll"' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_pysky', typ: 'viac',
      text: 'Pysky a vstup',
      moznosti: [
        { v: 'hladenie', label: 'Hladenie malých pyskov dnu / von' },
        { v: 'vframe', label: 'Jemné natiahnutie („V-frame")' },
        { v: 'kruzenie_vstup', label: 'Krúženie po vstupe' },
        { v: 'dip', label: 'Plytké „dip"' },
        { v: 'klzanie', label: 'Kĺzanie medzi pyskami' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod', typ: 'viac',
      text: 'G-bod a vnútorné body',
      moznosti: [
        { v: 'hook', label: '„Hook" — zahnuté prsty' },
        { v: 'pulzy', label: 'Pulzy' },
        { v: 'tahy', label: 'Drobné ťahy dopredu-dozadu' },
        { v: 'parovanie', label: 'Párovanie s klitorisom (externé + interné súbežne)' },
        { v: 'wave', label: '„Wave" (vlnka) zvnútra' },
        { v: 'tlak_dlane', label: 'Tlak dlane na podbrušku' },
        { v: 'a_bod', label: 'A-bod — hlboko na prednej stene pred krčkom' },
        { v: 'u_bod', label: 'U-bod — okolo ústia močovej trubice nad vstupom' },
        { v: 'fornix', label: 'Zadná klenba (posterior fornix) — hlboko vzadu za krčkom' },
      ],
    },
    {
      druh: 'text', id: 'mvn_gbod_info', nadpis: 'G-bod: uhol a opora', ton: 'info',
      telo:
        'Pri pohybe „hook" sa zahnuté prsty opierajú o prednú stenu vagíny smerom k pupku. Jedna ruka môže pracovať zvnútra a druhá stabilizovať podbruško alebo stimulovať klitoris. ' +
        'Niekto uprednostňuje malé pulzy na jednom mieste, iný dlhšie priťahovanie prstov, súvislý tlak alebo prestávky. Pocit nutkania na močenie môže byť súčasťou tejto stimulácie a nie je dôvodom na hanbu.',
    },
    {
      druh: 'otazka', id: 'mvn_gbod_uhol', typ: 'viac', inePovolene: true,
      text: 'Aký smer a pohyb na prednej stene ma láka',
      moznosti: [
        { v: 'hook', label: 'Zahnuté prsty smerom k pupku' },
        { v: 'pulzy', label: 'Krátke pulzy na jednom bode' },
        { v: 'pritahovanie', label: 'Rytmické priťahovanie „poď sem"' },
        { v: 'kruhy', label: 'Malé krúžky' },
        { v: 'zametanie', label: 'Pomalé prechádzanie po širšej ploche' },
        { v: 'drzanie', label: 'Súvislý tlak bez pohybu' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod_tlak', typ: 'jeden',
      text: 'Aký tlak mi pri vnútornej stimulácii najčastejšie vyhovuje',
      moznosti: [
        { v: 'jemny', label: 'Jemný a postupný' },
        { v: 'stredny', label: 'Stredný a stabilný' },
        { v: 'silny', label: 'Pevný a dôrazný' },
        { v: 'stupnovanie', label: 'Postupné zvyšovanie tlaku' },
        { v: 'striedanie', label: 'Striedanie tlaku a uvoľnenia' },
      ],
    },
    {
      druh: 'otazka', id: 'mvn_gbod_rytmus', typ: 'jeden',
      text: 'Čo mi pri stimulácii G-bodu vyhovuje viac',
      moznosti: [
        { v: 'staly', label: 'Stály rytmus bez prerušovania' },
        { v: 'pauzy', label: 'Krátke pauzy a návraty' },
        { v: 'vlny', label: 'Vlny od jemného po intenzívne' },
        { v: 'spatna_vazba', label: 'Priebežné prispôsobovanie podľa mojich reakcií' },
      ],
    },
    { druh: 'otazka', id: 'mvn_vlhkost', typ: 'jeden', text: '„Vlhkosť"', moznosti: VLHKOST },
    { druh: 'otazka', id: 'mvn_intenzita', typ: 'jeden', text: 'Intenzita', moznosti: INT5 },
    {
      druh: 'otazka', id: 'mvn_kombinacie', typ: 'viac',
      text: 'Kombinácie',
      moznosti: [
        { v: 'oral', label: 'Ruka + ústa (cunnilingus)' },
        { v: 'vibrator', label: 'Ruka + mini-vibrátor (nízka intenzita)' },
        { v: 'penetracia', label: 'Prsty počas penetrácie' },
      ],
    },
    {
      druh: 'text', id: 'mvn_odkaz', ton: 'info',
      telo: 'Polohy pre pohodlný prístup rúk sú v téme „Polohy", vibrátory a doplnky v téme „Erotické pomôcky a hračky".',
    },
    {
      druh: 'otazka', id: 'mvn_polohy', typ: 'viac',
      text: 'Polohy pre prístup',
      moznosti: [
        { v: 'chrbat', label: 'Na chrbte s vankúšom pod panvou' },
        { v: 'bok', label: 'Na boku' },
        { v: 'hrana', label: 'Hrana postele' },
      ],
    },
  ],
}

// ── Kombinácie a rituály ─────────────────────────────────────────────
// Zdroj uvádza len nadpisy „Kombinácie a rituály (keď chcete viac)" a
// „Prepojenie s masážou — aby sa telo uvoľnilo a hlava nestihla sabotovať
// zážitok". Obsah dotvorený.
const RUKY_RITUALY: Blok = {
  druh: 'skupina', id: 'ruky_ritualy', nadpis: 'Kombinácie a rituály s rukami',
  uvod: 'Masáž pred manuálnou stimuláciou uvoľní telo skôr, než hlava stihne sabotovať zážitok.',
  bloky: [
    p('rr_masaz_prechod', 'Masáž celého tela, ktorá plynulo prejde na genitálie'),
    p('rr_vzajomne', 'Vzájomná manuálna stimulácia naraz'),
    p('rr_vedenie_ruky', 'Položiť ruku na partnerovu a ukázať, ako to chcem'),
    p('rr_zozadu', 'Stimulácia zozadu v objatí (on/ona za mnou, ruka vpredu)'),
    p('rr_ranny', 'Ranné prebudenie rukou'),
    p('rr_verejne', 'Diskrétne pod dekou v kine, v aute, pod stolom'),
    p('rr_do_konca', 'Manuálna stimulácia až do orgazmu ako hlavný akt'),
    {
      druh: 'otazka', id: 'rr_tlakove_body', typ: 'viac', inePovolene: true,
      text: 'Ktoré oporné a tlakové body chcem zapojiť dlaňou alebo prstami',
      moznosti: [
        { v: 'panvove_hrebene', label: 'Panvové hrebene — pevný úchop alebo tlak palcov' },
        { v: 'bedra', label: 'Bedrá a boky — hnetenie a pritiahnutie' },
        { v: 'krize', label: 'Kríže a spodný chrbát — tlak dlaňou' },
        { v: 'stehna', label: 'Vnútorné stehná — dlhé ťahy a stisk' },
        { v: 'podbrusko', label: 'Podbruško — opora dlane pri vnútornej stimulácii' },
        { v: 'zadok', label: 'Zadok — stisk, hnetenie alebo roztiahnutie' },
      ],
    },
    {
      druh: 'text', id: 'rr_tlakove_body_info', nadpis: 'Ruky mimo genitálií', ton: 'info',
      telo:
        'Dlaň na krížoch, palce na panvových hrebeňoch alebo pevný úchop bokov môžu meniť držanie tela aj pocit vedenia. ' +
        'Takýto tlak môže byť jemnou oporou, súčasťou masáže alebo intenzívnym kontrastom k presnej stimulácii prstami.',
    },
    {
      druh: 'text', id: 'rr_myty', nadpis: 'Mýty', ton: 'info',
      telo:
        'Mýtus: „Ruky sú len náhrada, keď sa nedá sex." — Realita: pre väčšinu žien je ruka na klitorise najspoľahlivejšia cesta k orgazmu. ' +
        'Mýtus: „Rýchlejšie a silnejšie = lepšie." — Realita: kľúčom je neprerušený rovnaký rytmus tesne pred orgazmom; zmena tempa v tej chvíli ho často odoženie. ' +
        'Mýtus: „Handjob vie každý." — Realita: každý penis a každá vulva chce niečo iné; najrýchlejšie sa to naučíte, keď sa navzájom pozorujete pri masturbácii.',
    },
  ],
}

// ── Manuálna stimulácia — pre neho ───────────────────────────────
const MNP: Blok = {
  druh: 'skupina', id: 'mnp', nadpis: 'Manuálna stimulácia — penis a skrotum (handjob)',
  bloky: [
    {
      druh: 'text', id: 'mnp_info', nadpis: 'Handjob je samostatná technika, nie iba doplnok k orálu', ton: 'info',
      telo:
        'Úchop určuje plochu kontaktu, tlak určuje intenzitu a vlhkosť mení trenie. Pohyb môže viesť celou dlaňou po hriadeli, sústrediť sa na korunu žaluďa a uzdičku alebo spojiť dve ruky do rotácie. ' +
        'Sliny pôsobia inak než lubrikant: rýchlejšie vysychajú a vytvárajú premenlivejšie trenie, zatiaľ čo lubrikant podporuje dlhé plynulé ťahy. Handjob môže byť predohra, edging aj celý hlavný akt.',
    },
    {
      druh: 'otazka', id: 'mnp_uchopy', typ: 'viac', inePovolene: true,
      text: 'Úchopy',
      moznosti: [
        { v: 'ok', label: 'OK-grip' },
        { v: 'c', label: 'C-grip' },
        { v: 'barrel', label: '„Barrel" — celá dlaň' },
        { v: 'corkscrew', label: '„Corkscrew" — rotačný' },
        { v: 'ring', label: '„Ring" na žaluď' },
        { v: 'twist', label: 'Dvojrúčkový twist' },
        { v: 'base_squeeze', label: '„Base squeeze"' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_ciele', typ: 'viac',
      text: 'Cielené miesta',
      moznosti: [
        { v: 'koruna', label: 'Žaluď — koruna' },
        { v: 'frenulum', label: 'Uzdička (frenulum)' },
        { v: 'strany', label: 'Strany hriadeľa' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_pohyby', typ: 'viac',
      text: 'Pohyby a vzorce',
      moznosti: [
        { v: 'kruzenie', label: 'Krúženie po žaluďa' },
        { v: 'osmicky', label: '8-čka po dĺžke' },
        { v: 'squeeze_glide', label: '„Squeeze & glide"' },
        { v: 'edging', label: 'Stop-start (edging)' },
        { v: 'palec_frenulum', label: 'Palec po uzdičke pri každom ťahu' },
        { v: 'koruna_rotacia', label: 'Rotácia dlane cez korunu žaluďa' },
        { v: 'dve_ruky_opacne', label: 'Dve ruky rotujúce opačným smerom' },
        { v: 'kratke_spodok', label: 'Krátke ťahy len na spodnej strane hriadeľa' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_tlak', typ: 'jeden',
      text: 'Aký tlak pri handjobe mi vyhovuje',
      moznosti: [
        { v: 'lahky', label: 'Ľahký úchop a veľa kĺzania' },
        { v: 'stredny', label: 'Stredne pevný a rovnomerný' },
        { v: 'pevny', label: 'Pevný stisk' },
        { v: 'pulzy', label: 'Pulzujúce stláčanie a uvoľňovanie' },
        { v: 'striedanie', label: 'Striedanie tlaku podľa časti penisu' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_skrotum', typ: 'viac',
      text: 'Skrotum a okolie',
      moznosti: [
        { v: 'cradle', label: '„Cradle" — kolísanie' },
        { v: 'valcovanie', label: 'Jemné valcovanie semenníkov' },
        { v: 'tah_mieska', label: 'Ľahký ťah mieška' },
        { v: 'perineum', label: 'Perineum — kolmý tlak alebo krúženie palcom' },
      ],
    },
    {
      druh: 'text', id: 'mnp_perineum_info', nadpis: 'Hrádza ako most k prostate', ton: 'info',
      telo:
        'Hrádza medzi mieškom a análnym otvorom sa dá stimulovať bez penetrácie. Pomalé krúženie, tlak palcom, krátke pulzy alebo pevné podržanie môžu nepriamo pôsobiť na oblasť prostaty a vrstviť sa s pohybom ruky na penise.',
    },
    {
      druh: 'otazka', id: 'mnp_perineum_techniky', typ: 'viac', inePovolene: true,
      text: 'Aké techniky na hrádzi ma lákajú',
      moznosti: [
        { v: 'kruhy', label: 'Malé krúžky končekom prsta alebo palcom' },
        { v: 'tlak', label: 'Pevný kolmý tlak' },
        { v: 'pulzy', label: 'Krátke rytmické pulzy' },
        { v: 'drzanie', label: 'Tlak a podržanie bez pohybu' },
        { v: 's_handjobom', label: 'Súčasne s handjobom' },
        { v: 's_oralom', label: 'Súčasne s orálom' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_tempo', typ: 'jeden',
      text: 'Tempo',
      moznosti: [
        { v: 'pulzy', label: 'Krátke pulzy' },
        { v: 'tahy', label: 'Dlhé ťahy' },
        { v: 'striedanie', label: 'Striedanie' },
      ],
    },
    { druh: 'otazka', id: 'mnp_vlhkost', typ: 'jeden', text: '„Vlhkosť"', moznosti: VLHKOST },
    {
      druh: 'otazka', id: 'mnp_edging', typ: 'jeden',
      text: 'Start-stop / edging',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_polohy', typ: 'viac',
      text: 'Polohy',
      moznosti: [
        { v: 'stolicka', label: 'Sed na stoličke / kresle' },
        { v: 'chrbat', label: 'Ľah na chrbte' },
        { v: 'vedla', label: 'Vedľa seba (mutual)' },
      ],
    },
    {
      druh: 'otazka', id: 'mnp_finale', typ: 'jeden',
      text: 'Finále',
      moznosti: [
        { v: 'telo', label: 'Na telo' },
        { v: 'uterak', label: 'Do uteráka' },
        { v: 'usta', label: 'Do úst' },
        { v: 'nezalezi', label: 'Nezáleží' },
      ],
    },
  ],
}

// ── Stehná — teasing, tlak a kontrast ───────────────────────────────
const STEHNA: Blok = {
  druh: 'skupina', id: 'stehna', nadpis: 'Stehná — blízkosť, ktorá zvyšuje túžbu',
  uvod:
    'Vnútorné stehná sú silnou teasing zónou: dotyk sa môže približovať k intímnym miestam bez toho, aby na ne hneď prešiel. ' +
    'Bozky, dlaň, nechty, sanie aj hryzenie menia jemné očakávanie na intenzívnu energiu.',
  bloky: [
    {
      druh: 'text', id: 'steh_predstav',
      telo: g(
        'Predstav si pomalé bozky na vnútornej strane stehien, ktoré sa približujú a znovu vzďaľujú. Potom príde pevný tlak dlaní alebo krátke hryzenie.',
        'Predstav si pomalé bozky na vnútornej strane stehien, ktoré sa približujú a znovu vzďaľujú. Potom príde pevný tlak dlaní alebo krátke hryzenie.',
      ),
    },
    {
      druh: 'otazka', id: 'steh_techniky', typ: 'viac', inePovolene: true,
      text: g('Ako mám rád stimuláciu stehien?', 'Ako preferujem stimuláciu stehien?'),
      moznosti: [
        { v: 'hladenie', label: 'Pomalé hladenie dlaňou alebo končekmi prstov' },
        { v: 'bozky', label: 'Jemné bozky smerujúce k vnútornej strane stehien' },
        { v: 'sanie', label: 'Sanie pokožky a mokré bozky' },
        { v: 'hryzenie', label: 'Intenzívnejšie hryzenie' },
        { v: 'tlak', label: 'Pevný tlak a stláčanie dlaňami' },
        { v: 'skrabanie', label: 'Jemné až výrazné škrabanie nechtami' },
        { v: 'masaz', label: 'Hnetenie svalov a dlhé masážne ťahy' },
        { v: 'teplota', label: 'Teplý dych, olej alebo chladný kontrast' },
      ],
    },
    { druh: 'otazka', id: 'steh_techniky_ine', typ: 'text', text: 'Stimulácia stehien — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'steh_intenzita', typ: 'jeden',
      text: 'Akú intenzitu na stehnách preferujem',
      moznosti: [
        { v: 'jemna', label: 'Jemnú — bozky a ľahké hladenie' },
        { v: 'stredna', label: 'Strednú — masáž, sanie a pevnejší tlak' },
        { v: 'silna', label: 'Silnú — stisk, hryzenie a výrazné škrabanie' },
        { v: 'striedanie', label: 'Striedanie jemnej a intenzívnej energie' },
      ],
    },
    {
      druh: 'otazka', id: 'steh_kombinovanie', typ: 'jeden',
      text: 'Chcem na stehnách kombinovať viac techník',
      moznosti: [
        { v: 'ano', label: 'Áno — bozky, masáž, nechty aj tlak v jednej hre' },
        { v: 'podla_nalady', label: 'Možno, podľa nálady a intenzity' },
        { v: 'jedna', label: 'Radšej jednu techniku a stabilný rytmus' },
      ],
    },
    { druh: 'otazka', id: 'steh_kombinovanie_ine', typ: 'text', text: 'Moja ideálna kombinácia na stehnách (voliteľné):' },
    {
      druh: 'otazka', id: 'steh_teasing', typ: 'jeden',
      text: 'Ako dlho ma baví dráždenie stehien pred dotykom genitálií',
      moznosti: [
        { v: 'kratko', label: 'Krátko — pár bozkov a pokračovať' },
        { v: 'dlhsie', label: 'Dlhšie — chcem budovať očakávanie' },
        { v: 'navraty', label: 'Vracať sa k stehnám vo vlnách počas celého zážitku' },
        { v: 'samostatne', label: 'Stehná môžu byť samostatným centrom hry' },
      ],
    },
    {
      druh: 'text', id: 'steh_tipy_myty', nadpis: 'Tip a mýtus', ton: 'info',
      telo:
        'Tip: skús kontrast medzi sotva cítiacim dotykom nechtov, mokrým bozkom a pevným stiskom tesne nad kolenom; potom postupuj vyššie a znovu sa vráť. ' +
        'Mýtus: stehná sú iba cesta ku genitáliám. Realita: pre mnohých sú samostatnou erotogénnou zónou a dlhé dráždenie stehien je vzrušujúcejšie než rýchly presun k „hlavnej" stimulácii.',
    },
  ],
}

// ── Spoločné zóny ─────────────────────────────────────────────
const SPOL_ZONY: Blok = {
  druh: 'skupina', id: 'spol_zony', nadpis: 'Spoločné zóny (bradavky, zadok, stehná, chodidlá)',
  bloky: [
    {
      druh: 'otazka', id: 'sz_bradavky', typ: 'viac',
      text: 'Bradavky',
      moznosti: [
        { v: 'hladenie', label: 'Hladenie a krúženie končekmi prstov' },
        { v: 'lick', label: 'Lízanie' },
        { v: 'flick', label: 'Šľahanie jazykom / prstom' },
        { v: 'sanie', label: 'Sanie perami' },
        { v: 'roll', label: 'Rolovanie medzi prstami' },
        { v: 'pinch', label: 'Štípanie (nastaviteľný tlak / čas)' },
        { v: 'tapkanie', label: 'Jemné alebo rytmické ťapkanie' },
        { v: 'twist_pull', label: 'Jemné pootočenie a potiahnutie' },
        { v: 'hryzenie', label: 'Hryzenie — jemné až intenzívne' },
        { v: 'vibracia', label: 'Vibrácia alebo pulzujúca pomôcka' },
        { v: 'teplota', label: 'Párovanie s teplotou (ľad / teplý olej)' },
        { v: 'textury', label: 'Textúry látok' },
        { v: 'striedanie', label: 'Striedanie jazyka, pier, prstov a teploty' },
        { v: 'nie', label: 'Stimulácia tejto oblasti ma neláka' },
      ],
    },
    { druh: 'otazka', id: 'sz_bradavky_ine', typ: 'text', text: 'Stimulácia pŕs alebo bradaviek — vlastná odpoveď (voliteľné):' },
    {
      druh: 'otazka', id: 'sz_bradavky_citlivost', typ: 'jeden',
      text: 'Akú citlivosť bradaviek u seba vnímam',
      moznosti: [
        { v: 'velmi_citlive', label: 'Veľmi citlivé — najviac mi sedí jemnosť' },
        { v: 'stredne', label: 'Stredne citlivé — baví ma široké rozpätie' },
        { v: 'silny_tlak', label: 'Potrebujem silnejší tlak alebo intenzitu' },
        { v: 'rozdielne', label: 'Každá strana reaguje inak' },
        { v: 'neutralne', label: 'Skôr neutrálna zóna' },
      ],
    },
    {
      druh: 'otazka', id: 'sz_bradavky_nastroj', typ: 'jeden',
      text: 'Čo mi pri stimulácii bradaviek vyhovuje najviac',
      moznosti: [
        { v: 'jazyk_pery', label: 'Jazyk a pery' },
        { v: 'prsty', label: 'Prsty a dlaň' },
        { v: 'pomocka', label: 'Vibrácia alebo iná pomôcka' },
        { v: 'mix', label: 'Kombinácia a striedanie' },
        { v: 'nelaka', label: 'Táto stimulácia ma neláka' },
      ],
    },
    {
      druh: 'text', id: 'sz_bradavky_tipy', nadpis: 'Bradavky: experiment a mýtus', ton: 'info',
      telo:
        'Skúste krátky experiment so zatvorenými očami: rovnaký pohyb najprv jazykom, potom prstami, raz pomaly a raz intenzívnejšie. Porovnajte aj ľavú a pravú stranu — citlivosť nemusí byť rovnaká. ' +
        'Mýtus: bradavky sú erotickou zónou iba u žien. Realita: citlivosť je individuálna bez ohľadu na pohlavie a môže siahať od takmer neutrálnej až po veľmi intenzívnu.',
    },
    {
      druh: 'otazka', id: 'sz_zadok', typ: 'viac',
      text: 'Zadok (bez penetrácie)',
      moznosti: [
        { v: 'hladenie', label: 'Jemné hladenie / masáž' },
        { v: 'skrabkanie', label: 'Škrabkanie' },
        { v: 'placanie', label: 'Hravé plácanie (1–3)' },
      ],
    },
    p('sz_stehna', 'Pomalé približovanie k genitáliám („teasing"), vlnenie tlakom dlane cez panvu'),
    {
      druh: 'otazka', id: 'sz_chodidla', typ: 'viac',
      text: 'Chodidlá a prsty',
      moznosti: [
        { v: 'masaz', label: 'Masáž' },
        { v: 'stlacanie', label: 'Stláčanie' },
        { v: 'skrabkanie', label: 'Jemné škrabkanie' },
        { v: 'doplnky', label: 'Senzorické doplnky (štetec, hodváb)' },
      ],
    },
    { druh: 'otazka', id: 'sz_vynechat', typ: 'text', text: 'Ktoré zóny určite vynechať:' },
  ],
}

// ── Tempo, rytmus a edging ───────────────────────────────────
const TEMPO: Blok = {
  druh: 'skupina', id: 'tempo', nadpis: 'Tempo, rytmus a edging',
  bloky: [
    p('tempo_vlny', 'Budovanie vĺn — pomalý nábeh → držanie napätia → útlm → nový nábeh'),
    {
      druh: 'otazka', id: 'tempo_startstop', typ: 'jeden',
      text: 'Start-stop (krátke pauzy pri 7–8/10 vzrušenia)',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'podmienky', label: 'Za podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    p('tempo_zmena_vzorca', 'Prepnúť vzorec pohybu / úchop v „žltých" zónach vzrušenia'),
    {
      druh: 'otazka', id: 'tempo_signaly', typ: 'viac',
      text: 'Signály počas hry',
      moznosti: [
        { v: 'dych', label: 'Dýchanie' },
        { v: 'pridaj', label: '„Pridaj / uber"' },
        { v: 'slova', label: 'Krátke kľúčové slová' },
      ],
    },
  ],
}

// ── Celotelová mapa dotykov ─────────────────────────────────────
// Doplnené z „dotaznik.xlsx" list „5) Zónové mapy tela" — chýbajúci
// systematický nástroj na zmapovanie celého tela, nie len jednotlivých zón.
const CELOTELOVA_MAPA: Blok = {
  druh: 'skupina', id: 'celotelova_mapa', nadpis: 'Celotelová mapa dotykov',
  bloky: [
    {
      druh: 'text', id: 'map_info', ton: 'info',
      telo: 'Rýchla mapa tela rozlišuje erotické, neutrálne a premenlivo citlivé zóny. Pomáha odhaliť aj miesta mimo genitálií, ktoré bývajú prehliadané.',
    },
    { druh: 'otazka', id: 'map_eroticke', typ: 'text', text: '5 zón, ktoré sú pre mňa najviac erotické:' },
    { druh: 'otazka', id: 'map_neutralne', typ: 'text', text: '5 zón, ktoré sú príjemné ako blízkosť, ale sex nespúšťajú:' },
    { druh: 'otazka', id: 'map_citlive', typ: 'text', text: '5 zón, ktoré sú citlivé len niekedy (po športe, po sprche, pri únave, po orgazme) — a kedy presne:' },
    { druh: 'otazka', id: 'map_nikdy', typ: 'text', text: '3 zóny, ktoré ma zvyčajne nechávajú chladným/chladnou:' },
    { druh: 'otazka', id: 'map_booster', typ: 'text', text: 'Top 3 miesta mimo genitálií, ktoré ma najrýchlejšie vzrušia:' },
    {
      druh: 'otazka', id: 'map_signaly_prilis', typ: 'viac',
      text: 'Ako telo najčastejšie ukazuje, že chce zmenu rytmu alebo intenzity',
      moznosti: [
        { v: 'dych', label: 'Zmenou dychu' },
        { v: 'napatie', label: 'Napätím alebo uvoľnením svalov' },
        { v: 'pohyb_panvy', label: 'Pohybom panvy' },
        { v: 'pritiahnutie', label: 'Pritiahnutím bližšie' },
        { v: 'vedenie_ruky', label: 'Vedením partnerovej ruky' },
        { v: 'radsej_slovo', label: 'Najradšej to poviem priamo' },
      ],
    },
  ],
}

// ── Senzorické doplnky ───────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Senzorické doplnky',
  bloky: [
    {
      druh: 'otazka', id: 'sen_textury', typ: 'viac',
      text: 'Senzorické doplnky',
      moznosti: [
        { v: 'hodvab', label: 'Hodváb' },
        { v: 'pierko', label: 'Pierko' },
        { v: 'koza', label: 'Koža' },
        { v: 'svieca', label: 'Masážne sviečky' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_teplota', typ: 'viac',
      text: 'Teplota',
      moznosti: [
        { v: 'lad', label: 'Ľad' },
        { v: 'teple_ruky', label: 'Teplé ruky' },
        { v: 'oleje', label: 'Oleje' },
      ],
    },
    { druh: 'otazka', id: 'sen_teplota_zony', typ: 'text', text: 'Teplotné hry — kde na tele áno / nie:' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'Senzorické kombinácie, ktoré ma lákajú najviac:' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'Kombinácie, ktoré by som skúsil(a) podľa nálady:' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'Textúry alebo teploty, ktoré ma skôr nechávajú chladným/chladnou:' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Môj vlastný ideálny senzorický mix (1–3 vety):' },
  ],
}

export const BOZKY_DOTYKY: TemaObsah = {
  slug: 'bozky/bozky',
  nadpis: 'Bozky, dotyky a manuálna stimulácia',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Od jemných bozkov po dravé dotyky',
      telo:
        'Bozky, dotyky a ruky sú základ, na ktorom stojí zvyšok. Vysoká variabilita a jemná kontrola intenzity — ' +
        'od jemného „motýlieho" bozku po pevný úchop hlavy, od pierka po výrazný stisk.',
    },
    {
      druh: 'text', id: 'ramec_ruk', nadpis: 'Technika rúk', ton: 'info',
      telo:
        'Vlhkosť mení charakter pohybu: nasucho vzniká viac trenia, sliny dávajú krátke kĺzanie a lubrikant podporuje dlhšie plynulé ťahy. ' +
        'Teplé dlane, olej, ľad alebo textília pridávajú ďalšiu vrstvu kontrastu.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'viac',
      text: 'Čo z tejto oblasti chceš preskúmať?',
      napoveda: 'Rýchly prehľad — detaily nižšie. Môžeš označiť viac.',
      moznosti: [
        { v: 'bozky', label: 'Bozky (ústa, krk, telo, francúzske)' },
        { v: 'dotyky', label: 'Dotyky a maznanie' },
        { v: 'bozk_vedenie', label: 'Bozk ako vedenie / dominancia' },
        { v: 'mvn', label: 'Manuálna stimulácia — vulva a vagína' },
        { v: 'mnp', label: 'Manuálna stimulácia — penis a skrotum' },
        { v: 'spol_zony', label: 'Spoločné zóny (bradavky, zadok, stehná, chodidlá)' },
      ],
    },
    BOZKY_USTA,
    BOZKY_TELO,
    BOZKY_TIPY,
    BOZK_VEDENIE,
    DOTYKY,
    MVN,
    MNP,
    RUKY_RITUALY,
    STEHNA,
    SPOL_ZONY,
    CELOTELOVA_MAPA,
    TEMPO,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zvýraznia zhodné zóny, techniky a intenzitu dotyku, ktoré môžete ďalej preskúmať.',
    },
  ],
}
