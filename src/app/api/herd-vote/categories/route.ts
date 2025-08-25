import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession().catch(() => null)
  const s = session ? supabaseServer(session.access_token) : supabaseServer()

  let { data, error } = await s
    .from('herd_categories_with_counts')
    .select('id,name,count,is_active')
    .order('name', { ascending: true })


  if (error || !data) {
    return NextResponse.json({ categories: [] })

  }

  const active = (data || []).filter((c: any) => c.is_active !== false)
  return NextResponse.json({
    categories: active.map((c: any) => ({
      id: c.id,
      name: c.name,
      count: c.count ?? 0,
    })),
  })
}
