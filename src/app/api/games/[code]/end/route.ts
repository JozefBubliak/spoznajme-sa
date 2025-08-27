import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ code: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code } = await ctx.params
  const gameCode = String(code).toUpperCase()
  const s = supabaseServer(session.access_token)

  const { data: game } = await s
    .from('herd_games')
    .select('code, owner_id')
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)
    .single()

  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  await s.from('herd_rounds').update({ status: 'finished' }).eq('game_code', gameCode)
  await s.from('herd_games').update({ phase: 'final' }).eq('code', gameCode)

  return NextResponse.json({ success: true })
}

