import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseAdmin'

export async function GET() {
  const { data, error } = await supabase
    .from('kviz_questions')
    .select('theme')

  if (error || !data) {
    return NextResponse.json({ categories: [] })
  }

  const map = new Map<string, number>()
  for (const q of data) {
    const theme = (q.theme as string) || 'Nezaradené'
    map.set(theme, (map.get(theme) || 0) + 1)
  }

  const categories = Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  return NextResponse.json({ categories })
}
