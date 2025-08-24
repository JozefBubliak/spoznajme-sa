import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { GameSettings, GameState, WordVM, Team, Player, SoundSettings } from '@/types/hadacka'

interface GameStore {
  // Settings
  settings: GameSettings
  updateSettings: (settings: Partial<GameSettings>) => void
  
  // Game State
  gameState: GameState
  
  // Actions
  startGame: () => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  nextWord: () => void
  guessWord: () => void
  skipWord: () => void
  endRound: () => void
  nextRound: () => void
  endGame: () => void
  resetGame: () => void
  
  // Teams/Players
  addTeam: (name: string) => void
  removeTeam: (id: string) => void
  updateTeam: (id: string, name: string) => void
  addPlayer: (name: string) => void
  removePlayer: (id: string) => void
  updatePlayer: (id: string, name: string) => void
  adjustScore: (id: string, points: number, isTeam?: boolean) => void
  
  // Word Management
  setWordPool: (words: WordVM[]) => void
  drawNextWord: () => WordVM | null
  
  // Sound
  soundSettings: SoundSettings
  updateSoundSettings: (settings: Partial<SoundSettings>) => void
  
  // Timer
  setTimeLeft: (seconds: number) => void
  decrementTime: () => void
  
  // Export/Import
  exportState: () => string
  importState: (state: string) => void
}

const initialSettings: GameSettings = {
  gameMode: 'teams',
  teams: [
    { id: '1', name: 'Tím 1', score: 0 },
    { id: '2', name: 'Tím 2', score: 0 },
  ],
  players: [],
  roundCount: 5,
  playMode: 'opis-tabu',
  categories: ['všeobecné'],
  timePerRound: 60,
  skipPenalty: false,
  skipPenaltyValue: 0,
}

