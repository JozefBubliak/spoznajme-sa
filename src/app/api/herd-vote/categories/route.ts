import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export async function GET() {
  const s = supabaseServer()

  const { data: cats, error } = await s
    .from('herd_categories')
    .select('id,name')
    .eq('is_active', true)
    .order('name')

  if (error || !cats) {
    return NextResponse.json({ categories: [] })
  }

  const categories = await Promise.all(
    cats.map(async (c) => {
      const { count } = await s
        .from('herd_questions')
        .select('id', { count: 'exact', head: true })
        .eq('category_id', c.id)
      return { id: c.id as string, name: c.name as string, count: count || 0 }
    })
  )

  return NextResponse.json({ categories })
}
