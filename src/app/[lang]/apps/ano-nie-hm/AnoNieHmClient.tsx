'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ANO_NIE_HM_QUESTIONS, type AnoNieHmQuestion } from '@/data/ano-nie-hm/questions'

type Mode = 'players' | 'teams'
type Phase = 'setup' | 'round' | 'roundResult' | 'final'
type PenaltyType = 'ano' | 'nie' | 'hm'

type Participant = {
  id: string
  name: string
  totalScore: number
  roundScores: number[]
  penalties: Record<PenaltyType, number>
}

type RoundResult = {
  participantId: string
  participantName: string
  roundNumberForParticipant: number
  sessionRoundNumber: number
  durationSec: number
  score: number
  penalties: Record<PenaltyType, number>
}

const ROUND_START_SCORE = 20
const PENALTY_POINTS = 2
const STORAGE_KEY = 'ano-nie-hm-session-v1'

const formatTime = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export default function AnoNieHmClient({ lang }: { lang: string }) {
  const [phase, setPhase] = useState<Phase>('setup')
  const [mode, setMode] = useState<Mode>('players')
  const [durationSec, setDurationSec] = useState(60)
  const [roundsPerParticipant, setRoundsPerParticipant] = useState(1)
  const [nameCount, setNameCount] = useState(2)
  const [names, setNames] = useState(['Hráč 1', 'Hráč 2'])

  const [participants, setParticipants] = useState<Participant[]>([])
  const [turnOrder, setTurnOrder] = useState<string[]>([])
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [roundScore, setRoundScore] = useState(ROUND_START_SCORE)
  const [roundPenalties, setRoundPenalties] = useState<Record<PenaltyType, number>>({ ano: 0, nie: 0, hm: 0 })
  const [penaltyHistory, setPenaltyHistory] = useState<Array<{ type: PenaltyType; delta: number }>>([])
  const [penaltyFeedback, setPenaltyFeedback] = useState<Record<PenaltyType, boolean>>({ ano: false, nie: false, hm: false })
  const [roundResults, setRoundResults] = useState<RoundResult[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<AnoNieHmQuestion | null>(null)
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([])
  const [showRestore, setShowRestore] = useState(false)

  const normalizedNames = useMemo(() => names.map((n) => n.trim()), [names])
  const duplicateNames = useMemo(() => {
    const lowered = normalizedNames.map((n) => n.toLocaleLowerCase('sk'))
    return new Set(lowered).size !== lowered.length
  }, [normalizedNames])

  const isSetupValid =
    nameCount >= 1 &&
    normalizedNames.length === nameCount &&
    normalizedNames.every(Boolean) &&
    !duplicateNames &&
    durationSec >= 30 &&
    durationSec <= 300 &&
    roundsPerParticipant >= 1 &&
    roundsPerParticipant <= 10

  const currentParticipantId = turnOrder[currentTurnIndex]
  const currentParticipant = participants.find((p) => p.id === currentParticipantId)
  const currentRoundForParticipant = useMemo(
    () => roundResults.filter((r) => r.participantId === currentParticipantId).length + 1,
    [roundResults, currentParticipantId],
  )

  const pickRandomQuestion = useCallback((usedIds: string[]) => {
    const usedSet = new Set(usedIds)
    const unused = ANO_NIE_HM_QUESTIONS.filter((q) => !usedSet.has(q.id))
    if (!unused.length) return null
    return unused[Math.floor(Math.random() * unused.length)]
  }, [])

  const advanceQuestion = useCallback(() => {
    setUsedQuestionIds((prev) => {
      const nextQuestion = pickRandomQuestion(prev)
      if (!nextQuestion) {
        setCurrentQuestion(null)
        return prev
      }
      setCurrentQuestion(nextQuestion)
      return [...prev, nextQuestion.id]
    })
  }, [pickRandomQuestion])

  const beginRound = useCallback(() => {
    setRoundScore(ROUND_START_SCORE)
    setRoundPenalties({ ano: 0, nie: 0, hm: 0 })
    setPenaltyHistory([])
    setTimeLeft(durationSec)
    setPhase('round')
    setCurrentQuestion(null)
    advanceQuestion()
  }, [durationSec, advanceQuestion])

  const endRound = useCallback(() => {
    if (!currentParticipant) return

    const result: RoundResult = {
      participantId: currentParticipant.id,
      participantName: currentParticipant.name,
      roundNumberForParticipant: currentRoundForParticipant,
      sessionRoundNumber: currentTurnIndex + 1,
      durationSec,
      score: roundScore,
      penalties: roundPenalties,
    }

    setRoundResults((prev) => [...prev, result])
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id !== currentParticipant.id) return p
        return {
          ...p,
          totalScore: p.totalScore + roundScore,
          roundScores: [...p.roundScores, roundScore],
          penalties: {
            ano: p.penalties.ano + roundPenalties.ano,
            nie: p.penalties.nie + roundPenalties.nie,
            hm: p.penalties.hm + roundPenalties.hm,
          },
        }
      }),
    )

    setPhase('roundResult')
  }, [currentParticipant, currentRoundForParticipant, currentTurnIndex, durationSec, roundPenalties, roundScore])

  useEffect(() => {
    if (phase !== 'round') return
    if (timeLeft <= 0) {
      endRound()
      return
    }

    const id = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearInterval(id)
  }, [phase, timeLeft, endRound])

  useEffect(() => {
    if (phase !== 'setup' || typeof window === 'undefined') return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed?.phase && parsed.phase !== 'setup') setShowRestore(true)
    } catch {
      // noop
    }
  }, [phase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const snapshot = {
      phase,
      mode,
      durationSec,
      roundsPerParticipant,
      nameCount,
      names,
      participants,
      turnOrder,
      currentTurnIndex,
      timeLeft,
      roundScore,
      roundPenalties,
      penaltyHistory,
      roundResults,
      currentQuestion,
      usedQuestionIds,
      savedAt: Date.now(),
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }, [
    phase,
    mode,
    durationSec,
    roundsPerParticipant,
    nameCount,
    names,
    participants,
    turnOrder,
    currentTurnIndex,
    timeLeft,
    roundScore,
    roundPenalties,
    penaltyHistory,
    roundResults,
    currentQuestion,
    usedQuestionIds,
  ])

  const loadSavedSession = () => {
    if (typeof window === 'undefined') return
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw)
    setPhase(parsed.phase ?? 'setup')
    setMode(parsed.mode ?? 'players')
    setDurationSec(parsed.durationSec ?? 60)
    setRoundsPerParticipant(parsed.roundsPerParticipant ?? 1)
    setNameCount(parsed.nameCount ?? 2)
    setNames(parsed.names ?? ['Hráč 1', 'Hráč 2'])
    setParticipants(parsed.participants ?? [])
    setTurnOrder(parsed.turnOrder ?? [])
    setCurrentTurnIndex(parsed.currentTurnIndex ?? 0)
    setTimeLeft(parsed.timeLeft ?? 60)
    setRoundScore(parsed.roundScore ?? ROUND_START_SCORE)
    setRoundPenalties(parsed.roundPenalties ?? { ano: 0, nie: 0, hm: 0 })
    setPenaltyHistory(parsed.penaltyHistory ?? [])
    setRoundResults(parsed.roundResults ?? [])
    setCurrentQuestion(parsed.currentQuestion ?? null)
    setUsedQuestionIds(parsed.usedQuestionIds ?? [])
    setShowRestore(false)
  }

  const startGame = () => {
    if (!isSetupValid) return
    const list: Participant[] = normalizedNames.map((name, index) => ({
      id: `p-${index + 1}`,
      name,
      totalScore: 0,
      roundScores: [],
      penalties: { ano: 0, nie: 0, hm: 0 },
    }))

    const order: string[] = []
    for (let round = 0; round < roundsPerParticipant; round += 1) {
      for (const p of list) order.push(p.id)
    }

    setParticipants(list)
    setTurnOrder(order)
    setCurrentTurnIndex(0)
    setRoundResults([])
    setUsedQuestionIds([])
    beginRound()
  }

  const applyPenalty = (type: PenaltyType) => {
    setPenaltyFeedback((prev) => ({ ...prev, [type]: true }))
    window.setTimeout(() => {
      setPenaltyFeedback((prev) => ({ ...prev, [type]: false }))
    }, 1000)

    setRoundScore((prev) => {
      const delta = Math.min(PENALTY_POINTS, prev)
      setPenaltyHistory((history) => [...history, { type, delta }])
      setRoundPenalties((penalties) => ({ ...penalties, [type]: penalties[type] + 1 }))
      return Math.max(0, prev - PENALTY_POINTS)
    })
  }

  const undoPenalty = () => {
    setPenaltyHistory((history) => {
      const last = history[history.length - 1]
      if (!last) return history
      setRoundScore((prev) => Math.min(ROUND_START_SCORE, prev + last.delta))
      setRoundPenalties((penalties) => ({ ...penalties, [last.type]: Math.max(0, penalties[last.type] - 1) }))
      return history.slice(0, -1)
    })
  }

  const continueAfterRound = () => {
    const nextIndex = currentTurnIndex + 1
    if (nextIndex >= turnOrder.length) {
      setPhase('final')
      return
    }

    setCurrentTurnIndex(nextIndex)
    beginRound()
  }

  const playAgainSameSetup = () => {
    const list: Participant[] = normalizedNames.map((name, index) => ({
      id: `p-${index + 1}`,
      name,
      totalScore: 0,
      roundScores: [],
      penalties: { ano: 0, nie: 0, hm: 0 },
    }))

    const order: string[] = []
    for (let round = 0; round < roundsPerParticipant; round += 1) {
      for (const p of list) order.push(p.id)
    }

    setParticipants(list)
    setTurnOrder(order)
    setCurrentTurnIndex(0)
    setRoundResults([])
    setUsedQuestionIds([])
    beginRound()
  }

  const resetToSetup = () => {
    setPhase('setup')
    setParticipants([])
    setTurnOrder([])
    setRoundResults([])
    setCurrentQuestion(null)
    if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
  }

  const leaderboard = [...participants].sort((a, b) => b.totalScore - a.totalScore)
  const topScore = leaderboard[0]?.totalScore ?? 0

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">Áno! Nie! Hm!</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Odpovedaj bez zakázaných slov a vydrž pod tlakom otázok až do konca kola.
          </p>
        </header>

        {phase === 'setup' && (
          <Card className="p-6 space-y-6">
            {showRestore && (
              <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm flex flex-wrap gap-3 items-center justify-between">
                <span>Našli sme rozbehnutú hru. Chceš pokračovať?</span>
                <Button onClick={loadSavedSession}>Obnoviť hru</Button>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Režim hry</label>
                <div className="flex gap-2">
                  <Button variant={mode === 'players' ? 'default' : 'outline'} onClick={() => setMode('players')}>
                    Hráči
                  </Button>
                  <Button variant={mode === 'teams' ? 'default' : 'outline'} onClick={() => setMode('teams')}>
                    Tímy
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Trvanie kola</label>
                <div className="flex flex-wrap gap-2">
                  {[60, 120].map((preset) => (
                    <Button
                      key={preset}
                      variant={durationSec === preset ? 'default' : 'outline'}
                      onClick={() => setDurationSec(preset)}
                    >
                      {preset}s
                    </Button>
                  ))}
                  <Input
                    type="number"
                    min={30}
                    max={300}
                    value={durationSec}
                    onChange={(e) => setDurationSec(Number(e.target.value || 60))}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">{mode === 'players' ? 'Počet kôl na hráča' : 'Počet kôl na tím'}</label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={roundsPerParticipant}
                  onChange={(e) => setRoundsPerParticipant(Number(e.target.value || 1))}
                />
              </div>

              <div className="space-y-2">
                <label className="font-medium">{mode === 'players' ? 'Počet hráčov' : 'Počet tímov'}</label>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={nameCount}
                  onChange={(e) => {
                    const nextCount = Math.min(12, Math.max(1, Number(e.target.value || 1)))
                    setNameCount(nextCount)
                    setNames((prev) => {
                      const next = Array.from({ length: nextCount }, (_, i) => prev[i] ?? `${mode === 'players' ? 'Hráč' : 'Tím'} ${i + 1}`)
                      return next
                    })
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium">{mode === 'players' ? 'Mená hráčov' : 'Názvy tímov'}</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {Array.from({ length: nameCount }).map((_, i) => (
                  <Input
                    key={i}
                    value={names[i] ?? ''}
                    onChange={(e) =>
                      setNames((prev) => {
                        const next = [...prev]
                        next[i] = e.target.value
                        return next
                      })
                    }
                    placeholder={mode === 'players' ? `Hráč ${i + 1}` : `Tím ${i + 1}`}
                  />
                ))}
              </div>
              {duplicateNames && <p className="text-sm text-destructive">Mená sa nesmú opakovať.</p>}
            </div>

            <div className="rounded-lg border p-4 bg-muted/40 space-y-1 text-sm">
              <h3 className="font-semibold">Bodovanie</h3>
              <p>Začiatok kola: 20 bodov</p>
              <p>Trest: -2 body za „áno“, „nie“ alebo „hm“</p>
              <p>Minimum: 0 bodov</p>
            </div>

            <Button size="lg" className="w-full" disabled={!isSetupValid} onClick={startGame}>
              Začať hru
            </Button>
          </Card>
        )}

        {phase === 'round' && currentParticipant && (
          <Card className="p-6 space-y-6">
            <div className="grid md:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Na rade ({mode === 'players' ? 'hráč' : 'tím'})</p>
                <p className="font-bold text-lg">{currentParticipant.name}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Kolo</p>
                <p className="font-bold text-lg">{currentTurnIndex + 1} / {turnOrder.length}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Zostáva čas</p>
                <p className="font-bold text-2xl text-primary">{formatTime(timeLeft)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Body / Celkové body</p>
                <p className="font-bold text-2xl">{roundScore} / {currentParticipant.totalScore}</p>
              </div>
            </div>

            <div className="rounded-xl border p-5 bg-card text-center min-h-36 flex items-center justify-center">
              {currentQuestion ? (
                <p className="text-xl font-semibold leading-snug">{currentQuestion.text}</p>
              ) : (
                <p className="text-base text-muted-foreground">
                  Otázky sú vyčerpané. Môžeš dokončiť kolo alebo resetovať hru, aby sa otázky premiešali.
                </p>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Použité otázky: {usedQuestionIds.length} / {ANO_NIE_HM_QUESTIONS.length}
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button size="lg" onClick={advanceQuestion}>Ďalšia otázka</Button>
              <Button size="lg" variant="secondary" onClick={advanceQuestion}>Preskočiť otázku</Button>
            </div>

            <div className="space-y-3">
              <p className="font-semibold">Trestné body</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Button
                  size="lg"
                  variant="destructive"
                  className={penaltyFeedback.ano ? 'brightness-125 ring-2 ring-destructive/40' : ''}
                  onClick={() => applyPenalty('ano')}
                >
                  Áno (-2)
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className={penaltyFeedback.nie ? 'brightness-125 ring-2 ring-destructive/40' : ''}
                  onClick={() => applyPenalty('nie')}
                >
                  Nie (-2)
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className={penaltyFeedback.hm ? 'brightness-125 ring-2 ring-destructive/40' : ''}
                  onClick={() => applyPenalty('hm')}
                >
                  Hm (-2)
                </Button>
              </div>
              <Button size="lg" variant="outline" className="w-full" onClick={undoPenalty} disabled={!penaltyHistory.length}>
                Späť posledný zásah
              </Button>
            </div>

            <Button size="lg" variant="outline" className="w-full" onClick={endRound}>
              Ukončiť kolo
            </Button>
          </Card>
        )}

        {phase === 'roundResult' && roundResults.length > 0 && (
          <Card className="p-6 space-y-5">
            {(() => {
              const last = roundResults[roundResults.length - 1]
              const person = participants.find((p) => p.id === last.participantId)
              const totalPenalty = last.penalties.ano + last.penalties.nie + last.penalties.hm
              return (
                <>
                  <h2 className="text-2xl font-bold">Výsledok kola</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-lg border p-4 space-y-1">
                      <p><strong>{mode === 'players' ? 'Hráč' : 'Tím'}:</strong> {last.participantName}</p>
                      <p><strong>Kolo hráča/tímu:</strong> {last.roundNumberForParticipant}</p>
                      <p><strong>Trvanie:</strong> {last.durationSec} s</p>
                      <p><strong>Získané body:</strong> {last.score}</p>
                      <p><strong>Celkové body:</strong> {person?.totalScore ?? last.score}</p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-1">
                      <p><strong>Tresty áno:</strong> {last.penalties.ano}</p>
                      <p><strong>Tresty nie:</strong> {last.penalties.nie}</p>
                      <p><strong>Tresty hm:</strong> {last.penalties.hm}</p>
                      <p><strong>Spolu tresty:</strong> {totalPenalty}</p>
                    </div>
                  </div>
                </>
              )
            })()}

            <Button size="lg" className="w-full" onClick={continueAfterRound}>Pokračovať</Button>
          </Card>
        )}

        {phase === 'final' && (
          <Card className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-center">Celkové výsledky</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Poradie</h3>
              {leaderboard.map((p, index) => {
                const isWinner = p.totalScore === topScore && topScore > 0
                return (
                  <div key={p.id} className={`rounded-lg border p-4 ${isWinner ? 'border-primary bg-primary/10' : ''}`}>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">#{index + 1} {p.name} {isWinner ? '🏆' : ''}</p>
                      <p className="font-bold text-lg">{p.totalScore} b</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Kolá: {p.roundScores.join(', ')} • Tresty: {p.penalties.ano + p.penalties.nie + p.penalties.hm}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button size="lg" onClick={playAgainSameSetup}>Zahrať znova</Button>
              <Button size="lg" variant="outline" onClick={resetToSetup}>Nová hra</Button>
            </div>
          </Card>
        )}

        <div className="text-center">
          <Button asChild variant="link">
            <Link href={`/${lang}/apps`}>Späť na aplikácie</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
