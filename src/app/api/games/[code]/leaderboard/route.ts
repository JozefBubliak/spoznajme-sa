// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import { store, type Player } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface RouteContext {
  params: Promise<{ code: string }>
}

export async function GET(_req: Request, context: RouteContext) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = await context.params
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    // UX-friendly: prázdny leaderboard namiesto chyby
    return NextResponse.json([])
  }

  const leaderboard = [...(game.players ?? [])]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .map((p: Player) => ({ name: p.name, score: p.score ?? 0 }))

  return NextResponse.json(leaderboard)
}
