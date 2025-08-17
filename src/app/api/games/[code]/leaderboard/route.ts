//  src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'


export async function GET(_: Request, { params }: { params: { code: string } }) {
  const s = supabaseServer()
  const { data, error } = await s
    .from('herd_players')
    .select('name, score')
    .eq('game_code', params.code)
    .order('score', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data ?? [])
}
