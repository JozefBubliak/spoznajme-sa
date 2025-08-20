import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // bezpečne zoberieme route parametre
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  // povol len zo stavu waiting
  if (game.status !== 'waiting') {
    return NextResponse.json({ error: 'Lobby already closed' }, { status: 400 })
  }

  game.status = 'setup'
  // voliteľne si vynuluj pomocné polia
  ;(game as any).usedQuestionIds = []
  game.rounds = game.rounds ?? []

  return NextResponse.json({ success: true, status: game.status })
}