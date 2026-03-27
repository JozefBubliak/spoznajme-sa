'use client'

import { useEffect, useMemo, useState } from 'react'
import type { QuizGameState, QuizMessage } from './types'
import { useQuizChannel } from './useQuizChannel'

interface PlayerViewProps {
  code: string
  name: string
}

function getPlayerStorageKey(code: string) {
  return `quiz-player:${code}`
}

export default function PlayerView({ code, name }: PlayerViewProps) {
  const [gameState, setGameState] = useState<QuizGameState | null>(null)
  const [submittedAnswer, setSubmittedAnswer] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())

  const playerId = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const stored = window.localStorage.getItem(getPlayerStorageKey(code))
    if (stored) return stored
    const generated = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10)
    window.localStorage.setItem(getPlayerStorageKey(code), generated)
    return generated
  }, [code])

  const sendMessage = useQuizChannel(code, (message: QuizMessage) => {
    if (message.type === 'state') {
      setGameState(message.state)
    }
  })

  useEffect(() => {
    if (!playerId) return
    sendMessage({ type: 'join', playerId, name })
    sendMessage({ type: 'ping' })
    return () => {
      sendMessage({ type: 'leave', playerId })
    }
  }, [playerId, name, code, sendMessage])

  useEffect(() => {
    if (!gameState) return
    if (gameState.phase === 'question') {
      setSubmittedAnswer(null)
    }
  }, [gameState?.questionIndex, gameState?.phase])

  useEffect(() => {
    if (gameState?.phase !== 'question') return
    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [gameState?.phase, gameState?.questionIndex])

  const currentQuestion =
    gameState && (gameState.phase === 'question' || gameState.phase === 'reveal')
      ? gameState.questions[gameState.questionIndex]
      : null
  const currentRoundDuration =
    gameState && gameState.questionIndex >= 0 ? (gameState.roundDurations[gameState.questionIndex] ?? 20) : 20
  const timeLeft =
    gameState?.phase === 'question' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  const handleAnswer = (answerIndex: number) => {
    if (!gameState || !currentQuestion) return
    if (gameState.phase !== 'question') return
    if (submittedAnswer != null) return
    sendMessage({ type: 'answer', playerId, answer: answerIndex, answeredAt: Date.now() })
    setSubmittedAnswer(answerIndex)
  }

  const leaderboard = useMemo(() => {
    if (!gameState) return []
    return [...gameState.players].sort((a, b) => b.score - a.score)
  }, [gameState])

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Pripojený ako</p>
            <p className="text-xl font-semibold text-slate-900">{name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Kód hry</p>
            <p className="text-xl font-semibold tracking-widest text-slate-900">{code}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {!gameState && <p className="text-sm text-slate-500">Čakám na moderátora…</p>}

        {(gameState?.phase === 'lobby' || gameState?.phase === 'locked' || gameState?.phase === 'round-config') && (
          <div className="space-y-2 text-sm text-slate-600">
            <p>Moderátor pripravuje hru. Zostaňte naladení!</p>
          </div>
        )}

        {gameState && gameState.phase === 'question' && currentQuestion && (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {(() => {
                  const cfg = gameState.roundConfigs?.[gameState.questionIndex]
                  const total = gameState.totalRounds || gameState.totalQuestions
                  const roundLabel = cfg?.title || `Kolo ${gameState.questionIndex + 1}`
                  return `${roundLabel} · ${gameState.questionIndex + 1}/${total}${cfg?.category ? ` · ${cfg.category}` : ''}`
                })()}
              </p>
              {timeLeft != null && <p className="mt-1 text-sm font-medium text-amber-600">Zostáva {timeLeft}s</p>}
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{currentQuestion.question}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.answers.map((answer, index) => {
                const isSelected = submittedAnswer === index
                return (
                  <button
                    key={answer}
                    onClick={() => handleAnswer(index)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    disabled={submittedAnswer != null}
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{answer}</span>
                  </button>
                )
              })}
            </div>
            {submittedAnswer != null && (
              <p className="text-sm text-slate-500">Odpoveď prijatá. Čakajte na výsledok.</p>
            )}
          </div>
        )}

        {gameState && gameState.phase === 'reveal' && currentQuestion && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Správna odpoveď</h2>
              <p className="text-sm text-slate-600">
                {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.answers[currentQuestion.correctAnswer]}
              </p>
            </div>
            {currentQuestion.explanation && (
              <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                {currentQuestion.explanation}
              </p>
            )}
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Priebežné skóre</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {leaderboard.map(player => (
                  <li
                    key={player.id}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                      player.id === playerId ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'
                    }`}
                  >
                    <span>{player.name}</span>
                    <span>{player.score} bodov</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {gameState && gameState.phase === 'finished' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Koniec hry</h2>
            <p className="text-sm text-slate-600">Ďakujeme za účasť! Pozrite si konečné poradie.</p>
            <ul className="mt-2 space-y-2 text-sm">
              {leaderboard.map((player, index) => (
                <li
                  key={player.id}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                    player.id === playerId ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'
                  }`}
                >
                  <span>
                    {index + 1}. {player.name}
                  </span>
                  <span>{player.score} bodov</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
