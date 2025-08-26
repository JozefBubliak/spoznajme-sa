import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = String(params.code).toUpperCase()
  const s = supabaseServer(session.access_token)

  const { data: game } = await s
    .from('herd_games')
    .select('code, owner_id')
    .eq('code', code)
    .eq('owner_id', session.user.id)
    .single()

  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  await s.from('herd_rounds').update({ status: 'finished' }).eq('game_code', code)
  await s.from('herd_games').update({ phase: 'final' }).eq('code', code)

  return NextResponse.json({ success: true })
}

