'use client'
import { useState, useEffect } from 'react'
import useGameState from '../hooks/useGameState'
import useRealtimeGame from '../hooks/useRealtimeGame'
import Button from './quiz/Button'
import Leaderboard from './quiz/Leaderboard'
import Loader from './Loader'
import QuestionCard from './quiz/QuestionCard'
import QuestionEvaluation from './quiz/QuestionEvaluation'
import QuestionTimer from './quiz/QuestionTimer'

interface AdminPanelProps {
  code: string
}

export default function AdminPanel({ code }: AdminPanelProps) {
  const { game, loading, refetch } = useGameState(code)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useRealtimeGame(code, {
    onQuestionShow: (q: any) => {
      setCurrentQuestion(q)
      setTimerRunning(false)
      setResults(null)
      refetch()
    },
    onTimerStart: () => setTimerRunning(true),
    onRoundLock: () => {
      setTimerRunning(false)
      refetch()
    },
    onResults: (data: any) => {
      setResults(data)
      refetch()
    },
    onRoundFinish: () => {
      setResults(null)
      refetch()
    },
    onGameStarted: () => refetch(),
    onLobbyLocked: () => refetch(),
  })

  const apiCall = async (endpoint: string, body?: any) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/games/${code}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      return data
    } catch (error) {
      console.error('API call failed:', error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || !game) return <Loader />

  const header = (
    <>
      <h2>🔧 Admin panel – hra {game.code}</h2>
      <p>
        Aktuálna fáza: <strong>{game.phase}</strong>
      </p>
    </>
  )

  if (game.phase === 'lobby') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <p>Hráči sa pripájajú…</p>
        <Button
          disabled={isLoading}
          onClick={() => apiCall('/lock-lobby')}
        >
          🔒 Zamknúť lobby
        </Button>
      </div>
    )
  }

  if (game.phase === 'config') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <p>Nastav počet kôl a parametre</p>
        <Button
          disabled={isLoading}
          onClick={() => apiCall('/start')}
        >
          🎮 Spustiť hru
        </Button>
      </div>
    )
  }

  if (game.phase === 'playing') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        {currentQuestion && (
          <>
            <QuestionCard question={currentQuestion} onAnswer={() => {}} />
            {timerRunning && (
              <QuestionTimer duration={30} onTimeout={() => setTimerRunning(false)} />
            )}
            {!timerRunning && (
              <Button
                disabled={isLoading}
                onClick={() => apiCall('/rounds/timer/start', { seconds: 30 })}
              >
                ⏱️ Spustiť odpočet
              </Button>
            )}
            {timerRunning && (
              <Button
                disabled={isLoading}
                onClick={() => apiCall('/rounds/lock')}
              >
                🔒 Uzamknúť odpovede
              </Button>
            )}
            {results && (
              <QuestionEvaluation
                playerAnswer={results.playerAnswer}
                correctAnswer={results.correctAnswer}
                funFact={currentQuestion?.fun_fact}
              />
            )}
            {results && (
              <Button
                disabled={isLoading}
                onClick={() => apiCall('/rounds/next')}
              >
                ➡️ Ďalšia otázka
              </Button>
            )}
          </>
        )}
        {!currentQuestion && (
          <Button
            disabled={isLoading}
            onClick={() => apiCall('/rounds/start', { index: game.active_round_index || 0 })}
          >
            🎯 Spustiť kolo
          </Button>
        )}
      </div>
    )
  }

  if (game.phase === 'final') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <p>Hra skončila!</p>
        <Leaderboard players={[]} />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      {header}
      <p>Neznáma fáza hry</p>
    </div>
  )
}
