// PATH: src/app/api/games/[code]/config/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Pomocný typ pre ctx s dynamickými segmentmi
type Ctx<T extends Record<string, string>> = { params: Promise<T> }

// (voliteľné) Načítanie aktuálnej konfigurácie hry
export async function GET(_req: NextRequest, ctx: Ctx<{ code: string }>) {
  const { code } = await ctx.params

  // TODO: načítaj z DB (supabase, atď.)
  // const { data, error } = await s.from('herd_games').select('*').eq('code', code).single()
  // if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  // Dočasný stub, aby build prešiel
  return NextResponse.json({ ok: true, code, config: { rounds: 3, prep_seconds: 10, scoring: 'classic' } })
}

// Uloženie / update konfigurácie hry
export async function POST(req: NextRequest, ctx: Ctx<{ code: string }>) {
  const { code } = await ctx.params

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


  return NextResponse.json({ ok: true, code, updates })
}
