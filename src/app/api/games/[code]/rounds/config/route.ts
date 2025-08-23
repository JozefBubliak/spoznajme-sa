// PATH: src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import type { Json } from '@/integrations/supabase/types'

export const dynamic = 'force-dynamic'

type Body = {
  index: number
  topic?: string | null
  questions?: Json
}

// Uloženie/aktualizácia kola (idempotentne podľa game_code + index)
export async function POST(req: Request, context: any) {
  const code = String(context?.params?.code ?? '').toUpperCase()

  const payload = (await req.json().catch(() => ({}))) as Partial<Body>
  const index = payload.index
  const topic = payload.topic ?? null
  const questions = (payload.questions ?? null) as Json | null

  if (typeof index !== 'number' || Number.isNaN(index)) {
    return NextResponse.json(
      { error: 'Missing or invalid "index"' },
      { status: 400 }
    )
  }

  const s = supabaseServer()

  // Dôležité: použi upsert s POĽOM, aby sadol správny overload
  const { error } = await s
    .from('herd_rounds')
    .upsert([{ game_code: code, index, topic, questions }], {
      onConflict: 'game_code,index',
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
