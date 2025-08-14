'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Player, Round } from '@/lib/herdvote/store'

type Category = { name: string; count: number }
type Mode = 'classic' | 'podium'

export default function HerdVoteAdminPage() {
  const [gameCode, setGameCode] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')
  const [count, setCount] = useState<number>(10)

  // per‑round settings
  const [timeLimit, setTimeLimit] = useState<number>(30)
  const [mode, setMode] = useState<Mode>('classic')

  // classic
  const [correct, setCorrect] = useState<number>(5)
  const [incorrect, setIncorrect] = useState<number>(-3)
  const [none, setNone] = useState<number>(0)

  // podium
  const [tier1, setTier1] = useState<number>(10)
  const [tier2, setTier2] = useState<number>(5)
  const [tier3, setTier3] = useState<number>(3)
  const [pIncorrect, setPIncorrect] = useState<number>(-3)
  const [pNone, setPNone] = useState<number>(0)

  const [rounds, setRounds] = useState<{ id: string; category: string }[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])

  // 1) vytvor hru
  const createGame = async () => {
    const r = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: {} }),
    })
    const j = await r.json()
    if (j?.gameCode) {
      setGameCode(j.gameCode)
      setRounds([]) // nový kód = čistý zoznam kôl
      setPlayers([])
      setCurrentRound(null)
      setLeaderboard([])
    }
  }

  // 2) načítaj kategórie
  const loadCategories = async () => {
    // For now, use hardcoded categories matching our sample data
    const categories = [
      { name: 'Všeobecné', count: 3 },
      { name: 'Geografia', count: 1 },
      { name: 'Veda', count: 1 }
    ]
    setCategories(categories)
    if (categories.length && !selectedCat) setSelectedCat(categories[0].name)
  }
  useEffect(() => {
    loadCategories()
  }, [])

  // 3) polling lobby
  useEffect(() => {
    if (!gameCode) return
    let interval: any
    const pollPlayers = async () => {
      try {
        const r = await fetch(`/api/games/${gameCode}/players`, { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          setPlayers(j.players || [])
        }
      } catch {}
    }
    pollPlayers()
    interval = setInterval(pollPlayers, 2000)
    return () => clearInterval(interval)
  }, [gameCode])

  // 3) pridaj kolo do existujúcej hry
  const addRound = async () => {
    if (!gameCode || !selectedCat) return
    const scoring =
      mode === 'classic'
        ? { mode, correct, incorrect, none }
        : { mode, tiers: [tier1, tier2, tier3], incorrect: pIncorrect, none: pNone }

    const r = await fetch(`/api/games/${gameCode}/rounds`, {
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

  // Game control functions
  const startRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa spustiť kolo')
  }

  const lockRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/lock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa uzamknúť kolo')
  }

  const showResults = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (j.success && j.leaderboard) {
      setLeaderboard(j.leaderboard)
    } else {
      alert(j.error || 'Nepodarilo sa vyhodnotiť')
    }
  }

  const nextQuestion = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa prejsť na ďalšiu otázku')
  }

  // link pre hráčov -> /play/<KÓD>
  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/play/${gameCode}`
  }, [gameCode])

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Herd Vote – moderátor</h1>

      <div className="rounded-xl border p-4 space-y-3">
        <button onClick={createGame} className="px-4 py-2 rounded bg-purple-600 text-white">
          {gameCode ? 'Vytvoriť novú hru' : 'Vytvoriť hru'}
        </button>
        {gameCode && (
          <div className="space-y-2">
            <div><b>Kód hry:</b> {gameCode}</div>
            <div>
              <b>Link pre hráčov:</b>{' '}
              <a className="text-blue-600 underline" href={joinUrl} target="_blank" rel="noopener noreferrer">
                {joinUrl}
              </a>
            </div>
          </div>
        )}
      </div>

      {gameCode && (
        <>
          <div className="rounded-xl border p-4 space-y-3">
            <h2 className="font-semibold">Lobby ({players.length} hráčov)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="text-sm bg-gray-50 rounded px-2 py-1">
                  {player.name} ({player.score} bodov)
                </div>
              ))}
            </div>
          </div>

          {rounds.length > 0 && (
            <div className="rounded-xl border p-4 space-y-3">
              <h2 className="font-semibold">Ovládanie kola</h2>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => startRound()} className="px-3 py-2 rounded bg-green-600 text-white text-sm">
                  Štart kola
                </button>
                <button onClick={() => lockRound()} className="px-3 py-2 rounded bg-orange-600 text-white text-sm">
                  Uzamknúť odpovede
                </button>
                <button onClick={() => showResults()} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">
                  Vyhodnotiť otázku
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
                {leaderboard.map((player, idx) => (
                  <div key={player.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">#{idx + 1} {player.name}</span>
                    <span className="font-bold">{player.score} bodov</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

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
      </div>

      <p className="text-sm text-gray-500">
        Administračný základ: každé kolo má vlastný čas a bodovanie. Skóre sa sčíta naprieč kolami v rámci rovnakej hry.
      </p>
    </div>
  )
}
