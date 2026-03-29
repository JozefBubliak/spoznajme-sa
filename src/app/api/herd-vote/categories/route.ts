import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'
import { asArray } from '@/lib/supabase/safe'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const s = supabaseServer() // service role — RLS bypass pre read-only view

  const { data, error } = await s
    .from('herd_categories_with_counts')
    .select('id,name,count,is_active,icon,group_tag,sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[/api/herd-vote/categories] Supabase error:', error.code, error.message, error.details)
    return NextResponse.json({ categories: [], _error: error.message })
  }

  const active = asArray(data).filter((c: any) => c.is_active !== false)
  return NextResponse.json({
    categories: active.map((c: any) => ({
      id: c.id,
      name: c.name,
      count: c.count ?? 0,
      icon: c.icon ?? '🎯',
      group_tag: c.group_tag ?? 'other',
    })),
  })
}
