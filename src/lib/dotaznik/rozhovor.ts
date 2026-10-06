import { MODULY, type Modul } from './strom'
import { temaObsah } from './obsah'
import { sprievodcaUzol } from './sprievodca'

// Režim „Spolu": jedna swipe karta = jeden modul (napr. „Trojky").
// Otázky: vlastný `rozhovor` z obsahu témy, inak otázky zo sprievodcu Naživo.

export type SpoluKarta = {
  modul: string
  ikona: string
  nazov: string
  popis: string
  otazky: string[]
  /** true = otázky sú napísané priamo pre režim Spolu, nie prevzaté zo sprievodcu */
  vlastne: boolean
}

function kartaModulu(m: Modul): SpoluKarta {
  for (const t of m.temy) {
    const r = temaObsah(m.slug, t.slug)?.rozhovor
    if (r) return { modul: m.slug, ikona: m.ikona, nazov: m.nazov, popis: r.popis, otazky: r.otazky, vlastne: true }
  }
  const otazky: string[] = []
  for (const t of m.temy) {
    for (const q of sprievodcaUzol(`${m.slug}/${t.slug}`, t.popis).prompty) if (!otazky.includes(q)) otazky.push(q)
  }
  if (otazky.length === 0) otazky.push(...sprievodcaUzol(m.slug, m.popis).prompty)
  return { modul: m.slug, ikona: m.ikona, nazov: m.nazov, popis: m.popis, otazky, vlastne: false }
}

export function spoluKarty(): SpoluKarta[] {
  return MODULY.map(kartaModulu)
}
