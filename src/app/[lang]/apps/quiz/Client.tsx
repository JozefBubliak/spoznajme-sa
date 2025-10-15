// PATH: src/app/[lang]/apps/quiz/Client.tsx
'use client'

import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Player, Round } from '@/lib/herdvote/store'
import { useAuth } from '@/hooks/useAuth'
import { UserCircle } from 'lucide-react'

type Category = { id: string; name: string; count: number }
type Mode = 'classic' | 'podium'
type GameStatus = 'waiting' | 'configuring' | 'running' | 'finished'


function translateRoundStatus(status: string): string {
  const normalized = status.toLowerCase()
  switch (normalized) {
    case 'ready':
      return 'pripravené'
    case 'running':
    case 'active':
      return 'spustené'
    case 'locked':
      return 'uzamknuté'
    case 'results':
      return 'výsledky'
    case 'setup':
    default:
      return 'príprava'
  }
}


function mapPhase(phase: string): GameStatus {
  const p = phase.toLowerCase().trim()
  if (p === 'lobby') return 'waiting'
  if (p === 'setup' || p === 'config' || p === 'round_setup' || p === 'ready' || p === 'locked')
    return 'configuring'
  if (p === 'running' || p === 'playing') return 'running'
  if (p === 'ended' || p === 'final') return 'finished'

  return 'waiting'
}

type RoundDiagnostic = {
  roundId: string
  index: number
  categoryId: string
  configuredCount: number
  localePrefix: string
  availableCount: number | null
  countError: string | null
  rpcIds: string[]
  rpcCount: number
  rpcError: string | null
  fallbackTried: boolean
  fallbackClassicFilter: boolean
  fallbackIds: string[]
  fallbackCount: number
  fallbackError: string | null
  storedQuestionCount: number
  storedQuestionIds: string[]
  runId: string | null
  runNumber: number | null
  status: string
  usageTrackingDisabled: boolean
  usageRecordedCount: number
  usageRecordedIds: string[]
  usageMissingIds: string[]
}

type Props = { lang: string }

