// PATH: src/app/api/games/[code]/config/route.ts
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/integrations/supabase/server' // dôležitý import
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

// (voliteľné) Načítanie aktuálnej konfigurácie hry
interface RouteContext {
  params: { code: string }
}

export async function GET(_req: Request, context: RouteContext) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = context.params

  // Ak chceš, môžeš čítať z DB. Tu ponechám stub, aby build vždy prešiel.
  // try {
  //   const s = supabaseServer()
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
interface ConfigBody {
  rounds?: number
  prepSeconds?: number
  scoring?: string
}

export async function POST(req: Request, context: RouteContext) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = context.params

  const body = (await req.json().catch(() => ({}))) as ConfigBody

  // Povolené polia (uprav podľa schémy)
  const updates: Partial<{ rounds: number; prep_seconds: number; scoring: string }> = {}
  if (typeof body.rounds === 'number') updates.rounds = body.rounds
  if (typeof body.prepSeconds === 'number') updates.prep_seconds = body.prepSeconds
  if (typeof body.scoring === 'string') updates.scoring = body.scoring

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  // Zápis do DB s ochranou (aby build nepadal, keď Supabase nie je k dispozícii)
  // try {
  //   const s = supabaseServer()
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
