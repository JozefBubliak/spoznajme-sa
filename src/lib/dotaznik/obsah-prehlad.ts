// Admin nástroj: „splošti" celý obsah registrovaných tém (uvod + telo + zaver,
// vrátane vnorených skupín) do jedného zoznamu položiek — pre stránku
// /[lang]/dotaznik/obsah-prehlad, kde si admin vie rýchlo vyhľadať a overiť
// konkrétny text/otázku/možnosť naprieč celým dotazníkom.

import { gtext, type Blok, type Podmienka, type TemaObsah } from './obsah/typ'
import { vsetkyObsahy } from './obsah'

export type FlatMoznost = { v: string; m: string; z: string }

export type FlatPolozka = {
  temaSlug: string
  temaNadpis: string
  cesta: string[]
  druh: 'otazka' | 'text' | 'tabulka'
  id: string
  typ?: string
  textM: string
  textZ: string
  napovedaM?: string
  napovedaZ?: string
  moznosti?: FlatMoznost[]
  riadky?: FlatMoznost[]
  stlpce?: FlatMoznost[]
  ton?: string
  podmienka?: string
}

function podmienkaText(p?: Podmienka): string | undefined {
  if (!p) return undefined
  const casti: string[] = []
  if (p.pohlavie) casti.push(`len pohlavie: ${p.pohlavie}`)
  if (p.ot && p.je) casti.push(`${p.ot} = ${p.je}`)
  if (p.ot && p.nie) casti.push(`${p.ot} ≠ ${p.nie}`)
  if (p.ot && p.jeNiektora) casti.push(`${p.ot} ∈ [${p.jeNiektora.join(', ')}]`)
  if (p.ot && p.obsahuje) casti.push(`${p.ot} obsahuje „${p.obsahuje}"`)
  if (p.ot && p.obsahujeNiektoru) casti.push(`${p.ot} obsahuje niektorú z [${p.obsahujeNiektoru.join(', ')}]`)
  return casti.length ? casti.join(', ') : undefined
}

function walk(blok: Blok, tema: TemaObsah, cesta: string[], out: FlatPolozka[]) {
  if (blok.druh === 'skupina') {
    const nazov = blok.nadpis ? gtext(blok.nadpis, 'z') : undefined
    const novaCesta = nazov ? [...cesta, nazov] : cesta
    if (blok.uvod) {
      out.push({
        temaSlug: tema.slug,
        temaNadpis: gtext(tema.nadpis, 'z'),
        cesta: novaCesta,
        druh: 'text',
        id: `${blok.id}__uvod`,
        textM: gtext(blok.uvod, 'm'),
        textZ: gtext(blok.uvod, 'z'),
        podmienka: podmienkaText(blok.podmienka),
      })
    }
    for (const b of blok.bloky) walk(b, tema, novaCesta, out)
    return
  }

  if (blok.druh === 'otazka') {
    out.push({
      temaSlug: tema.slug,
      temaNadpis: gtext(tema.nadpis, 'z'),
      cesta,
      druh: 'otazka',
      id: blok.id,
      typ: blok.typ,
      textM: gtext(blok.text, 'm'),
      textZ: gtext(blok.text, 'z'),
      napovedaM: blok.napoveda ? gtext(blok.napoveda, 'm') : undefined,
      napovedaZ: blok.napoveda ? gtext(blok.napoveda, 'z') : undefined,
      moznosti: blok.moznosti?.map((m) => ({ v: m.v, m: gtext(m.label, 'm'), z: gtext(m.label, 'z') })),
      riadky: blok.riadky?.map((m) => ({ v: m.v, m: gtext(m.label, 'm'), z: gtext(m.label, 'z') })),
      stlpce: blok.stlpce?.map((m) => ({ v: m.v, m: gtext(m.label, 'm'), z: gtext(m.label, 'z') })),
      podmienka: podmienkaText(blok.podmienka),
    })
    return
  }

  if (blok.druh === 'text') {
    out.push({
      temaSlug: tema.slug,
      temaNadpis: gtext(tema.nadpis, 'z'),
      cesta,
      druh: 'text',
      id: blok.id,
      textM: gtext(blok.telo, 'm'),
      textZ: gtext(blok.telo, 'z'),
      ton: blok.ton,
      podmienka: podmienkaText(blok.podmienka),
    })
    return
  }

  if (blok.druh === 'tabulka') {
    const hlavicka = blok.hlavicka.map((h) => gtext(h, 'z')).join(' | ')
    const riadky = blok.riadky.map((r) => r.map((c) => gtext(c, 'z')).join(' | ')).join('\n')
    const text = [hlavicka, riadky].filter(Boolean).join('\n')
    out.push({
      temaSlug: tema.slug,
      temaNadpis: gtext(tema.nadpis, 'z'),
      cesta,
      druh: 'tabulka',
      id: blok.id,
      textM: text,
      textZ: text,
      podmienka: podmienkaText(blok.podmienka),
    })
  }
}

export type TemaSekcia = {
  slug: string
  nadpis: string
  pocetPoloziek: number
  polozky: FlatPolozka[]
}

export function obsahPrehlad(): TemaSekcia[] {
  return vsetkyObsahy().map((tema) => {
    const polozky: FlatPolozka[] = []
    for (const b of tema.uvod) walk(b, tema, ['Úvod'], polozky)
    for (const b of tema.telo) walk(b, tema, [], polozky)
    if (tema.zaver) for (const b of tema.zaver) walk(b, tema, ['Záver'], polozky)
    return {
      slug: tema.slug,
      nadpis: gtext(tema.nadpis, 'z'),
      pocetPoloziek: polozky.length,
      polozky,
    }
  })
}
