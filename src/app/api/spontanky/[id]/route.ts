import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const db = supabaseServer()

  const [spRes, ucastniciRes, prinesRes, chatRes] = await Promise.all([
    db.from('spontanky').select('*').eq('id', id).single(),
    db.from('spontanka_ucastnici').select('*').eq('spontanka_id', id).order('created_at'),
    db.from('spontanka_prinesiem').select('*').eq('spontanka_id', id).order('order_index'),
    db.from('spontanka_chat').select('*').eq('spontanka_id', id).order('created_at').limit(200),
  ])

  if (spRes.error || !spRes.data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ucastnici = ucastniciRes.data ?? []
  const stats = {
    pridem: ucastnici.filter((u: any) => u.status === 'pridem').length,
    mozno: ucastnici.filter((u: any) => u.status === 'mozno').length,
    celkom: ucastnici.filter((u: any) => u.status !== 'nepridem').length,
  }

  return NextResponse.json({
    ...spRes.data,
    stats,
    ucastnici,
    prinesiem: prinesRes.data ?? [],
    chat: chatRes.data ?? [],
  })
}

const UpdateSchema = z.object({
  nazov: z.string().min(3).max(120).optional(),
  datum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  cas: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  popis: z.string().max(1000).optional(),
  typ_aktivity: z.array(z.string()).optional(),
  pre_koho: z.string().max(200).optional(),
  ocakavany_pocet: z.string().max(50).optional(),
  miesto_hlavne_nazov: z.string().min(2).max(200).optional(),
  miesto_zraz_nazov: z.string().max(200).optional(),
  miesto_zraz_cas: z.string().max(10).optional(),
  viditelnost: z.enum(['sukromne', 'okolie', 'verejne']).optional(),
})

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseServer()
  const { data: sp } = await db.from('spontanky').select('creator_id').eq('id', id).single()
  if (!sp || sp.creator_id !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = UpdateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const { error } = await db
    .from('spontanky')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
