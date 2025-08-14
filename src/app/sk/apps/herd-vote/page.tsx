'use client'

import { useEffect, useMemo, useState } from 'react'

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
    }
  }

  // 2) načítaj kategórie
  const loadCategories = async () => {
    const r = await fetch('/api/games/herd-vote/categories', { cache: 'no-store' })
    const j = await r.json()
    const list: Category[] = Array.isArray(j?.categories) ? j.categories : []
    setCategories(list)
    if (list.length && !selectedCat) setSelectedCat(list[0].name)
  }
  useEffect(() => {
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // link pre hráčov -> /sk/play/<KÓD>
  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/sk/play/${gameCode}`
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
              <b>QR/Link pre hráčov:</b>{' '}
              <a className="text-blue-600 underline" href={joinUrl}>{joinUrl}</a>
            </div>
          </div>
        )}
      </div>

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
