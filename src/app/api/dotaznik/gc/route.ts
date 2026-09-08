import { NextResponse, type NextRequest } from 'next/server'
import { db } from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/dotaznik/gc  — zmaže expirované páry. Volá Vercel Cron (denne).
// Autorizácia: hlavička od Vercel cronu, alebo Authorization: Bearer CRON_SECRET.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const isVercelCron = req.headers.get('x-vercel-cron') != null
  const authOk =
    isVercelCron || (!!secret && req.headers.get('authorization') === `Bearer ${secret}`)
  if (!authOk) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const s = db()

  // Skús RPC (z migrácie); ak neexistuje, fallback na priame mazanie.
  const rpc = await s.rpc('dotaznik_gc')
  if (!rpc.error) {
    return NextResponse.json({ deleted: rpc.data ?? null, via: 'rpc' })
  }

  const { error, count } = await s
    .from('dotaznik_pary')
    .delete({ count: 'exact' })
    .lt('zmazat_po', new Date().toISOString())

  if (error) {
    console.error('[dotaznik/gc]', error.code, error.message)
    return NextResponse.json({ error: 'db' }, { status: 500 })
  }
  return NextResponse.json({ deleted: count ?? 0, via: 'fallback' })
}
