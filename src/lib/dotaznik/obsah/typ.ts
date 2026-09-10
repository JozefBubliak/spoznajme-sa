// ─────────────────────────────────────────────────────────────────────────────
// Obsah jednej témy = hybrid „kniha + dotazník".
//
// Žiadna téma nie je napevno v kóde — je to len dáta. Základná schéma (bloky,
// vetvenie, gender varianty) sa opakuje, konkrétny strom každej témy nie.
// Mužská (`m`) a ženská (`z`) verzia textu sú zrkadlové, aby pri Double-Blind
// vyhodnotení sadli odpovede oboch partnerov proti sebe (rovnaké `id` + hodnoty).
// ─────────────────────────────────────────────────────────────────────────────

/** Text, ktorý sa líši podľa pohlavia vypĺňajúceho. Obyčajný string = rovnaký pre oboch. */
export type GText = string | { m: string; z: string }

export type Pohlavie = 'm' | 'z'

/** Podmienka zobrazenia bloku — vyhodnocuje sa proti odpovediam vyššie v strome. */
export type Podmienka = {
  ot: string // id otázky
  je?: string // presná hodnota (jeden / skala / mrezka-bunka)
  nie?: string // hodnota sa NEROVNÁ
  obsahuje?: string // pri 'viac': hodnota (pole) obsahuje tento reťazec
  obsahujeNiektoru?: string[] // pri 'viac': prienik s týmto zoznamom je neprázdny
}

export type Moznost = { v: string; label: GText }

export type OtazkaTyp =
  | 'jeden' // rádiové — jedna možnosť
  | 'viac' // checkboxy — viac možností
  | 'skala' // stupňovaná rádiová škála (možnosti = stupne)
  | 'text' // voľný text
  | 'mrezka' // riadky × stĺpce, v každom riadku jedna voľba

export type OtazkaBlok = {
  druh: 'otazka'
  id: string
  typ: OtazkaTyp
  text: GText
  napoveda?: GText
  moznosti?: Moznost[] // jeden / viac / skala
   inePovolene?: boolean // 'viac' → pridá pole „Iné"
  riadky?: Moznost[] // 'mrezka'
  stlpce?: Moznost[] // 'mrezka'
  rola?: 'prijimam' | 'poskytujem' // uloží sa pod túto rolu (inak spoločné)
  podmienka?: Podmienka
}

export type TextBlok = {
  druh: 'text'
  id: string
  nadpis?: GText
  telo: GText // odseky oddelené prázdnym riadkom
  ton?: 'info' | 'vystraha' | 'citat'
  podmienka?: Podmienka
}

export type TabulkaBlok = {
  druh: 'tabulka'
  id: string
  nadpis?: GText
  hlavicka: GText[]
  riadky: GText[][]
  podmienka?: Podmienka
}

export type SkupinaBlok = {
  druh: 'skupina'
  id: string
  nadpis?: GText
  uvod?: GText
  podmienka?: Podmienka
  bloky: Blok[]
}

export type Blok = TextBlok | TabulkaBlok | OtazkaBlok | SkupinaBlok

export type TemaObsah = {
  /** `${modul}/${tema}` */
  slug: string
  nadpis: GText
  /** „Kniha" — text pred screeningom (Čo je to, intímny pohľad, mýty…). */
  uvod: Blok[]
  /** Screening ponúkne pod-voľbu „partner uvidí dôvod v 1 vete". */
  zdielanieDovod?: boolean
  /** Vetviaci dotazník. */
  telo: Blok[]
  /** „Ukončenie modulu" + preklik na hĺbkový sprievodcu. */
  zaver?: Blok[]
}

export function gtext(t: GText | undefined, p: Pohlavie): string {
  if (t == null) return ''
  return typeof t === 'string' ? t : t[p]
}
