// PATH: src/app/api/games/[code]/players/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

// GET – vráti lobby (zoznam hráčov)
export async function GET(_req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)

  // UX: ak hra neexistuje, vráť prázdny zoznam
  if (!game) return NextResponse.json({ players: [] })

  return NextResponse.json({ players: game.players || [] })
}

// POST – pridá hráča (kým je lobby otvorená)
export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  // po zamknutí lobby neprijímame nových hráčov
  if (game.status !== 'waiting') {
    return NextResponse.json({ error: 'Lobby closed' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({} as any))
  const name = String(body?.name || '').trim()
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  // idempotentný join podľa mena
  const existing = game.players.find(p => p.name.toLowerCase() === name.toLowerCase())
  if (existing) {
    return NextResponse.json({ playerId: existing.id, name: existing.name, gameCode })
  }

  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
  const player = { id, name, score: 0 }
  game.players = game.players ?? []
  game.players.push(player)

  return NextResponse.json({ playerId: id, name, gameCode })
}

