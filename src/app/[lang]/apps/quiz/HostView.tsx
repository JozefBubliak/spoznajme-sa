'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS } from './data/languages'
import { type QuizQuestion } from './data/questions'
import { useQuizChannel } from './useQuizChannel'
import type { HostControls, QuizGameState, QuizMessage, QuizPlayerState, RoundConfig } from './types'

interface HostViewProps {
  code: string
  language: string
  questions: QuizQuestion[]
  onResetLobby: () => void
}

const DEFAULT_SCORING = 10
const DEFAULT_DURATION = 20

export default function HostView({ code, language, questions, onResetLobby }: HostViewProps) {
  const languageLabel = useMemo(
    () => LANGUAGE_OPTIONS.find(option => option.code === language)?.name ?? language,
    [language],
  )

  const [joinUrl, setJoinUrl] = useState('')
  const [now, setNow] = useState(Date.now())
  const [copied, setCopied] = useState(false)
  const [roundCountInput, setRoundCountInput] = useState('3')
  const [roundConfigForm, setRoundConfigForm] = useState<RoundConfig>({
    duration: DEFAULT_DURATION,
    category: '',
    scoring: DEFAULT_SCORING,
  })

  const [gameState, setGameState] = useState<QuizGameState>(() => ({
    code,
    language,
    phase: 'lobby',
    questionIndex: -1,
    totalQuestions: questions.length,
    totalRounds: 0,
    roundSetupIndex: 0,
    questionStart: null,
    players: [],
    questions,
    lobbyLocked: false,
    roundConfigs: [],
    roundDurations: questions.map(() => DEFAULT_DURATION),
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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLink = async () => {
    if (!joinUrl) return
    if (navigator.share) {
      await navigator.share({
        title: 'Quiz — pripoj sa',
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

  const lockLobby = () => {
    setGameState(prev => {
      if (prev.phase !== 'lobby') return prev
      return { ...prev, phase: 'locked', lobbyLocked: true }
    })
  }

  const confirmRoundCount = () => {
    const maxRounds = Math.min(20, gameState.questions.length)
    const count = Math.max(1, Math.min(maxRounds, parseInt(roundCountInput) || 3))
    setGameState(prev => {
      if (prev.phase !== 'locked') return prev
      return { ...prev, phase: 'round-config', totalRounds: count, roundSetupIndex: 0, roundConfigs: [] }
    })
    setRoundConfigForm({ duration: DEFAULT_DURATION, category: '', scoring: DEFAULT_SCORING })
  }

  const confirmRoundConfig = () => {
    setGameState(prev => {
      if (prev.phase !== 'round-config') return prev
      const newConfigs = [...prev.roundConfigs, { ...roundConfigForm }]
      const nextIndex = prev.roundSetupIndex + 1
      if (nextIndex >= prev.totalRounds) {
        return {
          ...prev,
          phase: 'question',
          questionIndex: 0,
          questionStart: Date.now(),
          roundConfigs: newConfigs,
          roundDurations: newConfigs.map(c => c.duration),
          roundsReady: true,
          players: prev.players.map(player => ({
            ...player,
            answer: null,
            lastAnswerCorrect: undefined,
            score: 0,
          })),
        }
      }
      return {
        ...prev,
        roundSetupIndex: nextIndex,
        roundConfigs: newConfigs,
      }
    })
    setRoundConfigForm({ duration: DEFAULT_DURATION, category: '', scoring: DEFAULT_SCORING })
  }

  const controls: HostControls = useMemo(
    () => ({
      createLobby: () => {},
      startGame: () => {},
      revealAnswer: () => {
        setGameState(prev => {
          if (prev.phase !== 'question') return prev
          const currentQuestion = prev.questions[prev.questionIndex]
          if (!currentQuestion) return prev
          const scoring = prev.roundConfigs[prev.questionIndex]?.scoring ?? DEFAULT_SCORING
          const players = prev.players.map(player => {
            if (player.answer == null) {
              return { ...player, lastAnswerCorrect: false }
            }
            const isCorrect = player.answer === currentQuestion.correctAnswer
            return {
              ...player,
              score: isCorrect ? player.score + scoring : player.score,
              lastAnswerCorrect: isCorrect,
            }
          })
          return { ...prev, phase: 'reveal', players, questionStart: null }
        })
      },
      nextQuestion: () => {
        setGameState(prev => {
          if (prev.phase !== 'reveal') return prev
          const nextIndex = prev.questionIndex + 1
          if (nextIndex >= prev.totalRounds) {
            return { ...prev, phase: 'finished', questionStart: null }
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
          lobbyLocked: false,
          totalRounds: 0,
          roundSetupIndex: 0,
          roundConfigs: [],
          roundDurations: prev.questions.map(() => DEFAULT_DURATION),
          players: prev.players.map(player => ({
            ...player,
            score: 0,
            answer: null,
            lastAnswerCorrect: undefined,
          })),
        }))
      },
    }),
    [],
  )

  useEffect(() => {
    if (gameState.phase !== 'question' || gameState.questionStart == null) return
    const config = gameState.roundConfigs[gameState.questionIndex]
    const durationSeconds = config?.duration ?? DEFAULT_DURATION
    const timeoutMs = gameState.questionStart + durationSeconds * 1000 - Date.now()
    if (timeoutMs <= 0) {
      controls.revealAnswer()
      return
    }
    const timeout = window.setTimeout(() => controls.revealAnswer(), timeoutMs)
    return () => window.clearTimeout(timeout)
  }, [controls, gameState.phase, gameState.questionStart, gameState.questionIndex, gameState.roundConfigs])

  useEffect(() => {
    if (gameState.phase !== 'question') return
    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [gameState.phase, gameState.questionIndex])

  const currentQuestion =
    gameState.phase === 'question' || gameState.phase === 'reveal'
      ? gameState.questions[gameState.questionIndex]
      : null

  const currentRoundConfig = gameState.roundConfigs[gameState.questionIndex]
  const currentRoundDuration = currentRoundConfig?.duration ?? DEFAULT_DURATION
  const roundTimeLeft =
    gameState.phase === 'question' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  return (
    <div className="space-y-6">
      {/* Header — vždy viditeľný */}
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
          <button
            className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
            onClick={onResetLobby}
          >
            Ukončiť lobby
          </button>
        </div>

        {/* Join link — iba v lobby (pred zamknutím) */}
        {gameState.phase === 'lobby' && joinUrl && (
          <div className="mt-6 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Link pre hráčov</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="flex-1 break-all text-sm text-slate-700">{joinUrl}</span>
              <button
                type="button"
                onClick={copyLink}
                className={`rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors ${
                  copied ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                {copied ? 'Skopírované ✓' : 'Kopírovať link'}
              </button>
              <button
                type="button"
                onClick={shareLink}
                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500"
              >
                Zdieľať
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                alt="QR kód pre pripojenie do hry"
                className="h-44 w-44 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* LOBBY — zoznam hráčov + zamknúť */}
      {gameState.phase === 'lobby' && (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Prihlásení hráči ({gameState.players.length})
          </h2>
          {gameState.players.length === 0 ? (
            <p className="text-sm text-slate-500">
              Zatiaľ sa nikto nepripojil. Zdieľajte kód alebo odkaz.
            </p>
          ) : (
            <ul className="space-y-2">
              {gameState.players.map(player => (
                <li
                  key={player.id}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-800"
                >
                  {player.name}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            disabled={gameState.players.length === 0}
            onClick={lockLobby}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Zamknúť miestnosť
          </button>
          {gameState.players.length === 0 && (
            <p className="text-center text-xs text-slate-400">
              Čakajte kým sa aspoň jeden hráč pripojí.
            </p>
          )}
        </div>
      )}

      {/* ZAMKNUTÉ — zadanie počtu kôl */}
      {gameState.phase === 'locked' && (
        <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Miestnosť zamknutá</h2>
            <p className="mt-1 text-sm text-slate-600">
              Prihlásení hráči ({gameState.players.length}):{' '}
              <span className="font-medium">{gameState.players.map(p => p.name).join(', ')}</span>
            </p>
          </div>
          <div className="space-y-3">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Zadajte počet kôl
              <input
                type="number"
                min={1}
                max={Math.min(20, gameState.questions.length)}
                value={roundCountInput}
                onChange={e => setRoundCountInput(e.target.value)}
                className="w-32 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <span className="text-xs font-normal text-slate-500">
                Dostupné otázky: {gameState.questions.length}
              </span>
            </label>
            <button
              type="button"
              onClick={confirmRoundCount}
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Potvrdiť
            </button>
          </div>
        </div>
      )}

      {/* KONFIGURÁCIA KOLA — jedno po druhom */}
      {gameState.phase === 'round-config' && (
        <div className="space-y-5 rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
              Nastavenie kola {gameState.roundSetupIndex + 1} z {gameState.totalRounds}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              Kolo {gameState.roundSetupIndex + 1}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Čas na odpoveď (sekundy)
              <input
                type="number"
                min={5}
                max={120}
                value={roundConfigForm.duration}
                onChange={e =>
                  setRoundConfigForm(prev => ({
                    ...prev,
                    duration: Math.min(120, Math.max(5, parseInt(e.target.value) || DEFAULT_DURATION)),
                  }))
                }
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Kategória
              <input
                type="text"
                placeholder="napr. Všeobecné znalosti"
                value={roundConfigForm.category}
                onChange={e => setRoundConfigForm(prev => ({ ...prev, category: e.target.value }))}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Body za správnu odpoveď
              <select
                value={roundConfigForm.scoring}
                onChange={e =>
                  setRoundConfigForm(prev => ({ ...prev, scoring: parseInt(e.target.value) }))
                }
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                <option value={5}>5 bodov</option>
                <option value={10}>10 bodov</option>
                <option value={15}>15 bodov</option>
                <option value={20}>20 bodov</option>
                <option value={25}>25 bodov</option>
                <option value={50}>50 bodov</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={confirmRoundConfig}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            {gameState.roundSetupIndex + 1 < gameState.totalRounds
              ? `Potvrdiť a nastaviť kolo ${gameState.roundSetupIndex + 2}`
              : 'Potvrdiť a spustiť kvíz'}
          </button>
        </div>
      )}

      {/* PRIEBEH HRY — otázky a odhalenie */}
      {(gameState.phase === 'question' || gameState.phase === 'reveal') && (
        <section className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Stav hry</h2>
              <p className="text-sm text-slate-500">
                {describePhase(gameState.phase, gameState.questionIndex, gameState.totalRounds)}
              </p>
            </header>

            <div className="flex flex-wrap gap-2">
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
                {gameState.questionIndex + 1 >= gameState.totalRounds ? 'Zobraziť výsledky' : 'Ďalšia otázka'}
              </button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700">
                Hráči ({gameState.players.length})
              </h3>
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
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            {currentQuestion && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Otázka {gameState.questionIndex + 1} / {gameState.totalRounds}
                    {currentRoundConfig?.category ? ` · ${currentRoundConfig.category}` : ''}
                  </p>
                  {gameState.phase === 'question' && roundTimeLeft != null && (
                    <p className="mt-1 text-sm font-medium text-amber-600">
                      Čas na odpoveď: {roundTimeLeft}s
                    </p>
                  )}
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {currentQuestion.question}
                  </h3>
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
                {currentQuestion.explanation && gameState.phase === 'reveal' && (
                  <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-600">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* VÝSLEDKY */}
      {gameState.phase === 'finished' && (
        <div className="space-y-4 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="text-lg font-semibold text-emerald-800">Kvíz dokončený!</h3>
          <ul className="space-y-2">
            {[...gameState.players]
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <li
                  key={player.id}
                  className="flex items-center gap-3 rounded-md border border-emerald-200 bg-white px-3 py-2 text-sm"
                >
                  <span className="w-5 text-center font-bold text-slate-500">{index + 1}.</span>
                  <span className="flex-1 font-medium text-slate-900">{player.name}</span>
                  <span className="font-semibold text-emerald-700">{player.score} bodov</span>
                </li>
              ))}
          </ul>
          <button
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            onClick={controls.resetGame}
          >
            Nová hra
          </button>
        </div>
      )}
    </div>
  )
}

function handleIncomingMessage(state: QuizGameState, message: QuizMessage): QuizGameState {
  switch (message.type) {
    case 'join': {
      if (state.lobbyLocked) return state
      const exists = state.players.some(player => player.id === message.playerId)
      if (exists) return state
      const newPlayer: QuizPlayerState = {
        id: message.playerId,
        name: message.name,
        score: 0,
        answer: null,
        lastAnswerCorrect: undefined,
      }
      return { ...state, players: [...state.players, newPlayer] }
    }
    case 'answer': {
      if (state.phase !== 'question') return state
      return {
        ...state,
        players: state.players.map(player =>
          player.id === message.playerId ? { ...player, answer: message.answer } : player,
        ),
      }
    }
    case 'leave': {
      return { ...state, players: state.players.filter(player => player.id !== message.playerId) }
    }
    case 'ping':
    case 'state':
    default:
      return state
  }
}

function describePhase(phase: QuizGameState['phase'], questionIndex: number, total: number) {
  switch (phase) {
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
