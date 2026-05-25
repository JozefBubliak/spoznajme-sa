import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = String((await Promise.resolve(context?.params))?.code ?? '').toUpperCase()
  if (!gameCode) {
    return NextResponse.json({ error: 'Invalid route' }, { status: 400 })
  }
  const s = supabaseServer() // service role — bypasses RLS

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

