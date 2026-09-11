import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Sebaprijatie, telo a hanba — modul I3 „Telo, hanba a citlivé miesta".
// Zdroj: „04_Sebaprijatie_a_telo.docx" bol prázdny (len názov, žiadny
// obsah) — táto téma je preto napísaná od základu podľa existujúcich L4
// seedov modulu (telo-image, hanba a bloky, spúšťače a história). Fázy
// života (rodičovstvo/tehotenstvo/menopauza/vek) majú vlastnú tému
// „Špecifické obdobia a obmedzenia" — tu nerozvádzané.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'silne_platí', label: 'Silne to na mňa platí' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'vobec', label: 'Vôbec' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Vzťah k vlastnému telu ────────────────────────────────────────────
const TELO_IMAGE: Blok = {
  druh: 'skupina', id: 'telo_image', nadpis: 'Vzťah k vlastnému telu',
  bloky: [
    {
      druh: 'otazka', id: 'ti_svetlo', typ: 'jeden',
      text: 'Osvetlenie počas intimity',
      moznosti: [
        { v: 'plne', label: 'Plné svetlo, som v pohode' },
        { v: 'tlmene', label: 'Radšej tlmené svetlo / sviečky' },
        { v: 'tma', label: 'Radšej tma' },
      ],
    },
    {
      druh: 'otazka', id: 'ti_zrkadla', typ: 'jeden',
      text: 'Zrkadlá počas intimity',
      moznosti: [
        { v: 'lubim', label: 'Milujem sledovať sa v zrkadle' },
        { v: 'niekedy', label: 'Niekedy áno, niekedy nie' },
        { v: 'nie', label: 'Radšej nie' },
      ],
    },
    { druh: 'otazka', id: 'ti_nepocut', typ: 'text', text: 'Čo o svojom tele neznesiem počuť ani vidieť zdôrazňované:' },
    { druh: 'otazka', id: 'ti_polohy_zneistuju', typ: 'text', text: 'Ktoré polohy alebo uhly pohľadu ma robia neistým/ou:' },
  ],
}

// ── Hanba a bloky ──────────────────────────────────────────────────
const HANBA: Blok = {
  druh: 'skupina', id: 'hanba', nadpis: 'Hanba a bloky',
  bloky: [
    { druh: 'otazka', id: 'han_z_coho', typ: 'text', text: 'Z čoho mám najčastejšie hanbu (telo, zvuky, skúsenosť, tempo):' },
    {
      druh: 'otazka', id: 'han_co_pomaha', typ: 'viac',
      text: 'Čo mi pomáha hanbu znížiť',
      moznosti: [
        { v: 'kompliment', label: 'Konkrétny, úprimný kompliment' },
        { v: 'nehodnotiaci_jazyk', label: '„Nehodnotiaci" jazyk partnera' },
        { v: 'tma', label: 'Menej svetla' },
        { v: 'pomalost', label: 'Pomalší nábeh, viac času' },
        { v: 'humor', label: 'Trocha humoru namiesto vážnosti' },
      ],
    },
    p('han_vykon', 'Tlak na výkon (musím dopadnúť „dobre") mi bráni sa uvoľniť'),
    p('han_todo_list', 'Rozptýlená myseľ / „to-do list v hlave" mi bráni byť prítomný/á'),
  ],
}

// ── Spúšťače a história ─────────────────────────────────────────────
const SPUSTACE: Blok = {
  druh: 'skupina', id: 'spustace', nadpis: 'Spúšťače a história',
  bloky: [
    { druh: 'otazka', id: 'spu_co', typ: 'text', text: 'Slová / dotyky / situácie, ktoré ma vedia vypnúť alebo vyvolať nepríjemnú spomienku:' },
    {
      druh: 'otazka', id: 'spu_signal', typ: 'jeden',
      text: 'Ako chcem signalizovať „potrebujem pauzu"',
      moznosti: [
        { v: 'slovo', label: 'Priamo poviem slovo/vetu' },
        { v: 'gesto', label: 'Gesto (dohodnuté vopred)' },
        { v: 'ticho_partner_spozna', label: 'Ticho — chcem, aby to partner/ka vycítil(a)' },
      ],
    },
    { druh: 'otazka', id: 'spu_nerobit', typ: 'text', text: 'Čo NErobiť, keď sa to stane (napr. neptaj sa hneď prečo, len ma obním):' },
  ],
}

// ── Sebaprijatie a sebadôvera ────────────────────────────────────────
const SEBAPRIJATIE: Blok = {
  druh: 'skupina', id: 'sebaprijatie', nadpis: 'Sebaprijatie a sebadôvera',
  bloky: [
    {
      druh: 'otazka', id: 'seb_celkovo', typ: 'jeden',
      text: 'Ako sa celkovo cítim vo vlastnom tele počas intimity',
      moznosti: [
        { v: 'velmi_dobre', label: 'Veľmi dobre, som v pohode' },
        { v: 'zavisi', label: 'Závisí od dňa a nálady' },
        { v: 'nekomfort', label: 'Často mám nekomfort' },
      ],
    },
    {
      druh: 'otazka', id: 'seb_co_pomaha_dlhodobo', typ: 'viac',
      text: 'Čo mi dlhodobo pomáha cítiť sa vo vlastnom tele lepšie',
      moznosti: [
        { v: 'kompliment_mimo', label: 'Komplimenty mimo intimity, nie len počas' },
        { v: 'pravidelnost', label: 'Pravidelná, nehodnotiaca blízkosť (aj bez sexu)' },
        { v: 'pohyb', label: 'Vlastný pohyb/starostlivosť o telo' },
        { v: 'terapia', label: 'Rozhovor s odborníkom, ak je to potrebné' },
      ],
    },
  ],
}

export const TELO_HANBA: TemaObsah = {
  slug: 'telo-hanba-citlive/telo-hanba-citlive',
  nadpis: 'Sebaprijatie, telo a hanba',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Telo ako miesto, nie výkon',
      telo:
        'Ako sa cítim vo vlastnom tele, priamo ovplyvňuje, ako veľmi sa dokážem uvoľniť. Táto téma pomenúva, ' +
        'čo hanbu zosilňuje a čo ju zmierňuje — nie preto, aby sa niečo „opravovalo", ale aby to partner poznal.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Rámec', ton: 'info',
      telo: 'Fázy života (tehotenstvo, vek, zdravotné zmeny), ktoré telo dočasne menia, majú vlastnú tému „Špecifické obdobia a obmedzenia".',
    },
  ],
  telo: [
    TELO_IMAGE,
    HANBA,
    SPUSTACE,
    SEBAPRIJATIE,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — cieľom je väčšia nežnosť k sebe, nie porovnávanie.',
    },
  ],
}
