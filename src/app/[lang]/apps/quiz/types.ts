import type { QuizQuestion } from './data/questions'

export type QuizPhase = 'idle' | 'lobby' | 'locked' | 'round-config' | 'question' | 'reveal' | 'finished'

export interface RoundConfig {
  duration: number
  category: string
  scoring: number
}

export interface QuizPlayerState {
  id: string
  name: string
  score: number
  answer?: number | null
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
  | { type: 'answer'; playerId: string; answer: number }
  | { type: 'leave'; playerId: string }
  | { type: 'ping' }

export interface HostControls {
  createLobby: (language: string, questions: QuizQuestion[]) => void
  startGame: () => void
  revealAnswer: () => void
  nextQuestion: () => void
  resetGame: () => void
}
