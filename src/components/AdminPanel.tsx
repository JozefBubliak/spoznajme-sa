'use client'
import { useState } from 'react'
import useGameState from '../hooks/useGameState'
import useRealtimeGame from '../hooks/useRealtimeGame'
import QuestionCard from './quiz/QuestionCard'
import QuestionTimer from './quiz/QuestionTimer'
import Leaderboard from './quiz/Leaderboard'
import QuestionEvaluation from './quiz/QuestionEvaluation'
import Button from './quiz/Button'
import Loader from './Loader'

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

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠️ Admin panel – hra {game.code}</h2>
      <p>
        Aktuálna fáza: <strong>{game.phase}</strong>
      </p>

      {game.phase === 'lobby' && (
        <div>
          <p>Hráči sa pripájajú…</p>
          <Button>🔒 Zamknúť lobby</Button>
        </div>
      )}

      {game.phase === 'config' && (
        <div>
          <p>Nastav počet kôl a parametre</p>
          <Button>✅ Uložiť konfiguráciu</Button>
        </div>
      )}

      {game.phase === 'round_setup' && (
        <div>
          <p>Nastavenie kôl</p>
          <Button>🎮 Ideme hrať</Button>
        </div>
      )}

      {game.phase === 'playing' && (
        <div>
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
              {results && <QuestionEvaluation {...results} />}
              {results && <Button>➡️ Ďalšia otázka</Button>}
            </>
          )}
        </div>
      )}

      {game.phase === 'final' && <Leaderboard players={game.players} />}
    </div>
  )
}
