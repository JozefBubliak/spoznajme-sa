// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = params.code.toUpperCase()

  const s = supabaseServer(session.access_token)

  const { data: players } = await s
    .from('herd_players')
    .select('name, score')
    .eq('game_code', code)
    .order('score', { ascending: false })

  return NextResponse.json(players || [])
}
