import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Nepenetratívne trenie — modul B7.
// Zdroj: „13_Nepenetrativne_aktivity" (nájdené v zdroj.docx, riadky
// 65577-66101 pri systematickej revízii — pozri docs/dotaznik-zdroj-progress.md).
// Frottage/dry humping, interkrurálny sex, tribbing/scissoring, mammary
// intercourse (titjob — chýbajúca položka oproti pôvodným L4 seedom).
// Petting/masáž/zmyslové hry majú vlastné podrobné témy (bozky-dotyky.ts,
// zmyslova-hra.ts) — tu len stručný odkaz, nie duplikát.
// z/m verzia zrkadlová.
// ─────────────────────────────────────────────────────────────────────────────

const POSTOJ: Moznost[] = [
  { v: 'robime', label: 'Už to robíme a som spokojný/á' },
  { v: 'tuzim', label: 'Túžim to zapojiť' },
  { v: 'ak_partner_chce', label: 'Rád(a) to spravím, ak po tom partner/ka túži' },
  { v: 'mozno', label: 'Možno, za istých okolností' },
  { v: 'nie', label: 'Nie, necítim sa komfortne' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Frottage / dry humping ────────────────────────────────────────
const FROTTAGE: Blok = {
  druh: 'skupina', id: 'frottage', nadpis: 'Frottage / „dry humping"',
  bloky: [
    p('fro_postoj', 'Trenie tiel (cez oblečenie alebo bez neho) ma vzrušuje'),
    {
      druh: 'otazka', id: 'fro_styl', typ: 'jeden',
      text: 'Preferovaný štýl',
      moznosti: [
        { v: 'cez_oblecenie', label: 'Cez oblečenie — napätie z odkladania' },
        { v: 'cez_bielizen', label: 'Cez spodnú bielizeň' },
        { v: 'nahi', label: 'Nahí, bez penetrácie' },
      ],
    },
    {
      druh: 'otazka', id: 'fro_ako', typ: 'jeden',
      text: 'Ako to najviac chcem',
      moznosti: [
        { v: 'predohra', label: 'Ako predohru' },
        { v: 'samostatne', label: 'Ako samostatnú aktivitu bez pokračovania' },
        { v: 'kdekolvek', label: 'Nezáleží, hlavne že to je' },
      ],
    },
    { druh: 'otazka', id: 'fro_polohy', typ: 'text', text: 'Polohy/opory, ktoré mi pri tom vyhovujú (gauč, stolička, hrana postele):' },
  ],
}

// ── Interkrurálny sex ────────────────────────────────────────────
const INTERKRURALNY: Blok = {
  druh: 'skupina', id: 'interkruralny', nadpis: 'Interkrurálny sex (medzi stehnami)',
  bloky: [
    p('int_postoj', 'Trenie penisu medzi stehnami partnerky ma vzrušuje'),
    {
      druh: 'otazka', id: 'int_lubrikant', typ: 'jeden',
      text: 'Lubrikant',
      moznosti: [
        { v: 'ano', label: 'Áno, na zvýšenie pôžitku' },
        { v: 'nie', label: 'Nie, uprednostňujem trenie nasucho' },
      ],
    },
    { druh: 'otazka', id: 'int_poloha', typ: 'text', text: 'Preferovaná poloha:' },
  ],
}

// ── Tribbing / scissoring ──────────────────────────────────────────
const TRIBBING: Blok = {
  druh: 'skupina', id: 'tribbing', nadpis: 'Tribbing / scissoring (vulva na vulve)',
  bloky: [
    p('tri_postoj', 'Trenie vulvy o vulvu partnerky (scissoring) ma vzrušuje'),
    {
      druh: 'otazka', id: 'tri_na_com', typ: 'viac',
      text: 'Trenie vulvy o',
      moznosti: [
        { v: 'stehno', label: 'Stehno partnera/ky' },
        { v: 'zadok', label: 'Zadok' },
        { v: 'cele_telo', label: 'Celé telo partnera/ky' },
      ],
    },
    { druh: 'otazka', id: 'tri_variacie', typ: 'text', text: 'Uhly/polohy nôh, ktoré by som chcel(a) skúšať:' },
    p('tri_sledovanie', 'Predstava, že ma pri tom partner sleduje (vojeurský prvok), ma vzrušuje'),
  ],
}

// ── Mammary intercourse (titjob) ────────────────────────────────────
const TITJOB: Blok = {
  druh: 'skupina', id: 'titjob', nadpis: 'Mammary intercourse (titjob)',
  bloky: [
    {
      druh: 'otazka', id: 'tit_prijimam', typ: 'jeden',
      text: 'Trenie penisu medzi prsiami partnerky',
      moznosti: POSTOJ,
    },
    {
      druh: 'otazka', id: 'tit_poskytujem', typ: 'jeden',
      text: 'Poskytnúť partnerovi titjob',
      moznosti: POSTOJ,
    },
    p('tit_kombinacia_oral', 'Kombinácia titjobu s orálnou stimuláciou (striedavo/súčasne) ma láka'),
  ],
}

// ── Grinding ───────────────────────────────────────────────────────
const GRINDING: Blok = {
  druh: 'skupina', id: 'grinding', nadpis: 'Grinding',
  bloky: [
    {
      druh: 'otazka', id: 'gri_kde', typ: 'viac',
      text: 'Rytmické trenie',
      moznosti: [
        { v: 'stehno_koleno', label: 'Sedieť na stehne/kolene' },
        { v: 'tvar', label: 'Na tvári (face-sitting bez orálu)' },
        { v: 'penetracne', label: 'Ako rytmické trenie smerujúce k orgazmu bez penetrácie' },
      ],
    },
  ],
}

// ── Rámec: bez cieľa, bezpečnosť ──────────────────────────────────
const RAMEC: Blok = {
  druh: 'skupina', id: 'ramec', nadpis: 'Rámec a bezpečnosť',
  bloky: [
    {
      druh: 'text', id: 'ram_info',
      telo:
        'Nepenetratívne aktivity nie sú „len predohra" — môžu byť plnohodnotnou formou intimity, ' +
        'najmä keď je penetrácia dočasne nedostupná alebo nechcená. Rozšírenú „no-goal" filozofiu ' +
        '(sex bez cieľa orgazmu) má vlastná téma „Tantra, slow sex a spiritualita".',
    },
    {
      druh: 'otazka', id: 'ram_kontext', typ: 'viac',
      text: 'Kedy tieto aktivity najviac chcem',
      moznosti: [
        { v: 'predohra', label: 'Ako predohru' },
        { v: 'hlavny_akt', label: 'Ako hlavný akt' },
        { v: 'po_pauze', label: 'Po pauze/rekonvalescencii, keď penetrácia nie je vhodná' },
      ],
    },
    { druh: 'otazka', id: 'ram_koza', typ: 'text', text: 'Komfort pokožky — čo pomáha pri dlhšom trení (materiály, olej, uterák):' },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) (1–3 vety):' },
  ],
}

export const NEPENETRATIVNE_TRENIE: TemaObsah = {
  slug: 'nepenetrativne-trenie/nepenetrativne-trenie',
  nadpis: 'Nepenetratívne trenie',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Vzrušenie, ktoré nemusí ísť „dovnútra"',
      telo:
        'Frottage, tribbing, interkrurálny sex a mammary intercourse ponúkajú intenzívnu stimuláciu ' +
        'a blízkosť bez penetrácie — ako predohru, ako samostatnú aktivitu, alebo keď penetrácia dočasne nie je vhodná.',
    },
  ],
  telo: [
    FROTTAGE,
    INTERKRURALNY,
    TRIBBING,
    TITJOB,
    GRINDING,
    RAMEC,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody medzi tebou a partnerom. Čo niekto označí ako hranicu, sa nikde nezobrazí.',
    },
  ],
}
