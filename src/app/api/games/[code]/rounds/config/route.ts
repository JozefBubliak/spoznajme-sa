// PATH: src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
  const s = supabaseServer()

  const body = (await req.json().catch(() => ({}))) as {
    category?: string
    count?: number
    settings?: Record<string, unknown>
  }

  const { category, count, settings } = body

  if (!category || !count) {
    return NextResponse.json({ error: 'Missing category or count' }, { status: 400 })
  }

  // TS workaround: typy zatiaľ nepoznajú herd_rounds → (s as any)
  const { error } = await (s as any)
    .from('herd_rounds')
    .insert({
      game_code: code,
      category,
      count,
      settings,
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
