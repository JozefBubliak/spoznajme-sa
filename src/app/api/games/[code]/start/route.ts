import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function POST(
  _req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  if (!Array.isArray(game.rounds) || game.rounds.length === 0) {
    return NextResponse.json({ error: 'No rounds configured' }, { status: 400 })
  }

  // povol prechod len z 'waiting' alebo 'active' 
  if (game.status !== 'waiting' && game.status !== 'active') {
    return NextResponse.json({ error: `Invalid state: ${game.status}` }, { status: 400 })
  }

  game.status = 'active'
  return NextResponse.json({ success: true, status: game.status })
}
