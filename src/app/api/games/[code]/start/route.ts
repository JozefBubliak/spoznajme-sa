import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: Request,
  ctx: any
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = String(ctx.params.code).toUpperCase()

  const supabase = supabaseServer(session.access_token)

  const { error: gErr } = await supabase
    .from('herd_games')
    .update({ phase: 'setup' })
    .eq('code', code)

  if (gErr) return NextResponse.json({ error: gErr.message }, { status: 400 })

  return NextResponse.json({ success: true, status: 'setup' })
}