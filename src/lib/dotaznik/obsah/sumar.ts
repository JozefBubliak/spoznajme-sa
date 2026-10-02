import type { Blok } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Záverečný sumár témy — pripája sa automaticky na koniec (zaver) každej témy
// v registri (index.ts), okrem rámcových tém bez praktík.
// Zdroj: xlsm P49390–49392 („Každá sekcia by mohla mať krátky sumár v štýle
// Aké nové veci ste ochotní vyskúšať?" + „plán na realizáciu preferencií").
// ─────────────────────────────────────────────────────────────────────────────

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
  ],
}

/** Rámcové témy (nie o praktikách) — bez sumáru. */
export const BEZ_SUMARU = new Set<string>([
  'suhlas-safewords/suhlas-safewords',
  'kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia',
  // Má vlastný krátky sumár bez duplicitných otázok na termín a plánovanie.
  'voyeur-exhib/voyeur-exhib',
])
