// PATH: src/app/api/games/[code]/answers/route.ts
// Uloženie odpovede hráča (idempotentne na playerId+roundId+qIndex)

import { NextRequest, NextResponse } from 'next/server';
import { store, type PlayerAnswer } from '@/lib/herdvote/store';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  ctx: { params: { code: string } }
) {
  const { code } = ctx.params;
  const gameCode = String(code || '').toUpperCase();
  const game = store.getGame(gameCode);
  if (!game) return NextResponse.json({ error: 'Game not found' }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const { playerId, roundId, qIndex, answer } = body as {
    playerId: string;
    roundId: string;
    qIndex: number;
    answer: 'A'|'B'|'C'|'D'|null;
  };

  if (!playerId || !roundId || typeof qIndex !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const player = game.players.find(p => p.id === playerId);
  if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });

  const round = game.rounds.find(r => r.id === roundId);
  if (!round) return NextResponse.json({ error: 'Round not found' }, { status: 404 });

  if (round.status !== 'running') {
    return NextResponse.json({ error: 'Round is not accepting answers' }, { status: 400 });
  }

  if (qIndex !== (round.qIndex || 0)) {
    return NextResponse.json({ error: 'Question index mismatch' }, { status: 400 });
  }
  if (qIndex >= round.questions.length) {
    return NextResponse.json({ error: 'Invalid question index' }, { status: 400 });
  }

  const existing = store.getPlayerAnswer(playerId, roundId, qIndex);
  if (existing) {
    return NextResponse.json({
      success: true,
      message: 'Answer already recorded',
      answer: existing.answer,
    });
  }

  if (answer !== null && !['A','B','C','D'].includes(String(answer))) {
    return NextResponse.json({ error: 'Invalid answer' }, { status: 400 });
  }

  const pa: PlayerAnswer = {
    playerId,
    roundId,
    qIndex,
    answer: (answer ?? null),
    ts: Date.now(),
  };
  game.answers.push(pa);

  return NextResponse.json({
    success: true,
    playerId, roundId, qIndex, answer: pa.answer,
  });
}
