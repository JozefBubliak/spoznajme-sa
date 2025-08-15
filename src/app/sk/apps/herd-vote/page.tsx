// PATH: src/app/sk/apps/herd-vote/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Player, Round } from '@/lib/herdvote/store'

type Category = { name: string; count: number }
type Mode = 'classic' | 'podium'

export default function HerdVoteAdminPage() {
  const [gameCode, setGameCode] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState('')
  const [count, setCount] = useState(10)

  // per‑round settings
  const [timeLimit, setTimeLimit] = useState(30)
  const [mode, setMode] = useState<Mode>('classic')

  // classic
  const [correct, setCorrect] = useState(5)
  const [incorrect, setIncorrect] = useState(-3)
  const [none, setNone] = useState(0)

  // podium
  const [tier1, setTier1] = useState(10)
  const [tier2, setTier2] = useState(5)
  const [tier3, setTier3] = useState(3)
  const [pIncorrect, setPIncorrect] = useState(-3)
  const [pNone, setPNone] = useState(0)

  const [rounds, setRounds] = useState<{ id: string; category: string }[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [currentRound, setCurrentRound] = useState<Round | null>(null)
  const [leaderboard, setLeaderboard] = useState<Player[]>([])
  const [lobbyLocked, setLobbyLocked] = useState(false)

  // Vytvor hru
  const createGame = async () => {
    const r = await fetch('/api/games', {
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
      setLobbyLocked(false)
    } else {
      alert(j.error || 'Nepodarilo sa vytvoriť hru')
    }
  }

  // Načítaj kategórie (API + fallback)
  const loadCategories = async () => {
    try {
      const r = await fetch('/api/games/herd-vote/categories', { cache: 'no-store' })
      const j = await r.json()
      const cats: Category[] = Array.isArray(j.categories) ? j.categories : []
      setCategories(cats)
      if (cats.length && !selectedCat) setSelectedCat(cats[0].name)
    } catch {
      const cats: Category[] = [
        { name: 'Všeobecné', count: 100 },
        { name: 'Geografia', count: 42 },
        { name: 'Veda', count: 37 },
      ]
      setCategories(cats)
      if (!selectedCat) setSelectedCat(cats[0].name)
    }
  }
  useEffect(() => { loadCategories() }, []) // pri načítaní

  // Polling lobby (kým nie je zamknutá)
  useEffect(() => {
    if (!gameCode || lobbyLocked) return
    const t = setInterval(async () => {
      try {
        const r = await fetch(`/api/games/${gameCode}/players`, { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          setPlayers(j.players || [])
        }
      } catch {}
    }, 2000)
    return () => clearInterval(t)
  }, [gameCode, lobbyLocked])

  // Pridaj kolo
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
      setRounds(prev => [...prev, { id: j.roundId, category: selectedCat }])
    } else {
      alert(j.error || 'Nepodarilo sa pridať kolo')
    }
  }

  // Ovládanie kola
  const startRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/start`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa spustiť kolo')
  }

  const lockRound = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/lock`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa uzamknúť kolo')
  }

  const showResults = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/results`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (j.success && j.leaderboard) setLeaderboard(j.leaderboard)
    else alert(j.error || 'Nepodarilo sa vyhodnotiť')
  }

  const nextQuestion = async (roundId?: string) => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/rounds/next`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ roundId }),
    })
    const j = await r.json()
    if (!j.success) alert(j.error || 'Nepodarilo sa prejsť na ďalšiu otázku')
  }

  // Zamknúť lobby (potom nastavujem kolá)
  const lockLobby = async () => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/lock-lobby`, { method: 'POST' })
    const j = await r.json()
    if (!r.ok) return alert(j.error || 'Nepodarilo sa zamknúť lobby')
    setLobbyLocked(true)
  }

  // Link pre hráčov + QR
  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/play/${gameCode}`
  }, [gameCode])

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Herd Vote – kvíz (moderátor)</h1>

      {/* Vytvorenie hry + link + QR */}
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

            <div className="pt-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                alt="QR pre pripojenie hráčov"
                className="border rounded"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(joinUrl)}
                className="px-3 py-2 rounded border text-sm"
              >
                Kopírovať link
              </button>
              <button
                onClick={async () => {
                  if ((navigator as any).share) {
                    try { await (navigator as any).share({ title: 'Herd Vote – kvíz', url: joinUrl }) } catch {}
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

      {/* LOBBY + Zamknúť lobby */}
      {gameCode && !lobbyLocked && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Lobby ({players.length} hráčov)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {players.map((p) => (
              <div key={p.id} className="text-sm bg-gray-50 rounded px-2 py-1">
                {p.name} ({p.score} b)
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button onClick={lockLobby} className="px-3 py-2 rounded bg-black text-white text-sm">
              Zamknúť lobby a nastaviť hru
            </button>
          </div>
        </div>
      )}

      {/* NASTAVENIE KÔL – až po zamknutí lobby */}
      {gameCode && lobbyLocked && (
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
                type="number" min={1} max={100}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value || '1', 10))}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Čas na otázku (s)</label>
              <input
                type="number" min={5} max={180}
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
      )}

      {/* Ovládanie kola + rebríček */}
      {gameCode && rounds.length > 0 && (
        <>
          <div className="rounded-xl border p-4 space-y-3">
            <h2 className="font-semibold">Ovládanie kola</h2>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => startRound()} className="px-3 py-2 rounded bg-green-600 text-white text-sm">Štart kola</button>
              <button onClick={() => lockRound()} className="px-3 py-2 rounded bg-orange-600 text-white text-sm">Uzamknúť odpovede</button>
              <button onClick={() => showResults()} className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Vyhodnotiť otázku</button>
              <button onClick={() => nextQuestion()} className="px-3 py-2 rounded bg-purple-600 text-white text-sm">Ďalšia otázka</button>
            </div>
          </div>

          {leaderboard.length > 0 && (
            <div className="rounded-xl border p-4 space-y-3">
              <h2 className="font-semibold">Rebríček</h2>
              <div className="space-y-2">
                {leaderboard.map((pl, idx) => (
                  <div key={pl.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">#{idx + 1} {pl.name}</span>
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
