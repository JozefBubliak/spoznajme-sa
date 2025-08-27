import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const s = supabaseServer(session.access_token)

  const { data: g } = await s
    .from('herd_games')
    .select('code, phase, updated_at')
    .eq('owner_id', session.user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!g) return NextResponse.json({}, { status: 204 })

  return NextResponse.json({ code: g.code, phase: g.phase || 'lobby' })
}

