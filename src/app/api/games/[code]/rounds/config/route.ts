// src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export async function POST(req: Request, { params }: { params: { code: string }}) {
  const { index, topic, questions } = await req.json()
  const s = supabaseServer()

  // ulož konfiguráciu do tabuľky rounds alebo do JSON v games – ver. s tabuľkou:
  const { data, error } = await s.from('rounds').upsert({
    code: params.code,
    index,
    topic,
    questions
  }, { onConflict: 'code,index' }).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // ak to bolo posledné kolo, prepneme phase -> ready
  const g = await s.from('games').select('total_rounds').eq('code', params.code).single()
  const have = await s.from('rounds').select('index', { count: 'exact', head: true }).eq('code', params.code)
  if (!g.error && !have.error && (have.count ?? 0) >= (g.data?.total_rounds ?? 0)) {
    await s.from('games').update({ phase: 'ready' }).eq('code', params.code)
  }

  return NextResponse.json({ ok: true })
}
