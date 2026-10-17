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

  // Zdieľanie dôvodu zámku (migrácia 20261017); bez nej sa vráti len základný stav.
  const rozsirene = await db()
    .from('dotaznik_stav_temy')
    .select('slot, modul, tema, stav, zdielanie, dovod')
    .eq('par_id', par.id)
  const stav = rozsirene.error
    ? (await db().from('dotaznik_stav_temy').select('slot, modul, tema, stav').eq('par_id', par.id)).data
    : rozsirene.data?.map(r => ({
        slot: r.slot, modul: r.modul, tema: r.tema, stav: r.stav,
        zdielanie: r.zdielanie ?? null,
        dovod: r.zdielanie === 'aj_dovod' ? r.dovod ?? null : null,
      }))

  return NextResponse.json({
    kod: par.kod,
    rezim: par.rezim,
    prezyvka_a: par.prezyvka_a,
    prezyvka_b: par.prezyvka_b,
    stav: stav ?? [],
  })
}
