// PATH: src/app/api/games/[code]/answers/route.ts

// Uloženie odpovede hráča (idempotentne na playerId+roundId+qIndex)

import { NextRequest, NextResponse } from 'next/server';
import { store, type PlayerAnswer } from '@/lib/herdvote/store';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;
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

  const { playerId, questionId, answer } = body ?? {}
  if (!playerId || !questionId || typeof answer === 'undefined') {
    return NextResponse.json(
      { error: 'Missing required fields: playerId, questionId, answer' },
      { status: 400 }
    )
  }

  // TODO: Ulož do DB/úložiska podľa tvojej architektúry.
  // Napr.:
  // const ok = await saveAnswer({ code, playerId, questionId, answer })
  // if (!ok) return NextResponse.json({ error: 'Save failed' }, { status: 500 })

  // Dočasná „noop“ odpoveď, aby build prešiel:
  return NextResponse.json({ ok: true, code, playerId, questionId })
}

/**
 * (Voliteľné) Na debug: vráti prázdny zoznam alebo reálne dáta, ak si ich doplníš.
 * Bezpečne sa kompiluje aj bez DB.
 */
export async function GET(_req: NextRequest, ctx: Ctx<{ code: string }>) {
  const { code } = await ctx.params
  // TODO: načítaj odpovede z DB
  return NextResponse.json({ ok: true, code, answers: [] })
}
