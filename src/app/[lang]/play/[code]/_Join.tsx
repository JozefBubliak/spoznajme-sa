'use client'
// Complete game experience – moderator control panel + player game view.
// Both roles land on the same URL; the server detects ownership via session.

import { useState, useEffect, useCallback, useRef } from 'react'
import { RealtimeClient } from '@/lib/realtime/client'

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'lobby' | 'config' | 'round_setup' | 'playing' | 'final'
type RoundStatus = 'ready' | 'setup' | 'shown' | 'running' | 'locked' | 'results' | 'finished'

interface Player { id: string; name: string; score: number }
interface RoundInfo {
  id: string; idx: number; status: RoundStatus
  q_index: number; count: number
  timer_deadline: string | null
  question_seconds: number; scoring_mode: string
}
interface QuestionInfo {
  id: string; text: string
  a: string; b: string; c: string; d: string
  correct: string | null
  qIndex: number; total: number
}
interface GameState {
  code: string; phase: Phase
  lobby_locked: boolean; total_rounds: number; active_round_index: number
  isOwner: boolean; playerCount: number
  players: Player[]; myPlayer: Player | null
  round?: RoundInfo; question?: QuestionInfo
  leaderboard?: Player[]; answerStats?: Record<string, number>
  answeredCount?: number; myAnswer?: string | null
  rounds?: RoundInfo[]; configuredRounds?: RoundInfo[]
}
interface Category { id: string; name: string; count: number }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ANSWER_COLORS: Record<string, string> = {
  A: 'from-violet-500 to-violet-700 border-violet-400',
  B: 'from-blue-500 to-blue-700 border-blue-400',
  C: 'from-amber-500 to-amber-700 border-amber-400',
  D: 'from-emerald-500 to-emerald-700 border-emerald-400',
}
const ANSWER_LABELS = ['A', 'B', 'C', 'D']

