'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS } from './data/languages'
import { type QuizQuestion } from './data/questions'
import { useQuizChannel } from './useQuizChannel'
import type {
  HostControls,
  PodiumScores,
  QuizGameState,
  QuizMessage,
  QuizPlayerState,
  RoundConfig,
  ScoringMode,
} from './types'

interface HostViewProps {
  code: string
  language: string
  questions: QuizQuestion[]
  onResetLobby: () => void
}

// ─── Presety ──────────────────────────────────────────────────────────────────

type PresetKey = 'casual' | 'competitive' | 'speed' | 'final'

const DEFAULT_PODIUM: PodiumScores = { first: 10, second: 7, third: 5, rest: 3 }

const PRESETS: Record<PresetKey, Omit<RoundConfig, 'category'>> = {
  casual: {
    questionCount: 5,
    duration: 15,
    scoringMode: 'safe',
    correctScore: 10,
    wrongScore: 0,
    noAnswerScore: 0,
    podiumScores: DEFAULT_PODIUM,
    allowNegativeTotal: false,
    scoring: 10,
  },
  competitive: {
    questionCount: 5,
    duration: 15,
    scoringMode: 'classic',
    correctScore: 10,
    wrongScore: -3,
    noAnswerScore: 0,
    podiumScores: DEFAULT_PODIUM,
    allowNegativeTotal: true,
    scoring: 10,
  },
  speed: {
    questionCount: 3,
    duration: 10,
    scoringMode: 'podium',
    correctScore: 5,
    wrongScore: -2,
    noAnswerScore: 0,
    podiumScores: { first: 10, second: 7, third: 5, rest: 3 },
    allowNegativeTotal: false,
    scoring: 5,
  },
  final: {
    questionCount: 3,
    duration: 20,
    scoringMode: 'risk',
    correctScore: 20,
    wrongScore: -5,
    noAnswerScore: -3,
    podiumScores: DEFAULT_PODIUM,
    allowNegativeTotal: true,
    scoring: 20,
  },
}

const PRESET_LABELS: Record<PresetKey, string> = {
  casual: 'Casual',
  competitive: 'Competitive',
  speed: 'Speed',
  final: 'Finálové',
}

const DEFAULT_ROUND_CONFIG: RoundConfig = {
  category: '',
  questionCount: 3,
  duration: 20,
  scoringMode: 'classic',
  correctScore: 10,
  wrongScore: -3,
  noAnswerScore: 0,
  podiumScores: DEFAULT_PODIUM,
  allowNegativeTotal: false,
  scoring: 10,
}

// ─── Scoring mode info ─────────────────────────────────────────────────────────

const SCORING_INFO: Record<ScoringMode, { label: string; description: string; color: string; emoji: string }> = {
  classic: {
    label: 'Classic',
    emoji: '🎯',
    description:
      'Správna odpoveď prinesie body, zlá odpoveď odpočíta body. Vhodné pre firemné eventy a školské kvízy.',
    color: 'bg-muted border text-muted-foreground',
  },
  safe: {
    label: 'Safe',
    emoji: '🛡️',
    description:
      'Iba správna odpoveď prinesie body. Zlá odpoveď ani neodpovedanie nie sú penalizované. Vhodné pre casual hráčov a prvohráčov.',
    color: 'bg-success/10 border-success/30 text-foreground',
  },
  risk: {
    label: 'Risk',
    emoji: '⚠️',
    description:
      'Zlá odpoveď výrazne odpočíta body. Hráči musia zvážiť, či tipnúť. Vhodné pre súťažný finálový mód.',
    color: 'bg-destructive/10 border-destructive/30 text-destructive',
  },
  podium: {
    label: 'Podium',
    emoji: '🏆',
    description:
      'Prvý, druhý a tretí správny hráč dostanú vyšší počet bodov. Rýchlosť rozhoduje. Vhodné pre dynamické live eventy.',
    color: 'bg-warning/10 border-warning/30 text-[hsl(var(--warning))]',
  },
}

// ─── Scoring calculator ────────────────────────────────────────────────────────

