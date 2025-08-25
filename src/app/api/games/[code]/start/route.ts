import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(_req: Request, ctx: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const code = String(
    Array.isArray(ctx?.params?.code) ? ctx.params.code[0] : ctx?.params?.code
  ).toUpperCase()

  const supabase = supabaseServer(session.access_token)

  const { data, error } = await supabase.rpc('start_game')
  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Unable to start game' }, { status: 400 })
  }

  return NextResponse.json({ success: true, status: data.status })
}