// PATH: src/app/[lang]/apps/quiz/Client.tsx
'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Player, Round } from '@/lib/herdvote/store'
import { useAuth } from '@/hooks/useAuth'
import { UserCircle } from 'lucide-react'

type Category = { id: string; name: string; count: number }
type Mode = 'classic' | 'podium'
type GameStatus = 'waiting' | 'configuring' | 'running' | 'finished'

function mapPhase(phase: string): GameStatus {
  const p = phase.toLowerCase().trim()
  if (p === 'lobby') return 'waiting'
  if (p === 'setup' || p === 'config' || p === 'round_setup' || p === 'ready' || p === 'locked')
    return 'configuring'
  if (p === 'running' || p === 'playing') return 'running'
  if (p === 'ended' || p === 'final') return 'finished'

  return 'waiting'
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

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')

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

  const hasCreated = useRef(false)

  const authFetch = (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    }
    return fetch(url, { ...options, headers })
  }

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
      setGameStatus('waiting')
    } else {
      alert(j.error || 'Nepodarilo sa vytvoriť hru')
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
      setRounds(prev => [...prev, { id: j.roundId, category: catName }])
    } else {
      alert(j.error || 'Nepodarilo sa pridať kolo')
    }
  }

  const startGame = async () => {
    if (!gameCode) return
    const startResp = await authFetch(`/api/games/${gameCode}/rounds/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index: 0 }),
    })
    const startJson = await startResp.json().catch(() => ({}))
    if (!startResp.ok) {
      alert(startJson.error || 'Nepodarilo sa spustiť hru')
      return
    }
    setGameStatus('running')
  }

  // --- Ovládanie kola ---
  const startRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa spustiť kolo')
  }

  const lockRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/lock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa uzamknúť kolo')
  }

  const showResults = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (j.success && j.leaderboard) setLeaderboard(j.leaderboard)
    else alert(j.error || 'Nepodarilo sa vyhodnotiť')
  }
  const nextQuestion = async (roundId?: string) => {
    if (!gameCode) return
    const r = await authFetch(`/api/games/${gameCode}/rounds/next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa prejsť na ďalšiu otázku')
  }

  // Link pre hráčov – musí obsahovať aj jazykový segment
  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const urlLang = typeof lang === 'string' ? lang : ''
    return `${origin}/${urlLang}/play/${gameCode}`
  }, [gameCode, lang])

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
        <span>{user.email}</span>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold">Informácie o hre</h2>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Kód hry:</span> {gameCode || '—'}
          </div>
          {joinUrl && (
            <div className="break-all">
              <span className="font-medium">Link pre hráčov:</span> {joinUrl}
            </div>
          )}
        </div>
      </div>

      {gameStatus === 'waiting' && (
        <div className="rounded-xl border p-4 space-y-4">
          <h2 className="font-semibold">Lobby</h2>
          <div className="space-y-2">
            {players.length > 0 ? (
              players.map(p => (
                <div key={p.id} className="border rounded p-2">
                  {p.name}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Zatiaľ sa nikto nepripojil</p>
            )}
          </div>
        </div>
      )}

      {gameStatus === 'waiting' && (
        <div className="rounded-xl border p-4 space-y-4">
          <h2 className="font-semibold">Konfigurácia hier</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Celkový počet kôl</label>
              <input
                type="number"
                value={totalRounds || ''}
                onChange={(e) => setTotalRounds(parseInt(e.target.value || '0', 10))}
                className="w-full border rounded px-3 py-2"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Poradie kola</label>
              <input
                type="number"
                value={roundInput}
                onChange={(e) => setRoundInput(parseInt(e.target.value || '1', 10))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {rounds.length < totalRounds || totalRounds === 0 ? (
            <>
              <div>
                <label className="block text-sm mb-1">Kategória</label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  {categories.map(c => (
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
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value || '10', 10))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Čas na otázku</label>
                <input
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value || '30', 10))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm mb-1">Režim bodovania</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="classic">Klasický (správne/nesprávne)</option>
                  <option value="podium">Podium (1., 2., 3. miesto)</option>
                </select>
                {mode === 'classic' ? (
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-sm mb-1">Správne</label>
                      <input
                        type="number"
                        value={correct}
                        onChange={(e) => setCorrect(parseInt(e.target.value || '5', 10))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Nesprávne</label>
                      <input
                        type="number"
                        value={incorrect}
                        onChange={(e) => setIncorrect(parseInt(e.target.value || '-3', 10))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Neodpovedané</label>
                      <input
                        type="number"
                        value={none}
                        onChange={(e) => setNone(parseInt(e.target.value || '0', 10))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                    </div>

                    <button onClick={addRound} className="mt-3 px-4 py-2 rounded bg-blue-600 text-white">
                      Nastaviť kolo
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <h2 className="font-semibold">Všetky kolá nastavené</h2>
              <button
                onClick={startGame}
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

      {rounds.length > 0 && gameStatus === 'running' && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Ovládanie kola</h2>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => startRound()} className="px-3 py-2 rounded bg-green-600 text-white text-sm">
              Štart kola
            </button>
            <button onClick={() => lockRound()} className="px-3 py-2 rounded bg-orange-600 text-white text-sm">
              Uzamknúť
            </button>
            <button onClick={() => showResults()} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">
              Vyhodnotiť
            </button>
            <button onClick={() => nextQuestion()} className="px-3 py-2 rounded bg-purple-600 text-white text-sm">
              Ďalšia otázka
            </button>
          </div>
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
    </div>
  )
}
