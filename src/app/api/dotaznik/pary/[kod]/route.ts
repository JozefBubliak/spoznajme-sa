import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/dotaznik/pary/[kod]?k=<secret>
//  → { kod, rezim, prezyvka_a, prezyvka_b, stav: [{slot,modul,tema,stav}] }
// Vracia stav tém oboch slotov (potrebné pre zámky). Odpovede NIE.
export async function GET(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  const secret = req.nextUrl.searchParams.get('k') ?? ''

  const par = await overPar(kod, secret)
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const { data: stav } = await db()
    .from('dotaznik_stav_temy')
    .select('slot, modul, tema, stav')
    .eq('par_id', par.id)

  return NextResponse.json({
    kod: par.kod,
    rezim: par.rezim,
    prezyvka_a: par.prezyvka_a,
    prezyvka_b: par.prezyvka_b,
    stav: stav ?? [],
  })
}
