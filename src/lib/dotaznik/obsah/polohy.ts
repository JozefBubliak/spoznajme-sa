import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Polohy — modul D3 „Polohy".
// Zdroj: „16_Polohy_a_ergonomia.docx". Klasické polohy, variácie pre hĺbku
// a uhol, orálne/nepenetratívne polohy, poloha × anál/hrádza/prostata,
// poloha × prístup pre ruky/ústa, poloha × hračky, poloha × prostredie,
// variácie pre rozdiely tela a komfort, bezpečnosť/hygiena/luby.
// Konkrétne techniky (čo robia ruky/ústa/hračky) majú vlastné podrobné
// témy — tu je dôraz na to, KTORÁ poloha čo umožňuje, nie na samotnú
// techniku. z/m verzia zrkadlová.
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

// ── Rámec: čo od polôh chceme ──────────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec — komfort, ergonómia, prístup',
  bloky: [
    {
      druh: 'otazka', id: 'ram_priorita', typ: 'viac',
      text: 'Čo je pre mňa pri výbere polohy najdôležitejšie',
      moznosti: [
        { v: 'komfort', label: 'Fyzický komfort a ergonómia' },
        { v: 'ocny_kontakt', label: 'Očný kontakt a intimita' },
        { v: 'hlbka', label: 'Hĺbka a intenzita' },
        { v: 'kontrola', label: 'Kto má kontrolu nad tempom' },
        { v: 'pristup_ruky', label: 'Voľné ruky/ústa na doplnkovú stimuláciu' },
        { v: 'vizual', label: 'Vizuálny zážitok' },
      ],
    },
    { druh: 'otazka', id: 'ram_opory', typ: 'text', text: 'Ktoré opory mi pomáhajú (vankúš pod panvou/kolenami, okraj postele):' },
  ],
}

// ── Klasické polohy ────────────────────────────────────────────────
const KLASICKE: Blok = {
  druh: 'skupina', id: 'klasicke', nadpis: 'Klasické polohy',
  bloky: [
    {
      druh: 'otazka', id: 'kla_ktore', typ: 'viac', inePovolene: true,
      text: 'Ktoré klasické polohy mám rád(a)',
      moznosti: [
        { v: 'misionar', label: 'Misionárska — intimita a očný kontakt' },
        { v: 'zozadu', label: 'Zozadu („na psíka") — hĺbka a dynamika' },
        { v: 'cowgirl', label: 'Cowgirl / žena hore — kontrola a rytmus u nej' },
        { v: 'reverse_cowgirl', label: 'Reverse cowgirl — vizuálny uhol' },
        { v: 'bok', label: 'Na boku / „spooning" — pokojná, na dlhšie vlny' },
        { v: 'stoj', label: 'V stoji / na okraji postele-stola' },
      ],
    },
    p('kla_variacie', 'Drobné variácie (vankúš pod panvou, zdvihnuté nohy, náklon) mi menia zážitok výrazne'),
    {
      druh: 'otazka', id: 'kla_zmena_pocas', typ: 'jeden',
      text: 'Ako často meníme polohy počas jedného aktu',
      moznosti: [
        { v: 'casto', label: 'Často — dodáva to dynamiku' },
        { v: 'obcas', label: 'Občas, podľa nálady' },
        { v: 'zriedka', label: 'Zriedka — radšej ostávam pri jednej' },
      ],
    },
  ],
}

// ── Orálne a nepenetratívne polohy ──────────────────────────────────
const ORALNE: Blok = {
  druh: 'skupina', id: 'oralne', nadpis: 'Orálne a nepenetratívne polohy',
  bloky: [
    {
      druh: 'otazka', id: 'ora_69', typ: 'jeden',
      text: '69 (súčasný vzájomný orál) — ktorá verzia mi je komfortná',
      moznosti: [
        { v: 'bok', label: 'Z boku' },
        { v: 'stoh', label: '„Stoh" — jeden na druhom' },
        { v: 'nie', label: 'Radšej nie — nerovnaká pozornosť je pre mňa lepšia' },
      ],
    },
    p('ora_facesitting_pristup', 'Pri face-sittingu chcem mať voľné ruky na doplnkovú stimuláciu'),
    p('ora_tribbing', 'Polohy pre trenie tiel (tribbing/dry-humping) cez oblečenie aj bez neho ma lákajú'),
  ],
}

// ── Poloha × anál, hrádza, prostata ──────────────────────────────────
const ANAL: Blok = {
  druh: 'skupina', id: 'anal', nadpis: 'Poloha × anál, hrádza, prostata',
  bloky: [
    {
      druh: 'otazka', id: 'ana_ktore', typ: 'viac',
      text: 'Ktoré polohy mi vyhovujú pri análnej/prostatickej stimulácii',
      moznosti: [
        { v: 'na_styroch', label: 'Na štyroch / s vankúšom pod bokmi' },
        { v: 'bok', label: 'Na boku — jemnejšie tempo, viac kontroly' },
        { v: 'okraj_postele', label: 'Zozadu pri okraji postele — stabilita' },
      ],
    },
    {
      druh: 'text', id: 'ana_cross_clean', ton: 'vystraha',
      telo: 'Bez ohľadu na polohu platí: anus → vagína nikdy bez výmeny ochrany alebo umytia.',
    },
  ],
}

