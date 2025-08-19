'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

// zdieľané typy z tvojho store (ponechaj si vlastné, ak sa líšia)
type Player = { id: string; name: string; score: number }
type Mode = 'classic' | 'podium'
type Category = { name: string; count: number }

// lokálny typ “stav hry” – v store by mal byť: 'waiting' | 'configuring' | 'ready' | 'playing'
type GameStatus = 'waiting' | 'configuring' | 'ready' | 'playing'

function mapStatus(status: string): GameStatus {
  const s = status.toLowerCase().trim()
  if (s === 'setup') return 'configuring'
  if (s === 'active') return 'playing'
  if (s === 'finished') return 'ready'
  return 'waiting'
}

// konfigurácia jedného kola v UI
type RoundConfig = {
  category: string
  count: number
  timeLimit: number
  mode: Mode
  // classic
  correct?: number
  incorrect?: number
  none?: number
  // podium
  tier1?: number
  tier2?: number
  tier3?: number
  pIncorrect?: number
  pNone?: number
}

export default function HerdVoteAdminPage() {
  const [gameCode, setGameCode] = useState('')
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting')

  const [players, setPlayers] = useState<Player[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')

  // Lobby → Nastavenie → Wizard
  const [totalRounds, setTotalRounds] = useState<number>(0)
  const [step, setStep] = useState<number>(0) // 0=> ešte nezadané N; 1..N => konfigurujem kolo
  const [currentMode, setCurrentMode] = useState<Mode>('classic')

  // defaulty pre každé kolo (pôjdu do RoundConfig pri ukladaní)
  const [count, setCount] = useState<number>(10)
  const [timeLimit, setTimeLimit] = useState<number>(30)

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

  // prehľad už vytvorených kôl (ID zo servera)
  const [createdRounds, setCreatedRounds] = useState<{ id: string; category: string }[]>([])

  // --- Helpery

  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/play/${gameCode}`
  }, [gameCode])

  const scoringForMode = (mode: Mode) =>
    mode === 'classic'
      ? { mode, correct, incorrect, none }
      : { mode, tiers: [tier1, tier2, tier3], incorrect: pIncorrect, none: pNone }

  const buildRoundConfig = (): RoundConfig => ({
    category: selectedCat,
    count,
    timeLimit,
    mode: currentMode,
    correct,
    incorrect,
    none,
    tier1,
    tier2,
    tier3,
    pIncorrect,
    pNone,
  })

  // --- API

  const createGame = async () => {
    const r = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: {} }),
    })
    const j = await r.json()
    if (!r.ok || !j?.gameCode) {
      return alert(j?.error || 'Nepodarilo sa vytvoriť hru')
    }
    setGameCode(j.gameCode)
    setGameStatus('waiting')
    setPlayers([])
    setCreatedRounds([])
    setTotalRounds(0)
    setStep(0)
  }

  const lockLobby = async () => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/lock-lobby`, { method: 'POST' })
    const j = await r.json()
    if (!r.ok) return alert(j.error || 'Nepodarilo sa zamknúť lobby')
    setGameStatus('configuring')
    // otvor wizard – prvý krok je zadať počet kôl
    setStep(0)
    setTotalRounds(0)
    setCreatedRounds([])
  }

  const addRound = async () => {
    if (!gameCode || !selectedCat) {
      return alert('Chýba kód hry alebo kategória')
    }
    const settings = { timeLimit, scoring: scoringForMode(currentMode) }
    const r = await fetch(`/api/games/${gameCode}/rounds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: selectedCat,
        count,
        settings,
      }),
    })
    const j = await r.json()
    if (!r.ok || !j?.roundId) {
      return alert(j?.error || 'Nepodarilo sa pridať kolo')
    }
    setCreatedRounds((prev) => [...prev, { id: j.roundId, category: selectedCat }])
    // krok → ďalšie kolo alebo ukonči wizard
    if (step < totalRounds) {
      setStep((s) => s + 1)
    } else {
      // posledné kolo uložené → hra pripravená
      setGameStatus('ready')
    }
  }

  const startGame = async () => {
    if (!gameCode) return
    const r = await fetch(`/api/games/${gameCode}/start`, { method: 'POST' })
    const j = await r.json()
    if (!r.ok || !j?.success) {
      return alert(j?.error || 'Nepodarilo sa spustiť hru')
    }
    setGameStatus('playing')
  }

  // --- Načítanie kategórií
  const loadCategories = async () => {
    try {
      const r = await fetch('/api/herd-vote/categories', { cache: 'no-store' })
      const j = await r.json()
      const cats = (j.categories || []) as Category[]
      setCategories(cats)
      if (cats.length && !selectedCat) setSelectedCat(cats[0].name)
    } catch {
      const fallback: Category[] = [
        { name: 'Všeobecné', count: 100 },
        { name: 'Geografia', count: 42 },
        { name: 'Veda', count: 37 },
      ]
      setCategories(fallback)
      if (!selectedCat) setSelectedCat(fallback[0].name)
    }
  }
  useEffect(() => {
    loadCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Polling hráčov + stavu hry
  useEffect(() => {
    if (!gameCode) return
    const t = setInterval(async () => {
      try {
        // hráči
        const rp = await fetch(`/api/games/${gameCode}/players`, { cache: 'no-store' })
        if (rp.ok) {
          const jp = await rp.json()
          setPlayers(jp.players || [])
        }
        // stav hry
          const rg = await fetch(`/api/games/${gameCode}`, { cache: 'no-store' })
          if (rg.ok) {
            const jg = await rg.json()
            if (jg?.status) setGameStatus(mapStatus(String(jg.status)))
          }
      } catch {}
    }, 2000)
    return () => clearInterval(t)
  }, [gameCode])

  // --- UI

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Herd Vote – moderátor</h1>
        <Link href="/sk/apps" className="text-sm text-muted-foreground hover:underline">
          ← Späť na hry
        </Link>
      </div>

      {/* Vytvoriť hru */}
      <div className="rounded-xl border p-4 space-y-3">
        <button onClick={createGame} className="px-4 py-2 rounded bg-purple-600 text-white">
          {gameCode ? 'Vytvoriť novú hru' : 'Vytvoriť hru'}
        </button>

        {/* Link + QR zobraz iba keď je lobby otvorené */}
        {gameCode && gameStatus === 'waiting' && (
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
                  } else { alert('Zdieľanie nie je podporované – použite Kopírovať link.') }
                }}
                className="px-3 py-2 rounded bg-black text-white text-sm"
              >
                Zdieľať
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lobby (vždy viditeľná, ale zamknúť len v waiting) */}
      {gameCode && (
        <div className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Lobby ({players.length} hráčov)</h2>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 border">{gameStatus}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {players.map((p) => (
              <div key={p.id} className="text-sm bg-gray-50 rounded px-2 py-1">
                {p.name} ({p.score} b)
              </div>
            ))}
          </div>

          {gameStatus === 'waiting' && (
            <div className="pt-2">
              <button onClick={lockLobby} className="px-3 py-2 rounded bg-black text-white text-sm">
                Zamknúť lobby a nastaviť hru
              </button>
            </div>
          )}
        </div>
      )}

      {/* Wizard: krok 0 => zadaj N kôl */}
      {gameCode && gameStatus === 'configuring' && step === 0 && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Nastavenie hry</h2>
          <label className="block text-sm mb-1">Počet kôl</label>
          <input
            type="number"
            min={1}
            max={20}
            value={totalRounds || 0}
            onChange={(e) => setTotalRounds(Math.max(1, Math.min(20, parseInt(e.target.value || '1', 10))))}
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex gap-2">
            <button
              disabled={!totalRounds}
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              Nastaviť 1. kolo
            </button>
          </div>
        </div>
      )}

      {/* Wizard: kroky 1..N => konfigurácia daného kola */}
      {gameCode && gameStatus === 'configuring' && step > 0 && step <= totalRounds && (
        <div className="rounded-xl border p-4 space-y-4">
          <h2 className="font-semibold">Kolo {step} / {totalRounds}</h2>

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
                value={currentMode}
                onChange={(e) => setCurrentMode(e.target.value as Mode)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="classic">Klasik (+/-)</option>
                <option value="podium">Pódium (10-5-3)</option>
              </select>
            </div>

            {currentMode === 'classic' ? (
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

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step <= 1}
              className="px-3 py-2 rounded border text-sm disabled:opacity-50"
            >
              Späť
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  // môžeš si uložiť lokálnu konfiguráciu, ak chceš prehľad; teraz rovno POSTneme
                  const _cfg: RoundConfig = buildRoundConfig()
                  // nič ďalšie, len prehľad
                }}
                className="px-3 py-2 rounded border text-sm"
              >
                Uložiť zmeny (lokálne)
              </button>

              <button
                onClick={addRound}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Potvrdiť kolo {step === totalRounds ? '(posledné)' : ''}
              </button>
            </div>
          </div>

          {/* Prehľad vytvorených kôl */}
          {createdRounds.length > 0 && (
            <div className="text-sm text-gray-600">
              Kolá:{' '}
              {createdRounds.map((r, i) => (
                <span key={r.id} className="mr-2">
                  #{i + 1} – {r.category}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Po potvrdení posledného kola → “ready” */}
      {gameCode && gameStatus === 'ready' && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Hra pripravená</h2>
          <p className="text-sm text-muted-foreground">
            Všetky kolá sú nastavené. Môžeš začať hrať.
          </p>
          <div className="flex gap-2">
            <button onClick={startGame} className="px-4 py-2 rounded bg-green-600 text-white">
              Začať hrať
            </button>
            <button onClick={() => setGameStatus('configuring')} className="px-4 py-2 rounded border">
              Upraviť kolá
            </button>
          </div>
        </div>
      )}

      {/* (Voliteľne) Ovládanie počas hry – môžeš si doplniť */}
      {gameCode && (gameStatus === 'playing') && (
        <div className="rounded-xl border p-4 space-y-3">
          <h2 className="font-semibold">Ovládanie hry</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={async () => {
                const r = await fetch(`/api/games/${gameCode}/rounds/start`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
                const j = await r.json()
                if (!j.success) alert(j.error || 'Nepodarilo sa spustiť kolo')
              }}
              className="px-3 py-2 rounded bg-green-600 text-white text-sm"
            >
              Štart kola
            </button>
            <button
              onClick={async () => {
                const r = await fetch(`/api/games/${gameCode}/rounds/lock`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
                const j = await r.json()
                if (!j.success) alert(j.error || 'Nepodarilo sa uzamknúť kolo')
              }}
              className="px-3 py-2 rounded bg-orange-600 text-white text-sm"
            >
              Uzamknúť odpovede
            </button>
            <button
              onClick={async () => {
                const r = await fetch(`/api/games/${gameCode}/rounds/next`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
                const j = await r.json()
                if (!j.success) alert(j.error || 'Nepodarilo sa prejsť na ďalšiu otázku')
              }}
              className="px-3 py-2 rounded bg-purple-600 text-white text-sm"
            >
              Ďalšia otázka
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
