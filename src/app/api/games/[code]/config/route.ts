// src/app/api/games/[code]/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

// POZOR: v route handlers je 2. argument obyčajný objekt { params: { ... } }
export async function POST(req: Request, ctx: { params: { code: string } }) {
  const { code } = ctx.params

  let body: any
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  // Príklad povolených polí konfigurácie (uprav podľa tvojej tabuľky `herd_games`)
  const updates: Record<string, any> = {}
  if (typeof body.rounds === 'number') updates.rounds = body.rounds
  if (typeof body.prepSeconds === 'number') updates.prep_seconds = body.prepSeconds
  if (typeof body.scoring === 'string') updates.scoring = body.scoring

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const s = supabaseServer()
  const { error } = await s
    .from('herd_games')
    .update(updates)
    .eq('code', code)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
