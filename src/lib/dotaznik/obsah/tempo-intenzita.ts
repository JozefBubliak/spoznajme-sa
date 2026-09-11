import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Tempo, intenzita a orgazmus — modul D4 „Tempo, rytmus a choreografia".
// Zdroj: „19_Tempo_intenzita_a_orgazmus.docx". Spoločný slovník intenzity
// (tlak/tempo/hĺbka/plocha/trvanie), mechanika „vlnenia" (waving), stop-start
// a edging protokoly (sólový aj partnerský), denné teasing mosty, hotové
// scenáre vĺn (15/30/45 min), bezpečnosť a aftercare. Konkrétne techniky
// podľa zóny (vulva/klitoris, penis, G-bod, prostata, bradavky, anál) majú
// vlastné podrobné témy — bozky-dotyky.ts, analna-penetracia.ts; hračky a ich
// vibračné programy — pomocky-hracky.ts; zmysly/teplota/zvuk počas vĺn —
// zmyslova-hra.ts. Tu je len rámec tempa a intenzity naprieč všetkými.
// z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'pacim', label: 'Páči sa mi to' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'nie', label: 'Nie — hranica' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})
const INTEN3: Moznost[] = [
  { v: 'jemna', label: 'Jemná' },
  { v: 'stredna', label: 'Stredná' },
  { v: 'silnejsia', label: 'Silnejšia' },
  { v: 'striedanie', label: 'Striedanie' },
]

// ── Parametre intenzity — spoločný slovník ────────────────────────────
const PARAMETRE: Blok = {
  druh: 'skupina', id: 'parametre', nadpis: 'Parametre intenzity — spoločný slovník',
  bloky: [
    {
      druh: 'text', id: 'par_info', ton: 'info',
      telo:
        'Aby sme sa vedeli rýchlo dohodnúť, oplatí sa mať spoločné slová pre to, čo práve meníme: ' +
        'tlak, tempo, hĺbka, plocha dotyku (bodovo vs. plošne), trvanie a prestávky.',
    },
    { druh: 'otazka', id: 'par_default_ruky', typ: 'jeden', text: 'Moja defaultná intenzita pri rukách / ústach', moznosti: INTEN3 },
    { druh: 'otazka', id: 'par_default_hracky', typ: 'jeden', text: 'Moja defaultná intenzita pri hračkách', moznosti: INTEN3 },
    {
      druh: 'otazka', id: 'par_plocha', typ: 'jeden',
      text: 'Bodové vs. plošné dráždenie',
      moznosti: [
        { v: 'bodove', label: 'Radšej bodovo, presne na jedno miesto' },
        { v: 'plosne', label: 'Radšej plošne, širšia oblasť' },
        { v: 'kombinacia', label: 'Kombinácia / striedanie' },
      ],
    },
  ],
}

// ── Vlny („waving") ────────────────────────────────────────────────────
const VLNY: Blok = {
  druh: 'skupina', id: 'vlny', nadpis: 'Vlny — striedanie stupňovania a uvoľnenia',
  bloky: [
    {
      druh: 'text', id: 'vlny_info',
      telo:
        'Namiesto lineárneho stúpania k vrcholu: striedanie približne 60–120 sekúnd stupňovania a 15–30 sekúnd ' +
        'uvoľnenia, opakované v niekoľkých cykloch. Predlžuje zážitok a zosilňuje záverečný vrchol.',
    },
    {
      druh: 'otazka', id: 'vln_cykly', typ: 'jeden',
      text: 'Koľko cyklov vĺn zvyčajne chcem',
      moznosti: [
        { v: '1_2', label: '1–2 cykly' },
        { v: '3_5', label: '3–5 cyklov' },
        { v: 'viac', label: 'Viac, mám rád(a) dlhé stupňovanie' },
      ],
    },
    { druh: 'otazka', id: 'vln_dlzka', typ: 'text', text: 'Moja ideálna dĺžka jednej vlny (v sekundách/minútach):' },
  ],
}

