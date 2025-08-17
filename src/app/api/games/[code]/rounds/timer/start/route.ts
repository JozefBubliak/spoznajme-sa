// PATH: src/app/api/games/[code]/rounds/timer/start/route.ts
import { NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'
import { RealtimeServer } from '@/lib/realtime/server'
import { channelFor } from '@/lib/realtime/types'
import { supabaseServer } from '@/integrations/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, context: any) {
  const { code } = (context?.params ?? {}) as { code: string }
  const gameCode = String(code || '').toUpperCase()

  const game = store.getGame(gameCode)
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 })

  const body = (await req.json().catch(() => ({}))) as {
    seconds?: number
    duration?: number
    roundId?: string
  }
  const seconds = Number(body?.seconds ?? body?.duration ?? 45)

  const round = body?.roundId
    ? game.rounds.find(r => r.id === body.roundId)
    : store.getActiveRound(gameCode)

  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  if (round.status !== 'shown') {
    return NextResponse.json({ error: 'Round must be in "shown" state' }, { status: 400 })
  }

  // Nastav stav kola + čas
  const startedAt = Date.now()
  const deadlineMs = startedAt + seconds * 1000
  round.status = 'running'
  round.startedAt = startedAt
  ;(round as any).deadline = deadlineMs // ak máš vlastné pole na deadline

  // Persist do prípadného storage (ak existuje)
  store.saveGame?.(game)

  // (voliteľné) zapíš deadline aj do DB – pri refreshoch budú klienti konzistentní
  try {
    const s = supabaseServer()
    await s
      .from('herd_games')
      .update({ timer_deadline: new Date(deadlineMs).toISOString() })
      .eq('code', gameCode)
  } catch {
    // best-effort – neblokuj hru, ak by zlyhal zápis
  }

  // Realtime notifikácia – nech klienti spustia odpočet
  await RealtimeServer.publish(channelFor(gameCode), {
    type: 'timer:start',
    code: gameCode,
    roundId: round.id,
    qIndex: round.qIndex || 0,
    seconds,            // koľko rátať
    deadline: deadlineMs, // unix ms; klient si vie dopočítať zvyšok
    at: startedAt,
  })

  return NextResponse.json({
    success: true,
    roundId: round.id,
    qIndex: round.qIndex || 0,
    seconds,
    deadline: new Date(deadlineMs).toISOString(),
  })
}
