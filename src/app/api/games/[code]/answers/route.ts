import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const { playerId, roundId, qIndex, answer } = body as {
    playerId: string
    roundId: string
    qIndex: number
    answer: 'A'|'B'|'C'|'D'|null
  }

  if (!playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const player = game.players.find(p => p.id === playerId)
  if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 })
  const round = game.rounds.find(r => r.id === roundId)
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  if (round.status !== 'running') {
    return NextResponse.json({ error: 'Round is not accepting answers' }, { status: 400 })
  }

  // bez typovej kolízie – držíme odpovede na úrovni hry
  ;(game as any).answers = (game as any).answers ?? []
  const key = `${playerId}:${roundId}:${qIndex}`
  const existing = (game as any).answers.findIndex((a: any) => a.key === key)
  const entry = { key, playerId, roundId, qIndex, answer, ts: Date.now() }

  if (existing >= 0) (game as any).answers[existing] = entry
  else (game as any).answers.push(entry)

  return NextResponse.json({ ok: true })
}
