import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: NextRequest,
  context: { params: { code: string } }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const gameCode = context.params.code.toUpperCase()
  const s = supabaseServer(session.access_token)

  const { error } = await s
    .from('herd_games')
    .update({ phase: 'playing' })
    .eq('code', gameCode)
    .eq('owner_id', session.user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true, status: 'playing' })
}
