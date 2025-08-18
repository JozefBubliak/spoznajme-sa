// PATH: src/app/api/games/[code]/answers/route.ts
// Uloženie odpovede hráča (idempotentne na playerId + roundId + qIndex)

import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

type SavedAnswer = {
  playerId: string
  roundId: string
  qIndex: number
  answer: 'A' | 'B' | 'C' | 'D' | null
  at: number
}

export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = await req.json().catch(() => ({} as any))
  const { playerId, roundId, qIndex, answer } = body as {
    playerId?: string
    roundId?: string
    qIndex?: number
    answer?: 'A' | 'B' | 'C' | 'D' | null
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

  // Ulož / prepíš odpoveď pre daného hráča a otázku
  const roundAny = round as any
  roundAny.answers = Array.isArray(roundAny.answers) ? roundAny.answers : []

  const idx = roundAny.answers.findIndex(
    (a: SavedAnswer) =>
      a.playerId === playerId && a.roundId === roundId && a.qIndex === qIndex
  )

  const entry: SavedAnswer = {
    playerId,
    roundId,
    qIndex,
    answer: answer ?? null,
    at: Date.now(),
  }

  if (idx >= 0) roundAny.answers[idx] = entry
  else roundAny.answers.push(entry)

  return NextResponse.json({ ok: true })
}
