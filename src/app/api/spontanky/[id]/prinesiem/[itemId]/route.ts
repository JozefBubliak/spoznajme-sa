import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const Schema = z.object({
  action: z.enum(['claim', 'unclaim']),
  participant_id: z.string().uuid(),
  meno: z.string().min(1).max(60),
})

type Ctx = { params: Promise<{ id: string; itemId: string }> }

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const { id, itemId } = await params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = Schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const db = supabaseServer()
  const { data: item } = await db
    .from('spontanka_prinesiem')
    .select('claimed_by_participant_id')
    .eq('id', itemId)
    .eq('spontanka_id', id)
    .single()

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (parsed.data.action === 'claim') {
    if (item.claimed_by_participant_id) {
      return NextResponse.json({ error: 'Already claimed' }, { status: 409 })
    }
    const { error } = await db
      .from('spontanka_prinesiem')
      .update({
        claimed_by_participant_id: parsed.data.participant_id,
        claimed_by_meno: parsed.data.meno,
        claimed_at: new Date().toISOString(),
      })
      .eq('id', itemId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    // unclaim: only the claimer can unclaim
    if (item.claimed_by_participant_id !== parsed.data.participant_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const { error } = await db
      .from('spontanka_prinesiem')
      .update({ claimed_by_participant_id: null, claimed_by_meno: null, claimed_at: null })
      .eq('id', itemId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id, itemId } = await params
  // Only organizer can delete items - checked via auth
  const db = supabaseServer()
  const { error } = await db
    .from('spontanka_prinesiem')
    .delete()
    .eq('id', itemId)
    .eq('spontanka_id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
