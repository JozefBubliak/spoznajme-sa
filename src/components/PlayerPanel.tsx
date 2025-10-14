'use client'
import { useState } from 'react'
import useGameState from '../hooks/useGameState'
import useRealtimeGame from '../hooks/useRealtimeGame'
import QuestionCard from './quiz/QuestionCard'
import QuestionTimer from './quiz/QuestionTimer'
import QuestionEvaluation from './quiz/QuestionEvaluation'
import RoundResults from './quiz/RoundResults'
import Leaderboard from './quiz/Leaderboard'
import Loader from './Loader'

interface PlayerPanelProps {
  code: string
}

export default function PlayerPanel({ code }: PlayerPanelProps) {
  const { game, loading } = useGameState(code)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [roundFinished, setRoundFinished] = useState(false)

  useRealtimeGame(code, {
    onQuestionShow: (q: any) => {
      setCurrentQuestion(q)
      setTimerRunning(false)
      setResults(null)
      setRoundFinished(false)
    },
    onTimerStart: () => setTimerRunning(true),
    onRoundLock: () => setTimerRunning(false),
    onResults: (data: any) => setResults(data),
    onRoundFinish: () => {
      setRoundFinished(true)
      setResults(null)
      setCurrentQuestion(null)
    },
    onFinish: () => {
      setRoundFinished(false)
      setResults(null)
    }
  })

  const handleAnswer = (choice: string) => {
    fetch(`/api/games/${code}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: choice })
    })
  }

  if (loading || !game) return <Loader />

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎮 Hráč v hre {game.code}</h2>

      {game.phase === 'waiting' && <p>Čakáme na začiatok…</p>}

      {game.phase === 'playing' && currentQuestion && (
        <>
          <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
          {timerRunning && (
            <QuestionTimer
              duration={currentQuestion.timeLimit || 30}
              onTimeout={() => setTimerRunning(false)}
            />
          )}
          {results && (
            <QuestionEvaluation
              playerAnswer={results.playerAnswer}
              correctAnswer={results.correctAnswer}
              funFact={currentQuestion.fun_fact}
            />
          )}
        </>
      )}

      {roundFinished && (
        <RoundResults roundIndex={game.activeRoundIndex} players={game.players} />
      )}

      {game.phase === 'final' && <Leaderboard players={game.players} />}
    </div>
  )
}
