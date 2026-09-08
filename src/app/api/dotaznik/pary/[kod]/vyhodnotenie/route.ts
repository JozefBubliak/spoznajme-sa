import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar } from '@/lib/dotaznik/server'
import { getModul } from '@/lib/dotaznik/strom'
import { OTAZKY } from '@/lib/dotaznik/otazky'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type Row = {
  slot: 'a' | 'b'
  modul: string
  okruh: string
  polozka: string
  typ: string
  rola: string
  hodnota: Record<string, unknown>
}

const POS_POSTOJ = new Set(['chcem', 'skor_ano', 'zvedavy'])

// Double-Blind: zobrazí sa len zhoda. Nesúlad sa nikde neobjaví.
function vyhodnot(typ: string, a: Record<string, unknown>, b: Record<string, unknown>) {
  if (typ === 'postoj' || typ === 'rola') {
    const av = a.v as string
    const bv = b.v as string
    if (!POS_POSTOJ.has(av) || !POS_POSTOJ.has(bv)) return null
    return av === 'zvedavy' && bv === 'zvedavy' ? 'zvedavost' : 'chut'
  }
  if (typ === 'semafor') {
    if (a.v === 'zelena' && b.v === 'zelena') return 'chut'
    if (a.v === 'zlta' && b.v === 'zlta') return 'podmienky'
    return null
  }
  if (typ === 'skusenost') {
    const ok = new Set(['bohata', 'parkrat', 'raz', 'nemam_chcem'])
    if (ok.has(a.v as string) && ok.has(b.v as string)) return 'kontext'
    return null
  }
  // frekvencia / intenzita / multi / text — nie sú „odmietnutie"; ukáž ak obaja odpovedali
  return 'kontext'
}

function textOtazky(modul: string, okruh: string, polozka: string): string {
  for (const k of Object.keys(OTAZKY)) {
    if (!k.startsWith(`${modul}/`)) continue
    const q = OTAZKY[k].find((o) => o.id === polozka)
    if (q) return q.text
  }
  return polozka
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  const par = await overPar(kod, req.nextUrl.searchParams.get('k') ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const { data } = await db()
    .from('dotaznik_odpovede')
    .select('slot, modul, okruh, polozka, typ, rola, hodnota')
    .eq('par_id', par.id)
  const rows = (data ?? []) as Row[]

  const pocet = { a: 0, b: 0 }
  const parovane = new Map<string, { a?: Row; b?: Row }>()
  for (const r of rows) {
    pocet[r.slot]++
    const key = `${r.modul}|${r.okruh}|${r.polozka}|${r.rola}`
    const e = parovane.get(key) ?? {}
    e[r.slot] = r
    parovane.set(key, e)
  }

  // modul → okruh → zhody[]
  const mapa = new Map<string, Map<string, unknown[]>>()
  for (const [key, e] of parovane) {
    if (!e.a || !e.b) continue
    const zona = vyhodnot(e.a.typ, e.a.hodnota, e.b.hodnota)
    if (!zona) continue
    const [modul, okruh, polozka] = key.split('|')
    if (!mapa.has(modul)) mapa.set(modul, new Map())
    const okr = mapa.get(modul)!
    if (!okr.has(okruh)) okr.set(okruh, [])
    okr.get(okruh)!.push({
      polozka,
      text: textOtazky(modul, okruh, polozka),
      typ: e.a.typ,
      rola: e.a.rola || null,
      zona,
      a: e.a.hodnota,
      b: e.b.hodnota,
    })
  }

  const moduly = [...mapa.entries()].map(([slug, okr]) => ({
    modul: slug,
    nazov: getModul(slug)?.nazov ?? slug,
    ikona: getModul(slug)?.ikona ?? '•',
    sekcie: [...okr.entries()].map(([okruh, zhody]) => ({ okruh, zhody })),
  }))

  return NextResponse.json({
    pripravene: pocet.a > 0 && pocet.b > 0,
    pocet,
    moduly,
  })
}
