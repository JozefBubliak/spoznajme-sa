import { NextResponse } from 'next/server'
import { getSession } from '@/app/api/games/_session'
import { supabaseServer } from '@/integrations/supabase/server'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ categories: [] }, { status: 401 })
  }
  const s = supabaseServer(session.access_token)

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
