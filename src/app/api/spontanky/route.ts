import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const CreateSchema = z.object({
  nazov: z.string().min(3).max(120),
  datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cas: z.string().regex(/^\d{2}:\d{2}$/),
  popis: z.string().max(1000).default(''),
  typ_aktivity: z.array(z.string()).default([]),
  pre_koho: z.string().max(200).default(''),
  ocakavany_pocet: z.string().max(50).default(''),
  miesto_hlavne_nazov: z.string().min(2).max(200),
  miesto_zraz_nazov: z.string().max(200).default(''),
  miesto_zraz_cas: z.string().max(10).default(''),
  viditelnost: z.enum(['sukromne', 'okolie', 'verejne']).default('okolie'),
  creator_meno: z.string().min(1).max(60),
  prinesiem_items: z.array(z.object({
    nazov: z.string().min(1).max(100),
    mnozstvo: z.string().max(30).default(''),
  })).default([]),
})

export async function GET(req: NextRequest) {
  const db = supabaseServer()
  const url = new URL(req.url)
  const viditelnost = url.searchParams.get('viditelnost')
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '30'), 50)
  const offset = parseInt(url.searchParams.get('offset') ?? '0')

  let query = db
    .from('spontanky')
    .select('*')
    .in('stav', ['aktivna', 'pozastavena'])
    .order('datum', { ascending: true })
    .range(offset, offset + limit - 1)

  if (viditelnost) {
    query = query.eq('viditelnost', viditelnost)
  } else {
    query = query.in('viditelnost', ['okolie', 'verejne'])
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Attach stats counts
  const ids = (data ?? []).map((s: any) => s.id)
  let statsMap: Record<string, { pridem: number; mozno: number; celkom: number }> = {}
  if (ids.length > 0) {
    const { data: ucastnici } = await db
      .from('spontanka_ucastnici')
      .select('spontanka_id, status')
      .in('spontanka_id', ids)
    for (const u of ucastnici ?? []) {
      if (!statsMap[u.spontanka_id]) statsMap[u.spontanka_id] = { pridem: 0, mozno: 0, celkom: 0 }
      if (u.status === 'pridem') statsMap[u.spontanka_id].pridem++
      if (u.status === 'mozno') statsMap[u.spontanka_id].mozno++
      statsMap[u.spontanka_id].celkom++
    }
  }

  const result = (data ?? []).map((s: any) => ({
    ...s,
    stats: statsMap[s.id] ?? { pridem: 0, mozno: 0, celkom: 0 },
  }))

  return NextResponse.json({ spontanky: result })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = CreateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const db = supabaseServer()
  const { prinesiem_items, ...spontankaData } = parsed.data

  const { data: sp, error } = await db
    .from('spontanky')
    .insert({ ...spontankaData, creator_id: session.user.id })
    .select()
    .single()

  if (error || !sp) return NextResponse.json({ error: error?.message ?? 'Insert failed' }, { status: 500 })

  // Insert prinesiem items
  if (prinesiem_items.length > 0) {
    await db.from('spontanka_prinesiem').insert(
      prinesiem_items.map((item, i) => ({
        spontanka_id: sp.id,
        nazov: item.nazov,
        mnozstvo: item.mnozstvo,
        order_index: i,
      }))
    )
  }

  // Create pinned info message in chat
  const pinText = `📍 ${sp.miesto_hlavne_nazov} · ${formatDatum(sp.datum)} o ${sp.cas}${sp.miesto_zraz_nazov ? ` · Cyklo zraz: ${sp.miesto_zraz_cas} ${sp.miesto_zraz_nazov}` : ''} · Každý koná za seba.`
  await db.from('spontanka_chat').insert({
    spontanka_id: sp.id,
    participant_id: 'system',
    meno: 'Systém',
    text: pinText,
    pinned: true,
  })

  return NextResponse.json({ id: sp.id, short_id: sp.short_id })
}

function formatDatum(datum: string) {
  const d = new Date(datum)
  return d.toLocaleDateString('sk-SK', { weekday: 'short', day: 'numeric', month: 'numeric' })
}