async function api(path: string, method = 'GET', body?: unknown) {
  const r = await fetch(path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  return r.json().catch(() => ({}))
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function TimerRing({ deadline, seconds }: { deadline: string | null; seconds: number }) {
  const [remaining, setRemaining] = useState(seconds)
  useEffect(() => {
    if (!deadline) { setRemaining(seconds); return }
    const tick = () => {
      const left = Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / 1000))
      setRemaining(left)
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [deadline, seconds])

  const pct = seconds > 0 ? remaining / seconds : 0
  const r = 44
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const urgent = remaining <= 5
  const color = urgent ? '#ef4444' : remaining <= 10 ? '#f59e0b' : '#22c55e'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="110" height="110" className="-rotate-90">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#374151" strokeWidth="8" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.25s linear, stroke 0.3s' }}
        />
      </svg>
      <span className={`-mt-[78px] text-3xl font-black tabular-nums ${urgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>
        {remaining}
      </span>
      <span className="mt-[36px] text-xs text-gray-400">sekúnd</span>
    </div>
  )
}

function AnswerBtn({
  letter, text, selected, correct, locked, onClick
}: { letter: string; text: string; selected: boolean; correct: string | null; locked: boolean; onClick?: () => void }) {
  const isCorrect = correct === letter
  const isWrong = locked && selected && !isCorrect
  const dim = locked && !isCorrect && !selected

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`
        relative w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left font-semibold
        transition-all duration-300 select-none
        ${selected && !locked ? 'scale-105 ring-4 ring-white/30' : ''}
        ${isCorrect ? 'border-green-400 bg-green-500/20 text-green-200' : ''}
        ${isWrong ? 'border-red-400 bg-red-500/20 text-red-300 line-through' : ''}
        ${dim ? 'opacity-30' : ''}
        ${!locked && !selected ? `bg-gradient-to-r ${ANSWER_COLORS[letter]} text-white hover:scale-105 hover:brightness-110 active:scale-100 cursor-pointer` : ''}
        ${selected && !locked ? `bg-gradient-to-r ${ANSWER_COLORS[letter]} text-white` : ''}
      `}
    >
      <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center font-black text-lg shrink-0">
        {letter}
      </span>
      <span className="leading-tight">{text}</span>
      {isCorrect && <span className="ml-auto text-xl">✓</span>}
      {isWrong && <span className="ml-auto text-xl">✗</span>}
    </button>
  )
}

function Leaderboard({ players, highlight }: { players: Player[]; highlight?: string }) {
  return (
    <div className="space-y-2">
      {players.map((p, i) => (
        <div key={p.id}
          className={`flex items-center gap-3 p-3 rounded-xl border transition-all
            ${p.id === highlight ? 'border-violet-400 bg-violet-500/20' : 'border-gray-700 bg-gray-800/60'}
          `}
        >
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm
            ${i === 0 ? 'bg-yellow-400 text-yellow-900' : i === 1 ? 'bg-gray-300 text-gray-900' : i === 2 ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
            {i + 1}
          </span>
          <span className="flex-1 font-semibold text-white truncate">{p.name}</span>
          <span className="font-black text-violet-300 tabular-nums">{p.score} b</span>
        </div>
      ))}
    </div>
  )
}

function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map(p => (
        <span key={p.id} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-200">
          {p.name}
        </span>
      ))}
    </div>
  )
}

// ─── Join Form ────────────────────────────────────────────────────────────────

function JoinForm({ code, gamePhase, lobbyLocked, onJoined }: {
  code: string; gamePhase: Phase; lobbyLocked: boolean; onJoined: (id: string, name: string) => void
}) {
  const [name, setName] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const join = async () => {
    const n = name.trim()
    if (!n) { setErr('Zadaj svoje meno alebo názov tímu.'); return }
    setBusy(true); setErr('')
    const res = await api(`/api/games/${code}/players`, 'POST', { name: n })
    setBusy(false)
    if (res.playerId) {
      onJoined(res.playerId, res.name ?? n)
    } else {
      setErr(res.error ?? 'Nepodarilo sa pripojiť.')
    }
  }

  if (lobbyLocked) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-6xl">🔒</div>
          <h2 className="text-2xl font-bold text-white">Prihlasovanie uzavreté</h2>
          <p className="text-gray-400">Moderátor uzamkol lobby. Hra prebieha.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <div className="text-5xl mb-3">🎮</div>
          <h1 className="text-3xl font-black text-white">Pripojiť sa</h1>
          <p className="text-gray-400 mt-1">Hra <span className="font-mono font-bold text-violet-400">{code}</span></p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && join()}
            placeholder="Tvoje meno / tím"
            maxLength={30}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 text-lg"
          />
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            onClick={join}
            disabled={busy || !name.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 text-white font-bold text-lg hover:brightness-110 disabled:opacity-50 transition-all active:scale-95"
          >
            {busy ? 'Pripájam…' : 'Pripojiť sa →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Player Lobby ─────────────────────────────────────────────────────────────

function PlayerLobby({ gs, myName }: { gs: GameState; myName: string }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <div className="text-5xl mb-3">⏳</div>
        <h2 className="text-2xl font-bold text-white">Čakáme na moderátora</h2>
        <p className="text-gray-400 mt-1">Hra začne čoskoro…</p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 w-full max-w-sm text-center">
        <p className="text-gray-400 text-sm mb-1">Prihlásený ako</p>
        <p className="text-2xl font-black text-violet-300">{myName}</p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 w-full max-w-sm">
        <p className="text-sm text-gray-400 mb-3 font-semibold">Hráči ({gs.playerCount})</p>
        <PlayerList players={gs.players} />
      </div>
    </div>
  )
}

// ─── Player Game (question + answer phase) ────────────────────────────────────

function PlayerGame({ gs, code, playerId }: { gs: GameState; code: string; playerId: string }) {
  const round = gs.round
  const q = gs.question
  const [myAnswer, setMyAnswer] = useState<string | null>(gs.myAnswer ?? null)
  const [sending, setSending] = useState(false)

  // Sync myAnswer from server state
  useEffect(() => {
    if (gs.myAnswer !== undefined) setMyAnswer(gs.myAnswer)
  }, [gs.myAnswer])

  const submitAnswer = async (letter: string) => {
    if (!round || myAnswer || sending || round.status !== 'running') return
    setSending(true)
    setMyAnswer(letter)
    await api(`/api/games/${code}/answers`, 'POST', {
      playerId, roundId: round.id, qIndex: round.q_index, answer: letter,
    })
    setSending(false)
  }

  if (!round || !q) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-pulse">⏳</div>
          <p className="text-gray-400">Čakáme na ďalšiu otázku…</p>
          {gs.myPlayer && (
            <p className="text-gray-600 text-sm">Skóre: <span className="text-violet-300 font-bold">{gs.myPlayer.score} b</span></p>
          )}
        </div>
      </div>
    )
  }

  const locked = ['locked', 'results', 'finished'].includes(round.status)
  const showTimer = round.status === 'running' && round.timer_deadline

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Kolo <span className="text-white font-bold">{(round.idx ?? 0) + 1}</span>
          <span className="mx-2 text-gray-700">·</span>
          Otázka <span className="text-white font-bold">{q.qIndex + 1}/{q.total}</span>
        </div>
        {gs.myPlayer && (
          <div className="text-sm font-bold text-violet-300">{gs.myPlayer.score} b</div>
        )}
      </div>

      {/* Timer */}
      {showTimer && (
        <div className="flex justify-center pt-6 pb-2">
          <TimerRing deadline={round.timer_deadline} seconds={round.question_seconds} />
        </div>
      )}

      {/* Question */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-6 max-w-xl mx-auto w-full">
        <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 ${!showTimer ? 'mt-6' : ''}`}>
          <p className="text-white text-xl font-bold leading-snug text-center">{q.text}</p>
        </div>

        {/* Waiting for timer */}
        {round.status === 'shown' && (
          <div className="text-center text-gray-500 text-sm animate-pulse">Čakáme na spustenie timera…</div>
        )}

        {/* Answers */}
        {round.status !== 'shown' && (
          <div className="grid grid-cols-1 gap-3">
            {ANSWER_LABELS.map((letter, i) => {
              const text = [q.a, q.b, q.c, q.d][i]
              if (!text) return null
              return (
                <AnswerBtn
                  key={letter}
                  letter={letter}
                  text={text}
                  selected={myAnswer === letter}
                  correct={locked ? (q.correct ?? null) : null}
                  locked={locked || !!myAnswer}
                  onClick={() => submitAnswer(letter)}
                />
              )
            })}
          </div>
        )}

        {/* Result feedback */}
        {locked && q.correct && (
          <div className={`rounded-2xl border p-5 text-center ${myAnswer === q.correct ? 'bg-green-900/30 border-green-500' : myAnswer ? 'bg-red-900/30 border-red-500' : 'bg-gray-800 border-gray-700'}`}>
            {!myAnswer && <p className="text-gray-400 font-semibold">Neodpovedal si</p>}
            {myAnswer === q.correct && <p className="text-green-400 font-black text-xl">✓ Správne!</p>}
            {myAnswer && myAnswer !== q.correct && <p className="text-red-400 font-black text-xl">✗ Nesprávne</p>}
            <p className="text-gray-300 mt-1 text-sm">
              Správna odpoveď: <span className="font-bold text-white">{q.correct} – {[q.a, q.b, q.c, q.d][['A','B','C','D'].indexOf(q.correct)]}</span>
            </p>
          </div>
        )}

        {/* Results leaderboard */}
        {round.status === 'results' && gs.leaderboard && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-gray-400 text-sm font-semibold mb-3">Priebežné poradie</h3>
            <Leaderboard players={gs.leaderboard} highlight={playerId} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Player Final ─────────────────────────────────────────────────────────────

function PlayerFinal({ gs, playerId }: { gs: GameState; playerId: string }) {
  const lb = gs.leaderboard ?? []
  const myPos = lb.findIndex(p => p.id === playerId)

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <div className="text-6xl mb-3">🏆</div>
        <h1 className="text-3xl font-black text-white">Koniec hry!</h1>
        {myPos >= 0 && (
          <p className="text-gray-400 mt-2">
            Skončil si na <span className="text-yellow-300 font-bold">{myPos + 1}. mieste</span>
            <span className="text-gray-600 mx-2">·</span>
            <span className="text-violet-300 font-bold">{lb[myPos]?.score ?? 0} bodov</span>
          </p>
        )}
      </div>
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h3 className="text-gray-400 text-sm font-semibold mb-4">Finálne poradie</h3>
        <Leaderboard players={lb} highlight={playerId} />
      </div>
    </div>
  )
}

// ─── Moderator Lobby ──────────────────────────────────────────────────────────

function ModeratorLobby({ gs, code, lang, onRefresh }: {
  gs: GameState; code: string; lang: string; onRefresh: () => void
}) {
  const [locking, setLocking] = useState(false)
  const joinUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${lang}/play/${code}`
    : `/${lang}/play/${code}`

  const lock = async () => {
    setLocking(true)
    await api(`/api/games/${code}/lock-lobby`, 'POST')
    onRefresh()
    setLocking(false)
  }

  const copyLink = () => navigator.clipboard?.writeText(joinUrl)

  return (
    <div className="min-h-screen bg-gray-950 p-6 max-w-2xl mx-auto space-y-6">
      <div className="text-center pt-4">
        <p className="text-gray-400 text-sm mb-1">Kód hry</p>
        <div className="text-7xl font-black text-white tracking-widest font-mono">{code}</div>
        <p className="text-gray-500 text-sm mt-2">Pošlite hráčom tento kód alebo link</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
        <span className="flex-1 text-gray-300 text-sm truncate">{joinUrl}</span>
        <button onClick={copyLink}
          className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm text-white transition-colors">
          Kopírovať
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white">Hráči ({gs.playerCount})</h2>
          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" title="Živé" />
        </div>
        {gs.players.length === 0
          ? <p className="text-gray-500 text-sm">Zatiaľ sa nikto nepripojil…</p>
          : <PlayerList players={gs.players} />
        }
      </div>

      <button
        onClick={lock}
        disabled={locking || gs.players.length === 0}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-800 text-white font-bold text-lg hover:brightness-110 disabled:opacity-40 transition-all active:scale-95"
      >
        {locking ? 'Uzatváram…' : `🔒 Uzavrieť lobby (${gs.playerCount} hráčov)`}
      </button>
    </div>
  )
}

// ─── Moderator Round Setup ────────────────────────────────────────────────────

function ModeratorRoundSetup({ gs, code, onRefresh }: {
  gs: GameState; code: string; onRefresh: () => void
}) {
  const configured = gs.configuredRounds ?? []
  const nextIdx = configured.length
  const totalRounds = gs.total_rounds || 3

  const [categories, setCategories] = useState<Category[]>([])
  const [catId, setCatId] = useState('')
  const [qCount, setQCount] = useState(5)
  const [seconds, setSeconds] = useState(30)
  const [scoring, setScoring] = useState<'simple' | 'weighted'>('simple')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    api('/api/herd-vote/categories').then(d => {
      setCategories(d.categories ?? [])
      if (d.categories?.length) setCatId(d.categories[0].id)
    })
  }, [])

  const saveRound = async () => {
    if (!catId) { setErr('Vyber kategóriu'); return }
    setSaving(true); setErr('')
    const res = await api(`/api/games/${code}/rounds/config`, 'POST', {
      index: nextIdx, categoryId: catId, questions: qCount,
      prepSeconds: 5, questionSeconds: seconds, scoringMode: scoring, localePrefix: 'sk',
    })
    setSaving(false)
    if (res.ok) { onRefresh() }
    else setErr(res.error ?? 'Chyba pri ukladaní kola')
  }

  const startGame = async () => {
    setStarting(true)
    await api(`/api/games/${code}/rounds/start`, 'POST', { index: 0 })
    onRefresh()
    setStarting(false)
  }

  const allConfigured = configured.length >= totalRounds
  const selectedCat = categories.find(c => c.id === catId)

  return (
    <div className="min-h-screen bg-gray-950 p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">⚙</div>
        <div>
          <h1 className="text-xl font-black text-white">Nastavenie kôl</h1>
          <p className="text-gray-500 text-sm">Hra {code}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: totalRounds }, (_, i) => {
          const done = i < configured.length
          return (
            <div key={i} className={`rounded-xl border p-3 text-center transition-all ${done ? 'border-green-500 bg-green-900/20' : i === nextIdx ? 'border-violet-500 bg-violet-900/20' : 'border-gray-700 bg-gray-900'}`}>
              <div className={`text-lg font-bold ${done ? 'text-green-400' : i === nextIdx ? 'text-violet-300' : 'text-gray-600'}`}>
                {done ? '✓' : `Kolo ${i + 1}`}
              </div>
            </div>
          )
        })}
      </div>

      {/* Players summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
        <span className="text-gray-400 text-sm">Hráči:</span>
        <div className="flex-1 flex flex-wrap gap-1">
          {gs.players.slice(0, 10).map(p => (
            <span key={p.id} className="px-2 py-0.5 text-xs bg-gray-800 rounded-full text-gray-300">{p.name}</span>
          ))}
          {gs.players.length > 10 && <span className="text-gray-500 text-xs">+{gs.players.length - 10}</span>}
        </div>
      </div>

      {/* Configure next round */}
      {!allConfigured && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-white">Kolo {nextIdx + 1}</h2>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Kategória</label>
            <select value={catId} onChange={e => setCatId(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.count} otázok)</option>
              ))}
            </select>
            {selectedCat && <p className="text-xs text-gray-500">{selectedCat.count} dostupných otázok</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Počet otázok</label>
              <input type="number" min={1} max={20} value={qCount} onChange={e => setQCount(+e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Čas (s)</label>
              <input type="number" min={5} max={120} value={seconds} onChange={e => setSeconds(+e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Bodovanie</label>
            <div className="grid grid-cols-2 gap-2">
              {(['simple', 'weighted'] as const).map(m => (
                <button key={m} onClick={() => setScoring(m)}
                  className={`py-2 rounded-xl border font-semibold text-sm transition-all ${scoring === m ? 'border-violet-500 bg-violet-900/40 text-violet-300' : 'border-gray-700 text-gray-500 hover:border-gray-600'}`}>
                  {m === 'simple' ? '🎯 Klasické' : '🏎 Rýchlostné'}
                </button>
              ))}
            </div>
          </div>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <button onClick={saveRound} disabled={saving || !catId}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 text-white font-bold hover:brightness-110 disabled:opacity-40 transition-all active:scale-95">
            {saving ? 'Ukladám…' : nextIdx < totalRounds - 1 ? `Uložiť a nastaviť kolo ${nextIdx + 2}` : 'Uložiť posledné kolo'}
          </button>
        </div>
      )}

      {/* Start game */}
      {allConfigured && (
        <div className="bg-green-900/20 border border-green-600 rounded-2xl p-5 space-y-4 text-center">
          <div className="text-4xl">✅</div>
          <p className="text-green-300 font-bold">Všetky kolá sú nastavené!</p>
          <button onClick={startGame} disabled={starting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-black text-lg hover:brightness-110 disabled:opacity-40 transition-all active:scale-95">
            {starting ? 'Spúšťam…' : '🚀 Spustiť hru!'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Moderator Playing ────────────────────────────────────────────────────────

function ModeratorPlaying({ gs, code, onRefresh }: {
  gs: GameState; code: string; onRefresh: () => void
}) {
  const round = gs.round
  const q = gs.question
  const [busy, setBusy] = useState(false)

  const act = useCallback(async (path: string, body?: unknown) => {
    setBusy(true)
    await api(`/api/games/${code}/${path}`, 'POST', body ?? {})
    onRefresh()
    setBusy(false)
  }, [code, onRefresh])

  if (!round) return <Spinner />

  const s = round.status
  const isRunning = s === 'running'
  const isShown = s === 'shown'
  const isLocked = s === 'locked'
  const isResults = s === 'results'
  const isFinished = s === 'finished'

  const stats = gs.answerStats ?? {}
  const maxStat = Math.max(1, ...Object.values(stats))

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col md:flex-row gap-0">
      {/* Left: controls */}
      <div className="w-full md:w-72 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 p-5 flex flex-col gap-4">
        {/* Status badge */}
        <div className={`rounded-xl px-3 py-2 text-center font-bold text-sm ${
          isShown ? 'bg-blue-900/40 text-blue-300 border border-blue-700' :
          isRunning ? 'bg-green-900/40 text-green-300 border border-green-700 animate-pulse' :
          isLocked ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700' :
          isResults ? 'bg-violet-900/40 text-violet-300 border border-violet-700' :
          'bg-gray-800 text-gray-400 border border-gray-700'
        }`}>
          {isShown && '👁 Zobrazená otázka'}
          {isRunning && '⏱ Timer beží'}
          {isLocked && '🔒 Odpovede uzamknuté'}
          {isResults && '📊 Výsledky'}
          {isFinished && '✅ Kolo skončilo'}
        </div>

        {/* Timer ring when running */}
        {isRunning && round.timer_deadline && (
          <div className="flex justify-center">
            <TimerRing deadline={round.timer_deadline} seconds={round.question_seconds} />
          </div>
        )}

        {/* Answered count */}
        {(isRunning || isLocked || isResults) && (
          <div className="bg-gray-800 rounded-xl p-3 text-center">
            <div className="text-2xl font-black text-white">
              {gs.answeredCount ?? 0}<span className="text-gray-500 text-lg">/{gs.playerCount}</span>
            </div>
            <div className="text-gray-400 text-xs mt-1">odpovedí</div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-2 mt-auto">
          {isShown && (
            <button onClick={() => act(`rounds/timer/start`, { seconds: round.question_seconds })}
              disabled={busy}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all disabled:opacity-40 active:scale-95">
              ▶ Spustiť timer ({round.question_seconds}s)
            </button>
          )}
          {isRunning && (
            <button onClick={() => act('rounds/lock')} disabled={busy}
              className="w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-bold transition-all disabled:opacity-40 active:scale-95">
              🔒 Uzamknúť odpovede
            </button>
          )}
          {isLocked && (
            <button onClick={() => act('rounds/results', { roundId: round.id })} disabled={busy}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all disabled:opacity-40 active:scale-95">
              📊 Zobraziť výsledky
            </button>
          )}
          {isResults && (
            <button onClick={() => act('rounds/next', { roundId: round.id })} disabled={busy}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-40 active:scale-95">
              {q && q.qIndex < q.total - 1 ? '→ Ďalšia otázka' : '✅ Ukončiť kolo'}
            </button>
          )}
        </div>

        {/* Progress */}
        {q && (
          <div className="text-center text-gray-500 text-xs">
            Kolo {(round.idx ?? 0) + 1}/{gs.total_rounds} · Otázka {q.qIndex + 1}/{q.total}
          </div>
        )}
      </div>

      {/* Right: question + stats */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {q && (
          <>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-white text-2xl font-bold leading-snug">{q.text}</p>
              {q.correct && (
                <p className="mt-3 text-green-400 text-sm font-semibold">
                  ✓ Správna odpoveď: {q.correct}
                </p>
              )}
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ANSWER_LABELS.map((letter, i) => {
                const text = [q.a, q.b, q.c, q.d][i]
                if (!text) return null
                const cnt = stats[letter] ?? 0
                const pct = Math.round((cnt / maxStat) * 100)
                return (
                  <div key={letter} className={`rounded-xl border p-4 ${q.correct === letter ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-900'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm
                        ${q.correct === letter ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                        {letter}
                      </span>
                      <span className={`font-semibold flex-1 ${q.correct === letter ? 'text-green-300' : 'text-gray-200'}`}>{text}</span>
                      {(isLocked || isResults) && (
                        <span className="font-black text-white text-lg">{cnt}</span>
                      )}
                    </div>
                    {(isLocked || isResults) && (
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${q.correct === letter ? 'bg-green-500' : 'bg-gray-600'}`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Leaderboard in results */}
            {isResults && gs.leaderboard && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="text-gray-400 text-sm font-semibold mb-4">Priebežné poradie</h3>
                <Leaderboard players={gs.leaderboard} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Moderator Final ──────────────────────────────────────────────────────────

function ModeratorFinal({ gs }: { gs: GameState }) {
  const lb = gs.leaderboard ?? gs.players ?? []
  const [revealed, setRevealed] = useState(lb.length <= 2 ? lb.length : 0)

  const reveal = () => setRevealed(r => Math.min(r + 1, lb.length))

  const toReveal = lb.length > 2 ? [...lb].reverse() : lb

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <div className="text-6xl mb-3">🏆</div>
        <h1 className="text-3xl font-black text-white">Hra skončila!</h1>
        <p className="text-gray-400 mt-1">Hráči ešte nevidia výsledky</p>
      </div>

      <div className="w-full max-w-md space-y-3">
        {lb.length <= 2 ? (
          <Leaderboard players={lb} />
        ) : (
          <>
            {toReveal.slice(0, revealed).map((p, i) => {
              const pos = lb.length - i
              return (
                <div key={p.id}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-900 animate-in slide-in-from-bottom-4 duration-500">
                  <span className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl
                    ${pos === 1 ? 'bg-yellow-400 text-yellow-900' : pos === 2 ? 'bg-gray-300 text-gray-900' : pos === 3 ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                    {pos}
                  </span>
                  <span className="flex-1 font-bold text-white text-xl">{p.name}</span>
                  <span className="font-black text-violet-300 text-xl">{p.score} b</span>
                </div>
              )
            })}
            {revealed < lb.length && (
              <button onClick={reveal}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-800 text-white font-black text-lg hover:brightness-110 transition-all active:scale-95">
                {lb.length - revealed === 1 ? '🥇 Odhaliť víťaza!' : `Odhaliť #${lb.length - revealed}`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ─── Waiting screen for players during round finish / setup ──────────────────

function PlayerWaiting({ message, gs, playerId }: { message: string; gs: GameState; playerId: string }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-5xl animate-bounce">⏳</div>
      <p className="text-gray-300 text-lg font-semibold text-center">{message}</p>
      {gs.myPlayer && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-3 text-center">
          <p className="text-gray-500 text-sm">Tvoje skóre</p>
          <p className="text-2xl font-black text-violet-300">{gs.myPlayer.score} b</p>
        </div>
      )}
    </div>
  )
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export default function GameScreen({ code: rawCode, lang = 'sk' }: { code?: string; lang?: string }) {
  const code = String(rawCode || '').toUpperCase()
  const [gs, setGs] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState<string>('')
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  // Restore player ID from session storage on mount
  useEffect(() => {
    if (!code) return
    const id = sessionStorage.getItem(`herd-player-${code}`)
    const nm = sessionStorage.getItem(`herd-name-${code}`)
    if (id) setPlayerId(id)
    if (nm) setPlayerName(nm)
  }, [code])

  const fetchState = useCallback(async (pid?: string | null) => {
    if (!code) return
    const id = pid !== undefined ? pid : playerId
    try {
      const qs = id ? `?playerId=${encodeURIComponent(id)}` : ''
      const r = await fetch(`/api/games/${code}/state${qs}`, { cache: 'no-store' })
      if (!mountedRef.current) return
      if (r.status === 404) { setNotFound(true); setLoading(false); return }
      if (r.ok) {
        const data = await r.json()
        setGs(data)
        setLoading(false)
      }
    } catch { /* silent */ }
  }, [code, playerId])

  // Polling loop (1.5s)
  const startPolling = useCallback((pid?: string | null) => {
    if (pollRef.current) clearTimeout(pollRef.current)
    const tick = async () => {
      await fetchState(pid)
      if (mountedRef.current) pollRef.current = setTimeout(tick, 1500)
    }
    tick()
  }, [fetchState])

  useEffect(() => {
    mountedRef.current = true
    startPolling(playerId)
    return () => { mountedRef.current = false; if (pollRef.current) clearTimeout(pollRef.current) }
  }, [startPolling, playerId])

  // Supabase realtime enhancement
  useEffect(() => {
    if (!code) return
    return RealtimeClient.subscribeToGame(code, () => fetchState())
  }, [code, fetchState])

  const handleJoined = (id: string, name: string) => {
    sessionStorage.setItem(`herd-player-${code}`, id)
    sessionStorage.setItem(`herd-name-${code}`, name)
    setPlayerId(id)
    setPlayerName(name)
    fetchState(id)
  }

  const handleRefresh = useCallback(() => fetchState(), [fetchState])

  // ── Render ──────────────────────────────────────────────────────────────────

  if (!code) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Chýba kód hry.</div>
  if (loading) return <div className="min-h-screen bg-gray-950"><Spinner /></div>
  if (notFound) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center p-6">
      <div>
        <div className="text-5xl mb-4">❓</div>
        <h2 className="text-2xl font-bold text-white">Hra nenájdená</h2>
        <p className="text-gray-400 mt-2">Kód <code className="text-violet-400">{code}</code> neexistuje.</p>
      </div>
    </div>
  )
  if (!gs) return <div className="min-h-screen bg-gray-950"><Spinner /></div>

  const { phase, isOwner, round, lobby_locked } = gs

  // ── MODERATOR ───────────────────────────────────────────────────────────────
  if (isOwner) {
    if (phase === 'lobby') return <ModeratorLobby gs={gs} code={code} lang={lang} onRefresh={handleRefresh} />
    if (phase === 'config' || phase === 'round_setup') return <ModeratorRoundSetup gs={gs} code={code} onRefresh={handleRefresh} />
    if (phase === 'playing') return <ModeratorPlaying gs={gs} code={code} onRefresh={handleRefresh} />
    if (phase === 'final') return <ModeratorFinal gs={gs} />
  }

  // ── PLAYER ───────────────────────────────────────────────────────────────────
  // Not joined yet
  if (!playerId || !gs.myPlayer) {
    return (
      <JoinForm
        code={code} gamePhase={phase} lobbyLocked={lobby_locked}
        onJoined={handleJoined}
      />
    )
  }

  if (phase === 'lobby') return <PlayerLobby gs={gs} myName={playerName} />
  if (phase === 'config' || phase === 'round_setup') return <PlayerWaiting message="Moderátor nastavuje hru…" gs={gs} playerId={playerId} />
  if (phase === 'final') return <PlayerFinal gs={gs} playerId={playerId} />

  if (phase === 'playing') {
    if (!round) return <PlayerWaiting message="Čakáme na prvú otázku…" gs={gs} playerId={playerId} />
    if (round.status === 'finished') return <PlayerWaiting message="Kolo skončilo. Čakáme na ďalšie…" gs={gs} playerId={playerId} />
    return <PlayerGame gs={gs} code={code} playerId={playerId} />
  }

  return <PlayerLobby gs={gs} myName={playerName} />
}
