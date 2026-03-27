'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS } from './data/languages'
import { type QuizQuestion } from './data/questions'
import { useQuizChannel } from './useQuizChannel'
import type { HostControls, QuizGameState, QuizMessage, QuizPlayerState } from './types'

interface HostViewProps {
  code: string
  language: string
  questions: QuizQuestion[]
  onResetLobby: () => void
}

const SCORE_PER_CORRECT = 10

export default function HostView({ code, language, questions, onResetLobby }: HostViewProps) {
  const languageLabel = useMemo(
    () => LANGUAGE_OPTIONS.find(option => option.code === language)?.name ?? language,
    [language],
  )

  const [joinUrl, setJoinUrl] = useState('')
  const [now, setNow] = useState(Date.now())

  const [gameState, setGameState] = useState<QuizGameState>(() => ({
    code,
    language,
    phase: 'lobby',
    questionIndex: -1,
    totalQuestions: questions.length,
    questionStart: null,
    players: [],
    questions,
    roundDurations: questions.map(() => 20),
    roundsReady: false,
  }))

  const stateRef = useRef(gameState)
  stateRef.current = gameState

  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      language,
      code,
      questions,
      totalQuestions: questions.length,
      roundDurations: questions.map(() => 20),
      roundsReady: false,
    }))
  }, [code, language, questions])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const target = new URL(`/${language}/apps/quiz`, window.location.origin)
    target.searchParams.set('code', code)
    target.searchParams.set('role', 'player')
    setJoinUrl(target.toString())
  }, [code, language])

  const copyLink = async () => {
    if (!joinUrl) return
    await navigator.clipboard?.writeText(joinUrl)
  }

  const shareLink = async () => {
    if (!joinUrl) return
    if (navigator.share) {
      await navigator.share({
        title: 'Herd Vote - pripoj sa',
        text: 'Pridaj sa do hry pomocou odkazu',
        url: joinUrl,
      }).catch(() => {})
      return
    }
    await copyLink()
  }

  const sendMessage = useQuizChannel(code, (message: QuizMessage) => {
    if (message.type === 'ping') {
      sendMessage({ type: 'state', state: stateRef.current })
      return
    }
    setGameState(prev => handleIncomingMessage(prev, message))
  })

  useEffect(() => {
    sendMessage({ type: 'state', state: gameState })
  }, [gameState, sendMessage])

  const controls: HostControls = useMemo(
    () => ({
      createLobby: () => {},
      startGame: () => {
        setGameState(prev => {
          if (prev.phase !== 'lobby' || prev.players.length === 0) return prev
          return {
            ...prev,
            phase: 'question',
            questionIndex: 0,
            questionStart: Date.now(),
            players: prev.players.map(player => ({
              ...player,
              answer: null,
              lastAnswerCorrect: undefined,
              score: 0,
            })),
          }
        })
      },
      revealAnswer: () => {
        setGameState(prev => {
          if (prev.phase !== 'question') return prev
          const currentQuestion = prev.questions[prev.questionIndex]
          if (!currentQuestion) return prev
          const players = prev.players.map(player => {
            if (player.answer == null) {
              return { ...player, lastAnswerCorrect: false }
            }
            const isCorrect = player.answer === currentQuestion.correctAnswer
            return {
              ...player,
              score: isCorrect ? player.score + SCORE_PER_CORRECT : player.score,
              lastAnswerCorrect: isCorrect,
            }
          })
          return {
            ...prev,
            phase: 'reveal',
            players,
            questionStart: null,
          }
        })
      },
      nextQuestion: () => {
        setGameState(prev => {
          if (prev.phase !== 'reveal') return prev
          const nextIndex = prev.questionIndex + 1
          if (nextIndex >= prev.totalQuestions) {
            return {
              ...prev,
              phase: 'finished',
              questionStart: null,
            }
          }
          return {
            ...prev,
            phase: 'question',
            questionIndex: nextIndex,
            questionStart: Date.now(),
            players: prev.players.map(player => ({
              ...player,
              answer: null,
              lastAnswerCorrect: undefined,
            })),
          }
        })
      },
      resetGame: () => {
        setGameState(prev => ({
          ...prev,
          phase: 'lobby',
          questionIndex: -1,
          questionStart: null,
          roundsReady: false,
          roundDurations: prev.questions.map(() => 20),
          players: prev.players.map(player => ({
            ...player,
            score: 0,
            answer: null,
            lastAnswerCorrect: undefined,
          })),
        }))
      },
    }),
    [setGameState],
  )

  useEffect(() => {
    if (gameState.phase !== 'question' || gameState.questionStart == null) return
    const durationSeconds = gameState.roundDurations[gameState.questionIndex] ?? 20
    const timeoutMs = gameState.questionStart + durationSeconds * 1000 - Date.now()
    if (timeoutMs <= 0) {
      controls.revealAnswer()
      return
    }
    const timeout = window.setTimeout(() => {
      controls.revealAnswer()
    }, timeoutMs)
    return () => window.clearTimeout(timeout)
  }, [
    controls,
    gameState.phase,
    gameState.questionStart,
    gameState.questionIndex,
    gameState.roundDurations,
  ])

  useEffect(() => {
    if (gameState.phase !== 'question') return
    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [gameState.phase, gameState.questionIndex])

  const currentQuestion =
    gameState.phase === 'question' || gameState.phase === 'reveal'
      ? gameState.questions[gameState.questionIndex]
      : null

  const currentRoundDuration = gameState.roundDurations[gameState.questionIndex] ?? 20
  const roundTimeLeft =
    gameState.phase === 'question' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Kód hry</p>
            <p className="text-3xl font-bold tracking-widest text-slate-900">{code}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Jazyk kvízu</p>
            <p className="text-xl font-semibold text-slate-900">{languageLabel}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={controls.resetGame}
            >
              Resetovať skóre
            </button>
            <button
              className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
              onClick={onResetLobby}
            >
              Ukončiť lobby
            </button>
          </div>
        </div>

        {gameState.phase === 'lobby' && gameState.players.length === 0 && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {joinUrl ? (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Link pre hráčov</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="flex-1 text-sm text-slate-700 break-all">{joinUrl}</span>
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Kopírovať link
                </button>
                <button
                  type="button"
                  onClick={shareLink}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                >
                  Zdieľať
                </button>
              </div>
              <div className="mt-3 flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                  alt="QR kód pre pripojenie do hry"
                  className="h-44 w-44 rounded-lg"
                />
              </div>
            </>
            ) : (
              <p className="text-sm text-slate-500">Generujem link pre pripojenie...</p>
            )}
          </div>
        )}
      </div>

      <section className="grid gap-6 md:grid-cols-[2fr_3fr]">
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <header className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">Stav hry</h2>
            <p className="text-sm text-slate-500">
              {describePhase(gameState.phase, gameState.questionIndex, gameState.totalQuestions)}
            </p>
          </header>

          {gameState.phase === 'lobby' && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Nastavenie kôl (čas na odpoveď)</h3>
              <div className="space-y-2">
                {gameState.questions.map((question, index) => (
                  <label key={`${index}-${question.question}`} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-700">Kolo {index + 1}</span>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={gameState.roundDurations[index] ?? 20}
                      onChange={event => {
                        const value = Number(event.target.value)
                        setGameState(prev => ({
                          ...prev,
                          roundDurations: prev.roundDurations.map((duration, durationIndex) =>
                            durationIndex === index ? Math.min(120, Math.max(5, value || 20)) : duration,
                          ),
                          roundsReady: false,
                        }))
                      }}
                      className="w-24 rounded-md border border-slate-300 px-2 py-1 text-right"
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                onClick={() => setGameState(prev => ({ ...prev, roundsReady: true }))}
              >
                Potvrdiť nastavenie kôl
              </button>
              {!gameState.roundsReady && (
                <p className="text-xs text-slate-500">Pred spustením hry potvrďte nastavenie všetkých kôl.</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              onClick={controls.startGame}
              disabled={
                gameState.phase !== 'lobby' || gameState.players.length === 0 || !gameState.roundsReady
              }
            >
              Spustiť kvíz
            </button>
            <button
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-200"
              onClick={controls.revealAnswer}
              disabled={gameState.phase !== 'question'}
            >
              Odhal správnu odpoveď
            </button>
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200"
              onClick={controls.nextQuestion}
              disabled={gameState.phase !== 'reveal'}
            >
              Ďalšia otázka
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">Hráči v lobby</h3>
            {gameState.players.length === 0 ? (
              <p className="text-sm text-slate-500">Zatiaľ nikto neprišiel. Zdieľajte kód hry.</p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {gameState.players.map(player => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
                  >
                    <span className="font-medium text-slate-800">{player.name}</span>
                    <span className="text-slate-500">{player.score} bodov</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {currentQuestion ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Otázka {gameState.questionIndex + 1} / {gameState.totalQuestions}
                </p>
                {gameState.phase === 'question' && roundTimeLeft != null && (
                  <p className="mt-1 text-sm font-medium text-amber-600">Čas na odpoveď: {roundTimeLeft}s</p>
                )}
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{currentQuestion.question}</h3>
              </div>
              <ol className="space-y-2">
                {currentQuestion.answers.map((answer, index) => (
                  <li
                    key={answer}
                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                      gameState.phase === 'reveal' && index === currentQuestion.correctAnswer
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200'
                    }`}
                  >
                    <span>{String.fromCharCode(65 + index)}. {answer}</span>
                    {gameState.phase === 'reveal' && index === currentQuestion.correctAnswer && (
                      <span className="text-xs font-semibold uppercase tracking-wide">správne</span>
                    )}
                  </li>
                ))}
              </ol>
              {currentQuestion.explanation && gameState.phase === 'reveal' && (
                <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-slate-500">
              <p>Počas lobby pripravte hráčov a potom spustite prvú otázku.</p>
              <p>Otázky sú vybraté automaticky podľa zvoleného jazyka.</p>
            </div>
          )}
        </div>
      </section>

      {gameState.phase === 'finished' && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
          <h3 className="text-lg font-semibold">Kvíz dokončený!</h3>
          <p className="text-sm">Zdieľajte obrazovku s hráčmi alebo spustite nový kvíz.</p>
        </div>
      )}
    </div>
  )
}

function handleIncomingMessage(state: QuizGameState, message: QuizMessage): QuizGameState {
  switch (message.type) {
    case 'join': {
      const exists = state.players.some(player => player.id === message.playerId)
      if (exists) {
        return state
      }
      const newPlayer: QuizPlayerState = {
        id: message.playerId,
        name: message.name,
        score: 0,
        answer: null,
        lastAnswerCorrect: undefined,
      }
      return {
        ...state,
        players: [...state.players, newPlayer],
      }
    }
    case 'answer': {
      if (state.phase !== 'question') {
        return state
      }
      return {
        ...state,
        players: state.players.map(player =>
          player.id === message.playerId ? { ...player, answer: message.answer } : player,
        ),
      }
    }
    case 'leave': {
      return {
        ...state,
        players: state.players.filter(player => player.id !== message.playerId),
      }
    }
    case 'ping':
      return state
    case 'state':
      return state
    default:
      return state
  }
}

function describePhase(phase: QuizGameState['phase'], questionIndex: number, total: number) {
  switch (phase) {
    case 'idle':
    case 'lobby':
      return 'Čakáme na pripojenie hráčov.'
    case 'question':
      return `Prebieha otázka ${questionIndex + 1} z ${total}.`
    case 'reveal':
      return 'Správna odpoveď je zobrazená. Pokračujte na ďalšiu otázku.'
    case 'finished':
      return 'Kvíz je ukončený.'
    default:
      return 'Stav kvízu nie je známy.'
  }
}
