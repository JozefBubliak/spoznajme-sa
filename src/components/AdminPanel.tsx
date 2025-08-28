'use client'
import { useState } from 'react'

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
  const { game, loading } = useGameState(code)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const [results, setResults] = useState<any>(null)

  useRealtimeGame(code, {
    onQuestionShow: (q: any) => {
      setCurrentQuestion(q)
      setTimerRunning(false)
      setResults(null)
    },
    onTimerStart: () => setTimerRunning(true),
    onRoundLock: () => setTimerRunning(false),
    onResults: (data: any) => setResults(data),
    onFinish: () => setResults(null),
  })

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
        <Button>🔒 Zamknúť lobby</Button>
      </div>
    )
  }

  if (game.phase === 'config') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <p>Nastav počet kôl a parametre</p>
        <Button>✅ Uložiť konfiguráciu</Button>
      </div>
    )
  }

  if (game.phase === 'round_setup') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <p>Nastavenie kôl</p>
        <Button>🎮 Ideme hrať</Button>
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
              <Button onClick={() => setTimerRunning(true)}>⏱️ Spustiť odpočet</Button>
            )}
            {timerRunning && (
              <Button onClick={() => setTimerRunning(false)}>🔒 Uzamknúť odpovede</Button>
            )}
            {results && (
              <QuestionEvaluation
                playerAnswer={results.playerAnswer}
                correctAnswer={results.correctAnswer}
                funFact={currentQuestion?.fun_fact}
              />
            )}
            {results && <Button>➡️ Ďalšia otázka</Button>}
          </>
        )}
      </div>
    )
  }

  if (game.phase === 'round_results') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <Leaderboard players={game.players} />
        <Button>▶️ Pokračovať do ďalšieho kola</Button>
      </div>
    )
  }

  if (game.phase === 'final') {
    return (
      <div style={{ padding: '2rem' }}>
        {header}
        <Leaderboard players={game.players} />
      </div>
    )
  }

  return null
}
