// PATH: src/app/[lang]/apps/herd-vote/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import type { Player, Round } from '@/lib/herdvote/store'
import { useAuth } from '@/hooks/useAuth'
import { UserCircle } from 'lucide-react'

type Category = { name: string; count: number }
type Mode = 'classic' | 'podium'
type GameStatus = 'waiting' | 'configuring' | 'running' | 'finished'

function mapStatus(status: string): GameStatus {
  const s = status.toLowerCase().trim()
  if (s === 'setup') return 'configuring'
  if (s === 'active') return 'running'
  if (s === 'finished') return 'finished'
  return 'waiting'
}

export default function HerdVoteAdminPage() {
  // Lang získame zo URL cez useParams (vyhneme sa typovým „PageProps“ problémom)
  const { lang } = useParams<{ lang: string }>()
  const router = useRouter()
  const { user, loading, session } = useAuth()
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=/${lang}/apps/herd-vote`)

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

  const [rounds, setRounds] = useState<{ id: string; category: string }[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])

  const authFetch = (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    }
    return fetch(url, { ...options, headers })
  }

  // --- Kategórie ---
  useEffect(() => {
    const load = async () => {
      try {
        const r = await authFetch('/api/herd-vote/categories', { cache: 'no-store' })
        if (!r.ok) throw new Error('HTTP ' + r.status)
        const j = await r.json()
        const cats: Category[] = Array.isArray(j.categories) ? j.categories : []
        setCategories(cats)
        if (cats.length && !selectedCat) setSelectedCat(cats[0].name)
      } catch {
        const fallback: Category[] = [
          { name: 'Všeobecné', count: 50 },
          { name: 'Geografia', count: 30 },
          { name: 'Veda', count: 25 },
        ]
        setCategories(fallback)
        if (!selectedCat) setSelectedCat(fallback[0].name)
      }
    }
    load()
  }, []) // raz pri načítaní

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
          if (gj?.status) {
            setGameStatus(mapStatus(String(gj.status)))

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
    const scoring =
      mode === 'classic'
        ? { mode, correct, incorrect, none }
        : { mode, tiers: [tier1, tier2, tier3], incorrect: pIncorrect, none: pNone }

    const r = await authFetch(`/api/games/${gameCode}/rounds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: selectedCat, count, settings: { timeLimit, scoring } }),
    })
    const j = await r.json()
    if (j.roundId) {
      setRounds((prev) => [...prev, { id: j.roundId, category: selectedCat }])
    } else {
      alert(j.error || 'Nepodarilo sa pridať kolo')
    }
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
          href={`/login?next=/${lang}/apps/herd-vote`}
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
        {loading ? '...' : user?.email}
      </div>
      <h1 className="text-2xl font-bold">Herd Vote – moderátor</h1>

      <div className="rounded-xl border p-4 space-y-3">
        <button onClick={createGame} className="px-4 py-2 rounded bg-purple-600 text-white">
          {gameCode ? 'Vytvoriť novú hru' : 'Vytvoriť hru'}
        </button>

        {/* Link + QR len kým je lobby otvorené */}
        {gameCode && gameStatus === 'waiting' && (
          <div className="space-y-2">
            <div>
              <b>Kód hry:</b> {gameCode}
            </div>
            <div>
              <b>Link pre hráčov:</b>{' '}
              <a className="text-blue-600 underline" href={joinUrl} target="_blank" rel="noopener noreferrer">
                {joinUrl}
              </a>
            </div>
            <div className="pt-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                alt="QR pre pripojenie hráčov"
                className="border rounded"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigator.clipboard.writeText(joinUrl)} className="px-3 py-2 rounded border text-sm">
                Kopírovať link
              </button>
              <button
                onClick={async () => {
                  if ((navigator as any).share) {
                    try {
                      await (navigator as any).share({ title: 'Herd Vote', url: joinUrl })
                    } catch {}
                  } else {
                    alert('Zdieľanie nie je podporované – použite Kopírovať link.')
                  }
                }}
                className="px-3 py-2 rounded bg-black text-white text-sm"
              >
                Zdieľať
              </button>
            </div>
          </div>
        )}
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
                    if (!r.ok || !j.status) return alert(j.error || 'Nepodarilo sa zamknúť lobby')
                    setGameStatus(mapStatus(String(j.status)))
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
              <h2 className="font-semibold">Nové kolo</h2>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Kategória</label>
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
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
                Pridať kolo
              </button>

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

              {rounds.length > 0 && (
                <div className="pt-3">
                  <button
                    onClick={async () => {
                      const r = await authFetch(`/api/games/${gameCode}/start`, { method: 'POST' })
                      const j = await r.json()
                      if (!r.ok) return alert(j.error || 'Nepodarilo sa spustiť hru')
                      setGameStatus('running')
                    }}
                    className="px-4 py-2 rounded bg-green-600 text-white"
                  >
                    Začať hrať
                  </button>
                </div>
              )}
            </div>
          )}

          {rounds.length > 0 && (
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
        </>
      )}

      <p className="text-sm text-gray-500">
        Administračný základ: každé kolo má vlastný čas a bodovanie. Skóre sa sčíta naprieč kolami v rámci rovnakej hry.
      </p>
    </div>
  )
}
