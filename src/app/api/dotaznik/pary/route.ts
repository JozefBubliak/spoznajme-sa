import { NextResponse, type NextRequest } from 'next/server'
import {
  db,
  generateKod,
  generateSecret,
  hashSecret,
  cleanPrezyvka,
  type Rezim,
} from '@/lib/dotaznik/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const REZIMY: Rezim[] = ['live', 'blind', 'open']

// POST /api/dotaznik/pary  { rezim, prezyvka }  → { kod, secret, slot:'a', rezim }
export async function POST(req: NextRequest) {
  let body: { rezim?: string; prezyvka?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad-json' }, { status: 400 })
  }

  const rezim = (REZIMY as string[]).includes(body.rezim ?? '') ? (body.rezim as Rezim) : 'blind'
  const prezyvka = cleanPrezyvka(body.prezyvka) || 'Ja'
  const s = db()

  // generovanie kódu s pár pokusmi na kolíziu
  for (let attempt = 0; attempt < 6; attempt++) {
    const kod = generateKod()
    const secret = generateSecret()
    const { data, error } = await s
      .from('dotaznik_pary')
      .insert({ kod, pin_hash: hashSecret(secret), rezim, prezyvka_a: prezyvka })
      .select('kod')
      .single()

    if (!error && data) {
      return NextResponse.json({ kod: data.kod, secret, slot: 'a', rezim })
    }
    if (error && error.code !== '23505') {
      console.error('[dotaznik/pary] insert error', error.code, error.message)
      return NextResponse.json({ error: 'db' }, { status: 500 })
    }
  }
  return NextResponse.json({ error: 'kod-collision' }, { status: 500 })
}