// ── Stop-start a edging ────────────────────────────────────────────────
const EDGING: Blok = {
  druh: 'skupina', id: 'edging', nadpis: 'Stop-start a edging',
  bloky: [
    {
      druh: 'otazka', id: 'edg_typ', typ: 'jeden',
      text: 'Aký typ edgingu mi vyhovuje',
      moznosti: [
        { v: 'soft', label: 'Soft — krátke, jemné prerušenia' },
        { v: 'hard', label: 'Hard — viacnásobné, výrazné „takmer-vrcholy"' },
        { v: 'nie', label: 'Radšej bez edgingu, priamo k vrcholu' },
      ],
    },
    {
      druh: 'otazka', id: 'edg_kto_rozhoduje', typ: 'jeden',
      text: 'Kto rozhoduje o pauze',
      moznosti: [
        { v: 'ja', label: 'Ja sám/sama' },
        { v: 'partner', label: 'Partner/ka' },
        { v: 'striedavo', label: 'Striedavo, podľa scény' },
      ],
    },
    p('edg_ruined', '„Ruined" orgazmus (prerušené vyvrcholenie bez plného uvoľnenia) ma zaujíma'),
    { druh: 'otazka', id: 'edg_max_pocet', typ: 'text', text: 'Maximálny počet „takmer-vrcholov", ktorý chcem (ak vôbec):' },
  ],
}

