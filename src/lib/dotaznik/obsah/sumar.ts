import type { Blok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Záverečný sumár témy — pripája sa automaticky na koniec (zaver) každej témy
// v registri (index.ts), okrem rámcových tém bez praktík.
// Zdroj: xlsm P49390–49392 („Každá sekcia by mohla mať krátky sumár v štýle
// Aké nové veci ste ochotní vyskúšať?" + „plán na realizáciu preferencií").
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string) => ({ m, z })

export const SUMAR: Blok = {
  druh: 'skupina', id: 'sumar', nadpis: 'Sumár a ďalší krok',
  uvod: 'Krátke zhrnutie celej témy — z toho vznikne váš spoločný plán.',
  bloky: [
    {
      druh: 'otazka', id: 'sumar_nove', typ: 'text',
      text: { m: 'Aké nové veci z tejto témy som ochotný vyskúšať?', z: 'Aké nové veci z tejto témy som ochotná vyskúšať?' },
      napoveda: 'Stačí vymenovať 1–3 konkrétne veci.',
    },
    {
      druh: 'otazka', id: 'sumar_viac', typ: 'text',
      text: 'Čo z toho, čo už robíme, chcem častejšie alebo inak?',
    },
    {
      druh: 'otazka', id: 'sumar_kedy', typ: 'jeden',
      text: { m: 'Kedy by som chcel začať', z: 'Kedy by som chcela začať' },
      moznosti: [
        { v: 'hned', label: 'Čo najskôr — pokojne už tento týždeň' },
        { v: 'mesiac', label: 'V najbližšom mesiaci' },
        { v: 'niekedy', label: 'Niekedy, keď príde vhodná chvíľa' },
        { v: 'len_rozhovor', label: 'Najprv sa o tom len porozprávať' },
      ],
    },
    {
      druh: 'otazka', id: 'sumar_ako', typ: 'jeden',
      text: 'Ako chcem, aby sme to naplánovali',
      moznosti: [
        { v: 'naplanovat', label: 'Dohodnúť si konkrétny večer' },
        { v: 'prekvapenie', label: g('Nech to partnerka pripraví ako prekvapenie', 'Nech to partner pripraví ako prekvapenie') },
        { v: 'ja_pripravim', label: 'Chcem to pripraviť ja' },
        { v: 'spontanne', label: 'Spontánne, bez plánu' },
      ],
    },
  ],
}

/** Rámcové témy (nie o praktikách) — bez sumáru. */
export const BEZ_SUMARU = new Set<string>([
  'suhlas-safewords/suhlas-safewords',
  'kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia',
])
