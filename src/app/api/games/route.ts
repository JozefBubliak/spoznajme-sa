// PATH: src/app/api/games/route.ts
// Create game: POST /api/games  ->  { gameCode }

import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/herdvote/store';
import { getSession } from '@/app/api/games/_session';

/**
 * Example (unauthenticated):
 *   curl -i -X POST http://localhost:3000/api/games
 *   -> HTTP/1.1 401 Unauthorized
 */

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const game = store.createGame({});
  return NextResponse.json({ gameCode: game.code });
}
