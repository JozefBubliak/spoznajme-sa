import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const session = await getSession().catch(() => null)
  const s = session ? supabaseServer(session.access_token) : supabaseServer()

  const { data, error } = await s
    .from('herd_categories_with_counts')
    .select('id,name,count,is_active')
    .order('name', { ascending: true })

  if (error) {
    return NextResponse.json({ categories: [] })
  }

  const active = asArray(data).filter((c: any) => c.is_active !== false)
  return NextResponse.json({
    categories: active.map((c: any) => ({
      id: c.id,
      name: c.name,
      count: c.count ?? 0,
    })),
  })
}
