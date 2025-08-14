// src/lib/realtime/types.ts

import type { Player } from '../herdvote/store'

export type HerdEvent =
  | { type: 'game:start'; code: string; roundId: string; qIndex: number; at: number }
  | { type: 'round:lock'; code: string; roundId: string; qIndex: number; at: number }
  | { type: 'round:results'; code: string; roundId: string; qIndex: number; correct: 'A'|'B'|'C'|'D'; leaderboard: Player[]; at: number }
  | { type: 'round:finish'; code: string; roundId: string; leaderboard: Player[]; at: number }

export type RealtimeCallback = (event: HerdEvent) => void

export function channelFor(gameCode: string): string {
  return `herd-vote:${gameCode.toUpperCase()}`
}