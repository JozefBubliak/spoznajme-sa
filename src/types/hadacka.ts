export interface WordVM {
  id: string
  word: string
  categoryCode: string
  difficultyLevel: number
  modeCode: string
}

export interface PackVM {
  code: string
  name: string
  isPremium: boolean
}

export interface Team {
  id: string
  name: string
  score: number
}

export interface Player {
  id: string
  name: string
  score: number
}

export type GameMode = 'teams' | 'individual'
export type PlayMode = 'opis-tabu' | 'pantomima' | 'jedno-slovo' | 'mix'

export interface GameSettings {
  gameMode: GameMode
  teams: Team[]
  players: Player[]
  roundCount: number
  playMode: PlayMode
  categories: string[]
  timePerRound: number // seconds
  skipPenalty: boolean
  skipPenaltyValue: number
}

export interface GameState {
  isActive: boolean
  currentRound: number
  currentTeamIndex: number
  currentPlayerIndex: number
  timeLeft: number
  isTimerRunning: boolean
  currentWord: WordVM | null
  wordPool: WordVM[]
  usedWords: string[]
  roundWords: {
    guessed: WordVM[]
    skipped: WordVM[]
  }
  gameHistory: Array<{
    round: number
    team: string
    guessed: WordVM[]
    skipped: WordVM[]
    score: number
  }>
}

export interface SoundSettings {
  enabled: boolean
  volume: number
}