// src/app/api/games/[code]/rounds/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export async function POST(req: Request, { params }: { params: { code: string } }) {
  const s = supabaseServer()
  const body = await req.json().catch(() => ({})) as {
    category?: string
    count?: number
    settings?: Record<string, unknown>
  }

  const { category, count, settings } = body
  const { error } = await s.from('herd_rounds').insert({
    game_code: params.code,
    category,
    count,
    settings,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}

