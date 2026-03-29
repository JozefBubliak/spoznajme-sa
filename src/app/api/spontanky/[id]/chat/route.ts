import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const db = supabaseServer()
  const { data, error } = await db
    .from('spontanka_chat')
    .select('*')
    .eq('spontanka_id', id)
    .order('created_at')
    .limit(300)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ messages: data ?? [] })
}

const Schema = z.object({
  participant_id: z.string().uuid(),
  meno: z.string().min(1).max(60),
  text: z.string().min(1).max(500),
  pinned: z.boolean().default(false),
})

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const db = supabaseServer()

  // Check spontanka exists and is not cancelled
  const { data: sp } = await db.from('spontanky').select('stav').eq('id', id).single()
  if (!sp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (sp.stav === 'zrusena') return NextResponse.json({ error: 'Spontánka je zrušená' }, { status: 400 })

  // Only allow chat from participants (status pridem or mozno)
  const { data: participant } = await db
    .from('spontanka_ucastnici')
    .select('status')
    .eq('spontanka_id', id)
    .eq('participant_id', parsed.data.participant_id)
    .single()

  if (!participant || participant.status === 'nepridem') {
    return NextResponse.json({ error: 'Musíš sa prihlásiť na spontánku (Prídem alebo Možno) pred chatovaním.' }, { status: 403 })
  }

  const { data, error } = await db
    .from('spontanka_chat')
    .insert({
      spontanka_id: id,
      participant_id: parsed.data.participant_id,
      meno: parsed.data.meno,
      text: parsed.data.text,
      pinned: false, // participants cannot pin
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: data })
}
