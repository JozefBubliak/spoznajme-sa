import type { QuizQuestion } from './data/questions'

export type QuizPhase = 'idle' | 'lobby' | 'locked' | 'round-config' | 'question' | 'reveal' | 'finished'

export type ScoringMode = 'classic' | 'safe' | 'risk' | 'podium'

export interface PodiumScores {
  first: number
  second: number
  third: number
  rest: number
}

export interface RoundConfig {
  // Identita
  title: string
  category: string

  // Čas
  duration: number

  // Bodovanie
  scoringMode: ScoringMode
  correctScore: number
  wrongScore: number
  noAnswerScore: number
  podiumScores: PodiumScores
  allowNegativeTotal: boolean

  /** @deprecated derive from correctScore */
  scoring: number
}

export interface QuizPlayerState {
  id: string
  name: string
  score: number
  answer?: number | null
  answeredAt?: number | null
  lastAnswerCorrect?: boolean
}

export interface QuizGameState {
  code: string
  language: string
  phase: QuizPhase
  questionIndex: number
  totalQuestions: number
  totalRounds: number
  roundSetupIndex: number
  questionStart?: number | null
  players: QuizPlayerState[]
  questions: QuizQuestion[]
  lobbyLocked: boolean
  roundConfigs: RoundConfig[]
  /** @deprecated use roundConfigs[i].duration */
  roundDurations: number[]
  roundsReady: boolean
}

export type QuizMessage =
  | { type: 'state'; state: QuizGameState }
  | { type: 'join'; playerId: string; name: string }
  | { type: 'answer'; playerId: string; answer: number; answeredAt: number }
  | { type: 'leave'; playerId: string }
  | { type: 'ping' }

export interface HostControls {
  createLobby: (language: string, questions: QuizQuestion[]) => void
  startGame: () => void
  revealAnswer: () => void
  nextQuestion: () => void
  resetGame: () => void
}
