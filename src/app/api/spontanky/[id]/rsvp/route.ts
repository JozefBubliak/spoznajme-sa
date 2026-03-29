import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const Schema = z.object({
  participant_id: z.string().uuid(),
  meno: z.string().min(1).max(60),
  status: z.enum(['pridem', 'mozno', 'nepridem']),
})

type Ctx = { params: Promise<{ id: string }> }

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const db = supabaseServer()
  const { data: sp } = await db.from('spontanky').select('stav').eq('id', id).single()
  if (!sp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (sp.stav === 'zrusena') return NextResponse.json({ error: 'Spontánka je zrušená' }, { status: 400 })

  const { error } = await db
    .from('spontanka_ucastnici')
    .upsert(
      {
        spontanka_id: id,
        participant_id: parsed.data.participant_id,
        meno: parsed.data.meno,
        status: parsed.data.status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'spontanka_id,participant_id' }
    )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
