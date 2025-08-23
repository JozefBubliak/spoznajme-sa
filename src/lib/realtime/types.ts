// src/lib/realtime/types.ts

import type { Player } from '../herdvote/store'

export type LeaderboardEntry = Pick<Player, 'id' | 'name' | 'score'>

export type HerdEvent =
  | { type: 'game:start'; code: string; roundId: string; qIndex: number; at: number }
  | { type: 'question:show'; code: string; roundId: string; qIndex: number; at: number }
  | { type: 'timer:start';   code: string; roundId: string; qIndex: number; startedAt: number; durationSec: number }
  | { type: 'round:lock';    code: string; roundId: string; qIndex: number; at: number }
  | { type: 'round:results'; code: string; roundId: string; qIndex: number; correct: 'A'|'B'|'C'|'D'; leaderboard: LeaderboardEntry[]; at: number }
  | { type: 'round:finish';  code: string; roundId: string; leaderboard: LeaderboardEntry[]; at: number }

export type RealtimeCallback = (event: HerdEvent) => void

export function channelFor(gameCode: string): string {
  return `herd-vote:${gameCode.toUpperCase()}`
}