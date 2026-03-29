import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const Schema = z.object({
  text: z.string().min(1).max(500),
  pinned: z.boolean().default(false),
})

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = supabaseServer()
  const { data: sp } = await db.from('spontanky').select('creator_id, creator_meno').eq('id', id).single()
  if (!sp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (sp.creator_id !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const { error } = await db.from('spontanka_chat').insert({
    spontanka_id: id,
    participant_id: 'organizer',
    meno: sp.creator_meno,
    text: parsed.data.text,
    pinned: parsed.data.pinned,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
