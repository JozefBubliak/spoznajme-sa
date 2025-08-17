// PATH: src/app/api/games/[code]/answers/route.ts
// Uloženie odpovede hráča (idempotentne na playerId+roundId+qIndex)

import { NextResponse } from 'next/server'
import { store, type PlayerAnswer } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function POST(
  req: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const { playerId, roundId, qIndex, answer } = body as {
    playerId: string
    roundId: string
    qIndex: number
    answer: 'A' | 'B' | 'C' | 'D' | null
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

  // idempotentný zápis odpovede pre danú otázku
  round.answers = round.answers ?? []
  const key = `${playerId}:${roundId}:${qIndex}`
  const existingIndex = round.answers.findIndex((a: PlayerAnswer) => a.key === key)
  const entry: PlayerAnswer = {
    key,
    playerId,
    roundId,
    qIndex,
    answer,
    at: Date.now(),
  }

  if (existingIndex >= 0) round.answers[existingIndex] = entry
  else round.answers.push(entry)

  return NextResponse.json({ ok: true })
}
