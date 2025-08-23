import { NextRequest, NextResponse } from 'next/server'
import { store, type Player, type PlayerAnswer } from '@/lib/herdvote/store'
import { getSession } from '@/app/api/games/_session'

export const dynamic = 'force-dynamic'

interface AnswerBody {
  playerId: string
  roundId: string
  qIndex: number
  answer: 'A' | 'B' | 'C' | 'D' | null
}

export async function POST(req: NextRequest, context: any) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const code = context?.params?.code as string
  const gameCode = String(code || '').toUpperCase()
  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = (await req.json().catch(() => ({}))) as Partial<AnswerBody>
  const { playerId, roundId, qIndex, answer } = body

  if (!playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  const player = game.players.find((p: Player) => p.id === playerId)
  if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 })
  const round = game.rounds.find(r => r.id === roundId)
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  if (round.status !== 'running') {
    return NextResponse.json({ error: 'Round is not accepting answers' }, { status: 400 })
  }

  const existingIndex = game.answers.findIndex(
    (a: PlayerAnswer) =>
      a.playerId === playerId && a.roundId === roundId && a.qIndex === qIndex
  )
  const entry: PlayerAnswer = { playerId, roundId, qIndex, answer: answer ?? null, ts: Date.now() }

  if (existingIndex >= 0) game.answers[existingIndex] = entry
  else game.answers.push(entry)

  return NextResponse.json({ ok: true })
}
