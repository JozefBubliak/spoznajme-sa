import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Komunikácia počas a po — modul A5.
// Zdroj: „dotaznik.xlsx" list „2) Túžba, libido, psychológia — BANKA
// OTÁZOK" (otvorená M/Ž otázková banka, prevedená do štruktúrovaných
// otázok). Tón a štýl iniciácie, slovná navigácia počas sexu, pomenovania
// a oslovovanie, pochvaly, humor a „anti-vibe", spätná väzba, po akte,
// jemný aftercare. Bezpečnostné STOP signály majú vlastnú tému „Súhlas,
// bezpečie a komunikácia" (I1) — tu je dôraz na POZITÍVNU slovnú
// navigáciu (čo chcem počuť/hovoriť), nie na núdzové zastavenie.
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

// ── Tón a štýl iniciácie ──────────────────────────────────────────────
const TON: Blok = {
  druh: 'skupina', id: 'ton', nadpis: 'Tón a štýl, ktorý ma zapína',
  bloky: [
    {
      druh: 'otazka', id: 'ton_styl', typ: 'jeden',
      text: 'Ktorý tón ma najrýchlejšie naladí',
      moznosti: [
        { v: 'jemny', label: 'Jemný' },
        { v: 'hravy', label: 'Hravý' },
        { v: 'priamy', label: 'Priamy („chcem ťa teraz")' },
        { v: 'bez_slov', label: 'Bez slov, len dotyk' },
      ],
    },
    {
      druh: 'otazka', id: 'ton_energia', typ: 'jeden',
      text: 'Aký štýl energie chcem od partnera/ky',
      moznosti: [
        { v: 'nezna', label: 'Nežná' },
        { v: 'hrava', label: 'Hravá' },
        { v: 'dominantna', label: 'Dominantná' },
        { v: 'submisivna', label: 'Submisívna' },
        { v: 'neutralna', label: 'Neutrálna, prispôsobí sa' },
      ],
    },
    {
      druh: 'otazka', id: 'ton_romantika_zivocisnost', typ: 'jeden',
      text: 'Viac romantiky, alebo viac „živočíšnosti"',
      moznosti: [
        { v: 'romantika', label: 'Viac romantiky' },
        { v: 'zivocisnost', label: 'Viac živočíšnosti / naliehavosti' },
        { v: 'zalezi', label: 'Záleží na chvíli' },
      ],
    },
    { druh: 'otazka', id: 'ton_zapina_vypina', typ: 'text', text: 'Konkrétne slová/štýly správania, ktoré ma zapnú, a ktoré ma vypnú:' },
    {
      druh: 'otazka', id: 'ton_priamost_davka', typ: 'jeden',
      text: 'Správna „dávka" priamosti',
      moznosti: [
        { v: 'malo', label: 'Radšej menej priamo, viac náznakom' },
        { v: 'stredne', label: 'Stredná miera' },
        { v: 'velmi', label: 'Čím priamejšie, tým lepšie' },
      ],
    },
  ],
}

// ── Slovná navigácia počas sexu ────────────────────────────────────
const NAVIGACIA: Blok = {
  druh: 'skupina', id: 'navigacia', nadpis: 'Slovná navigácia počas sexu',
  bloky: [
    {
      druh: 'otazka', id: 'nav_pomer', typ: 'jeden',
      text: 'Preferovaný pomer typov slov počas sexu',
      moznosti: [
        { v: 'romanticke', label: 'Prevažne romantické (láska)' },
        { v: 'eroticke', label: 'Prevažne erotické (dirty talk)' },
        { v: 'navigacne', label: 'Prevažne navigačné (inštrukcie)' },
        { v: 'kombinacia', label: 'Kombinácia všetkého' },
      ],
    },
    {
      druh: 'otazka', id: 'nav_kedy_ticho', typ: 'viac',
      text: 'Kedy chcem slová a kedy ticho',
      moznosti: [
        { v: 'predohra_slova', label: 'Slová počas predohry' },
        { v: 'pocas_ticho', label: 'Ticho počas samotného aktu' },
        { v: 'orgazmus_zvuky', label: 'Len zvuky, žiadne slová pri orgazme' },
        { v: 'po_slova', label: 'Slová po, nie počas' },
      ],
    },
    {
      druh: 'otazka', id: 'nav_kodove_vety', typ: 'jeden',
      text: '„Kódové vety" na navigáciu (napr. „spomaľ", „silnejšie", „takto")',
      moznosti: [
        { v: 'chcem', label: 'Áno, chcem si ich dohodnúť' },
        { v: 'uz_mame', label: 'Už ich prirodzene používame' },
        { v: 'nie', label: 'Nepotrebujem, stačí mi telo/reakcia' },
      ],
    },
    { druh: 'otazka', id: 'nav_vety_chcem_pocut', typ: 'text', text: 'Konkrétne vety, ktoré chcem od partnera/ky počuť (napíš pokojne viac):' },
    { druh: 'otazka', id: 'nav_vety_chcem_hovorit', typ: 'text', text: 'Konkrétne vety, ktoré by som bol(a) ochotný/á hovoriť ja:' },
    { druh: 'otazka', id: 'nav_vety_nikdy', typ: 'text', text: 'Slová/vety, ktoré by som nikdy nepovedal(a) ani nechcel(a) počuť:' },
  ],
}

