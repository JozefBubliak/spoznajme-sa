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
  vsetky?: Podmienka[] // logické AND viacerých podmienok
  asponJedna?: Podmienka[] // logické OR viacerých podmienok
  ot?: string // id otázky (vynechaj, ak podmieňuješ len pohlavím)
  je?: string // presná hodnota (jeden / skala / mrezka-bunka)
  jeNiektora?: string[] // hodnota ∈ zoznam
  nie?: string // hodnota sa NEROVNÁ
  obsahuje?: string // pri 'viac': hodnota (pole) obsahuje tento reťazec
  obsahujeNiektoru?: string[] // pri 'viac': prienik s týmto zoznamom je neprázdny
  pohlavie?: Pohlavie // blok sa zobrazí len mužovi / len žene
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
  inePovolene?: boolean // 'jeden' / 'skala' / 'viac' → pridá voľné pole v tej istej karte
  /** Pôvodné samostatné doplnenie; stará odpoveď sa číta v tej istej karte. */
  doplnenieId?: string
  /** Staré stupne sa nezamieňajú za nový význam bez rozhodnutia respondenta. */
  predosleMoznosti?: Moznost[]
  /** Pôvodný voľný text zostane ako doplnenie pri prechode na zoznam. */
  povodnyText?: boolean
  povodnyJeden?: boolean
  vylucneMoznosti?: string[] // voľba vylučujúca ostatné možnosti
  /** Nepovinné spresnenie; základný výber zostáva prehľadný. */
  zbalitelna?: boolean
  /** Pri vhodnom viacnásobnom výbere možno zo zvolených možností označiť jednu najobľúbenejšiu. */
  favoritPovoleny?: boolean
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
  zbalitelny?: boolean
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

/**
 * Obsahový kontrakt pre vetvenie podľa skúsenosti. `kostra` znamená, že téma
 * je už evidovaná a má pripravené celé vetvy, ale ich obsah sa ešte doplní pri
 * samostatnom audite témy. Prázdne vetvy sa v UI nikdy nezobrazujú.
 */
export type VetvenieSkusenosti =
  | {
      rezim: 'jedna-skusenost' | 'davam-prijimam' | 'hore-dole'
      stav: 'kostra' | 'rozpracovane' | 'aktivne'
      bezSkusenosti: Blok[]
      soSkusenostou: Blok[]
      /** Pri párovom výsledku sa nesmie vyžadovať rovnaká skúsenosť oboch. */
      paroveZobrazenie: 'vsetko-relevantne-okrem-nie'
    }
  | {
      rezim: 'nepouziva-sa'
      dovod: string
    }

/**
 * Režim „Spolu": pár spolu na jednom telefóne swipne tému (chceme / nechceme)
 * a pri zvolených témach listuje otázkami bez odpovedí — rozprávajú sa naživo.
 * Texty sú v 2. osobe množného čísla (pár sedí spolu), preto bez m/ž variantov.
 */
export type Rozhovor = {
  /** 1–2 vety na swipe kartu. */
  popis: string
  /** 5–12 otvorených otázok na rozhovor. */
  otazky: string[]
}

export type TemaObsah = {
  /** `${modul}/${tema}` */
  slug: string
  nadpis: GText
  /** Režim „Spolu" (swipe + otázky na rozhovor). */
  rozhovor?: Rozhovor
  /** „Kniha" — text pred screeningom (Čo je to, intímny pohľad, mýty…). */
  uvod: Blok[]
  /** Screening ponúkne pod-voľbu „partner uvidí dôvod v 1 vete". */
  zdielanieDovod?: boolean
  /** Vetviaci dotazník. */
  telo: Blok[]
  /** Evidencia a celé obsahové vetvy podľa skúsenosti, ak sú pre tému zmysluplné. */
  vetvenieSkusenosti?: VetvenieSkusenosti
  /** „Ukončenie modulu" + preklik na hĺbkový sprievodcu. */
  zaver?: Blok[]
}

export function gtext(t: GText | undefined, p: Pohlavie): string {
  if (t == null) return ''
  return typeof t === 'string' ? t : t[p]
}
