import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Roleplay a scenáre — modul F8 „Roleplay a scenáre (bez tretej osoby)".
// Zdroj: „20_Roleplay_a_scenare". Výber rolí, edge roly (screening), dynamika,
// rozsah scény, kostýmy a rekvizity, atmosféra, senzorika, neštandardné
// rituály, kombinácie, skupinové prvky, mini-scenáre, rámec. z/m zrkadlová.
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

// ── Výber rolí ───────────────────────────────────────────────────────
const ROLY: Blok = {
  druh: 'skupina', id: 'roly', nadpis: 'Výber rolí',
  bloky: [
    {
      druh: 'otazka', id: 'roly_profesijne', typ: 'viac', inePovolene: true,
      text: 'Profesijné roly (výslovne len dospelé)',
      moznosti: [
        { v: 'ucitel', label: 'Učiteľ/ka – študent/ka' },
        { v: 'sef', label: 'Šéf/ka – asistent/ka' },
        { v: 'policajt', label: 'Policajt/ka – zadržaný/á' },
        { v: 'lekar', label: 'Lekár/ka – pacient/ka' },
        { v: 'trener', label: 'Prísny tréner' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_domace', typ: 'viac', inePovolene: true,
      text: 'Domáce scenáre',
      moznosti: [
        { v: 'majster', label: 'Majster/ka – sluha/žka' },
        { v: 'opravar', label: 'Opravár/ka' },
        { v: 'sused', label: 'Sused/ka' },
        { v: 'sluzobnicka', label: '„Služobníčka"' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_romanticke', typ: 'viac', inePovolene: true,
      text: 'Romantické a „soft" roly',
      moznosti: [
        { v: 'zvodca', label: 'Zvodca / plynulé zvádzanie' },
        { v: 'pickup', label: 'Neznámi v bare („pick-up")' },
        { v: 'odlucenie', label: 'Dlho odlúčení' },
        { v: 'pribeh_dotyky', label: 'Jednoduché „príbeh + dotyky"' },
      ],
    },
    {
      druh: 'otazka', id: 'roly_fantazijne', typ: 'viac', inePovolene: true,
      text: 'Fantázijné a hrdinské',
      moznosti: [
        { v: 'superhrdinovia', label: 'Superhrdinovia' },
        { v: 'masky', label: 'Masky' },
        { v: 'historicke', label: 'Historické / kostýmové' },
        { v: 'scifi', label: 'Sci-fi / fantasy' },
      ],
    },
    { druh: 'otazka', id: 'roly_vlastna', typ: 'text', text: 'Vlastná rola alebo scenár:' },
    { druh: 'otazka', id: 'roly_top3', typ: 'text', text: 'Moje 3 najlákavejšie roly (priorita):' },
  ],
}

// ── Edge roly — len screening ──────────────────────────────────────
const EDGE: Blok = {
  druh: 'skupina', id: 'edge', nadpis: 'Edge roly — len screening',
  uvod: 'Tieto roly majú vysoké riziko. Nižšie je len záujem, nie návod. Do reality len s detailným protokolom a hard-stopmi; výhradne dospelé roly.',
  bloky: [
    {
      druh: 'otazka', id: 'edge_cnc', typ: 'jeden',
      text: 'Hrané znásilnenie (CNC — consensual non-consent)',
      moznosti: [
        { v: 'fantazia', label: 'Láka ma ako fantázia' },
        { v: 'scena', label: 'Ako scéna s detailným protokolom a hard-stopmi' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'edge_spanok', typ: 'jeden',
      text: 'Predstieranie spánku (jemné dotyky „spiaceho" tela)',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'podmienky', label: 'Len za jasných podmienok' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'edge_vek', typ: 'jeden',
      text: 'Vekové role (Daddy/Little, „mladší/starší") — len ako roleplay dospelých',
      moznosti: [
        { v: 'laka', label: 'Láka ma to' },
        { v: 'neutralne', label: 'Neutrálne' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Dynamika ─────────────────────────────────────────────────────
const DYNAMIKA: Blok = {
  druh: 'skupina', id: 'dynamika', nadpis: 'Dynamika moci',
  bloky: [
    {
      druh: 'otazka', id: 'dyn_volba', typ: 'jeden',
      text: 'Akú dynamiku pri roleplay preferujem',
      moznosti: [
        { v: 'dom', label: 'Dominantnú' },
        { v: 'sub', label: 'Submisívnu' },
        { v: 'rovnocenna', label: 'Rovnocennú' },
        { v: 'scenar', label: 'Záleží od scenára' },
      ],
    },
    p('dyn_switch', 'Switch — prepínať role počas scény'),
    { druh: 'otazka', id: 'dyn_vediem_v', typ: 'text', text: 'V ktorých rolách chcem viesť:' },
    { druh: 'otazka', id: 'dyn_prijimam_v', typ: 'text', text: 'V ktorých rolách chcem prijímať:' },
    {
      druh: 'otazka', id: 'dyn_light_prvky', typ: 'viac',
      text: 'Mocenské prvky „light"',
      moznosti: [
        { v: 'prikazy', label: 'Príkazy' },
        { v: 'pochvala', label: 'Pochvala a odmena' },
        { v: 'protokoly', label: 'Jemné protokoly' },
        { v: 'disciplinovanie', label: 'Disciplinovanie' },
      ],
    },
  ],
}

// ── Rozsah scény ────────────────────────────────────────────────
const ROZSAH: Blok = {
  druh: 'skupina', id: 'rozsah', nadpis: 'Rozsah scény',
  bloky: [
    {
      druh: 'otazka', id: 'roz_rozsah', typ: 'jeden',
      text: 'Aký rozsah',
      moznosti: [
        { v: 'dialogy', label: 'Len dialógy' },
        { v: 'dotyky', label: 'Dialógy + dotyky' },
        { v: 'bdsm_light', label: 'Ľahké BDSM rekvizity' },
        { v: 'pravidla', label: 'Scéna s pravidlami' },
      ],
    },
    p('roz_okno_z_role', '„Okno z reality" — možnosť kedykoľvek vyjsť z role'),
    {
      druh: 'otazka', id: 'roz_naskocenie', typ: 'jeden',
      text: 'Ako do role naskočiť',
      moznosti: [
        { v: 'mikronavody', label: 'Mikronávody „postoj, hlas, slovník"' },
        { v: 'scenar', label: 'Vopred napísaný scenár' },
        { v: 'improv', label: 'Voľná improvizácia' },
        { v: 'ramec', label: 'Rámec + improvizácia' },
      ],
    },
  ],
}

// ── Kostýmy a rekvizity ────────────────────────────────────────
const KOSTYMY: Blok = {
  druh: 'skupina', id: 'kostymy', nadpis: 'Kostýmy a rekvizity',
  bloky: [
    {
      druh: 'otazka', id: 'kos_zaujem', typ: 'jeden',
      text: 'Kostýmy a doplnky',
      moznosti: [
        { v: 'ano', label: 'Áno' },
        { v: 'mozno', label: 'Možno, s podmienkami' },
        { v: 'nie', label: 'Nie' },
      ],
    },
    {
      druh: 'otazka', id: 'kos_ktore', typ: 'viac', inePovolene: true,
      text: 'Aká miera „cosplayu"',
      moznosti: [
        { v: 'masky', label: 'Masky' },
        { v: 'uniformy', label: 'Uniformy' },
        { v: 'doplnky', label: 'Drobné doplnky' },
        { v: 'plny', label: 'Plný kostým' },
        { v: 'nalada', label: 'Len nálada a rekvizita' },
      ],
    },
    {
      druh: 'otazka', id: 'kos_krabica', typ: 'viac',
      text: '„Krabica rolí" — čo mať pripravené',
      moznosti: [
        { v: 'maska', label: 'Maska' },
        { v: 'satka', label: 'Šatka' },
        { v: 'karta_prikaz', label: 'Karta s „príkazom"' },
        { v: 'signaly', label: 'Rekvizitné signály' },
      ],
    },
  ],
}

// ── Atmosféra a scéna ──────────────────────────────────────────
const ATMOSFERA: Blok = {
  druh: 'skupina', id: 'atmosfera', nadpis: 'Atmosféra a scéna',
  bloky: [
    {
      druh: 'otazka', id: 'atm_svetlo', typ: 'jeden',
      text: 'Svetlo',
      moznosti: [
        { v: 'tlmene', label: 'Tlmené' },
        { v: 'led', label: 'LED / farebné' },
        { v: 'svieky', label: 'Sviečky' },
        { v: 'plne', label: 'Plné svetlo' },
      ],
    },
    p('atm_hudba', 'Hudba ako súčasť scény'),
    p('atm_vone', 'Vône / aromatika'),
    p('atm_zrkadla', 'Zrkadlá'),
    {
      druh: 'otazka', id: 'atm_miesto', typ: 'viac', inePovolene: true,
      text: 'Kde sa mi roleplay najviac hodí',
      moznosti: [
        { v: 'spalna', label: 'Spálňa' },
        { v: 'gauc', label: 'Gauč' },
        { v: 'kuchyna', label: 'Kuchyňa (pult)' },
        { v: 'kupelna', label: 'Kúpeľňa (sprcha)' },
        { v: 'stol', label: 'Stôl' },
        { v: 'auto_hotel', label: 'Auto / hotel (diskrétne)' },
      ],
    },
    p('atm_miesto_ako_postava', '„Miesto ako postava" — prostredie ako súčasť scenára'),
  ],
}

// ── Senzorika v roleplay ─────────────────────────────────────
const SENZORIKA: Blok = {
  druh: 'skupina', id: 'senzorika', nadpis: 'Senzorika v roleplay',
  bloky: [
    {
      druh: 'otazka', id: 'sen_prostriedky', typ: 'viac',
      text: 'Čím rýchlo „zahĺbiť" do role',
      moznosti: [
        { v: 'blindfold', label: 'Blindfold' },
        { v: 'sepot', label: 'Šepot' },
        { v: 'textury', label: 'Textúry (pierka, šatky)' },
        { v: 'teplota', label: 'Teplota (ľad / teplé oleje)' },
      ],
    },
    {
      druh: 'otazka', id: 'sen_zmysly', typ: 'viac',
      text: 'Ktoré zmysly zvýrazniť',
      moznosti: [
        { v: 'hmat', label: 'Hmat' },
        { v: 'zrak', label: 'Zrak' },
        { v: 'sluch', label: 'Sluch' },
        { v: 'cuch', label: 'Čuch' },
        { v: 'chut', label: 'Chuť' },
      ],
    },
  ],
}

// ── Neštandardné rituály ────────────────────────────────────
const RITUALY: Blok = {
  druh: 'skupina', id: 'rituy', nadpis: 'Neštandardné rituály',
  bloky: [
    p('rit_maskovanie', 'Maskovanie očí'),
    p('rit_lepenie_pier', 'Lepenie pier (symbolické mlčanie)'),
    p('rit_obmedzenie', 'Hranie s obmedzením pohybu'),
    p('rit_disciplinovanie', 'Disciplinovanie ako rituál'),
  ],
}

// ── Kombinácie ─────────────────────────────────────────────
const KOMBINACIE: Blok = {
  druh: 'skupina', id: 'kombinacie', nadpis: 'Kombinácie',
  bloky: [
    {
      druh: 'otazka', id: 'komb_s_cim', typ: 'viac',
      text: 'Roleplay chcem prepájať s…',
      moznosti: [
        { v: 'masaz', label: 'Masážou' },
        { v: 'senzorika', label: 'Senzorikou' },
        { v: 'bondage', label: 'Bondage (light)' },
        { v: 'hracky', label: 'Hračkami' },
        { v: 'scenove', label: '„Scénovými" vibrátormi / šatkami / putami' },
      ],
    },
    {
      druh: 'otazka', id: 'komb_mikroscen', typ: 'viac',
      text: 'Ktoré mikroscény spojiť s rolou',
      moznosti: [
        { v: 'inspection', label: '„Inspection" (prehliadka)' },
        { v: 'dominant_kiss', label: '„Dominant kiss"' },
        { v: 'predohra', label: 'Náväznosť na predohru' },
      ],
    },
    p('komb_maznanie', 'Jemné roleplay počas maznania'),
    { druh: 'otazka', id: 'komb_maznanie_roly', typ: 'text', text: 'Aké role počas maznania ma najviac lákajú:' },
  ],
}

// ── Skupinové prvky ───────────────────────────────────────
const SKUPINOVE: Blok = {
  druh: 'skupina', id: 'skupinove', nadpis: 'Skupinové prvky (voliteľné)',
  bloky: [
    {
      druh: 'otazka', id: 'skup_zaujem', typ: 'jeden',
      text: 'Skupinové prvky v roleplay',
      moznosti: [
        { v: 'nezvazujeme', label: 'Nezvažujeme' },
        { v: 'pozorujem', label: '„Pozorujem len"' },
        { v: 'soft', label: 'Soft prvky s inými' },
        { v: 'plna', label: 'Plná účasť' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_prvky', typ: 'viac',
      text: 'Ktoré prvky (len ak obaja chcú)',
      moznosti: [
        { v: 'pozorovanie', label: 'Pozorovanie' },
        { v: 'soft_swap', label: 'Soft swap' },
        { v: 'full_swap', label: 'Full swap' },
        { v: 'hotwife', label: 'Hotwifing / cuckolding' },
      ],
    },
    {
      druh: 'otazka', id: 'skup_rovnake_pohlavie', typ: 'jeden',
      text: 'Rovnakopohlavné prvky v scéne',
      moznosti: [
        { v: 'len_dotyk', label: '„Len dotyk"' },
        { v: 'pred_partnerom', label: '„Len pred partnerom"' },
        { v: 'bez_oralu', label: '„Bez orálu"' },
        { v: 'nie', label: 'Nie' },
      ],
    },
  ],
}

// ── Mini-scenáre ──────────────────────────────────────────
const SCENARE: Blok = {
  druh: 'skupina', id: 'scenare', nadpis: 'Mini-scenáre — čo ma láka',
  bloky: [
    p('sc_light', 'Light (10–20 min) — „Po práci: šéf/ka & asistent/ka" — len dialógy + bozk/masáž'),
    p('sc_stred', 'Stredný (20–40 min) — „Policajt/ka & zadržaný/á" — pravidlá, kontrolované dotyky'),
    p('sc_hlbsi', 'Hlbší (40+ min) — „Lekár/ka & pacient/ka" — rituál, protokol, rekvizity, jasné hranice zón'),
  ],
}

// ── Rámec a poznámky ─────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec, hranice a poznámky',
  bloky: [
    { druh: 'otazka', id: 'ram_hranice', typ: 'text', text: 'Moje hranice pri roleplay (čo určite nie / len s podmienkami):' },
    { druh: 'otazka', id: 'ram_stopslovo', typ: 'text', text: 'Stop-slovo / gesto (funguje aj v role):' },
    { druh: 'otazka', id: 'ram_aftercare', typ: 'text', text: 'Pred-brief a po-brief — čo potrebujem po scéne (objatie, spätná väzba „2+2"):' },
    { druh: 'otazka', id: 'sem_green', typ: 'text', text: 'GREEN (áno, chcem):' },
    { druh: 'otazka', id: 'sem_yellow', typ: 'text', text: 'YELLOW (možno, opatrne):' },
    { druh: 'otazka', id: 'sem_red', typ: 'text', text: 'RED (tvrdá hranica — nikdy):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const ROLEPLAY: TemaObsah = {
  slug: 'roleplay-scenare/roleplay-scenare',
  nadpis: 'Roleplay a scenáre',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'co_je', nadpis: 'Čo je roleplay a prečo',
      telo:
        '„Bezpečný únik" — hra na postavy, ktoré nás vzrušujú, bez zmeny reality vzťahu. ' +
        'Rozdiel fantázia ↔ realita; právo kedykoľvek vyjsť z role (semafor, stop-slovo).',
    },
    {
      druh: 'text', id: 'pravidla', nadpis: 'Základné pravidlá', ton: 'info',
      telo:
        'Dohody vopred — čo je OK / Možno / Nie. Jasné stop-slovo alebo gesto. Výhradne 18+ dospelé roly, tabu list, rešpekt hraníc oboch. ' +
        'Krátky pred-brief a po-brief (debrief „2+2"). Pri kostýmoch komfort nad estetikou — pohodlné, dýchateľné, rýchlo skladné.',
    },
  ],
  telo: [
    {
      druh: 'otazka', id: 'skusenost', typ: 'jeden',
      text: 'Ako sa cítim pri zapojení hrania rolí do intímneho života?',
      moznosti: [
        { v: 'laka', label: 'Láka ma to, chcem to skúšať' },
        { v: 'zvedavy', label: 'Som zvedavý/á, ale opatrne' },
        { v: 'neutralne', label: 'Neutrálne' },
        { v: 'nie', label: 'Necítim sa na to pripravený/á' },
      ],
    },
    ROLY,
    EDGE,
    DYNAMIKA,
    ROZSAH,
    KOSTYMY,
    ATMOSFERA,
    SENZORIKA,
    RITUALY,
    KOMBINACIE,
    SKUPINOVE,
    SCENARE,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'report', nadpis: 'Čo z toho vznikne', ton: 'info',
      telo:
        'Z odpovedí oboch: „top 3 roly" pre každého + spoločné prieniky, mini-scenáre na mieru (10 / 20 / 40 min) s krokmi a slovníkom, ' +
        'bezpečnostné body a „quit-plan". Pripomenutie: 18+ roly a rešpekt dohôd.',
    },
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako RED, sa nikde nezobrazí.',
    },
  ],
}
