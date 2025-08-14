import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

// GET /api/games/[code]/players  -> vráti lobby (zoznam hráčov/tímov)
// POZN.: params v Next 15 sú Promise, treba await-nuť.
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)

  // Namiesto 404 vrátime prázdnu lobby, aby UI nehlásilo "Chyba spojenia".
  if (!game) return NextResponse.json({ players: [] })

  return NextResponse.json({ players: game.players ?? [] })
}

// POST /api/games/[code]/players  -> pridá hráča/tím { name }
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const name = String(body?.name ?? '').trim().slice(0, 40)
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  // Idempotentné pripojenie – ak už je také meno v hre, vrátime existujúceho hráča.
  const existing = game.players.find(
    p => p.name.toLowerCase() === name.toLowerCase()
  )
  if (existing) {
    return NextResponse.json({
      playerId: existing.id,
      name: existing.name,
      gameCode,
    })
  }

  const id =
    (globalThis as any)?.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random()}`

  const player = { id, name, score: 0 }
  game.players.push(player)

  return NextResponse.json({
    playerId: player.id,
    name: player.name,
    gameCode,
  })
}
