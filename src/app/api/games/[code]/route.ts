import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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