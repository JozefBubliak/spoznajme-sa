// PATH: src/lib/herdvote/players.ts
// Pomocné funkcie pre prácu s hráčmi (niektoré routy to importovali)

import { store, type Player } from './store';

function uuid() {
  // @ts-expect-error
  return (globalThis.crypto?.randomUUID)
    // @ts-expect-error
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export function listPlayers(gameCode: string): Player[] {
  const g = store.getGame(gameCode);
  return g ? g.players : [];
}

export function upsertPlayerByName(gameCode: string, name: string): Player {
  const g = store.getGame(gameCode);
  if (!g) throw new Error('Game not found');
  const existing = g.players.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (existing) return existing;
  const p: Player = { id: uuid(), name, score: 0 };
  g.players.push(p);
  return p;
}
