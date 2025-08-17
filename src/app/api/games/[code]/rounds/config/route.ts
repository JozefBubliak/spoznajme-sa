// src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { code: string }}) {
  const { index, topic, questions } = await req.json()

  // TODO: Update when herd_rounds and herd_games tables exist
  // const s = supabaseServer()
  // const { data, error } = await s.from('herd_rounds').upsert({
  //   game_code: params.code,
  //   index,
  //   topic,
  //   questions
  // }, { onConflict: 'game_code,index' }).select()
  // if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Mock response for now
  return NextResponse.json({ ok: true })
}
