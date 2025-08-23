// PATH: src/app/api/games/[code]/rounds/config/route.ts
import 'server-only'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import type { Json } from '@/integrations/supabase/types'

export const dynamic = 'force-dynamic'

type UpsertBody = {
  index: number
  topic?: string | null
  questions?: Json
}

export async function POST(req: NextRequest, { params }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const code = String(params?.code ?? '').toUpperCase()
  const body = (await req.json().catch(() => ({}))) as UpsertBody

  if (!Number.isInteger(body.index)) {
    return NextResponse.json({ error: 'Missing or invalid "index"' }, { status: 400 })
  }

  const s = supabaseServer()

  // overíme, že miestnosť existuje (nech upsert nie je „do prázdna“)
  const { data: room } = await s.from('rooms').select('id').eq('code', code).single()
  if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 })

  const { error } = await s
    .from('herd_rounds')
    .upsert(
      { game_code: code, index: body.index, topic: body.topic ?? null, questions: body.questions },
      { onConflict: 'game_code,index' }
    )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
