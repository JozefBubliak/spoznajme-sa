import { NextResponse, type NextRequest } from 'next/server'
import { db, overPar, cleanPrezyvka } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// POST /api/dotaznik/pary/[kod]/join  { secret, prezyvka }
//  → { slot, rezim, prezyvka_a, prezyvka_b }
// Slot 'b' sa priradí prvému, kto sa pripojí. Ďalšie volania vracajú existujúci stav.
export async function POST(req: NextRequest, ctx: { params: Promise<{ kod: string }> }) {
  const { kod } = await ctx.params
  let body: { secret?: string; prezyvka?: string; slot?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad-json' }, { status: 400 })
  }

  const par = await overPar(kod, body.secret ?? '')
  if (!par) return NextResponse.json({ error: 'not-found' }, { status: 404 })

  const s = db()

  // Ak volajúci tvrdí slot 'a' (tvorca sa vracia), len vráť stav.
  if (body.slot === 'a') {
    return NextResponse.json({
      slot: 'a',
      rezim: par.rezim,
      prezyvka_a: par.prezyvka_a,
      prezyvka_b: par.prezyvka_b,
    })
  }

  // Slot 'b': doplň prezývku, ak ešte nie je.
  if (!par.prezyvka_b) {
    const prezyvka = cleanPrezyvka(body.prezyvka) || 'Partner/ka'
    await s.from('dotaznik_pary').update({ prezyvka_b: prezyvka }).eq('id', par.id)
    par.prezyvka_b = prezyvka
  }

  return NextResponse.json({
    slot: 'b',
    rezim: par.rezim,
    prezyvka_a: par.prezyvka_a,
    prezyvka_b: par.prezyvka_b,
  })
}
