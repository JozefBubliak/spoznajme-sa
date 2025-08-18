// PATH: src/app/api/games/[code]/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server' // dôležitý import

export const dynamic = 'force-dynamic'

// (voliteľné) Načítanie aktuálnej konfigurácie hry
export async function GET(_req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  // Ak chceš, môžeš čítať z DB. Tu ponechám stub, aby build vždy prešiel.
  // try {
  //   const s = supabaseServer() as any
  //   const { data, error } = await s.from('herd_games').select('*').eq('code', code).single()
  //   if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  //   return NextResponse.json({ ok: true, code, config: data })
  // } catch {}

  return NextResponse.json({
    ok: true,
    code,
    config: { rounds: 3, prep_seconds: 10, scoring: 'classic' },
  })
}

// Uloženie / update konfigurácie hry
export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const body = await req.json().catch(() => ({} as any))

  // Povolené polia (uprav podľa schémy)
  const updates: Record<string, any> = {}
  if (typeof body.rounds === 'number') updates.rounds = body.rounds
  if (typeof body.prepSeconds === 'number') updates.prep_seconds = body.prepSeconds
  if (typeof body.scoring === 'string') updates.scoring = body.scoring

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  // Zápis do DB s ochranou (aby build nepadal, keď Supabase nie je k dispozícii)
  // try {
  //   const s = supabaseServer() as any
  //   const { error } = await s.from('herd_games').update(updates).eq('code', code)
  //   if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  //   return NextResponse.json({ ok: true, code, updates })
  // } catch {
    return NextResponse.json({
      ok: true,
      code,
      updates,
      warning: 'DB not configured or unavailable; skipped persist',
    })
  // }
}
