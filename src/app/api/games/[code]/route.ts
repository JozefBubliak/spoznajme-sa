// PATH: src/app/api/games/[code]/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }

  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  return NextResponse.json({
    code: gameCode,
    status: game.status,
    roundsCount: game.rounds?.length ?? 0,
    playersCount: game.players?.length ?? 0,
  })
}
