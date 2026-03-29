import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const db = supabaseServer()
  const { data, error } = await db
    .from('spontanka_prinesiem')
    .select('*')
    .eq('spontanka_id', id)
    .order('order_index')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}

const AddSchema = z.object({
  nazov: z.string().min(1).max(100),
  mnozstvo: z.string().max(30).default(''),
})

export async function POST(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const parsed = AddSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues }, { status: 422 })

  const db = supabaseServer()

  // Anyone who knows the spontanka ID can add items (participant or organizer)
  const { data: sp } = await db.from('spontanky').select('stav').eq('id', id).single()
  if (!sp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (sp.stav === 'zrusena') return NextResponse.json({ error: 'Spontánka je zrušená' }, { status: 400 })

  // Get current max order_index
  const { data: maxRow } = await db
    .from('spontanka_prinesiem')
    .select('order_index')
    .eq('spontanka_id', id)
    .order('order_index', { ascending: false })
    .limit(1)
    .single()

  const nextIndex = maxRow ? maxRow.order_index + 1 : 0

  const { data, error } = await db
    .from('spontanka_prinesiem')
    .insert({ spontanka_id: id, ...parsed.data, order_index: nextIndex })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ item: data })
}
