// PATH: src/app/api/games/[code]/answers/route.ts
// Uloženie odpovede hráča (idempotentne na playerId+roundId+qIndex)

import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
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

  // answers držíme vo round cez any, aby sme nemuseli meniť typ Round
  const answers = (((round as any).answers) ??= [] as any[])

  const key = `${playerId}:${roundId}:${qIndex}`
  const entry = {
    key,
    playerId,
    roundId,
    qIndex,
    answer,
    at: Date.now(),
  } as any

  const idx = answers.findIndex((a: any) => a.key === key)
  if (idx >= 0) answers[idx] = entry
  else answers.push(entry)

  return NextResponse.json({ ok: true })
}
