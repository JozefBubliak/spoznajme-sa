import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export async function POST(req: Request, { params }: { params: { code: string }}) {
  const body = await req.json()
  const { totalRounds, prepSeconds, questionSeconds, scoringMode } = body
  const s = supabaseServer()
  const { data, error } = await s
    .from('games')
    .update({
      total_rounds: totalRounds,
      prep_seconds: prepSeconds,
      question_seconds: questionSeconds,
      scoring_mode: scoringMode,
      phase: 'round_setup',
    })
    .eq('code', params.code)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
