import type { QuizQuestion } from './data/questions'

export type QuizPhase =
  | 'idle'
  | 'lobby'
  | 'locked'
  | 'round-config'
  | 'question'        // moderátor číta otázku nahlas, hráči ešte neodpovedajú
  | 'answering'       // odpočet beží, hráči odpovedajú
  | 'host-revealed'   // čas vypršal, moderátor vidí správnu odpoveď, hráči ešte nie
  | 'reveal'          // moderátor odkryl odpoveď pre hráčov
  | 'finished'

export type ScoringMode = 'classic' | 'safe' | 'risk' | 'podium'

export interface PodiumScores {
  first: number
  second: number
  third: number
  rest: number
}

export interface RoundConfig {
  // Identita
  category: string

  // Otázky
  questionCount: number

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
  questionIndex: number     // globálny index (naprieč všetkými kolami)
  totalQuestions: number    // celkový počet otázok (suma questionCount)
  totalRounds: number       // počet kôl
  roundSetupIndex: number
  questionStart?: number | null
  players: QuizPlayerState[]
  questions: QuizQuestion[]           // celé pole — len pre hosta, NEBROADCASTOVAŤ
  currentQuestionData: QuizQuestion | null  // aktuálna otázka — pre broadcast
  lobbyLocked: boolean
  roundConfigs: RoundConfig[]
  questionToRound: number[]           // [0,0,0,1,1,2,...] — mapuje questionIndex → roundConfig index
  /** @deprecated use roundConfigs[questionToRound[i]].duration */
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
  startTimer: () => void
  revealAnswer: () => void
  nextQuestion: () => void
  resetGame: () => void
}
