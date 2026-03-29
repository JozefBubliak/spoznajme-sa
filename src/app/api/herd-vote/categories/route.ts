import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const s = supabaseServer() // service role — RLS bypass pre read-only view

  // Fetch full category data from herd_categories (with question counts via view)
  const [catRes, countRes] = await Promise.all([
    s.from('herd_categories')
      .select('id,name,slug,icon,group_tag,description_sk,source_hint,sort_order,is_active,display_order')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    s.from('herd_categories_with_counts')
      .select('id,count'),
  ])

  if (catRes.error) {
    console.error('[/api/herd-vote/categories] Supabase error:', catRes.error.code, catRes.error.message, catRes.error.details)
    return NextResponse.json({ categories: [], _error: catRes.error.message })
  }

  const countMap = new Map(asArray(countRes.data).map((c: any) => [c.id, c.count ?? 0]))
  const active = asArray(catRes.data)

  return NextResponse.json({
    categories: active.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug ?? '',
      icon: c.icon ?? '❓',
      group_tag: c.group_tag ?? 'veda',
      description_sk: c.description_sk ?? null,
      source_hint: c.source_hint ?? null,
      sort_order: c.sort_order ?? 100,
      question_count: countMap.get(c.id) ?? 0,
    })),
  })
}
