// PATH: src/app/api/games/[code]/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

// Uloženie (časti) konfigurácie hry do herd_games
export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const body = (await req.json().catch(() => ({}))) as {
    rounds?: number
    prepSeconds?: number
    scoring?: string
    // prípadne ďalšie polia, ktoré máš v JSON settings
  }

  // povolené zmeny – mapovanie na DB stĺpce
  const updates: Record<string, any> = {}
  if (typeof body.rounds === 'number') updates.rounds = body.rounds
  if (typeof body.prepSeconds === 'number') updates.prep_seconds = body.prepSeconds
  if (typeof body.scoring === 'string') updates.scoring = body.scoring

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const s = supabaseServer()
  const { error } = await s.from('herd_games').update(updates).eq('code', code)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ ok: true })
}