// ── Edging protokoly — sólový a partnerský ────────────────────────────
const PROTOKOLY: Blok = {
  druh: 'skupina', id: 'protokoly', nadpis: 'Edging protokoly',
  bloky: [
    {
      druh: 'otazka', id: 'pro_solovy', typ: 'viac',
      text: 'Sólový protokol — čo mi pomáha',
      moznosti: [
        { v: 'casovac', label: 'Časovač / počítanie takmer-vrcholov' },
        { v: 'dych', label: 'Dych ako metronóm tempa' },
        { v: 'reset_pauzy', label: '„Reset" pauzy medzi vlnami' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_partnersky', typ: 'viac',
      text: 'Partnerský protokol — čo ma láka',
      moznosti: [
        { v: 'riadi_tempo', label: 'Partner/ka riadi tempo, ja len prijímam' },
        { v: 'zakaz_dotyku', label: 'Zákaz dotyku pre prijímajúceho (ruky preč)' },
        { v: 'odmena', label: 'Odmena za trpezlivosť na konci' },
      ],
    },
    {
      druh: 'otazka', id: 'pro_teasing_den', typ: 'viac',
      text: '„Mosty" počas dňa — teasing pred večerom',
      moznosti: [
        { v: 'sprava', label: 'Dráždivá správa' },
        { v: 'oblecenie', label: 'Čiastočné odhalenie / dráždenie cez bielizeň' },
        { v: 'nie', label: 'Nie, radšej bez toho počas dňa' },
      ],
    },
    { druh: 'otazka', id: 'pro_polohy', typ: 'text', text: 'Ktoré polohy nám najviac uľahčujú kontrolu tempa (napr. cowgirl, lyžičky, okraj postele):' },
  ],
}

// ── Signály počas vĺn ──────────────────────────────────────────────────
const SIGNALY: Blok = {
  druh: 'skupina', id: 'signaly', nadpis: 'Signály počas vĺn',
  bloky: [
    {
      druh: 'otazka', id: 'sig_system', typ: 'jeden',
      text: 'Rýchle signály „pridaj / uber / stop"',
      moznosti: [
        { v: 'slova', label: 'Slová' },
        { v: 'semafor', label: 'Semafor farbami' },
        { v: 'gesto', label: 'Gesto / stisk ruky' },
      ],
    },
    p('sig_zmysly', 'Chcem si počas vĺn vedome (ne)vidieť / (ne)počuť — páska alebo slúchadlá zvýrazňujú dotyk'),
  ],
}

// ── Hotové scenáre vĺn ─────────────────────────────────────────────────
const SCENARE: Blok = {
  druh: 'skupina', id: 'scenare', nadpis: 'Hotové scenáre vĺn (session card)',
  bloky: [
    {
      druh: 'text', id: 'scenare_info',
      telo:
        'Tri rýchle šablóny na vyskúšanie — voliteľné, dajú sa upraviť podľa chuti.',
    },
    {
      druh: 'otazka', id: 'sce_kratka', typ: 'jeden',
      text: '„Krátka vlna" (~15 min): 3× (90 s stupňovanie → 20 s pauza), koniec pri cca 70 % bez vrcholu, 2 min aftercare',
      moznosti: [
        { v: 'chcem', label: 'Chcem to vyskúšať' },
        { v: 'mozno', label: 'Možno niekedy' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    {
      druh: 'otazka', id: 'sce_dvojita', typ: 'jeden',
      text: '„Dvojitá vlna" (~30 min): dve zóny striedavo + teplotný kontrast v druhej vlne, finále voliteľné',
      moznosti: [
        { v: 'chcem', label: 'Chcem to vyskúšať' },
        { v: 'mozno', label: 'Možno niekedy' },
        { v: 'nie', label: 'Nie je to pre mňa' },
      ],
    },
    { druh: 'otazka', id: 'sce_frekvencia', typ: 'jeden', text: 'Ako často by som chcel(a) mať vyslovene „teasing deň" bez vrcholu',
      moznosti: [
        { v: 'casto', label: 'Často' },
        { v: 'obcas', label: 'Občas' },
        { v: 'nikdy', label: 'Nikdy' },
      ],
    },
  ],
}

// ── Bezpečnosť, aftercare, debrief ─────────────────────────────────────
const BEZPECNOST: Blok = {
  druh: 'skupina', id: 'bezpecnost', nadpis: 'Bezpečnosť, aftercare, debrief',
  bloky: [
    {
      druh: 'text', id: 'bez_info', ton: 'vystraha',
      telo:
        'Hra s dychom / škrtenie sa neodporúča ako spôsob zvyšovania intenzity — na zosilnenie zážitku slúžia ' +
        'zmysly, teplota a tempo, nie obmedzenie dýchania.',
    },
    { druh: 'otazka', id: 'bez_tvrde_nie', typ: 'text', text: 'Naše tvrdé NIE pri stupňovaní intenzity:' },
    {
      druh: 'otazka', id: 'bez_aftercare', typ: 'viac',
      text: 'Aftercare po intenzívnejšej vlne',
      moznosti: [
        { v: 'napoj', label: 'Nápoj' },
        { v: 'prikrytie', label: 'Prikrytie' },
        { v: 'dotyk', label: 'Krátky dotyk' },
        { v: 'debrief', label: '„2+2" debrief (2 veci super, 2 na úpravu)' },
      ],
    },
  ],
}

export const TEMPO_INTENZITA: TemaObsah = {
  slug: 'tempo-rytmus-choreografia/tempo-rytmus-choreografia',
  nadpis: 'Tempo, intenzita a orgazmus',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Spoločný jazyk pre intenzitu',
      telo:
        'Namiesto priameho stúpania k vrcholu je často vzrušujúcejšie vedome pracovať s vlnami — striedaním ' +
        'stupňovania a uvoľnenia. Táto téma dáva spoločný slovník a niekoľko hotových scenárov na vyskúšanie.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiace témy', ton: 'info',
      telo:
        'Konkrétne techniky podľa zóny (ruky, ústa, hračky) majú vlastné podrobné témy „Bozky, dotyky a manuálna ' +
        'stimulácia", „Anál a stimulácia zadku", „Vibrátory a stimulátory" a „Zmyslová hra".',
    },
  ],
  telo: [
    PARAMETRE,
    VLNY,
    EDGING,
    PROTOKOLY,
    SIGNALY,
    SCENARE,
    BEZPECNOST,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
