import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar, type Slot } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/dotaznik/pary/[kod]/odpoved?k=<secret>&slot=a&modul=...&tema?
//  → vlastné odpovede daného slotu (na predvyplnenie pri návrate).
export async function GET(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  const sp = req.nextUrl.searchParams
  const par = await overPar(kod, sp.get('k') ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const slot = sp.get('slot')
  if (slot !== 'a' && slot !== 'b') return NextResponse.json({ error: 'bad-slot' }, { status: 400 })

  let q = db()
    .from('dotaznik_odpovede')
    .select('modul, okruh, polozka, typ, rola, hodnota, poznamka')
    .eq('par_id', par.id)
    .eq('slot', slot)
  const modul = sp.get('modul')
  if (modul) q = q.eq('modul', modul)

  const { data, error } = await q
  if (error) return NextResponse.json({ error: 'db' }, { status: 500 })
  return NextResponse.json({ odpovede: data ?? [] })
}

// PUT /api/dotaznik/pary/[kod]/odpoved
//  { secret, slot, modul, okruh, polozka, typ, rola?, hodnota, poznamka? }
export async function PUT(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  let b: {
    secret?: string
    slot?: string
    modul?: string
    okruh?: string
    polozka?: string
    typ?: string
    rola?: string
    hodnota?: unknown
    poznamka?: string
  }
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad-json' }, { status: 400 })
  }

  const par = await overPar(kod, b.secret ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  if (
    (b.slot !== 'a' && b.slot !== 'b') ||
    !b.modul ||
    !b.okruh ||
    !b.polozka ||
    !b.typ ||
    b.hodnota === undefined
  ) {
    return NextResponse.json({ error: 'bad-input' }, { status: 400 })
  }

  const rola = b.rola === 'prijimam' || b.rola === 'poskytujem' ? b.rola : ''

  const row = {
    par_id: par.id,
    slot: b.slot as Slot,
    modul: b.modul,
    okruh: b.okruh,
    polozka: b.polozka,
    typ: b.typ,
    rola,
    hodnota: b.hodnota as object,
    poznamka: typeof b.poznamka === 'string' ? b.poznamka.slice(0, 2000) : null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await db()
    .from('dotaznik_odpovede')
    .upsert(row, { onConflict: 'par_id,slot,modul,okruh,polozka,rola' })

  if (error) {
    console.error('[dotaznik/odpoved] upsert', error.code, error.message)
    return NextResponse.json({ error: 'db' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
