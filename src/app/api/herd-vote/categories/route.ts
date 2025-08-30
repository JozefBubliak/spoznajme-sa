import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const country = (url.searchParams.get('country') || 'GLOBAL').toUpperCase()

  const session = await getSession().catch(() => null)
  const s = session ? supabaseServer(session.access_token) : supabaseServer()

  const { data } = await s
    .from('herd_categories_with_counts')
    .select('id,name,count,is_active,country_code')
    .in('country_code', [country, 'GLOBAL'])
    .eq('is_active', true)
    .order('name', { ascending: true })

  return NextResponse.json({
    categories: asArray(data).map((c: any) => ({
      id: c.id,
      name: c.name,
      count: c.count ?? 0,
      country_code: c.country_code || 'GLOBAL',
    })),
  })
}
