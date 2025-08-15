// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }

import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/herdvote/store';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  const game = store.createGame({});
  return NextResponse.json({ gameCode: game.code });
}
