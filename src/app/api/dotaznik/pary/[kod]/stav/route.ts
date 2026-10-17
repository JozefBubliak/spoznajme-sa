import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar, type Slot } from '@/lib/dotaznik/server'
import { temyPreStav } from '@/lib/dotaznik/temy-aliasy'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const STAVY = ['ano', 'este_nie', 'nie', 'hotovo']

// PUT /api/dotaznik/pary/[kod]/stav
//  { secret, slot, modul, tema?, stav }   → upsert screening stavu
export async function PUT(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  let b: { secret?: string; slot?: string; modul?: string; tema?: string | null; stav?: string; zdielanie?: string; dovod?: string }
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad-json' }, { status: 400 })
  }

  const par = await overPar(kod, b.secret ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  if ((b.slot !== 'a' && b.slot !== 'b') || !b.modul || !STAVY.includes(b.stav ?? '')) {
    return NextResponse.json({ error: 'bad-input' }, { status: 400 })
  }

  const zdielanie = b.zdielanie === 'len_zamok' || b.zdielanie === 'aj_dovod' ? b.zdielanie : null
  const dovod = zdielanie === 'aj_dovod' ? (b.dovod ?? '').trim().slice(0, 200) || null : null
  const lock = b.stav === 'nie' || b.stav === 'este_nie'

  const row = {
    par_id: par.id,
    slot: b.slot as Slot,
    modul: b.modul,
    tema: b.tema ?? '',
    stav: b.stav,
    updated_at: new Date().toISOString(),
    // Stĺpce z migrácie 20261017 sa posielajú len pri zámku s nastaveným zdieľaním.
    ...(lock && zdielanie ? { zdielanie, dovod } : {}),
  }

  const { error } = await db()
    .from('dotaznik_stav_temy')
    .upsert(temyPreStav(row.modul, row.tema).map(tema => ({ ...row, tema })), { onConflict: 'par_id,slot,modul,tema' })

  if (error) {
    console.error('[dotaznik/stav] upsert', error.code, error.message)
    return NextResponse.json({ error: 'db' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