export default function QuizAdminClient({ lang }: Props) {
  const router = useRouter()
  const { user, loading, session } = useAuth()
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=/${lang}/apps/quiz`)
  }, [loading, user, router, lang])

  const [gameCode, setGameCode] = useState<string>('')
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting')
  const [runNumber, setRunNumber] = useState<number | null>(null)
  const [runId, setRunId] = useState<string | null>(null)

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')

  const categoryLabelById = useMemo(() => {
    const map = new Map<string, string>()
    for (const cat of categories) {
      map.set(cat.id, cat.name)
    }
    return map
  }, [categories])

  const [count, setCount] = useState<number>(10)
  const [timeLimit, setTimeLimit] = useState<number>(30)
  const [mode, setMode] = useState<Mode>('classic')
  const [correct, setCorrect] = useState<number>(5)
  const [incorrect, setIncorrect] = useState<number>(-3)
  const [none, setNone] = useState<number>(0)
  const [tier1, setTier1] = useState<number>(10)
  const [tier2, setTier2] = useState<number>(5)
  const [tier3, setTier3] = useState<number>(3)
  const [pIncorrect, setPIncorrect] = useState<number>(-3)
  const [pNone, setPNone] = useState<number>(0)

  const [totalRounds, setTotalRounds] = useState<number>(0)
  const [roundInput, setRoundInput] = useState<number>(1)

  const [rounds, setRounds] = useState<{ id: string; category: string }[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [diagnostics, setDiagnostics] = useState<RoundDiagnostic[]>([])
  const [diagLoading, setDiagLoading] = useState(false)
  const [diagError, setDiagError] = useState<string | null>(null)

  const hasCreated = useRef(false)

  const authFetch = useCallback((url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    }
    return fetch(url, { ...options, headers })
  }, [session?.access_token])

  const normalizeDiagnostics = (payload: any): RoundDiagnostic[] => {
    if (!payload || !Array.isArray(payload.rounds)) return []
    return payload.rounds.map((raw: any): RoundDiagnostic => ({
      roundId: String(raw?.roundId ?? ''),
      index: Number.isFinite(Number(raw?.index)) ? Number(raw.index) : 0,
      categoryId: String(raw?.categoryId ?? ''),
      configuredCount: Number.isFinite(Number(raw?.configuredCount))
        ? Number(raw.configuredCount)
        : 0,
      localePrefix: String(raw?.localePrefix ?? ''),
      availableCount:
        typeof raw?.availableCount === 'number' && Number.isFinite(raw.availableCount)
          ? raw.availableCount
          : null,
      countError: raw?.countError ? String(raw.countError) : null,
      rpcIds: Array.isArray(raw?.rpcIds) ? raw.rpcIds.map((id: any) => String(id)) : [],
      rpcCount: Number.isFinite(Number(raw?.rpcCount)) ? Number(raw.rpcCount) : 0,
      rpcError: raw?.rpcError ? String(raw.rpcError) : null,
      fallbackTried: Boolean(raw?.fallbackTried),
      fallbackClassicFilter: Boolean(raw?.fallbackClassicFilter),
      fallbackIds: Array.isArray(raw?.fallbackIds)
        ? raw.fallbackIds.map((id: any) => String(id))
        : [],
      fallbackCount: Number.isFinite(Number(raw?.fallbackCount)) ? Number(raw.fallbackCount) : 0,
      fallbackError: raw?.fallbackError ? String(raw.fallbackError) : null,
      storedQuestionCount: Number.isFinite(Number(raw?.storedQuestionCount))
        ? Number(raw.storedQuestionCount)
        : 0,
      storedQuestionIds: Array.isArray(raw?.storedQuestionIds)
        ? raw.storedQuestionIds.map((id: any) => String(id))
        : [],
      runId: raw?.runId ? String(raw.runId) : null,
      runNumber:
        typeof raw?.runNumber === 'number' && Number.isFinite(raw.runNumber)
          ? Number(raw.runNumber)
          : null,
      status: typeof raw?.status === 'string' ? String(raw.status) : 'setup',
      usageTrackingDisabled: Boolean(raw?.usageTrackingDisabled),
      usageRecordedCount:
        typeof raw?.usageRecordedCount === 'number' && Number.isFinite(raw.usageRecordedCount)
          ? Number(raw.usageRecordedCount)
          : 0,
      usageRecordedIds: Array.isArray(raw?.usageRecordedIds)
        ? raw.usageRecordedIds.map((id: any) => String(id))
        : [],
      usageMissingIds: Array.isArray(raw?.usageMissingIds)
        ? raw.usageMissingIds.map((id: any) => String(id))
        : [],
    }))
  }

  const fetchDiagnostics = useCallback(async (index?: number) => {
    if (!gameCode) return
    setDiagLoading(true)
    setDiagError(null)
    try {
      const url =
        typeof index === 'number'
          ? `/api/games/${gameCode}/rounds/debug?index=${index}`
          : `/api/games/${gameCode}/rounds/debug`
      const resp = await authFetch(url, { cache: 'no-store' })
      const data = await resp.json().catch(() => ({}))
      if (!resp.ok) {
        throw new Error(data?.error || 'Diagnostický prehľad sa nepodarilo načítať')
      }
      setDiagnostics(normalizeDiagnostics(data))
    } catch (err) {
      setDiagnostics([])
      setDiagError(err instanceof Error ? err.message : 'Diagnostika zlyhala')
    } finally {
      setDiagLoading(false)
    }
  }, [authFetch, gameCode])

  const startGame = useCallback(async () => {
    if (!gameCode) return false
    try {
      const startResp = await authFetch(`/api/games/${gameCode}/rounds/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index: 0 }),
      })
      const startJson = await startResp.json().catch(() => ({}))
      if (!startResp.ok || (!startJson?.ok && !startJson?.success)) {
        alert(startJson.error || 'Nepodarilo sa spustiť hru')
        return false
      }
      setGameStatus('running')
      await fetchDiagnostics().catch(() => undefined)
      return true
    } catch (error) {
      alert('Nepodarilo sa spustiť hru')
      return false
    }
  }, [authFetch, fetchDiagnostics, gameCode])

  // --- Kategórie ---
  useEffect(() => {
    if (!session) return
    const load = async () => {
      try {
        const r = await authFetch('/api/herd-vote/categories', { cache: 'no-store' })
        if (!r.ok) return
        const j = await r.json()
        const cats: Category[] = Array.isArray(j.categories) ? j.categories : []
        if (cats.length === 0) throw new Error('No categories')
        setCategories(cats)
        const first = cats[0]
        if (!selectedCat && first) setSelectedCat(first.id)
      } catch {}
    }
    load()
  }, [session])

  // --- Vytvorenie hry ---

  const createGame = async () => {
    const r = await authFetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: {} }),
    })
    const j = await r.json()
    if (j?.gameCode) {
      setGameCode(j.gameCode)
      setRounds([])
      setPlayers([])
      setCurrentRound(null)
      setLeaderboard([])
      setRunNumber(null)
      setRunId(null)
      setGameStatus('waiting')
      setTotalRounds(0)
      setRoundInput(1)
      setDiagnostics([])
      setDiagError(null)
    } else {
      alert(j.error || 'Nepodarilo sa vytvoriť hru')
    }
  }

  const resetQuestionPool = async () => {
    if (!gameCode) return
    const confirmed = window.confirm(
      'Reset otázok vymaže históriu výberu pre aktuálny účet. Pokračovať?'
    )
    if (!confirmed) return
    try {
      const r = await authFetch(`/api/games/${gameCode}/runs/reset`, { method: 'POST' })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j?.ok) {
        alert(j.error || 'Reset sa nepodaril')
        return
      }
      setRunNumber(
        typeof j.runNumber === 'number' && Number.isFinite(j.runNumber)
          ? Number(j.runNumber)
          : null
      )
      setRunId(j?.runId ? String(j.runId) : null)
      await fetchDiagnostics()
    } catch {
      alert('Reset sa nepodaril')
    }
  }

  useEffect(() => {
    if (!session) return
    if (!gameCode && !hasCreated.current) {
      hasCreated.current = true
      createGame()
    }
  }, [session, gameCode])

  // --- Polling lobby + statusu hry ---
  useEffect(() => {
    if (!gameCode) return
    let id: ReturnType<typeof setInterval>
    const poll = async () => {
      try {
        const [pr, gr] = await Promise.all([
          authFetch(`/api/games/${gameCode}/players`, { cache: 'no-store' }),
          authFetch(`/api/games/${gameCode}`, { cache: 'no-store' }).catch(() => null),
        ])
        if (pr?.ok) {
          const pj = await pr.json()
          setPlayers(pj.players || [])
        }
        if (gr && gr.ok) {
          const gj = await gr.json()
          if (gj?.phase) {
            setGameStatus(mapPhase(String(gj.phase)))

          }
          setRunNumber(
            typeof gj?.run_number === 'number' && Number.isFinite(gj.run_number)
              ? Number(gj.run_number)
              : null
          )
          setRunId(gj?.run_id ? String(gj.run_id) : null)
        }
      } catch {}
    }
    poll()
    id = setInterval(poll, 2000)
    return () => clearInterval(id)
  }, [gameCode])

  // --- Pridanie kola ---
  const addRound = async () => {
    if (!gameCode || !selectedCat) return
    if (totalRounds && rounds.length >= totalRounds) return
    const scoring =
      mode === 'classic'
        ? { mode, correct, incorrect, none }
        : { mode, tiers: [tier1, tier2, tier3], incorrect: pIncorrect, none: pNone }

    // uloženie konfigurácie konkrétneho kola (index = poradie)
    const r = await authFetch(`/api/games/${gameCode}/rounds/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        index: rounds.length,
        categoryId: selectedCat,
        questions: count,
        prepSeconds: timeLimit,
        questionSeconds: timeLimit,
        scoringMode: scoring.mode === 'classic' ? 'simple' : 'weighted',
      }),
    })
    const j = await r.json()
    if (j.roundId) {
      const catName = categories.find(c => c.id === selectedCat)?.name || selectedCat
      const newLength = rounds.length + 1
      setRounds(prev => [...prev, { id: j.roundId, category: catName }])
      await fetchDiagnostics(rounds.length)
      if (totalRounds && newLength >= totalRounds && gameStatus === 'configuring') {
        await startGame()
      }
    } else {
      alert(j.error || 'Nepodarilo sa pridať kolo')
    }
  }

  useEffect(() => {
    if (!gameCode) return
    fetchDiagnostics().catch(() => undefined)
  }, [fetchDiagnostics, gameCode, rounds.length])

  // --- Ovládanie kola ---
  const firstStartableRoundIndex = useMemo(() => {
    if (diagnostics.length === 0) return null
    const sorted = [...diagnostics].sort((a, b) => a.index - b.index)
    for (const diag of sorted) {
      const status = String(diag.status || '').toLowerCase()
      if (status === 'ready' || status === 'setup') {
        return diag.index
      }
    }
    const shown = sorted.find((diag) => String(diag.status || '').toLowerCase() === 'shown')
    return typeof shown?.index === 'number' ? shown.index : null
  }, [diagnostics])

  const runningRound = useMemo(
    () => diagnostics.find((diag) => String(diag.status || '').toLowerCase() === 'running') || null,
    [diagnostics],
  )
  const lockedRound = useMemo(
    () => diagnostics.find((diag) => String(diag.status || '').toLowerCase() === 'locked') || null,
    [diagnostics],
  )
  const resultsRound = useMemo(
    () => diagnostics.find((diag) => String(diag.status || '').toLowerCase() === 'results') || null,
    [diagnostics],
  )

  const startRound = async (roundId?: string) => {
    if (!gameCode) return
    let index: number | null = null
    if (roundId) {
      const diag = diagnostics.find((d) => d.roundId === roundId)
      if (typeof diag?.index === 'number') {
        index = diag.index
      } else {
        const fallbackIndex = rounds.findIndex((r) => r.id === roundId)
        if (fallbackIndex >= 0) index = fallbackIndex
      }
    } else if (typeof firstStartableRoundIndex === 'number') {
      index = firstStartableRoundIndex
    }

    if (index === null || index < 0) {
      alert('Žiadne kolo nie je pripravené na spustenie')
      return
    }

    const r = await authFetch(`/api/games/${gameCode}/rounds/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok || (!j?.ok && !j?.success)) {
      alert(j.error || 'Nepodarilo sa spustiť kolo')
      return
    }
    setGameStatus('running')
    await fetchDiagnostics(index).catch(() => undefined)
  }

  const lockRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/lock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json().catch(() => ({}))
    if (!j.success) {
      alert(j.error || 'Nepodarilo sa uzamknúť kolo')
      return
    }
    await fetchDiagnostics().catch(() => undefined)
  }

  const showResults = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (j.success && j.leaderboard) {
      setLeaderboard(j.leaderboard)
      await fetchDiagnostics().catch(() => undefined)
    } else {
      alert(j.error || 'Nepodarilo sa vyhodnotiť')
    }
  }

  const nextQuestion = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) {
      alert(j.error || 'Nepodarilo sa prejsť na ďalšiu otázku')
      return
    }
    await fetchDiagnostics().catch(() => undefined)
  }

  // Link pre hráčov – musí obsahovať aj jazykový segment
  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const urlLang = typeof lang === 'string' ? lang : ''
    return `${origin}/${urlLang}/play/${gameCode}`
  }, [gameCode, lang])

  const shareJoinUrl = async () => {
    if (!joinUrl) return
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Herd Vote', url: joinUrl })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(joinUrl)
        alert('Link skopírovaný do schránky')
      }
    } catch {
      // ignoruj chyby zdieľania
    }
  }

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="mb-4">Na spustenie hry sa prihláste ako moderátor.</p>
        <a
          className="text-blue-600 underline"
          href={`/login?next=/${lang}/apps/quiz`}
        >
          Prihlásiť sa
        </a>
      </div>
    )
  }


  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex justify-end text-sm text-muted-foreground gap-2 items-center">
        <UserCircle className="h-5 w-5" />
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold">Informácie o hre</h2>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Kód hry:</span> {gameCode || '—'}
          </div>
          <div>
            <span className="font-medium">Beh otázok:</span>{' '}
            {runNumber !== null ? `H${runNumber}` : '—'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetQuestionPool}
              disabled={!gameCode}
              className="px-2 py-1 text-sm rounded border disabled:opacity-60"
            >
              Reset otázok
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Reset uvoľní už použité otázky pre aktuálneho moderátora. Otázky sa znova
            zaradia do výberu až po resete.
          </p>
          {joinUrl && (
            <>
              <div className="break-all">
                <span className="font-medium">Link pre hráčov:</span>{' '}
                <a
                  href={joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {joinUrl}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={shareJoinUrl}
                  className="px-2 py-1 text-sm rounded border"
                >
                  Zdieľať
                </button>
              </div>
              <div className="flex justify-center pt-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(joinUrl)}`}
                  alt="QR kód"
                />
              </div>
            </>
          )}
        </div>

      </div>
      <h1 className="text-2xl font-bold">Kvíz – moderátor</h1>

      <div className="rounded-xl border p-4 space-y-3">
        {!gameCode && <div>Vytvárame hru...</div>}
        {gameStatus === 'finished' && (
          <button onClick={createGame} className="px-4 py-2 rounded bg-purple-600 text-white">
            Vytvoriť novú hru
          </button>
        )}

        {/* QR a link pre pripojenie sú zobrazené vyššie v sekcii Informácie o hre */}

      </div>

      {gameCode && (
        <>
          <div className="rounded-xl border p-4 space-y-3">
            <h2 className="font-semibold">Lobby ({players.length} hráčov)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {players.map((p) => (
                <div key={p.id} className="text-sm bg-gray-50 rounded px-2 py-1">
                  {p.name} ({p.score} b)
                </div>
              ))}
            </div>

            {gameStatus === 'waiting' && (
              <div className="pt-2">
                <button
                  onClick={async () => {
                    const r = await authFetch(`/api/games/${gameCode}/lock-lobby`, { method: 'POST' })
                    const j = await r.json()
                    if (!r.ok || !j.phase) return alert(j.error || 'Nepodarilo sa zamknúť lobby')
                    setGameStatus(mapPhase(String(j.phase)))
                  }}
                  className="px-3 py-2 rounded bg-black text-white text-sm"
                >
                  Zamknúť lobby a nastaviť hru
                </button>
              </div>
            )}
          </div>

          {gameStatus === 'configuring' && (
            <div className="rounded-xl border p-4 space-y-3">
              {totalRounds === 0 ? (
                <>
                  <h2 className="font-semibold">Zvoľte si počet kôl</h2>
                  <input
                    type="number"
                    min={1}
                    value={roundInput}
                    onChange={(e) => setRoundInput(parseInt(e.target.value || '1', 10))}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button
                    onClick={async () => {
                      try {
                        const r = await authFetch(`/api/games/${gameCode}/config`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            totalRounds: roundInput,
                            prepSeconds: timeLimit,
                            questionSeconds: timeLimit,
                            scoringMode: mode === 'classic' ? 'simple' : 'weighted',
                          }),
                        })
                        const j = await r.json()
                        if (r.ok && j?.ok) {
                          setTotalRounds(roundInput)
                        } else {
                          alert(j.error || 'Nepodarilo sa uložiť konfiguráciu')
                        }
                      } catch {
                        alert('Nepodarilo sa uložiť konfiguráciu')
                      }
                    }}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                  >
                    Potvrdiť
                  </button>
                </>
              ) : rounds.length < totalRounds ? (
                <>
                  <h2 className="font-semibold">Kolo {rounds.length + 1}/{totalRounds}</h2>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-sm mb-1">Kategória</label>
                      <select
                        value={selectedCat}
                        onChange={(e) => setSelectedCat(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.count})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Počet otázok</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value || '1', 10))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Čas na otázku (s)</label>
                      <input
                        type="number"
                        min={5}
                        max={180}
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(parseInt(e.target.value || '30', 10))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Režim bodovania</label>
                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value as Mode)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="classic">Klasik (+/-)</option>
                        <option value="podium">Pódium (10-5-3)</option>
                      </select>
                    </div>

                    {mode === 'classic' ? (
                      <>
                        <div>
                          <label className="block text-sm mb-1">Správna odpoveď</label>
                          <input
                            type="number"
                            value={correct}
                            onChange={(e) => setCorrect(parseInt(e.target.value || '5', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Zlá odpoveď</label>
                          <input
                            type="number"
                            value={incorrect}
                            onChange={(e) => setIncorrect(parseInt(e.target.value || '-3', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Žiadna odpoveď</label>
                          <input
                            type="number"
                            value={none}
                            onChange={(e) => setNone(parseInt(e.target.value || '0', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm mb-1">1. miesto</label>
                          <input
                            type="number"
                            value={tier1}
                            onChange={(e) => setTier1(parseInt(e.target.value || '10', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">2. miesto</label>
                          <input
                            type="number"
                            value={tier2}
                            onChange={(e) => setTier2(parseInt(e.target.value || '5', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">3. miesto</label>
                          <input
                            type="number"
                            value={tier3}
                            onChange={(e) => setTier3(parseInt(e.target.value || '3', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Zlá odpoveď</label>
                          <input
                            type="number"
                            value={pIncorrect}
                            onChange={(e) => setPIncorrect(parseInt(e.target.value || '-3', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Žiadna odpoveď</label>
                          <input
                            type="number"
                            value={pNone}
                            onChange={(e) => setPNone(parseInt(e.target.value || '0', 10))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <button onClick={addRound} className="mt-3 px-4 py-2 rounded bg-blue-600 text-white">
                    Nastaviť kolo
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <h2 className="font-semibold">Všetky kolá nastavené</h2>
                  <button
                    onClick={() => {
                      void startGame()
                    }}
                    className="px-4 py-2 rounded bg-blue-600 text-white"
                  >
                    Ideme hrať
                  </button>
                </div>
              )}

              {rounds.length > 0 && (
                <div className="text-sm text-gray-600 mt-2">
                  Kolá:{' '}
                  {rounds.map((r, i) => (
                    <span key={r.id} className="mr-2">
                      #{i + 1} – {r.category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">Diagnostika otázok</h2>
              <button
                onClick={() => {
                  fetchDiagnostics().catch(() => undefined)
                }}
                disabled={!gameCode || diagLoading}
                className="px-3 py-2 rounded border text-sm disabled:opacity-60"
              >
                {diagLoading ? 'Načítavam…' : 'Obnoviť prehľad'}
              </button>
            </div>
            {diagError && <p className="text-sm text-red-600">{diagError}</p>}
            {!diagError && diagnostics.length === 0 && !diagLoading && (
              <p className="text-sm text-muted-foreground">
                Prehľad je zatiaľ prázdny. Po nastavení kôl alebo spustení kola sa tu zobrazia detaily o otázkach.
              </p>
            )}
            <div className="space-y-3">
              {diagnostics.map((diag) => {
                const categoryLabel = categoryLabelById.get(diag.categoryId) ?? diag.categoryId
                const statusLabel = translateRoundStatus(diag.status)
                return (
                  <div
                    key={`${diag.roundId}-${diag.index}`}
                    className="rounded border bg-gray-50 p-3 text-sm space-y-2"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <span className="font-semibold">Kolo #{diag.index + 1}</span>{' '}
                        <span className="text-muted-foreground">• {categoryLabel}</span>
                      </div>
                      <div className="text-muted-foreground flex flex-col text-xs text-right">
                        <span>Locale: <code>{diag.localePrefix || '—'}</code></span>
                        <span>Stav: {statusLabel}</span>
                      </div>
                    </div>
                  <div className="grid md:grid-cols-4 gap-2">
                    <div>
                      Požadovaný počet: <strong>{diag.configuredCount}</strong>
                    </div>
                    <div>
                      Dostupné otázky: <strong>{diag.availableCount ?? 'neznáme'}</strong>
                    </div>
                    <div>
                      RPC vrátilo: <strong>{diag.rpcCount}</strong>
                    </div>
                    <div>
                      Beh: <strong>{diag.runNumber ? `H${diag.runNumber}` : '—'}</strong>
                    </div>
                  </div>
                  {diag.fallbackTried && (
                    <div className="grid md:grid-cols-4 gap-2 text-sm">
                      <div>
                        Fallback ID: <strong>{diag.fallbackCount}</strong>
                      </div>
                      <div>
                        Filter classic:{' '}
                        <strong>{diag.fallbackClassicFilter ? 'áno' : 'nie'}</strong>
                      </div>
                      <div className="md:col-span-2">
                        {diag.fallbackError ? (
                          <span className="text-red-600">Chyba fallbacku: {diag.fallbackError}</span>
                        ) : (
                          <span className="text-muted-foreground">Fallback prebehol bez chyby.</span>
                        )}
                      </div>
                    </div>
                  )}
                  {diag.countError && (
                    <div className="text-red-600">Chyba pri načítaní počtu: {diag.countError}</div>
                  )}
                  {diag.rpcError && (
                    <div className="text-red-600">Chyba RPC: {diag.rpcError}</div>
                  )}
                  <div>
                    Uložené otázky v kole: <strong>{diag.storedQuestionCount}</strong>
                  </div>
                  <div>
                    Sledovanie použitých otázok:{' '}
                    <strong className={diag.usageTrackingDisabled ? 'text-red-600' : undefined}>
                      {diag.usageTrackingDisabled ? 'vypnuté' : 'zapnuté'}
                    </strong>
                  </div>
                  {diag.usageTrackingDisabled && (
                    <div className="text-orange-600 text-sm">
                      Fallback režim – otázky sa vyberajú bez zapisovania do databázy.
                    </div>
                  )}
                  <div>
                    Otázky označené v databáze: <strong>{diag.usageRecordedCount}</strong>
                  </div>
                  {diag.usageMissingIds.length > 0 && (
                    <div className="text-orange-600 text-sm">
                      Chýbajúce záznamy v DB pre ID:{' '}
                      <code className="whitespace-pre-wrap break-all">
                        {diag.usageMissingIds.join(', ')}
                      </code>
                    </div>
                  )}
                  {(diag.rpcIds.length > 0 || diag.storedQuestionIds.length > 0 || diag.fallbackIds.length > 0) && (
                    <details className="bg-white rounded border p-2">
                      <summary className="cursor-pointer">Zobraziť ID otázok</summary>
                      <div className="mt-2 space-y-2">
                        <div>
                          <div className="font-medium">RPC ID</div>
                          <code className="block whitespace-pre-wrap break-all">
                            {diag.rpcIds.join(', ')}
                          </code>
                        </div>
                        <div>
                          <div className="font-medium">Uložené ID</div>
                          <code className="block whitespace-pre-wrap break-all">
                            {diag.storedQuestionIds.join(', ')}
                          </code>
                        </div>
                        {diag.fallbackIds.length > 0 && (
                          <div>
                            <div className="font-medium">ID z fallbacku</div>
                            <code className="block whitespace-pre-wrap break-all">
                              {diag.fallbackIds.join(', ')}
                            </code>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">ID v tabuľke použitia</div>
                          <code className="block whitespace-pre-wrap break-all">
                            {diag.usageRecordedIds.join(', ')}
                          </code>
                        </div>
                      </div>
                    </details>
                  )}
                  </div>
                )
              })}
            </div>
          </div>

          {rounds.length > 0 && gameStatus === 'running' && (
            <div className="rounded-xl border p-4 space-y-3">
              <h2 className="font-semibold">Ovládanie kola</h2>
              {typeof firstStartableRoundIndex === 'number' && (
                <p className="text-xs text-muted-foreground">
                  Ďalšie pripravené kolo: #{firstStartableRoundIndex + 1}
                </p>
              )}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    void startRound()
                  }}
                  disabled={typeof firstStartableRoundIndex !== 'number'}
                  className="px-3 py-2 rounded bg-green-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Spustiť ďalšie kolo
                </button>
                <button
                  onClick={() => {
                    void lockRound(runningRound?.roundId)
                  }}
                  disabled={!runningRound}
                  className="px-3 py-2 rounded bg-orange-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Uzamknúť (manuálne)
                </button>
                <button
                  onClick={() => {
                    void showResults(lockedRound?.roundId)
                  }}
                  disabled={!lockedRound}
                  className="px-3 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Vyhodnotiť
                </button>
                <button
                  onClick={() => {
                    void nextQuestion(resultsRound?.roundId)
                  }}
                  disabled={!resultsRound}
                  className="px-3 py-2 rounded bg-purple-600 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Ďalšia otázka
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Odpovede sa po uplynutí času uzamknú automaticky. Manuálne tlačidlá použite iba ak potrebujete zasiahnuť do
                priebehu kola.
              </p>
            </div>
          )}

          {leaderboard.length > 0 && (
            <div className="rounded-xl border p-4 space-y-3">
              <h2 className="font-semibold">Rebríček</h2>
              <div className="space-y-2">
                {leaderboard.map((pl, idx) => (
                  <div key={pl.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">
                      #{idx + 1} {pl.name}
                    </span>
                    <span className="font-bold">{pl.score} bodov</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-sm text-gray-500">
        Administračný základ: každé kolo má vlastný čas a bodovanie. Skóre sa sčíta naprieč kolami v rámci rovnakej hry.
      </p>
    </div>
  )
}
