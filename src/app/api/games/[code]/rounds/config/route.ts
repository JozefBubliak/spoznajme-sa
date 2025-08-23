import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

type Payload = {
  index?: number
  topic?: string | null
  questions?: unknown
}

export async function POST(req: NextRequest, context: any) {
  const code = String(context?.params?.code ?? '').toUpperCase()
  const { index, topic, questions } = (await req.json().catch(() => ({}))) as Payload

  if (typeof index !== 'number') {
    return NextResponse.json({ error: 'Missing or invalid "index"' }, { status: 400 })
  }

  const s = supabaseServer()
  const { error } = await s
    .from('herd_rounds')
    .upsert(
      {
        game_code: code,
        index,
        topic: topic ?? null,
        questions: (questions as any) ?? null,
      },
      { onConflict: 'game_code,index' }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
