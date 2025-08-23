import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(_req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = supabaseServer(session.access_token)
  const { data, error } = await supabase.rpc('lock_lobby')
  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'Unable to lock lobby' },
      { status: 400 },
    )
  }

  return NextResponse.json({ success: true, status: data.status })
}
