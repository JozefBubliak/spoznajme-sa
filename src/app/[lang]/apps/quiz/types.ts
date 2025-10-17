import type { QuizQuestion } from './data/questions'

export type QuizPhase = 'idle' | 'lobby' | 'question' | 'locked' | 'reveal' | 'finished'

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
  questionStart?: number | null
  players: QuizPlayerState[]
  questions: QuizQuestion[]
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
  lockAnswers: () => void
  revealAnswer: () => void
  nextQuestion: () => void
  resetGame: () => void
}
