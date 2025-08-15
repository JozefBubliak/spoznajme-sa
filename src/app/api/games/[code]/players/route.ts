// PATH: src/app/api/games/[code]/players/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

// Vráti lobby (zoznam hráčov)
export async function GET(_req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  // Ak hra neexistuje, vráť prázdnu lobby (UX je príjemnejší než 404)
  if (!game) return NextResponse.json({ players: [] })
  return NextResponse.json({ players: game.players || [] })
}

// Pridá hráča (kým je lobby otvorená)
export async function POST(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  // po zamknutí lobby neprijímame nových hráčov
  if (game.status !== 'waiting') {
    return NextResponse.json({ error: 'Lobby closed' }, { status: 403 })
  }

  const body = await req.json().catch(() => ({}))
  const name = String(body?.name || '').trim()
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  // idempotentný join podľa mena
  const existing = game.players.find(p => p.name.toLowerCase() === name.toLowerCase())
  if (existing) {
    return NextResponse.json({ playerId: existing.id, name: existing.name, gameCode })
  }

  const id = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)
  const player = { id, name, score: 0 }
  game.players.push(player)

  return NextResponse.json({ playerId: id, name, gameCode })
}
