//  src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { code: string }}) {
  // TODO: Update when herd_players table exists
  // const s = supabaseServer()
  // const { data, error } = await s
  //   .from('herd_players')
  //   .select('name, score')
  //   .eq('game_code', params.code)
  // if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  
  // Mock response for now
  return NextResponse.json([])
}
