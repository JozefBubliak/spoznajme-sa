// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const s = supabaseServer()
  const { data, error } = await s
    .from('herd_players')
    .select('name, score')
    .eq('game_code', code)
    .order('score', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data ?? [])
}