function calculatePlayerScore(
  player: QuizPlayerState,
  isCorrect: boolean,
  config: RoundConfig,
  podiumRank: number | null,
): number {
  const { scoringMode, correctScore, wrongScore, noAnswerScore, podiumScores } = config
  const hasAnswered = player.answer != null

  let delta = 0

  if (scoringMode === 'safe') {
    delta = isCorrect ? correctScore : 0
  } else if (scoringMode === 'risk') {
    if (isCorrect) delta = correctScore
    else if (hasAnswered) delta = wrongScore
    else delta = noAnswerScore
  } else if (scoringMode === 'podium') {
    if (isCorrect && podiumRank !== null) {
      if (podiumRank === 0) delta = podiumScores.first
      else if (podiumRank === 1) delta = podiumScores.second
      else if (podiumRank === 2) delta = podiumScores.third
      else delta = podiumScores.rest
    } else if (hasAnswered) {
      delta = wrongScore
    } else {
      delta = noAnswerScore
    }
  } else {
    // classic
    if (isCorrect) delta = correctScore
    else if (hasAnswered) delta = wrongScore
    else delta = noAnswerScore
  }

  const newScore = player.score + delta
  return config.allowNegativeTotal ? newScore : Math.max(0, newScore)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HostView({ code, language, questions, onResetLobby }: HostViewProps) {
  const languageLabel = useMemo(
    () => LANGUAGE_OPTIONS.find(option => option.code === language)?.name ?? language,
    [language],
  )

  const [joinUrl, setJoinUrl] = useState('')
  const [now, setNow] = useState(Date.now())
  const [copied, setCopied] = useState(false)
  const [roundConfigForm, setRoundConfigForm] = useState<RoundConfig>(DEFAULT_ROUND_CONFIG)
  const [categories, setCategories] = useState<{ id: string; name: string; count: number; icon: string; group_tag: string }[]>([])
  const [pickerSel, setPickerSel] = useState<typeof categories>([])   // selected cats in order
  const [pickerSearch, setPickerSearch] = useState('')

  useEffect(() => {
    fetch('/api/herd-vote/categories')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.categories)) setCategories(d.categories) })
      .catch(() => {})
  }, [])

  const getCategoryName = (id: string) =>
    categories.find(c => c.id === id)?.name ?? id

  const [gameState, setGameState] = useState<QuizGameState>(() => ({
    code,
    language,
    phase: 'lobby',
    questionIndex: -1,
    totalQuestions: 0,
    totalRounds: 0,
    roundSetupIndex: 0,
    questionStart: null,
    players: [],
    questions,
    currentQuestionData: null,
    lobbyLocked: false,
    roundConfigs: [],
    questionToRound: [],
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
      await navigator.share({ title: 'Quiz — pripoj sa', text: 'Pridaj sa do hry', url: joinUrl }).catch(() => {})
      return
    }
    await copyLink()
  }

  // ─── Broadcast: posiela hráčom stav BEZ questions array (veľkostný limit 32KB) ──

  const sendMessage = useQuizChannel(code, (message: QuizMessage) => {
    if (message.type === 'ping') {
      sendMessage(buildBroadcast(stateRef.current))
      return
    }
    setGameState(prev => handleIncomingMessage(prev, message))
  })

  useEffect(() => {
    sendMessage(buildBroadcast(gameState))
  }, [gameState, sendMessage])

  // ─── Lobby actions ────────────────────────────────────────────────────────

  const lockLobby = () => {
    setGameState(prev => {
      if (prev.phase !== 'lobby') return prev
      return { ...prev, phase: 'locked', lobbyLocked: true }
    })
  }

  const confirmCategoryPicker = () => {
    if (!pickerSel.length) return
    setGameState(prev => {
      if (prev.phase !== 'locked') return prev
      return { ...prev, phase: 'round-config', totalRounds: pickerSel.length, roundSetupIndex: 0, roundConfigs: [] }
    })
    setRoundConfigForm({ ...DEFAULT_ROUND_CONFIG, category: pickerSel[0]?.id ?? '' })
  }

  const applyPreset = (key: PresetKey) => {
    setRoundConfigForm(prev => ({ ...prev, ...PRESETS[key] }))
  }

  const confirmRoundConfig = () => {
    const config: RoundConfig = { ...roundConfigForm, scoring: roundConfigForm.correctScore }
    setGameState(prev => {
      if (prev.phase !== 'round-config') return prev
      const newConfigs = [...prev.roundConfigs, config]
      const nextIndex = prev.roundSetupIndex + 1

      if (nextIndex >= prev.totalRounds) {
        // Všetky kolá nastavené — vypočítaj questionToRound a totalQuestions
        const questionToRound: number[] = []
        newConfigs.forEach((rc, roundIdx) => {
          for (let q = 0; q < rc.questionCount; q++) {
            questionToRound.push(roundIdx)
          }
        })
        const totalQuestions = questionToRound.length
        const firstQuestion = prev.questions[0] ?? null

        return {
          ...prev,
          phase: 'question',
          questionIndex: 0,
          questionStart: null,         // čas NEštartuje automaticky — moderátor klikne "Spustiť odpočet"
          totalQuestions,
          roundConfigs: newConfigs,
          questionToRound,
          currentQuestionData: firstQuestion,
          roundDurations: newConfigs.map(c => c.duration),
          roundsReady: true,
          players: prev.players.map(player => ({
            ...player,
            answer: null,
            answeredAt: null,
            lastAnswerCorrect: undefined,
            score: 0,
          })),
        }
      }
      return { ...prev, roundSetupIndex: nextIndex, roundConfigs: newConfigs }
    })
    // Pre-fill category from picker for the next round
    setRoundConfigForm({ ...DEFAULT_ROUND_CONFIG, category: pickerSel[gameState.roundSetupIndex + 1]?.id ?? '' })
  }

  // ─── Game controls ────────────────────────────────────────────────────────

  const controls: HostControls = useMemo(
    () => ({
      createLobby: () => {},
      startGame: () => {},
      startTimer: () => {
        // Moderátor klikol "Spustiť odpočet" — timer sa spustí
        setGameState(prev => {
          if (prev.phase !== 'question') return prev
          return { ...prev, phase: 'answering', questionStart: Date.now() }
        })
      },
      revealAnswer: () => {
        // Moderátor klikol "Odhal správnu odpoveď" — vypočítaj skóre a ukáž hráčom
        setGameState(prev => {
          if (prev.phase !== 'answering' && prev.phase !== 'host-revealed') return prev
          const currentQuestion = prev.questions[prev.questionIndex]
          if (!currentQuestion) return prev
          const roundConfigIdx = prev.questionToRound[prev.questionIndex] ?? 0
          const config = prev.roundConfigs[roundConfigIdx] ?? DEFAULT_ROUND_CONFIG

          const correctPlayersRanked = prev.players
            .filter(p => p.answer === currentQuestion.correctAnswer)
            .sort((a, b) => (a.answeredAt ?? Infinity) - (b.answeredAt ?? Infinity))
          const podiumRankMap = new Map(correctPlayersRanked.map((p, i) => [p.id, i]))

          const players = prev.players.map(player => {
            const isCorrect = player.answer === currentQuestion.correctAnswer
            const podiumRank = isCorrect ? (podiumRankMap.get(player.id) ?? null) : null
            const newScore = calculatePlayerScore(player, isCorrect, config, podiumRank)
            return { ...player, score: newScore, lastAnswerCorrect: isCorrect }
          })

          return { ...prev, phase: 'reveal', players, questionStart: null }
        })
      },
      nextQuestion: () => {
        setGameState(prev => {
          if (prev.phase !== 'reveal') return prev
          const nextIndex = prev.questionIndex + 1
          if (nextIndex >= prev.totalQuestions) {
            return { ...prev, phase: 'finished', questionStart: null }
          }
          const nextQuestion = prev.questions[nextIndex] ?? null
          return {
            ...prev,
            phase: 'question',
            questionIndex: nextIndex,
            questionStart: null,
            currentQuestionData: nextQuestion,
            players: prev.players.map(player => ({
              ...player,
              answer: null,
              answeredAt: null,
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
          totalQuestions: 0,
          roundSetupIndex: 0,
          roundConfigs: [],
          questionToRound: [],
          currentQuestionData: null,
          roundDurations: prev.questions.map(() => 20),
          players: prev.players.map(player => ({
            ...player,
            score: 0,
            answer: null,
            answeredAt: null,
            lastAnswerCorrect: undefined,
          })),
        }))
      },
    }),
    [],
  )

  // ─── Auto-reveal pre HOSTA keď čas vyprší (hráči to ešte neuvidia) ────────

  useEffect(() => {
    if (gameState.phase !== 'answering' || gameState.questionStart == null) return
    const config = gameState.roundConfigs[gameState.questionToRound[gameState.questionIndex] ?? 0]
    const durationSeconds = config?.duration ?? 20
    const timeoutMs = gameState.questionStart + durationSeconds * 1000 - Date.now()
    if (timeoutMs <= 0) {
      setGameState(prev => prev.phase === 'answering' ? { ...prev, phase: 'host-revealed' } : prev)
      return
    }
    const timeout = window.setTimeout(() => {
      setGameState(prev => prev.phase === 'answering' ? { ...prev, phase: 'host-revealed' } : prev)
    }, timeoutMs)
    return () => window.clearTimeout(timeout)
  }, [gameState.phase, gameState.questionStart, gameState.questionIndex, gameState.roundConfigs, gameState.questionToRound])

  useEffect(() => {
    if (gameState.phase !== 'answering') return
    const interval = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(interval)
  }, [gameState.phase, gameState.questionIndex])

  const currentQuestion = gameState.currentQuestionData
  const roundConfigIdx = gameState.questionToRound[gameState.questionIndex] ?? 0
  const currentRoundConfig = gameState.roundConfigs[roundConfigIdx]
  const currentRoundDuration = currentRoundConfig?.duration ?? 20
  const roundTimeLeft =
    gameState.phase === 'answering' && gameState.questionStart != null
      ? Math.max(0, Math.ceil((gameState.questionStart + currentRoundDuration * 1000 - now) / 1000))
      : null

  const isGamePhase = gameState.phase === 'question' || gameState.phase === 'answering'
    || gameState.phase === 'host-revealed' || gameState.phase === 'reveal'

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">

      {/* ── Header: kód + jazyk iba v lobby ─────────────────────────────── */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        {!isGamePhase && gameState.phase !== 'finished' && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kód hry</p>
              <p className="text-3xl font-bold tracking-widest text-foreground">{code}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Jazyk kvízu</p>
              <p className="text-xl font-semibold text-foreground">{languageLabel}</p>
            </div>
            <button
              className="rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
              onClick={onResetLobby}
            >
              Ukončiť lobby
            </button>
          </div>
        )}

        {/* Join link — iba v lobby pred zamknutím */}
        {gameState.phase === 'lobby' && joinUrl && (
          <div className="mt-6 space-y-3 rounded-lg border bg-muted p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Link pre hráčov</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="flex-1 break-all text-sm text-foreground">{joinUrl}</span>
              <button
                type="button"
                onClick={copyLink}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  copied ? 'bg-[hsl(var(--success))] text-white' : 'bg-foreground text-background hover:bg-foreground/90'
                }`}
              >
                {copied ? 'Skopírované ✓' : 'Kopírovať link'}
              </button>
              <button
                type="button"
                onClick={shareLink}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Zdieľať
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                alt="QR kód"
                className="h-44 w-44 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── LOBBY: hráči + zamknúť ─────────────────────────────────────────── */}
      {gameState.phase === 'lobby' && (
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Prihlásení hráči ({gameState.players.length})
          </h2>
          {gameState.players.length === 0 ? (
            <p className="text-sm text-muted-foreground">Zatiaľ sa nikto nepripojil. Zdieľajte kód alebo odkaz.</p>
          ) : (
            <ul className="space-y-2">
              {gameState.players.map(player => (
                <li
                  key={player.id}
                  className="rounded-md border px-3 py-2 text-sm font-medium text-foreground"
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
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Zamknúť miestnosť
          </button>
          {gameState.players.length === 0 && (
            <p className="text-center text-xs text-muted-foreground">Čakajte kým sa aspoň jeden hráč pripojí.</p>
          )}
        </div>
      )}

      {/* ── LOCKED: výber kategórií kôl ─────────────────────────────────────── */}
      {gameState.phase === 'locked' && (() => {
        const GROUPS = [
          { key: 'zabava',    label: 'Zábava & Pop',       icon: '🎬' },
          { key: 'sport',     label: 'Šport',              icon: '⚽' },
          { key: 'kultura',   label: 'Kultúra & Umenie',   icon: '🎨' },
          { key: 'historia',  label: 'História',           icon: '⚔️' },
          { key: 'geo',       label: 'Geografia',          icon: '🌍' },
          { key: 'jedlo',     label: 'Jedlo & Pitie',      icon: '🍕' },
          { key: 'veda',      label: 'Veda & Príroda',     icon: '🔬' },
          { key: 'tech',      label: 'Tech',               icon: '💻' },
          { key: 'sk',        label: 'Slovensko',          icon: '🇸🇰' },
          { key: 'funny',     label: 'Zábavné',            icon: '😱' },
          { key: 'deti',      label: 'Deti',               icon: '🏠' },
          { key: 'deeptalks', label: 'DeepTalks',          icon: '💬' },
        ]
        const q = pickerSearch.toLowerCase()
        const filteredAll = categories.filter(c => !q || c.name.toLowerCase().includes(q))
        const toggle = (cat: typeof categories[0]) =>
          setPickerSel(prev =>
            prev.some(c => c.id === cat.id) ? prev.filter(c => c.id !== cat.id) : [...prev, cat]
          )
        const roundLabel = (n: number) => n === 1 ? '1 kolo' : n < 5 ? `${n} kolá` : `${n} kôl`

        return (
          <div className="space-y-4">
            {/* Hlavička + hráči */}
            <div className="rounded-lg border border-warning/20 bg-warning/10 p-4">
              <h2 className="font-semibold text-foreground">Vyber kategórie kôl</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Hráči ({gameState.players.length}): {gameState.players.map(p => p.name).join(', ')}
                {' · '}Každá vybraná kategória = 1 kolo · Poradie výberu = poradie kôl
              </p>
            </div>

            {/* Vyhľadávanie */}
            <input
              value={pickerSearch}
              onChange={e => setPickerSearch(e.target.value)}
              placeholder="Hľadaj kategóriu…"
              className="w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            />

            {/* Skupiny a karty */}
            <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
              {GROUPS.map(g => {
                const items = filteredAll.filter(c => c.group_tag === g.key)
                if (!items.length) return null
                return (
                  <div key={g.key}>
                    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-border">
                      <span className="text-sm">{g.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g.label}</span>
                      {pickerSel.filter(c => c.group_tag === g.key).length > 0 && (
                        <span className="ml-auto text-xs font-semibold text-primary px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                          {pickerSel.filter(c => c.group_tag === g.key).length} vybraných
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {items.map(cat => {
                        const isSel = pickerSel.some(c => c.id === cat.id)
                        const selIdx = pickerSel.findIndex(c => c.id === cat.id)
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => toggle(cat)}
                            className={`relative text-left p-3 rounded-lg border-2 transition-all ${
                              isSel
                                ? 'border-primary bg-primary/8 text-primary'
                                : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5'
                            }`}
                          >
                            {isSel && (
                              <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">
                                {selIdx + 1}
                              </span>
                            )}
                            <div className="text-lg mb-1">{cat.icon}</div>
                            <div className={`text-xs font-semibold leading-snug pr-5 ${isSel ? 'text-primary' : 'text-foreground'}`}>
                              {cat.name}
                            </div>
                            <div className="text-[10px] mt-0.5 text-muted-foreground">{cat.count} otázok</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {filteredAll.length === 0 && (
                <p className="text-center py-8 text-sm text-muted-foreground">Nič sa nenašlo</p>
              )}
            </div>

            {/* Vybraté pillsy */}
            {pickerSel.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {pickerSel.map((cat, i) => (
                  <span
                    key={cat.id}
                    onClick={() => toggle(cat)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-primary/30 bg-primary/8 text-primary cursor-pointer hover:border-destructive/40 hover:bg-destructive/8 hover:text-destructive transition-all"
                  >
                    <span className="opacity-50 font-bold">{i + 1}.</span>
                    <span>{cat.name}</span>
                    <span className="opacity-40 ml-0.5">×</span>
                  </span>
                ))}
              </div>
            )}

            {/* Potvrdiť */}
            <button
              type="button"
              onClick={confirmCategoryPicker}
              disabled={pickerSel.length === 0}
              className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {pickerSel.length === 0
                ? 'Vyber aspoň 1 kategóriu'
                : `Potvrdiť výber — ${roundLabel(pickerSel.length)} →`}
            </button>
          </div>
        )
      })()}

      {/* ── ROUND CONFIG: editor kola ──────────────────────────────────────── */}
      {gameState.phase === 'round-config' && (
        <div className="space-y-0 rounded-xl border border-primary/20 bg-card shadow-sm overflow-hidden">

          {/* Hlavička */}
          <div className="bg-primary px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              Kolo {gameState.roundSetupIndex + 1} z {gameState.totalRounds}
            </p>
            <h2 className="mt-1 text-xl font-bold text-primary-foreground">
              {getCategoryName(roundConfigForm.category) || `Kolo ${gameState.roundSetupIndex + 1}`}
            </h2>
          </div>

          <div className="space-y-6 p-6">

            {/* Presety */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Rýchly preset
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PRESETS) as PresetKey[]).map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => applyPreset(key)}
                    className="rounded-md border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    {PRESET_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border" />

            {/* Sekcia A: Kategória + počet otázok */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                A — Kategória a otázky
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1 text-sm font-medium text-foreground">
                  Kategória
                  {(() => {
                    const cat = pickerSel[gameState.roundSetupIndex]
                    return cat ? (
                      <div className="flex items-center gap-2 rounded-md border-2 border-primary/30 bg-primary/8 px-3 py-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-semibold text-primary">{cat.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{cat.count} otázok</span>
                      </div>
                    ) : (
                      <div className="rounded-md border bg-card px-3 py-2 text-sm text-muted-foreground">
                        {getCategoryName(roundConfigForm.category) || '—'}
                      </div>
                    )
                  })()}
                </div>
                <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
                  Počet otázok v kole
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={roundConfigForm.questionCount}
                    onChange={e =>
                      setRoundConfigForm(prev => ({
                        ...prev,
                        questionCount: Math.max(1, Math.min(30, parseInt(e.target.value) || 3)),
                      }))
                    }
                    className="rounded-md border bg-card px-3 py-2 text-sm text-foreground"
                  />
                </label>
              </div>
            </section>

            <hr className="border" />

            {/* Sekcia B: Čas */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                B — Čas na odpoveď
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {[5, 10, 15, 20, 30, 45, 60].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRoundConfigForm(prev => ({ ...prev, duration: s }))}
                    className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      roundConfigForm.duration === s
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border bg-muted text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {s}s
                  </button>
                ))}
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  vlastný:
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={roundConfigForm.duration}
                    onChange={e =>
                      setRoundConfigForm(prev => ({
                        ...prev,
                        duration: Math.min(120, Math.max(5, parseInt(e.target.value) || 20)),
                      }))
                    }
                    className="w-20 rounded-md border bg-card px-2 py-1.5 text-sm text-foreground"
                  />
                </label>
              </div>
            </section>

            <hr className="border" />

            {/* Sekcia C: Bodovanie */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                C — Bodovanie
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(SCORING_INFO) as ScoringMode[]).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setRoundConfigForm(prev => ({ ...prev, scoringMode: mode }))}
                    className={`rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-all ${
                      roundConfigForm.scoringMode === mode
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border bg-muted text-muted-foreground hover:border-primary/30'
                    }`}
                  >
                    {SCORING_INFO[mode].emoji} {SCORING_INFO[mode].label}
                  </button>
                ))}
              </div>

              <div className={`rounded-lg border p-3 text-sm ${SCORING_INFO[roundConfigForm.scoringMode].color}`}>
                {SCORING_INFO[roundConfigForm.scoringMode].description}
              </div>

              {roundConfigForm.scoringMode === 'safe' && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <ScoreInput
                    label="Správna odpoveď"
                    value={roundConfigForm.correctScore}
                    min={1}
                    onChange={v => setRoundConfigForm(prev => ({ ...prev, correctScore: v }))}
                  />
                  <div className="flex flex-col gap-1 text-sm font-medium text-muted-foreground">
                    <span>Zlá odpoveď</span>
                    <div className="rounded-md border bg-muted px-3 py-2 text-muted-foreground">0 (safe mód)</div>
                  </div>
                  <div className="flex flex-col gap-1 text-sm font-medium text-muted-foreground">
                    <span>Neodpoveď</span>
                    <div className="rounded-md border bg-muted px-3 py-2 text-muted-foreground">0 (safe mód)</div>
                  </div>
                </div>
              )}

              {(roundConfigForm.scoringMode === 'classic' || roundConfigForm.scoringMode === 'risk') && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <ScoreInput
                    label="Správna odpoveď"
                    value={roundConfigForm.correctScore}
                    min={1}
                    onChange={v => setRoundConfigForm(prev => ({ ...prev, correctScore: v }))}
                  />
                  <ScoreInput
                    label="Zlá odpoveď"
                    value={roundConfigForm.wrongScore}
                    max={0}
                    onChange={v => setRoundConfigForm(prev => ({ ...prev, wrongScore: v }))}
                    hint="0 alebo záporné číslo"
                  />
                  <ScoreInput
                    label="Neodpoveď"
                    value={roundConfigForm.noAnswerScore}
                    max={0}
                    onChange={v => setRoundConfigForm(prev => ({ ...prev, noAnswerScore: v }))}
                    hint="0 alebo záporné číslo"
                  />
                </div>
              )}

              {roundConfigForm.scoringMode === 'podium' && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Body pre správnych hráčov podľa rýchlosti odpovede:</p>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {(
                      [
                        { label: '1. miesto', key: 'first' as const },
                        { label: '2. miesto', key: 'second' as const },
                        { label: '3. miesto', key: 'third' as const },
                        { label: 'Ostatní správni', key: 'rest' as const },
                      ] as const
                    ).map(({ label, key }) => (
                      <label key={key} className="flex flex-col gap-1 text-sm font-medium text-foreground">
                        {label}
                        <input
                          type="number"
                          min={0}
                          value={roundConfigForm.podiumScores[key]}
                          onChange={e =>
                            setRoundConfigForm(prev => ({
                              ...prev,
                              podiumScores: { ...prev.podiumScores, [key]: Math.max(0, parseInt(e.target.value) || 0) },
                            }))
                          }
                          className="rounded-md border bg-card px-3 py-2 text-sm text-foreground"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ScoreInput label="Zlá odpoveď" value={roundConfigForm.wrongScore} max={0}
                      onChange={v => setRoundConfigForm(prev => ({ ...prev, wrongScore: v }))} hint="0 alebo záporné číslo" />
                    <ScoreInput label="Neodpoveď" value={roundConfigForm.noAnswerScore} max={0}
                      onChange={v => setRoundConfigForm(prev => ({ ...prev, noAnswerScore: v }))} hint="0 alebo záporné číslo" />
                  </div>
                </div>
              )}
            </section>

            <hr className="border" />

            {/* Sekcia D: Špeciálne pravidlá */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">D — Špeciálne pravidlá</h3>
              <label className="flex items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={roundConfigForm.allowNegativeTotal}
                  onChange={e => setRoundConfigForm(prev => ({ ...prev, allowNegativeTotal: e.target.checked }))}
                  className="h-4 w-4 rounded border accent-primary"
                />
                Povoliť záporné celkové skóre
                <span className="text-xs text-muted-foreground">(ak vypnuté, skóre neklesne pod 0)</span>
              </label>
            </section>

            {/* Súhrn */}
            <div className="rounded-lg border bg-muted px-4 py-3 text-xs text-muted-foreground">
              <span className="font-semibold">Súhrn: </span>
              {roundConfigForm.scoringMode === 'podium'
                ? `Podium — 1. ${roundConfigForm.podiumScores.first} / 2. ${roundConfigForm.podiumScores.second} / 3. ${roundConfigForm.podiumScores.third} / ostatní ${roundConfigForm.podiumScores.rest} b · zlá ${roundConfigForm.wrongScore} · neodpoveď ${roundConfigForm.noAnswerScore}`
                : roundConfigForm.scoringMode === 'safe'
                  ? `Safe — správna +${roundConfigForm.correctScore} · zlá 0 · neodpoveď 0`
                  : `${SCORING_INFO[roundConfigForm.scoringMode].label} — správna +${roundConfigForm.correctScore} · zlá ${roundConfigForm.wrongScore} · neodpoveď ${roundConfigForm.noAnswerScore}`}
              {' · '}čas {roundConfigForm.duration}s{' · '}{roundConfigForm.questionCount} otázok
            </div>

            <button
              type="button"
              onClick={confirmRoundConfig}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {gameState.roundSetupIndex + 1 < gameState.totalRounds
                ? `Potvrdiť a nastaviť kolo ${gameState.roundSetupIndex + 2}`
                : 'Potvrdiť a spustiť kvíz'}
            </button>
          </div>
        </div>
      )}

      {/* ── PRIEBEH HRY ───────────────────────────────────────────────────── */}
      {isGamePhase && (
        <section className="grid gap-6 md:grid-cols-[1fr_2fr]">

          {/* Ľavý panel: stav + ovládanie */}
          <div className="space-y-4 rounded-lg border bg-card p-5 shadow-sm">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Kolo {(gameState.questionToRound[gameState.questionIndex] ?? 0) + 1} z {gameState.totalRounds}
                {' · '}otázka {gameState.questionIndex + 1} z {gameState.totalQuestions}
              </p>
              {currentRoundConfig && (
                <p className="text-sm font-medium text-foreground">
                  {getCategoryName(currentRoundConfig.category)}
                  {' '}
                  <span className="text-xs text-muted-foreground">
                    {SCORING_INFO[currentRoundConfig.scoringMode].emoji} {SCORING_INFO[currentRoundConfig.scoringMode].label}
                    {currentRoundConfig.scoringMode !== 'safe'
                      ? ` · ✓+${currentRoundConfig.correctScore} ✗${currentRoundConfig.wrongScore}`
                      : ` · ✓+${currentRoundConfig.correctScore}`}
                  </span>
                </p>
              )}
            </div>

            {/* Stav hry a tlačidlá */}
            <div className="space-y-2">
              {gameState.phase === 'question' && (
                <>
                  <p className="text-sm text-muted-foreground">Prečítajte otázku hráčom nahlas, potom spustite odpočet.</p>
                  <button
                    className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    onClick={controls.startTimer}
                  >
                    ▶ Spustiť odpočet
                  </button>
                </>
              )}

              {gameState.phase === 'answering' && roundTimeLeft != null && (
                <div className="text-center">
                  <p className="text-3xl font-bold text-warning">{roundTimeLeft}s</p>
                  <p className="text-xs text-muted-foreground">Hráči odpovedajú</p>
                </div>
              )}

              {(gameState.phase === 'host-revealed') && (
                <>
                  <p className="text-sm font-medium text-[hsl(var(--success))]">
                    ✓ Správna odpoveď:{' '}
                    {currentQuestion
                      ? `${String.fromCharCode(65 + currentQuestion.correctAnswer)}. ${currentQuestion.answers[currentQuestion.correctAnswer]}`
                      : '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">Čas vypršal. Odkryte odpoveď pre hráčov keď budete pripravení.</p>
                  <button
                    className="w-full rounded-md bg-[hsl(var(--success))] px-4 py-3 text-sm font-semibold text-white hover:opacity-90"
                    onClick={controls.revealAnswer}
                  >
                    Odhal správnu odpoveď
                  </button>
                </>
              )}

              {gameState.phase === 'answering' && (
                <button
                  className="w-full rounded-md border border-success/30 px-4 py-2 text-sm font-semibold text-[hsl(var(--success))] hover:bg-success/10"
                  onClick={controls.revealAnswer}
                >
                  Odhal teraz (prerušiť čas)
                </button>
              )}

              {gameState.phase === 'reveal' && (
                <button
                  className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  onClick={controls.nextQuestion}
                >
                  {gameState.questionIndex + 1 >= gameState.totalQuestions
                    ? 'Zobraziť výsledky'
                    : 'Ďalšia otázka'}
                </button>
              )}
            </div>

            {/* Hráči */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">Hráči ({gameState.players.length})</h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {gameState.players.map(player => (
                  <li
                    key={player.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <span className="font-medium text-foreground">{player.name}</span>
                    <div className="flex items-center gap-2">
                      {(gameState.phase === 'answering' || gameState.phase === 'host-revealed') && (
                        <span
                          className={`h-2 w-2 rounded-full ${player.answer != null ? 'bg-[hsl(var(--success))]' : 'bg-muted-foreground/30'}`}
                          title={player.answer != null ? 'Odpovedal' : 'Čaká'}
                        />
                      )}
                      {gameState.phase === 'reveal' && (
                        <span className={player.lastAnswerCorrect ? 'text-[hsl(var(--success))]' : 'text-destructive'}>
                          {player.lastAnswerCorrect ? '✓' : '✗'}
                        </span>
                      )}
                      <span className="text-muted-foreground">{player.score} b</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pravý panel: otázka + odpovede */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            {currentQuestion && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold leading-snug text-foreground">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentQuestion.answers.map((answer, index) => (
                    <div
                      key={answer}
                      className={`rounded-xl border-2 px-5 py-4 text-base font-semibold transition ${
                        (gameState.phase === 'reveal' || gameState.phase === 'host-revealed') && index === currentQuestion.correctAnswer
                          ? 'border-success bg-success/10 text-foreground'
                          : 'border bg-muted text-foreground'
                      }`}
                    >
                      <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + index)}.</span>
                      {answer}
                      {(gameState.phase === 'reveal' || gameState.phase === 'host-revealed') && index === currentQuestion.correctAnswer && (
                        <span className="ml-2 text-xs font-bold uppercase tracking-wide text-[hsl(var(--success))]">✓ správne</span>
                      )}
                    </div>
                  ))}
                </div>

                {currentQuestion.explanation && (gameState.phase === 'reveal' || gameState.phase === 'host-revealed') && (
                  <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                    💡 {currentQuestion.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── VÝSLEDKY ──────────────────────────────────────────────────────── */}
      {gameState.phase === 'finished' && (
        <div className="space-y-4 rounded-lg border border-success/20 bg-success/10 p-6">
          <h3 className="text-lg font-semibold text-foreground">Kvíz dokončený! 🎉</h3>
          <ul className="space-y-2">
            {[...gameState.players]
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <li
                  key={player.id}
                  className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm"
                >
                  <span className="w-5 text-center font-bold text-muted-foreground">{index + 1}.</span>
                  <span className="flex-1 font-medium text-foreground">{player.name}</span>
                  <span className="font-semibold text-[hsl(var(--success))]">{player.score} bodov</span>
                </li>
              ))}
          </ul>
          <button
            className="rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
            onClick={controls.resetGame}
          >
            Nová hra
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Helper: broadcast state bez questions array ───────────────────────────────

function buildBroadcast(state: QuizGameState): { type: 'state'; state: QuizGameState } {
  // Hráčom posielame fázu 'host-revealed' ako 'answering' — ešte nevidia správnu odpoveď
  const phaseForPlayers: QuizGameState['phase'] =
    state.phase === 'host-revealed' ? 'answering' : state.phase
  return {
    type: 'state',
    state: {
      ...state,
      phase: phaseForPlayers,
      questions: [], // vymazané — neprekročíme 32KB limit Supabase Realtime
    },
  }
}

// ─── Helper components ─────────────────────────────────────────────────────────

function ScoreInput({
  label,
  value,
  min,
  max,
  onChange,
  hint,
}: {
  label: string
  value: number
  min?: number
  max?: number
  onChange: (v: number) => void
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-foreground">
      {label}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        className="rounded-md border bg-card px-3 py-2 text-sm text-foreground"
      />
      {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
    </label>
  )
}

// ─── Message handler ───────────────────────────────────────────────────────────

function handleIncomingMessage(state: QuizGameState, message: QuizMessage): QuizGameState {
  switch (message.type) {
    case 'join': {
      if (state.lobbyLocked) return state
      if (state.players.some(p => p.id === message.playerId)) return state
      const newPlayer: QuizPlayerState = {
        id: message.playerId,
        name: message.name,
        score: 0,
        answer: null,
        answeredAt: null,
        lastAnswerCorrect: undefined,
      }
      return { ...state, players: [...state.players, newPlayer] }
    }
    case 'answer': {
      if (state.phase !== 'answering') return state
      return {
        ...state,
        players: state.players.map(player =>
          player.id === message.playerId
            ? { ...player, answer: message.answer, answeredAt: message.answeredAt }
            : player,
        ),
      }
    }
    case 'leave':
      return { ...state, players: state.players.filter(p => p.id !== message.playerId) }
    case 'ping':
    case 'state':
    default:
      return state
  }
}