const initialGameState: GameState = {
  isActive: false,
  currentRound: 0,
  currentTeamIndex: 0,
  currentPlayerIndex: 0,
  timeLeft: 60,
  isTimerRunning: false,
  currentWord: null,
  wordPool: [],
  usedWords: [],
  roundWords: {
    guessed: [],
    skipped: [],
  },
  gameHistory: [],
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      settings: initialSettings,
      gameState: initialGameState,
      soundSettings: { enabled: true, volume: 0.7 },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      startGame: () =>
        set((state) => {
          const firstWord = get().drawNextWord()
          return {
            gameState: {
              ...state.gameState,
              isActive: true,
              currentRound: 1,
              currentTeamIndex: 0,
              currentPlayerIndex: 0,
              timeLeft: state.settings.timePerRound,
              currentWord: firstWord,
              roundWords: { guessed: [], skipped: [] },
            },
          }
        }),

      pauseTimer: () =>
        set((state) => ({
          gameState: { ...state.gameState, isTimerRunning: false },
        })),

      resumeTimer: () =>
        set((state) => ({
          gameState: { ...state.gameState, isTimerRunning: true },
        })),

      stopTimer: () =>
        set((state) => ({
          gameState: { ...state.gameState, isTimerRunning: false },
        })),

      nextWord: () => {
        const nextWord = get().drawNextWord()
        set((state) => ({
          gameState: { ...state.gameState, currentWord: nextWord },
        }))
      },

      guessWord: () =>
        set((state) => {
          const { gameState, settings } = state
          const currentWord = gameState.currentWord
          if (!currentWord) return state

          const isTeamMode = settings.gameMode === 'teams'
          const targetId = isTeamMode 
            ? settings.teams[gameState.currentTeamIndex]?.id 
            : settings.players[gameState.currentPlayerIndex]?.id

          if (isTeamMode) {
            const teamIndex = settings.teams.findIndex(t => t.id === targetId)
            if (teamIndex >= 0) {
              settings.teams[teamIndex].score += 1
            }
          } else {
            const playerIndex = settings.players.findIndex(p => p.id === targetId)
            if (playerIndex >= 0) {
              settings.players[playerIndex].score += 1
            }
          }

          const nextWord = get().drawNextWord()
          return {
            settings,
            gameState: {
              ...gameState,
              currentWord: nextWord,
              roundWords: {
                ...gameState.roundWords,
                guessed: [...gameState.roundWords.guessed, currentWord],
              },
            },
          }
        }),

      skipWord: () =>
        set((state) => {
          const { gameState, settings } = state
          const currentWord = gameState.currentWord
          if (!currentWord) return state

          if (settings.skipPenalty) {
            const isTeamMode = settings.gameMode === 'teams'
            const targetId = isTeamMode 
              ? settings.teams[gameState.currentTeamIndex]?.id 
              : settings.players[gameState.currentPlayerIndex]?.id

            if (isTeamMode) {
              const teamIndex = settings.teams.findIndex(t => t.id === targetId)
              if (teamIndex >= 0) {
                settings.teams[teamIndex].score = Math.max(0, 
                  settings.teams[teamIndex].score - settings.skipPenaltyValue)
              }
            } else {
              const playerIndex = settings.players.findIndex(p => p.id === targetId)
              if (playerIndex >= 0) {
                settings.players[playerIndex].score = Math.max(0, 
                  settings.players[playerIndex].score - settings.skipPenaltyValue)
              }
            }
          }

          const nextWord = get().drawNextWord()
          return {
            settings,
            gameState: {
              ...gameState,
              currentWord: nextWord,
              roundWords: {
                ...gameState.roundWords,
                skipped: [...gameState.roundWords.skipped, currentWord],
              },
            },
          }
        }),

      endRound: () =>
        set((state) => {
          const { gameState, settings } = state
          const currentEntity = settings.gameMode === 'teams' 
            ? settings.teams[gameState.currentTeamIndex]
            : settings.players[gameState.currentPlayerIndex]

          const roundHistory = {
            round: gameState.currentRound,
            team: currentEntity?.name || '',
            guessed: gameState.roundWords.guessed,
            skipped: gameState.roundWords.skipped,
            score: gameState.roundWords.guessed.length,
          }

          return {
            gameState: {
              ...gameState,
              isTimerRunning: false,
              timeLeft: settings.timePerRound,
              roundWords: { guessed: [], skipped: [] },
              gameHistory: [...gameState.gameHistory, roundHistory],
            },
          }
        }),

      nextRound: () =>
        set((state) => {
          const { gameState, settings } = state
          const entityCount = settings.gameMode === 'teams' 
            ? settings.teams.length 
            : settings.players.length

          let nextTeamIndex = gameState.currentTeamIndex
          let nextPlayerIndex = gameState.currentPlayerIndex
          let nextRound = gameState.currentRound

          if (settings.gameMode === 'teams') {
            nextTeamIndex = (gameState.currentTeamIndex + 1) % entityCount
            if (nextTeamIndex === 0) nextRound += 1
          } else {
            nextPlayerIndex = (gameState.currentPlayerIndex + 1) % entityCount
            if (nextPlayerIndex === 0) nextRound += 1
          }

          const nextWord = get().drawNextWord()
          
          return {
            gameState: {
              ...gameState,
              currentRound: nextRound,
              currentTeamIndex: nextTeamIndex,
              currentPlayerIndex: nextPlayerIndex,
              timeLeft: settings.timePerRound,
              currentWord: nextWord,
              usedWords: [], // Reset for new round
            },
          }
        }),

      endGame: () =>
        set((state) => ({
          gameState: { ...state.gameState, isActive: false, isTimerRunning: false },
        })),

      resetGame: () =>
        set(() => ({
          gameState: initialGameState,
        })),

      addTeam: (name) =>
        set((state) => {
          const newTeam: Team = {
            id: Date.now().toString(),
            name,
            score: 0,
          }
          return {
            settings: {
              ...state.settings,
              teams: [...state.settings.teams, newTeam],
            },
          }
        }),

      removeTeam: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            teams: state.settings.teams.filter((team) => team.id !== id),
          },
        })),

      updateTeam: (id, name) =>
        set((state) => ({
          settings: {
            ...state.settings,
            teams: state.settings.teams.map((team) =>
              team.id === id ? { ...team, name } : team
            ),
          },
        })),

      addPlayer: (name) =>
        set((state) => {
          const newPlayer: Player = {
            id: Date.now().toString(),
            name,
            score: 0,
          }
          return {
            settings: {
              ...state.settings,
              players: [...state.settings.players, newPlayer],
            },
          }
        }),

      removePlayer: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            players: state.settings.players.filter((player) => player.id !== id),
          },
        })),

      updatePlayer: (id, name) =>
        set((state) => ({
          settings: {
            ...state.settings,
            players: state.settings.players.map((player) =>
              player.id === id ? { ...player, name } : player
            ),
          },
        })),

      adjustScore: (id, points, isTeam = true) =>
        set((state) => {
          if (isTeam) {
            return {
              settings: {
                ...state.settings,
                teams: state.settings.teams.map((team) =>
                  team.id === id 
                    ? { ...team, score: Math.max(0, team.score + points) } 
                    : team
                ),
              },
            }
          } else {
            return {
              settings: {
                ...state.settings,
                players: state.settings.players.map((player) =>
                  player.id === id 
                    ? { ...player, score: Math.max(0, player.score + points) } 
                    : player
                ),
              },
            }
          }
        }),

      setWordPool: (words) =>
        set((state) => ({
          gameState: { ...state.gameState, wordPool: words },
        })),

      drawNextWord: () => {
        const { gameState } = get()
        const availableWords = gameState.wordPool.filter(
          (word) => !gameState.usedWords.includes(word.id)
        )
        
        if (availableWords.length === 0) return null
        
        const randomIndex = Math.floor(Math.random() * availableWords.length)
        const selectedWord = availableWords[randomIndex]
        
        set((state) => ({
          gameState: {
            ...state.gameState,
            usedWords: [...state.gameState.usedWords, selectedWord.id],
          },
        }))
        
        return selectedWord
      },

      updateSoundSettings: (newSettings) =>
        set((state) => ({
          soundSettings: { ...state.soundSettings, ...newSettings },
        })),

      setTimeLeft: (seconds) =>
        set((state) => ({
          gameState: { ...state.gameState, timeLeft: seconds },
        })),

      decrementTime: () =>
        set((state) => ({
          gameState: { 
            ...state.gameState, 
            timeLeft: Math.max(0, state.gameState.timeLeft - 1) 
          },
        })),

      exportState: () => {
        const { settings, gameState } = get()
        return JSON.stringify({ settings, gameState }, null, 2)
      },

      importState: (stateJson) => {
        try {
          const { settings, gameState } = JSON.parse(stateJson)
          set({ settings, gameState })
        } catch (error) {
          console.error('Failed to import state:', error)
        }
      },
    }),
    { name: 'hadacka-game-store' }
  )
)