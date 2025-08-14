// src/lib/herdvote/store.ts

export type Player = { id: string; name: string; score: number }

export type Question = {
  id: string
  question_text: string
  options: [string, string, string, string] // A-D
  correct_answer: 'A' | 'B' | 'C' | 'D'
  time_limit: number // s
  points_correct: number
  points_incorrect: number
  theme?: string | null
}

export type ScoringClassic = { mode: 'classic'; correct: number; incorrect: number; none: number }
export type ScoringPodium = { mode: 'podium'; tiers: number[]; incorrect: number; none: number }

export type RoundSettings = {
  timeLimit: number
  scoring: ScoringClassic | ScoringPodium
}

export type Round = {
  id: string
  category: string
  questions: Question[]
  settings: RoundSettings
  // runtime:
  status?: 'pending' | 'running' | 'locked' | 'results' | 'finished'
  qIndex?: number // aktuálna otázka
  startedAt?: number // ms
}

export type PlayerAnswer = { 
  playerId: string
  roundId: string
  qIndex: number
  answer: 'A' | 'B' | 'C' | 'D' | null
  ts: number 
}

export type Game = {
  id: string
  code: string
  status: 'waiting' | 'active' | 'finished'
  settings: Record<string, any>
  players: Player[]
  rounds: Round[]
  answers: PlayerAnswer[] // ploché ukladanie
  createdAt: number
  
  // runtime:
  activeRoundId?: string
}

function rand(n: number) { return Math.floor(Math.random() * n) }

function pickCode(len = 6) {
  const alph = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: len }, () => alph[rand(alph.length)]).join('')
}

function uuid() {
  return (globalThis.crypto?.randomUUID)
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`
}

export const store = {
  games: new Map<string, Game>(),

  createGame(settings: Record<string, any> = {}) {
    const code = pickCode(6)
    const game: Game = {
      id: uuid(),
      code,
      status: 'waiting',
      settings,
      players: [],
      rounds: [],
      answers: [],
      createdAt: Date.now(),
    }
    this.games.set(code, game)
    return game
  },

  getGame(code: string) {
    return this.games.get(code) || null
  },

  addRound(code: string, category: string, questions: Question[], settings: RoundSettings) {
    const g = this.getGame(code)
    if (!g) return null
    const r: Round = { 
      id: uuid(), 
      category, 
      questions, 
      settings,
      status: 'pending',
      qIndex: 0
    }
    g.rounds.push(r)
    return r
  },

  addBulkQuestions(code: string, questions: Question[], settings: RoundSettings) {
    return this.addRound(code, 'bulk', questions, settings)
  },

  getActiveRound(code: string): Round | null {
    const game = this.getGame(code)
    if (!game || !game.activeRoundId) return null
    return game.rounds.find(r => r.id === game.activeRoundId) || null
  },

  getPlayerAnswer(playerId: string, roundId: string, qIndex: number): PlayerAnswer | null {
    const answers = Array.from(this.games.values())
      .flatMap(g => g.answers)
      .filter(a => a.playerId === playerId && a.roundId === roundId && a.qIndex === qIndex)
    return answers[0] || null
  }
}