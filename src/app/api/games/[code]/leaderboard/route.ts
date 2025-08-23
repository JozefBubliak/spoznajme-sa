// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import { store, type Player } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_req: Request, { params }: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = params as { code: string }
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
