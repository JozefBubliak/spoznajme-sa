'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS } from './data/languages'
import { type QuizQuestion } from './data/questions'
import { useQuizChannel } from './useQuizChannel'
import type {
  HostControls,
  QuizGameState,
  QuizMessage,
  QuizPlayerState,
  QuizRoundConfig,
  QuizRoundScoring,
} from './types'

interface HostViewProps {
  code: string
  language: string
  questions: QuizQuestion[]
  onResetLobby: () => void
}

interface CategoryOption {
  id: string
  name: string
  count: number
}

const DEFAULT_SCORING: QuizRoundScoring = {
  correct: 5,
  wrong: 0,
  noAnswer: 0,
}

function buildRoundDurations(rounds: QuizRoundConfig[]): number[] {
  return rounds.flatMap(round => Array.from({ length: round.questionCount }, () => round.questionSeconds))
}

function getRoundForQuestion(rounds: QuizRoundConfig[], questionIndex: number) {
  let traversed = 0
  for (const round of rounds) {
    const end = traversed + round.questionCount
    if (questionIndex >= traversed && questionIndex < end) {
      return {
        round,
        roundNumber: round.index + 1,
        questionInRound: questionIndex - traversed + 1,
      }
    }
    traversed = end
  }
  return {
    round: null,
    roundNumber: 1,
    questionInRound: questionIndex + 1,
  }
}

