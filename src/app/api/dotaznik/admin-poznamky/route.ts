import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { isAdminEmail } from '@/lib/access'
import { db } from '@/lib/dotaznik/server'
import { vsetkyObsahy } from '@/lib/dotaznik/obsah'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FALLBACK_ADMINS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

async function adminEmail() {
  const session = await getSession()
  const email = session?.user?.email?.toLowerCase()
  return email && (isAdminEmail(email) || FALLBACK_ADMINS.includes(email)) ? email : null
}

export async function GET(req: NextRequest) {
  if (!await adminEmail()) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  const tema = req.nextUrl.searchParams.get('tema')
  if (!tema || !vsetkyObsahy().some(t => t.slug === tema)) return NextResponse.json({ error: 'bad-tema' }, { status: 400 })
  const { data, error } = await db().from('dotaznik_admin_poznamky').select('blok, poznamka').eq('tema', tema)
  if (error) return NextResponse.json({ error: 'db', detail: error.code }, { status: 500 })
  return NextResponse.json({ poznamky: data ?? [] })
}

export async function PUT(req: NextRequest) {
  const email = await adminEmail()
  if (!email) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  let body: { tema?: unknown; blok?: unknown; poznamka?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad-json' }, { status: 400 }) }
  const { tema, blok, poznamka } = body
  if (typeof tema !== 'string' || !vsetkyObsahy().some(t => t.slug === tema) ||
      typeof blok !== 'string' || !blok || blok.length > 500 || /[\u0000-\u001f]/.test(blok) ||
      typeof poznamka !== 'string' || poznamka.length > 10000) {
    return NextResponse.json({ error: 'bad-input' }, { status: 400 })
  }
  const { error } = await db().from('dotaznik_admin_poznamky').upsert({
    tema, blok, poznamka, updated_at: new Date().toISOString(), updated_by: email,
  }, { onConflict: 'tema,blok' })
  if (error) return NextResponse.json({ error: 'db', detail: error.code }, { status: 500 })
  return NextResponse.json({ ok: true })
}
