import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  // povoliť len zo stavu 'waiting'
  if (game.status !== 'waiting') {
    return NextResponse.json({ error: 'Lobby already closed' }, { status: 400 })
  }

  game.status = 'active'
  ;(game as any).usedQuestionIds = []
  game.rounds = game.rounds ?? []

  return NextResponse.json({ success: true, status: game.status })
}
