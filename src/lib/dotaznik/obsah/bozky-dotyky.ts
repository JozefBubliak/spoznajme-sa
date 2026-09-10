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
  { v: 'nie', label: 'Nie — hranica' },
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
const BOZKY_USTA: Blok = {
  druh: 'skupina', id: 'bozky_usta', nadpis: 'Bozky — ústa',
  bloky: [
    {
      druh: 'otazka', id: 'boz_usta', typ: 'jeden',
      text: 'Ako mám rád(a) bozky na ústa',
      moznosti: [
        { v: 'jemne', label: 'Jemné a krátke' },
        { v: 'vasnive', label: 'Intenzívne a vášnivé' },
        { v: 'kombinacia', label: 'Kombinácia jemných a intenzívnych' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_francuzske', typ: 'jeden',
      text: 'Francúzske bozky (jazyk)',
      moznosti: [
        { v: 'ano', label: 'Áno, milujem to' },
        { v: 'obcas', label: 'Občas, závisí na situácii' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'boz_hryzenie_pier', typ: 'jeden',
      text: 'Hryzenie pier počas bozkávania',
      moznosti: [
        { v: 'milujem', label: 'Milujem jemné hryzenie pier — je to vzrušujúce' },
        { v: 'obcas', label: 'Občas to akceptujem, ale nie vždy' },
        { v: 'nie', label: 'Nie, nie je mi to príjemné' },
      ],
    },
    p('boz_ocny_kontakt', 'Bozkávanie s hlbokým pohľadom do očí'),
  ],
}

const BOZKY_TELO: Blok = {
  druh: 'skupina', id: 'bozky_telo', nadpis: 'Bozky — krk a telo',
  bloky: [
    {
      druh: 'otazka', id: 'boz_krk', typ: 'jeden',
      text: 'Bozky na krk',
      moznosti: [
        { v: 'jemne', label: 'Jemné bozky' },
        { v: 'intenzivne', label: 'Intenzívne sanie a vášnivé hryzenie' },
        { v: 'kombinacia', label: 'Kombinácia jemných a intenzívnejších techník' },
        { v: 'nie', label: 'Nie, bozkávanie krku nevyhľadávam' },
      ],
    },
    p('boz_znacenie', 'Značenie (cumlík / hryznutie, ktoré zanechá stopu)'),
    {
      druh: 'otazka', id: 'boz_zony', typ: 'viac', inePovolene: true,
      text: 'Ktoré časti tela sú príjemné na bozkávanie',
      moznosti: [
        { v: 'usi', label: 'Uši (bozkávanie, jemné hryzenie)' },
        { v: 'brucho', label: 'Brucho (bozkávanie, sanie pokožky)' },
        { v: 'stehna', label: 'Vnútorné stehná' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'chrbat', label: 'Chrbát' },
        { v: 'kluc_kost', label: 'Kľúčna kosť' },
        { v: 'prsty', label: 'Prsty a dlaň' },
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

// ── Manuálna stimulácia — pre neho ───────────────────────────────
const MNP: Blok = {
  druh: 'skupina', id: 'mnp', nadpis: 'Manuálna stimulácia — penis a skrotum (handjob)',
  bloky: [
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

// ── Spoločné zóny ─────────────────────────────────────────────
const SPOL_ZONY: Blok = {
  druh: 'skupina', id: 'spol_zony', nadpis: 'Spoločné zóny (bradavky, zadok, stehná, chodidlá)',
  bloky: [
    {
      druh: 'otazka', id: 'sz_bradavky', typ: 'viac',
      text: 'Bradavky',
      moznosti: [
        { v: 'lick', label: 'Lízanie' },
        { v: 'flick', label: 'Šľahanie jazykom / prstom' },
        { v: 'roll', label: 'Rolovanie medzi prstami' },
        { v: 'pinch', label: 'Štípanie (nastaviteľný tlak / čas)' },
        { v: 'teplota', label: 'Párovanie s teplotou (ľad / teplý olej)' },
        { v: 'textury', label: 'Textúry látok' },
      ],
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

// ── Senzorika + rámec ────────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Senzorika, rámec a poznámky',
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
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
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
      druh: 'text', id: 'ramec_ruk', nadpis: 'Rámec rúk a signály', ton: 'info',
      telo:
        'Krátke nechty, čisté ruky alebo rukavice, teplé dlane. „Vlhkosť" je parameter techniky — nasucho / sliny / lubrikant. ' +
        'Stupnica dotyku (veľmi jemné → výrazné) + jednoduché „OK / pridaj / uber / stop". ' +
        'Teplota (ľad / teplé ruky / oleje) — dohodnúť, kde na tele áno a kde nie. Uteráky a lubrikant poruke.',
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
    BOZK_VEDENIE,
    DOTYKY,
    MVN,
    MNP,
    SPOL_ZONY,
    TEMPO,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