// ── Poloha × prístup pre ruky/ústa a hračky ───────────────────────────
const PRISTUP_HRACKY: Blok = {
  druh: 'skupina', id: 'pristup_hracky', nadpis: 'Poloha × prístup pre ruky/ústa a hračky',
  bloky: [
    {
      druh: 'otazka', id: 'pri_klitoris', typ: 'viac',
      text: 'V ktorých polohách chcem mať najľahší prístup ku klitorisu/bradavkám počas penetrácie',
      moznosti: [
        { v: 'misionar', label: 'Misionár' },
        { v: 'cowgirl', label: 'Cowgirl' },
        { v: 'okraj_postele', label: 'Okraj postele' },
      ],
    },
    {
      druh: 'otazka', id: 'pri_hracka', typ: 'jeden',
      text: 'Mini-vibrátor alebo párová hračka počas polohy',
      moznosti: [
        { v: 'ano_ja', label: 'Áno, ovládam ju ja' },
        { v: 'ano_partner', label: 'Áno, ovláda ju partner/ka' },
        { v: 'nie', label: 'Nie, radšej bez toho' },
      ],
    },
  ],
}

// ── Poloha × prostredie ────────────────────────────────────────────
const PROSTREDIE: Blok = {
  druh: 'skupina', id: 'prostredie', nadpis: 'Poloha × prostredie',
  bloky: [
    {
      druh: 'otazka', id: 'pro_miesto', typ: 'viac',
      text: 'Kde mi dané polohy fungujú najlepšie',
      moznosti: [
        { v: 'sprcha_vana', label: 'Sprcha / vaňa (proti stene, opory)' },
        { v: 'gauc', label: 'Gauč / podlaha pri krbe' },
        { v: 'pult', label: 'Kuchynský pult / stôl' },
        { v: 'auto', label: 'Auto — rýchle, diskrétne' },
      ],
    },
  ],
}

// ── Variácie pre rozdiely tela a komfort ──────────────────────────────
const VARIACIE: Blok = {
  druh: 'skupina', id: 'variacie', nadpis: 'Variácie pre rozdiely tela a komfort',
  bloky: [
    { druh: 'otazka', id: 'var_adaptacie', typ: 'text', text: 'Ktoré nastavenia znižujú námahu na chrbát/bedrá/kolená (vankúše, výška, uhol):' },
    p('var_citlive_miesta', 'Pri niektorých polohách mám citlivé/bolestivé miesta a potrebujem menší rozsah pohybu'),
    p('var_senzorika', 'Senzorika (svetlo, hudba, páska na oči) mi v konkrétnej polohe zosilňuje alebo tlmí vnímanie'),
  ],
}

// ── Bezpečnosť, hygiena, luby ──────────────────────────────────────
const BEZPECNOST: Blok = {
  druh: 'skupina', id: 'bezpecnost', nadpis: 'Bezpečnosť, hygiena, luby',
  bloky: [
    { druh: 'otazka', id: 'bez_lub', typ: 'jeden', text: 'Lubrikant vždy poruke',
      moznosti: [
        { v: 'ano', label: 'Áno, vždy' },
        { v: 'niektore', label: 'Pri niektorých polohách/aktivitách' },
        { v: 'nie', label: 'Zvyčajne nepotrebujem' },
      ],
    },
    {
      druh: 'otazka', id: 'bez_aftercare', typ: 'viac',
      text: 'Aftercare po náročnejšej polohe/dlhšej scéne',
      moznosti: [
        { v: 'napoj', label: 'Nápoj' },
        { v: 'prikrytie', label: 'Prikrytie' },
        { v: 'debrief', label: '„2+2" debrief' },
      ],
    },
  ],
}

// ── Top 3 na najbližší mesiac ───────────────────────────────────────
const TOP3: Blok = {
  druh: 'skupina', id: 'top3', nadpis: 'Top 3 polohy na najbližší mesiac',
  bloky: [
    { druh: 'otazka', id: 'top_zoznam', typ: 'text', text: 'Moje top 3 polohy, ktoré by som chcel(a) v najbližšom čase (znova) vyskúšať, a prečo:' },
  ],
}

export const POLOHY: TemaObsah = {
  slug: 'polohy/polohy',
  nadpis: 'Polohy',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Poloha nie je len o fyzike',
      telo:
        'Poloha určuje mieru prepojenia, kontroly, prístupu k doplnkovej stimulácii aj to, kto vedie tempo. ' +
        'Táto téma mapuje, ktoré polohy fungujú a prečo — nie techniku samotnú.',
    },
  ],
  telo: [
    RAMEC,
    KLASICKE,
    ORALNE,
    ANAL,
    PRISTUP_HRACKY,
    PROSTREDIE,
    VARIACIE,
    BEZPECNOST,
    TOP3,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