// ── Pomenovania a oslovovanie ──────────────────────────────────────
const OSLOVOVANIE: Blok = {
  druh: 'skupina', id: 'oslovovanie', nadpis: 'Pomenovania a oslovovanie v posteli',
  bloky: [
    {
      druh: 'otazka', id: 'osl_ako', typ: 'viac',
      text: 'Ako chcem byť oslovovaný/á v posteli',
      moznosti: [
        { v: 'menom', label: 'Menom' },
        { v: 'prezyvkou', label: 'Prezývkou' },
        { v: 'titul', label: '„Pán/pani", „dobrý chlapec/dievča" a podobne' },
        { v: 'bez_oslovovania', label: 'Bez špeciálneho oslovovania' },
      ],
    },
    { druh: 'otazka', id: 'osl_genitalie_ok', typ: 'text', text: 'Pomenovania pre genitálie, ktoré sú pre mňa OK:' },
    { druh: 'otazka', id: 'osl_genitalie_nie', typ: 'text', text: 'Pomenovania pre genitálie, ktoré nechcem počuť:' },
    p('osl_vlastnicky_jazyk', '„Vlastnícky" jazyk („si môj/moja", „patríš mi") ma vzrušuje'),
    p('osl_vulgarne', 'Vulgárne výrazy sú pre mňa v posteli v poriadku (v rámci mojich hraníc)'),
  ],
}

// ── Pochvaly ──────────────────────────────────────────────────────
const POCHVALY: Blok = {
  druh: 'skupina', id: 'pochvaly', nadpis: 'Pochvaly',
  bloky: [
    {
      druh: 'otazka', id: 'poc_na_co', typ: 'viac',
      text: 'Na čo chcem počuť pochvalu',
      moznosti: [
        { v: 'telo', label: 'Telo' },
        { v: 'vykon', label: 'Výkon' },
        { v: 'energia', label: 'Energia / prítomnosť' },
        { v: 'dominancia_jemnost', label: 'Dominancia alebo jemnosť' },
      ],
    },
    {
      druh: 'otazka', id: 'poc_kedy', typ: 'viac',
      text: 'Kedy chcem pochvalu',
      moznosti: [
        { v: 'pred', label: 'Pred' },
        { v: 'pocas', label: 'Počas' },
        { v: 'po', label: 'Po' },
      ],
    },
    { druh: 'otazka', id: 'poc_konkretne', typ: 'text', text: 'Konkrétne pochvaly, ktoré ma reálne vzrušujú (napíš pokojne vety):' },
    { druh: 'otazka', id: 'poc_trapne', typ: 'text', text: 'Ktoré pochvaly sú pre mňa trápne alebo vypínajúce:' },
  ],
}

// ── Humor a „anti-vibe" ────────────────────────────────────────────
const HUMOR: Blok = {
  druh: 'skupina', id: 'humor', nadpis: 'Humor a „anti-vibe"',
  bloky: [
    {
      druh: 'otazka', id: 'hum_typ', typ: 'jeden',
      text: 'Aký humor je pre mňa sexy počas intimity',
      moznosti: [
        { v: 'jemny', label: 'Jemný, milý' },
        { v: 'dravdivy', label: 'Dráždivý, „dirty vtipy"' },
        { v: 'ziadny', label: 'Radšej žiadny humor, berie mi to náladu' },
      ],
    },
    p('hum_uvolnuje', 'Smiech uprostred intimity ma vie uvoľniť, nie vypnúť'),
    { druh: 'otazka', id: 'hum_anti_vibe', typ: 'text', text: 'Môj „anti-vibe" — čo mi najviac pokazí náladu (konkrétne veci):' },
  ],
}

