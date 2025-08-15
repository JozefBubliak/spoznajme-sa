// PATH: src/app/api/games/[code]/lock-lobby/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

// Zamkne lobby – hráči sa už nepripoja, moderátor ide nastavovať kolá
export async function POST(_: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  // statusy v store: 'waiting' -> 'setup' -> 'active' ...
  if (game.status !== 'waiting') {
    return NextResponse.json({ error: 'Lobby already closed' }, { status: 400 })
  }

  game.status = 'setup'
  return NextResponse.json({ ok: true, status: game.status })
}
