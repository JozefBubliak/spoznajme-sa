// PATH: src/app/api/games/[code]/leaderboard/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) {
    // UX-friendly: prázdny leaderboard namiesto chyby
    return NextResponse.json([])
  }

  const leaderboard = [...(game.players ?? [])]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .map(p => ({ name: p.name, score: p.score ?? 0 }))

  return NextResponse.json(leaderboard)
}