// ── Počas aktu (existujúce jadro) ──────────────────────────────────
const POCAS_AKTU: Blok = {
  druh: 'skupina', id: 'pocas_aktu', nadpis: 'Ako komunikujeme počas aktu',
  bloky: [
    {
      druh: 'otazka', id: 'poa_forma', typ: 'viac',
      text: 'Čo prevláda počas aktu',
      moznosti: [
        { v: 'ticho', label: 'Ticho' },
        { v: 'zvuky_dych', label: 'Zvuky a dych' },
        { v: 'slovne_pokyny', label: 'Slovné pokyny' },
        { v: 'pochvala', label: 'Pochvala / povzbudenie' },
      ],
    },
    p('poa_smiech_ok', 'Smiech uprostred aktu je pre mňa v poriadku'),
  ],
}

// ── Spätná väzba ──────────────────────────────────────────────────
const SPATNA_VAZBA: Blok = {
  druh: 'skupina', id: 'spatna_vazba', nadpis: 'Spätná väzba',
  bloky: [
    {
      druh: 'otazka', id: 'spv_kedy', typ: 'jeden',
      text: 'Kedy najradšej dávam/dostávam spätnú väzbu',
      moznosti: [
        { v: 'priebezne', label: 'Priebežne, počas' },
        { v: 'az_po', label: 'Až po akte' },
        { v: 'oboje', label: 'Oboje, podľa potreby' },
      ],
    },
    { druh: 'otazka', id: 'spv_signaly', typ: 'text', text: 'Naše dohodnuté signály „viac / menej / stop":' },
  ],
}

// ── Po akte ──────────────────────────────────────────────────────
const PO_AKTE: Blok = {
  druh: 'skupina', id: 'po_akte', nadpis: 'Po akte — prvé minúty',
  bloky: [
    {
      druh: 'otazka', id: 'poa2_forma', typ: 'viac',
      text: 'Čo najviac chcem hneď po',
      moznosti: [
        { v: 'objatie', label: 'Objatie a rozhovor' },
        { v: 'ticho', label: 'Ticho' },
        { v: 'usnut', label: 'Usnúť' },
        { v: 'sprcha', label: 'Sprcha' },
      ],
    },
    {
      druh: 'otazka', id: 'poa2_debrief', typ: 'jeden',
      text: '„Debrief" — čo bolo super / čo inak',
      moznosti: [
        { v: 'vzdy', label: 'Chcem to vždy, aspoň krátko' },
        { v: 'niekedy', label: 'Niekedy, keď sa vyskytlo niečo nové' },
        { v: 'nie', label: 'Nepotrebujem to' },
      ],
    },
  ],
}

// ── Aftercare (jemná úroveň) ────────────────────────────────────
const AFTERCARE: Blok = {
  druh: 'skupina', id: 'aftercare', nadpis: 'Aftercare (jemná úroveň)',
  bloky: [
    {
      druh: 'otazka', id: 'aft_potrebujem', typ: 'jeden',
      text: 'Čo potrebujem po bežnom sexe',
      moznosti: [
        { v: 'slova', label: 'Slová' },
        { v: 'dotyk', label: 'Dotyk' },
        { v: 'samota', label: 'Chvíľu samoty' },
      ],
    },
    { druh: 'otazka', id: 'aft_ako_dlho', typ: 'text', text: 'Ako dlho zvyčajne potrebujem, kým som „späť":' },
  ],
}

export const KOMUNIKACIA_POCAS_PO: TemaObsah = {
  slug: 'komunikacia-pocas-po/komunikacia-pocas-po',
  nadpis: 'Komunikácia počas a po',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Slová sú súčasťou dotyku',
      telo:
        'Tón, konkrétne slová, oslovovanie a pochvaly dokážu zážitok posunúť rovnako silno ako technika. ' +
        'Táto téma mapuje presne to — čo chcem počuť, čo chcem hovoriť, a čo mi náladu naopak pokazí.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Núdzové STOP signály a bezpečnostné slová majú vlastnú tému „Súhlas, bezpečie a komunikácia" — tu ide o pozitívnu, bežnú slovnú navigáciu.',
    },
  ],
  telo: [
    TON,
    NAVIGACIA,
    OSLOVOVANIE,
    POCHVALY,
    HUMOR,
    POCAS_AKTU,
    SPATNA_VAZBA,
    PO_AKTE,
    AFTERCARE,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