export default function HostView({ code, language, questions, onResetLobby }: HostViewProps) {
  const languageLabel = useMemo(
    () => LANGUAGE_OPTIONS.find(option => option.code === language)?.name ?? language,
    [language],
  )

  const [joinUrl, setJoinUrl] = useState('')
  const [now, setNow] = useState(Date.now())
  const [plannedRounds, setPlannedRounds] = useState(3)
  const [roundCursor, setRoundCursor] = useState(0)
  const [setupStep, setSetupStep] = useState<'round-count' | 'round-config'>('round-count')
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [roundError, setRoundError] = useState<string | null>(null)
  const [savingRound, setSavingRound] = useState(false)
  const [roundForm, setRoundForm] = useState({
    categoryId: '',
    questionCount: 3,
    questionSeconds: 20,
    scoreCorrect: 5,
    scoreWrong: 0,
    scoreNoAnswer: 0,
  })

  const [gameState, setGameState] = useState<QuizGameState>(() => ({
    code,
    language,
    phase: 'lobby',
    questionIndex: -1,
    totalQuestions: 0,
    questionStart: null,
    players: [],
    questions,
    roundDurations: [],
    roundsReady: false,
    rounds: [],
    lobbyLocked: false,
  }))

  const stateRef = useRef(gameState)
  stateRef.current = gameState

  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      language,
      code,
      questions,
      phase: 'lobby',
      totalQuestions: 0,
      questionIndex: -1,
      roundDurations: [],
      roundsReady: false,
      rounds: [],
      lobbyLocked: false,
    }))
    setRoundCursor(0)
    setRoundError(null)
    setSetupStep('round-count')
  }, [code, language, questions])

  useEffect(() => {
    fetch('/api/herd-vote/categories')
      .then(async res => {
        const payload = await res.json().catch(() => ({ categories: [] }))
        const rows = Array.isArray(payload?.categories) ? payload.categories : []
        setCategories(
          rows.map((row: any) => ({
            id: String(row.id),
            name: String(row.name),
            count: Number(row.count ?? 0),
          })),
        )
      })
      .catch(() => setCategories([]))
  }, [])

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
      await navigator
        .share({
          title: 'Herd Vote - pripoj sa',
          text: 'Pridaj sa do hry pomocou odkazu',
          url: joinUrl,
        })
        .catch(() => {})
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
          if (prev.phase !== 'ready' || prev.players.length === 0 || !prev.roundsReady) return prev
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
          const roundContext = getRoundForQuestion(prev.rounds, prev.questionIndex)
          const scoring = roundContext.round?.scoring ?? DEFAULT_SCORING

          const players = prev.players.map(player => {
            if (player.answer == null) {
              return {
                ...player,
                score: player.score + scoring.noAnswer,
                lastAnswerCorrect: false,
              }
            }
            const isCorrect = player.answer === currentQuestion.correctAnswer
            return {
              ...player,
              score: player.score + (isCorrect ? scoring.correct : scoring.wrong),
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
          totalQuestions: 0,
          questionStart: null,
          roundsReady: false,
          rounds: [],
          roundDurations: [],
          lobbyLocked: false,
          players: prev.players.map(player => ({
            ...player,
            score: 0,
            answer: null,
            lastAnswerCorrect: undefined,
          })),
        }))
        setRoundCursor(0)
        setRoundError(null)
        setSetupStep('round-count')
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

  const roundContext = getRoundForQuestion(gameState.rounds, Math.max(0, gameState.questionIndex))
  const currentRoundDuration = gameState.roundDurations[gameState.questionIndex] ?? 20
  const roundTimeLeft =
    gameState.phase === 'question' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  const saveRound = async () => {
    setRoundError(null)
    const category = categories.find(item => item.id === roundForm.categoryId)
    if (!category) {
      setRoundError('Vyberte platnú kategóriu.')
      return
    }

    if (roundForm.questionCount < 1 || roundForm.questionSeconds < 5) {
      setRoundError('Počet otázok aj čas musia mať platnú hodnotu.')
      return
    }

    const alreadyConfigured = gameState.rounds.reduce((acc, item) => acc + item.questionCount, 0)
    const totalAfterSave = alreadyConfigured + roundForm.questionCount
    if (totalAfterSave > questions.length) {
      setRoundError(
        `Pre demo otázky je dostupných len ${questions.length} unikátnych otázok. Znížte počet otázok v kolách.`,
      )
      return
    }

    setSavingRound(true)
    try {
      const response = await fetch(`/api/games/${code}/rounds/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          index: roundCursor,
          categoryId: roundForm.categoryId,
          questions: roundForm.questionCount,
          prepSeconds: 0,
          questionSeconds: roundForm.questionSeconds,
          scoringMode: 'custom',
          localePrefix: language,
        }),
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        if (payload?.error === 'NOT_ENOUGH_QUESTIONS') {
          const available = Number(payload?.available ?? 0)
          setRoundError(
            `V kategórii je dostupných len ${available} vhodných otázok pre túto hru. Upravte nastavenie kola.`,
          )
        } else if (response.status === 401) {
          setRoundError('Na uloženie kola do DB musíte byť prihlásený ako moderátor.')
        } else {
          setRoundError(String(payload?.error || 'Kolo sa nepodarilo uložiť.'))
        }
        return
      }

      const nextRound: QuizRoundConfig = {
        index: roundCursor,
        categoryId: roundForm.categoryId,
        categoryName: category.name,
        questionCount: roundForm.questionCount,
        questionSeconds: roundForm.questionSeconds,
        scoring: {
          correct: roundForm.scoreCorrect,
          wrong: roundForm.scoreWrong,
          noAnswer: roundForm.scoreNoAnswer,
        },
      }

      const updatedRounds = [...gameState.rounds]
      updatedRounds[roundCursor] = nextRound

      if (roundCursor + 1 >= plannedRounds) {
        const totalQuestions = updatedRounds.reduce((sum, round) => sum + round.questionCount, 0)
        setGameState(prev => ({
          ...prev,
          phase: 'ready',
          rounds: updatedRounds,
          roundsReady: true,
          totalQuestions,
          roundDurations: buildRoundDurations(updatedRounds),
        }))
      } else {
        setGameState(prev => ({
          ...prev,
          rounds: updatedRounds,
          roundsReady: false,
          phase: 'setup',
        }))
        setRoundCursor(current => current + 1)
      }
    } finally {
      setSavingRound(false)
    }
  }

  const lockLobbyAndBeginSetup = () => {
    setRoundError(null)
    setRoundCursor(0)
    setSetupStep('round-count')
    setGameState(prev => ({
      ...prev,
      phase: 'setup',
      lobbyLocked: true,
      rounds: [],
      roundsReady: false,
      totalQuestions: 0,
      roundDurations: [],
    }))
  }

  const confirmRoundCount = () => {
    if (plannedRounds < 1) {
      setRoundError('Počet kôl musí byť aspoň 1.')
      return
    }
    setRoundError(null)
    setRoundCursor(0)
    setSetupStep('round-config')
  }

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

        {gameState.phase === 'lobby' && (
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {joinUrl ? (
              <>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Link pre hráčov</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span className="flex-1 text-sm break-all text-slate-700">{joinUrl}</span>
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
              <p className="text-sm text-slate-700">Po pripojení hráčov pokračujte na nastavenie jednotlivých kôl.</p>
              <button
                type="button"
                onClick={lockLobbyAndBeginSetup}
                disabled={gameState.players.length === 0}
                className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Uzamknúť miestnosť a nastaviť kolá
              </button>
            </div>
          )}

          {gameState.phase === 'setup' && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Nastavenie jednotlivých kôl</h3>

              {setupStep === 'round-count' && (
                <>
                  <p className="text-xs text-slate-500">Krok 1: nastavte celkový počet kôl.</p>
                  <label className="flex items-center justify-between text-sm text-slate-700">
                    <span>Počet kôl</span>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={plannedRounds}
                      onChange={event => setPlannedRounds(Math.max(1, Math.min(12, Number(event.target.value) || 1)))}
                      className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={confirmRoundCount}
                    className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Potvrdiť počet kôl
                  </button>
                </>
              )}

              {setupStep === 'round-config' && (
                <>
                  <p className="text-xs text-slate-500">
                    Kolo {roundCursor + 1} z {plannedRounds}. Každé potvrdenie sa ukladá do DB ako samostatný záznam.
                  </p>

                  <label className="flex flex-col gap-1 text-sm text-slate-700">
                    <span>Kategória</span>
                    <select
                      value={roundForm.categoryId}
                      onChange={event => setRoundForm(prev => ({ ...prev, categoryId: event.target.value }))}
                      className="rounded-md border border-slate-300 px-2 py-2"
                    >
                      <option value="">Vyber kategóriu</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center justify-between text-sm text-slate-700">
                    <span>Počet otázok</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={roundForm.questionCount}
                      onChange={event =>
                        setRoundForm(prev => ({ ...prev, questionCount: Math.max(1, Number(event.target.value) || 1) }))
                      }
                      className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right"
                    />
                  </label>

                  <label className="flex items-center justify-between text-sm text-slate-700">
                    <span>Čas na otázku (s)</span>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={roundForm.questionSeconds}
                      onChange={event =>
                        setRoundForm(prev => ({ ...prev, questionSeconds: Math.max(5, Number(event.target.value) || 5) }))
                      }
                      className="w-20 rounded-md border border-slate-300 px-2 py-1 text-right"
                    />
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <label className="flex flex-col gap-1 text-xs text-slate-600">
                      + správna
                      <input
                        type="number"
                        value={roundForm.scoreCorrect}
                        onChange={event =>
                          setRoundForm(prev => ({ ...prev, scoreCorrect: Number(event.target.value) || 0 }))
                        }
                        className="rounded-md border border-slate-300 px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-slate-600">
                      zlá odpoveď
                      <input
                        type="number"
                        value={roundForm.scoreWrong}
                        onChange={event =>
                          setRoundForm(prev => ({ ...prev, scoreWrong: Number(event.target.value) || 0 }))
                        }
                        className="rounded-md border border-slate-300 px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-slate-600">
                      bez odpovede
                      <input
                        type="number"
                        value={roundForm.scoreNoAnswer}
                        onChange={event =>
                          setRoundForm(prev => ({ ...prev, scoreNoAnswer: Number(event.target.value) || 0 }))
                        }
                        className="rounded-md border border-slate-300 px-2 py-1"
                      />
                    </label>
                  </div>
                </>
              )}

              {roundError && <p className="text-xs font-medium text-rose-600">{roundError}</p>}

              {setupStep === 'round-config' && (
                <button
                  type="button"
                  onClick={saveRound}
                  disabled={savingRound}
                  className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {savingRound
                    ? 'Ukladám...'
                    : roundCursor + 1 >= plannedRounds
                      ? 'Uložiť posledné kolo'
                      : 'Nastaviť ďalšie kolo'}
                </button>
              )}
            </div>
          )}

          {gameState.phase === 'ready' && (
            <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <p>Všetky kolá sú pripravené. Hru môžete spustiť.</p>
              <button
                className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                onClick={controls.startGame}
                disabled={gameState.players.length === 0}
              >
                Spustiť kvíz
              </button>
            </div>
          )}

          {gameState.phase === 'question' && (
            <button
              className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              onClick={controls.revealAnswer}
            >
              Odhal správnu odpoveď
            </button>
          )}

          {gameState.phase === 'reveal' && (
            <button
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
              onClick={controls.nextQuestion}
            >
              Ďalšia otázka
            </button>
          )}

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

          {gameState.rounds.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Uložené kolá</h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-600">
                {gameState.rounds.map(round => (
                  <li key={round.index} className="rounded-md border border-slate-200 p-2">
                    Kolo {round.index + 1}: {round.categoryName}, {round.questionCount} otázok, {round.questionSeconds}s
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {currentQuestion ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Kolo {roundContext.roundNumber} · otázka {roundContext.questionInRound} /{' '}
                  {roundContext.round?.questionCount ?? gameState.totalQuestions}
                </p>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Celkom otázka {gameState.questionIndex + 1} / {gameState.totalQuestions}
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
                    <span>
                      {String.fromCharCode(65 + index)}. {answer}
                    </span>
                    {gameState.phase === 'reveal' && index === currentQuestion.correctAnswer && (
                      <span className="text-xs font-semibold uppercase tracking-wide">správne</span>
                    )}
                  </li>
                ))}
              </ol>

              {gameState.phase === 'reveal' && (
                <div className="rounded-md border border-slate-200 p-3">
                  <h4 className="text-sm font-semibold text-slate-700">Vyhodnotenie hráčov (vidí len moderátor)</h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    {gameState.players.map(player => (
                      <li key={player.id} className="flex items-center justify-between">
                        <span>{player.name}</span>
                        <span className={player.lastAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                          {player.lastAnswerCorrect ? 'správne' : 'nesprávne / bez odpovede'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentQuestion.explanation && gameState.phase === 'reveal' && (
                <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">{currentQuestion.explanation}</p>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-slate-500">
              <p>Počas lobby sa pripájajú hráči, potom moderátor nastaví všetky kolá.</p>
              <p>Po dokončení nastavenia prejdete do stavu pripravené a môžete spustiť hru.</p>
            </div>
          )}
        </div>
      </section>

      {gameState.phase === 'finished' && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-700">
          <h3 className="text-lg font-semibold">Kvíz dokončený!</h3>
          <p className="text-sm">Finálne poradie je pripravené. Moderátor môže odprezentovať výsledky.</p>
        </div>
      )}
    </div>
  )
}

function handleIncomingMessage(state: QuizGameState, message: QuizMessage): QuizGameState {
  switch (message.type) {
    case 'join': {
      if (state.lobbyLocked) {
        return state
      }
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
    case 'setup':
      return 'Moderátor nastavuje jednotlivé kolá.'
    case 'ready':
      return 'Všetky kolá sú pripravené. Hra čaká na štart.'
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
