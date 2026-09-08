import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// POST /api/dotaznik/pary/[kod]/zmazat  { secret }  → zmaže pár + všetko (cascade)
export async function POST(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  let b: { secret?: string }
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad-json' }, { status: 400 })
  }

  const par = await overPar(kod, b.secret ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const { error } = await db().from('dotaznik_pary').delete().eq('id', par.id)
  if (error) {
    console.error('[dotaznik/zmazat]', error.code, error.message)
    return NextResponse.json({ error: 'db' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
