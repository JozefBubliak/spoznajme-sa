// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { getSession } from '@/app/api/games/_session'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String(params.code).toUpperCase()

  const s = supabaseServer(session.access_token)

  const { data: players } = await s
    .from('herd_players')
    .select('name, score')
    .eq('game_code', gameCode)
    .order('score', { ascending: false })

  return NextResponse.json(asArray(players))
}
