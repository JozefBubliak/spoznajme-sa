// PATH: src/app/api/games/[code]/answers/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Pomocný typ na ctx s dynamickými segmentmi
type Ctx<T extends Record<string, string>> = { params: Promise<T> }

/**
 * Uloženie odpovede hráča pre danú hru (code).
 * Očakávané body (JSON):
 * {
 *   "playerId": string,
 *   "questionId": string,
 *   "answer": string | number | boolean | object
 * }
 */
export async function POST(req: NextRequest, ctx: Ctx<{ code: string }>) {
  const { code } = await ctx.params

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { playerId, questionId, answer } = body ?? {}
  if (!playerId || !questionId || typeof answer === 'undefined') {
    return NextResponse.json(
      { error: 'Missing required fields: playerId, questionId, answer' },
      { status: 400 }
    )
  }

  // TODO: Ulož do DB/úložiska podľa tvojej architektúry.
  // Napr.:
  // const ok = await saveAnswer({ code, playerId, questionId, answer })
  // if (!ok) return NextResponse.json({ error: 'Save failed' }, { status: 500 })

  // Dočasná „noop“ odpoveď, aby build prešiel:
  return NextResponse.json({ ok: true, code, playerId, questionId })
}

/**
 * (Voliteľné) Na debug: vráti prázdny zoznam alebo reálne dáta, ak si ich doplníš.
 * Bezpečne sa kompiluje aj bez DB.
 */
export async function GET(_req: NextRequest, ctx: Ctx<{ code: string }>) {
  const { code } = await ctx.params
  // TODO: načítaj odpovede z DB
  return NextResponse.json({ ok: true, code, answers: [] })
}
