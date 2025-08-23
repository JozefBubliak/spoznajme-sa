import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, _context: any) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = supabaseServer()

  const { data, error } = await supabase.rpc('start_game')
  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Unable to start game' }, { status: 400 })
  }

  return NextResponse.json({ success: true, status: data.status })
}