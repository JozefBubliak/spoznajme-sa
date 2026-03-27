// src/lib/realtime/types.ts

import type { Player } from '../herdvote/store'

export type HerdEvent =
  | { type: 'question:show'; code: string; roundId: string; qIndex: number; at: number }
  | { type: 'timer:start';   code: string; roundId: string; qIndex: number; startedAt: number; durationSec: number }
  | { type: 'round:lock';    code: string; roundId: string; qIndex: number; at: number }
  | { type: 'round:results'; code: string; roundId: string; qIndex: number; correct: 'A'|'B'|'C'|'D'; leaderboard: any; at: number }
  | { type: 'round:finish';  code: string; roundId: string; leaderboard: any; at: number }
  | { type: 'game:finish';   code: string; leaderboard: any; at: number }
  | { type: 'player:joined'; code: string; player: Player; at: number }
  | { type: 'lobby:locked';  code: string; at: number }
  | { type: 'game:started';  code: string; at: number }

export type RealtimeCallback = (event: HerdEvent) => void

export function channelFor(gameCode: string): string {
  return `herd-game-${gameCode.toLowerCase()}`
}