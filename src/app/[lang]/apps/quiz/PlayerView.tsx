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
    const generated =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
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

  // Reset odpovedí pri novej otázke
  useEffect(() => {
    if (gameState?.phase === 'question' || gameState?.phase === 'answering') {
      setSubmittedAnswer(null)
    }
  }, [gameState?.questionIndex, gameState?.phase])

  // Odpočet
  useEffect(() => {
    if (gameState?.phase !== 'answering') return
    const interval = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(interval)
  }, [gameState?.phase, gameState?.questionIndex])

  // Aktuálna otázka — host nám posiela len currentQuestionData (nie celé questions[])
  const currentQuestion =
    gameState && (gameState.phase === 'question' || gameState.phase === 'answering' || gameState.phase === 'reveal')
      ? gameState.currentQuestionData
      : null

  const roundConfigIdx = gameState
    ? (gameState.questionToRound?.[gameState.questionIndex] ?? 0)
    : 0
  const currentRoundDuration =
    gameState?.roundConfigs?.[roundConfigIdx]?.duration ?? 20

  const timeLeft =
    gameState?.phase === 'answering' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  // Odpovede sú povolené len keď beží odpočet ('answering')
  const canAnswer = gameState?.phase === 'answering' && submittedAnswer == null

  const handleAnswer = (answerIndex: number) => {
    if (!canAnswer) return
    sendMessage({ type: 'answer', playerId, answer: answerIndex, answeredAt: Date.now() })
    setSubmittedAnswer(answerIndex)
  }

  const leaderboard = useMemo(() => {
    if (!gameState) return []
    return [...gameState.players].sort((a, b) => b.score - a.score)
  }, [gameState])

  return (
    <div className="space-y-4">
      {/* Kód hry */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Pripojený ako</p>
            <p className="text-lg font-semibold text-slate-900">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Kód hry</p>
            <p className="text-lg font-semibold tracking-widest text-slate-900">{code}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {!gameState && (
          <p className="text-sm text-slate-500">Čakám na moderátora…</p>
        )}

        {/* Čakanie na začiatok */}
        {gameState && (gameState.phase === 'lobby' || gameState.phase === 'locked' || gameState.phase === 'round-config') && (
          <div className="space-y-2 text-center py-8">
            <p className="text-4xl">⏳</p>
            <p className="text-base font-medium text-slate-700">Moderátor pripravuje hru.</p>
            <p className="text-sm text-slate-500">Zostaňte naladení!</p>
          </div>
        )}

        {/* Otázka zobrazená — čakanie na spustenie odpočtu */}
        {gameState && gameState.phase === 'question' && currentQuestion && (
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Otázka {gameState.questionIndex + 1} / {gameState.totalQuestions}
            </p>
            <h2 className="text-xl font-bold text-slate-900">{currentQuestion.question}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.answers.map((answer, index) => (
                <div
                  key={answer}
                  className="rounded-xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-base font-semibold text-slate-500"
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                  {answer}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-400">Čakám na spustenie odpočtu…</p>
          </div>
        )}

        {/* Odpočet beží — hráči odpovedajú */}
        {gameState && gameState.phase === 'answering' && currentQuestion && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Otázka {gameState.questionIndex + 1} / {gameState.totalQuestions}
              </p>
              {timeLeft != null && (
                <p className={`text-lg font-bold ${timeLeft <= 5 ? 'text-rose-600' : 'text-amber-600'}`}>
                  {timeLeft}s
                </p>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900">{currentQuestion.question}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.answers.map((answer, index) => {
                const isSelected = submittedAnswer === index
                return (
                  <button
                    key={answer}
                    onClick={() => handleAnswer(index)}
                    disabled={!canAnswer}
                    className={`rounded-xl border-2 px-5 py-4 text-left text-base font-semibold transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : submittedAnswer != null
                          ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-default'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <span className="mr-2 text-slate-400">{String.fromCharCode(65 + index)}.</span>
                    {answer}
                  </button>
                )
              })}
            </div>
            {submittedAnswer != null && (
              <p className="text-center text-sm text-emerald-600 font-medium">✓ Odpoveď prijatá. Čakajte na výsledok.</p>
            )}
          </div>
        )}

        {/* Odhalenie správnej odpovede */}
        {gameState && gameState.phase === 'reveal' && currentQuestion && (
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Otázka {gameState.questionIndex + 1} / {gameState.totalQuestions}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{currentQuestion.question}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.answers.map((answer, index) => (
                <div
                  key={answer}
                  className={`rounded-xl border-2 px-5 py-4 text-base font-semibold ${
                    index === currentQuestion.correctAnswer
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : submittedAnswer === index
                        ? 'border-rose-300 bg-rose-50 text-rose-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                  }`}
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                  {answer}
                  {index === currentQuestion.correctAnswer && (
                    <span className="ml-2 text-xs font-bold uppercase">✓</span>
                  )}
                </div>
              ))}
            </div>
            {currentQuestion.explanation && (
              <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">💡 {currentQuestion.explanation}</p>
            )}
            {/* Priebežné skóre */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Priebežné skóre</h3>
              <ul className="space-y-2 text-sm">
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

        {/* Koniec hry */}
        {gameState && gameState.phase === 'finished' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">🎉 Koniec hry!</h2>
            <p className="text-sm text-slate-600">Ďakujeme za účasť! Konečné poradie:</p>
            <ul className="space-y-2 text-sm">
              {leaderboard.map((player, index) => (
                <li
                  key={player.id}
                  className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                    player.id === playerId ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200'
                  }`}
                >
                  <span>{index + 1}. {player.name}</span>
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
