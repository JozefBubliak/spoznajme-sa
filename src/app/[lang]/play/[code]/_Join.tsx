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

const ANSWER_COLORS = ['hv-answer-a', 'hv-answer-b', 'hv-answer-c', 'hv-answer-d']
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
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full animate-spin" />
        <p className="hv-text-muted text-sm">Načítavam…</p>
      </div>
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
  const r = 48
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  const urgent = remaining <= 5
  const color = urgent ? 'hsl(0 70% 55%)' : remaining <= 10 ? 'hsl(40 90% 55%)' : 'hsl(150 60% 50%)'

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsla(250 20% 20% / 0.6)" strokeWidth="6" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.25s linear, stroke 0.3s' }}
        />
      </svg>
      <span className={`-mt-[84px] text-4xl font-black tabular-nums ${urgent ? 'text-red-400 animate-pulse' : 'text-white'}`}>
        {remaining}
      </span>
      <span className="mt-[38px] text-xs hv-text-dim">sekúnd</span>
    </div>
  )
}

function AnswerBtn({
  letter, text, index, selected, correct, locked, onClick
}: { letter: string; text: string; index: number; selected: boolean; correct: string | null; locked: boolean; onClick?: () => void }) {
  const isCorrect = correct === letter
  const isWrong = locked && selected && !isCorrect
  const dim = locked && !isCorrect && !selected

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`
        relative w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-semibold
        transition-all duration-300 select-none
        ${selected && !locked ? 'scale-[1.02] ring-2 ring-white/20' : ''}
        ${isCorrect ? 'hv-answer-correct border-2 !text-green-200' : ''}
        ${isWrong ? 'hv-answer-wrong border-2 !text-red-300 line-through opacity-60' : ''}
        ${dim ? 'opacity-20' : ''}
        ${!locked && !selected ? `${ANSWER_COLORS[index]} text-white border-transparent hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg` : ''}
        ${selected && !locked ? `${ANSWER_COLORS[index]} text-white border-white/20` : ''}
      `}
    >
      <span className="w-9 h-9 rounded-xl bg-black/20 backdrop-blur-sm flex items-center justify-center font-black text-base shrink-0">
        {letter}
      </span>
      <span className="leading-snug flex-1">{text}</span>
      {isCorrect && <span className="ml-auto text-2xl">✓</span>}
      {isWrong && <span className="ml-auto text-2xl">✗</span>}
    </button>
  )
}

function GameLeaderboard({ players, highlight }: { players: Player[]; highlight?: string }) {
  return (
    <div className="space-y-2">
      {players.map((p, i) => (
        <div key={p.id}
          className={`hv-lb-row ${p.id === highlight ? 'highlight' : ''}`}
        >
          <span className={`hv-lb-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'default'}`}>
            {i + 1}
          </span>
          <span className="flex-1 font-semibold text-white truncate">{p.name}</span>
          <span className="font-black text-purple-300 tabular-nums">{p.score} b</span>
        </div>
      ))}
    </div>
  )
}

function PlayerList({ players }: { players: Player[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {players.map(p => (
        <span key={p.id} className="hv-player-pill">
          <span className="w-2 h-2 rounded-full bg-green-400" />
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
      <div className="hv-bg hv-particles flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-4xl">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-white">Prihlasovanie uzavreté</h2>
          <p className="hv-text-muted">Moderátor uzamkol lobby. Hra prebieha.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hv-bg hv-particles flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20">
            <span>🐂</span>
            <span>Herd Vote</span>
          </div>
          <h1 className="text-3xl font-black text-white">Pripojiť sa</h1>
          <p className="hv-text-muted text-sm">
            Hra <span className="font-mono font-bold text-purple-300 tracking-widest">{code}</span>
          </p>
        </div>
        <div className="hv-card-glow p-6 space-y-4">
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && join()}
            placeholder="Tvoje meno / tím"
            maxLength={30}
            className="hv-input w-full px-4 py-3.5 text-lg"
          />
          {err && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-300 text-sm">
              {err}
            </div>
          )}
          <button
            onClick={join}
            disabled={busy || !name.trim()}
            className="hv-btn-primary w-full py-3.5 text-lg"
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Pripájam…
              </span>
            ) : 'Pripojiť sa →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Player Lobby ─────────────────────────────────────────────────────────────

function PlayerLobby({ gs, myName }: { gs: GameState; myName: string }) {
  return (
    <div className="hv-bg hv-particles flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center animate-fade-in space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl animate-pulse">
          ⏳
        </div>
        <h2 className="text-2xl font-bold text-white">Čakáme na moderátora</h2>
        <p className="hv-text-muted">Hra začne čoskoro…</p>
      </div>
      <div className="hv-card-glow p-6 w-full max-w-sm text-center">
        <p className="hv-text-dim text-xs uppercase tracking-widest mb-1">Prihlásený ako</p>
        <p className="text-2xl font-black hv-text-gradient">{myName}</p>
      </div>
      <div className="hv-card p-5 w-full max-w-sm">
        <p className="text-xs hv-text-dim uppercase tracking-widest font-semibold mb-3">Hráči ({gs.playerCount})</p>
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
      <div className="hv-bg hv-particles flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="text-4xl animate-pulse">⏳</div>
          <p className="hv-text-muted">Čakáme na ďalšiu otázku…</p>
          {gs.myPlayer && (
            <div className="hv-card px-6 py-3 inline-block">
              <span className="hv-text-dim text-sm">Skóre: </span>
              <span className="text-purple-300 font-bold">{gs.myPlayer.score} b</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const locked = ['locked', 'results', 'finished'].includes(round.status)
  const showTimer = round.status === 'running' && round.timer_deadline

  return (
    <div className="hv-bg hv-particles flex flex-col">
      {/* Header bar */}
      <div className="bg-black/30 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20 text-[0.65rem]">
            Kolo {(round.idx ?? 0) + 1}
          </span>
          <span className="hv-text-muted">
            Otázka <span className="text-white font-bold">{q.qIndex + 1}/{q.total}</span>
          </span>
        </div>
        {gs.myPlayer && (
          <div className="hv-badge bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
            {gs.myPlayer.score} b
          </div>
        )}
      </div>

      {/* Timer */}
      {showTimer && (
        <div className="flex justify-center pt-6 pb-2">
          <TimerRing deadline={round.timer_deadline} seconds={round.question_seconds} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-xl mx-auto w-full">
        {/* Question */}
        <div className={`hv-card-glow p-6 ${!showTimer ? 'mt-4' : ''}`}>
          <p className="text-white text-xl font-bold leading-snug text-center">{q.text}</p>
        </div>

        {/* Waiting for timer */}
        {round.status === 'shown' && (
          <div className="text-center hv-text-muted text-sm animate-pulse">Čakáme na spustenie timera…</div>
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
                  index={i}
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
          <div className={`rounded-2xl border-2 p-5 text-center transition-all duration-500 ${
            myAnswer === q.correct 
              ? 'bg-green-500/10 border-green-500/30' 
              : myAnswer 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'hv-card'
          }`}>
            {!myAnswer && <p className="hv-text-muted font-semibold">Neodpovedal si</p>}
            {myAnswer === q.correct && <p className="text-green-400 font-black text-xl">✓ Správne!</p>}
            {myAnswer && myAnswer !== q.correct && <p className="text-red-400 font-black text-xl">✗ Nesprávne</p>}
            <p className="hv-text-muted mt-2 text-sm">
              Správna odpoveď: <span className="font-bold text-white">{q.correct} – {[q.a, q.b, q.c, q.d][['A','B','C','D'].indexOf(q.correct)]}</span>
            </p>
          </div>
        )}

        {/* Results leaderboard */}
        {round.status === 'results' && gs.leaderboard && (
          <div className="hv-card p-5">
            <h3 className="hv-text-dim text-xs uppercase tracking-widest font-semibold mb-4">Priebežné poradie</h3>
            <GameLeaderboard players={gs.leaderboard} highlight={playerId} />
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
    <div className="hv-bg hv-particles flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center animate-fade-in space-y-3">
        <div className="text-6xl mb-2">🏆</div>
        <h1 className="text-3xl font-black text-white">Koniec hry!</h1>
        {myPos >= 0 && (
          <p className="hv-text-muted">
            Skončil si na <span className="text-amber-300 font-bold">{myPos + 1}. mieste</span>
            <span className="hv-text-dim mx-2">·</span>
            <span className="text-purple-300 font-bold">{lb[myPos]?.score ?? 0} bodov</span>
          </p>
        )}
      </div>
      <div className="w-full max-w-sm hv-card-glow p-6">
        <h3 className="hv-text-dim text-xs uppercase tracking-widest font-semibold mb-4">Finálne poradie</h3>
        <GameLeaderboard players={lb} highlight={playerId} />
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
    ? `${window.location.origin}/${lang}/herd-vote/play/${code}`
    : `/${lang}/herd-vote/play/${code}`

  const lock = async () => {
    setLocking(true)
    await api(`/api/games/${code}/lock-lobby`, 'POST')
    onRefresh()
    setLocking(false)
  }

  const copyLink = () => navigator.clipboard?.writeText(joinUrl)

  return (
    <div className="hv-bg hv-particles">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* QR Section — dominant */}
        <div className="hv-card-glow p-8 text-center space-y-5">
          <div className="space-y-2">
            <p className="hv-text-dim text-xs uppercase tracking-widest font-semibold">Kód hry</p>
            <div className="text-6xl md:text-7xl font-black text-white tracking-[0.2em] font-mono">{code}</div>
          </div>
          
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-3 shadow-lg shadow-purple-500/10">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(joinUrl)}&color=2d1b69&bgcolor=ffffff`}
                alt="QR kód"
                className="w-56 h-56 md:w-64 md:h-64 rounded-xl"
              />
            </div>
          </div>

          {/* Join link */}
          <div className="flex items-center gap-2 bg-black/20 rounded-xl px-4 py-3">
            <span className="flex-1 hv-text-muted text-sm truncate font-mono">{joinUrl}</span>
            <button onClick={copyLink}
              className="hv-btn-secondary px-3 py-1.5 text-xs">
              Kopírovať
            </button>
          </div>
          
          <p className="hv-text-dim text-sm">Naskenujte QR alebo otvorte link v prehliadači</p>
        </div>

        {/* Players */}
        <div className="hv-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white flex items-center gap-2">
              <span>Hráči</span>
              <span className="hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20 text-xs">{gs.playerCount}</span>
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" title="Živé" />
          </div>
          {gs.players.length === 0
            ? <p className="hv-text-muted text-sm">Zatiaľ sa nikto nepripojil…</p>
            : <PlayerList players={gs.players} />
          }
        </div>

        {/* Lock lobby */}
        <button
          onClick={lock}
          disabled={locking || gs.players.length === 0}
          className="hv-btn-primary w-full py-4 text-lg"
        >
          {locking ? 'Uzatváram…' : `🔒 Uzavrieť lobby (${gs.playerCount} hráčov)`}
        </button>
      </div>
    </div>
  )
}

// ─── Moderator Round Setup ────────────────────────────────────────────────────

function ModeratorRoundSetup({ gs, code, onRefresh }: {
  gs: GameState; code: string; onRefresh: () => void
}) {
  const configured = gs.configuredRounds ?? []
  const totalRounds = gs.total_rounds || 0
  const nextIdx = configured.length

  const [categories, setCategories] = useState<Category[]>([])

  // Step 1 – category picker (phase === 'config')
  const [selCats, setSelCats] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [confirming, setConfirming] = useState(false)

  // Step 2 – round-by-round setup (phase === 'round_setup')
  const [pickedCats, setPickedCats] = useState<Category[]>([]) // preserved from step 1
  const [catId, setCatId] = useState('') // fallback if pickedCats lost (page refresh)
  const [qCount, setQCount] = useState(5)
  const [seconds, setSeconds] = useState(30)
  const [scoring, setScoring] = useState<'simple' | 'weighted'>('simple')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    api('/api/herd-vote/categories').then(d => {
      const cats = d.categories ?? []
      setCategories(cats)
      if (cats.length) setCatId(cats[0].id)
    })
  }, [])

  // When moving to the next round, reset the form and pre-fill category from picked list
  useEffect(() => {
    setQCount(5); setSeconds(30); setScoring('simple'); setErr('')
    if (pickedCats[nextIdx]) setCatId(pickedCats[nextIdx].id)
  }, [nextIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCat = (cat: Category) =>
    setSelCats(prev =>
      prev.some(c => c.id === cat.id) ? prev.filter(c => c.id !== cat.id) : [...prev, cat]
    )

  const confirmCategories = async () => {
    if (!selCats.length) return
    setConfirming(true)
    const res = await api(`/api/games/${code}/config`, 'POST', { totalRounds: selCats.length })
    if (res.ok) { setPickedCats(selCats); onRefresh() }
    setConfirming(false)
  }

  const saveRound = async () => {
    const effectiveCatId = pickedCats[nextIdx]?.id ?? catId
    if (!effectiveCatId) { setErr('Vyber kategóriu'); return }
    setSaving(true); setErr('')
    const res = await api(`/api/games/${code}/rounds/config`, 'POST', {
      index: nextIdx, categoryId: effectiveCatId, questions: qCount,
      prepSeconds: 5, questionSeconds: seconds, scoringMode: scoring, localePrefix: 'sk',
    })
    setSaving(false)
    if (res.ok) onRefresh()
    else setErr(res.error ?? 'Chyba pri ukladaní kola')
  }

  const startGame = async () => {
    setStarting(true)
    await api(`/api/games/${code}/rounds/start`, 'POST', { index: 0 })
    onRefresh()
    setStarting(false)
  }

  // ── STEP 1: Category picker ────────────────────────────────────────────────
  if (gs.phase === 'config') {
    const filtered = categories.filter(c =>
      !search || c.name.toLowerCase().includes(search.toLowerCase())
    )
    const roundLabel = (n: number) => n === 1 ? '1 kolo' : n < 5 ? `${n} kolá` : `${n} kôl`

    return (
      <div className="hv-bg hv-particles">
        <div className="max-w-2xl mx-auto p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-xl">🎯</div>
            <div>
              <h1 className="text-xl font-black text-white">Vyber kategórie kôl</h1>
              <p className="hv-text-dim text-sm">Každá kategória = 1 kolo · Poradie výberu = poradie kôl</p>
            </div>
          </div>

          {/* Players */}
          <div className="hv-card p-3 flex items-center gap-3">
            <span className="hv-text-muted text-sm shrink-0">Hráči ({gs.playerCount}):</span>
            <div className="flex flex-wrap gap-1 overflow-hidden">
              {gs.players.slice(0, 8).map(p => (
                <span key={p.id} className="px-2 py-0.5 text-xs bg-white/5 rounded-full text-white/60 whitespace-nowrap">{p.name}</span>
              ))}
              {gs.players.length > 8 && <span className="hv-text-dim text-xs">+{gs.players.length - 8}</span>}
            </div>
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Hľadaj kategóriu…"
            className="hv-input w-full px-4 py-3"
          />

          {/* Category grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-[42vh] overflow-y-auto pr-1 pb-1">
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-10 hv-text-dim text-sm">Nič sa nenašlo</div>
            )}
            {filtered.map(cat => {
              const isSel = selCats.some(c => c.id === cat.id)
              const selIdx = selCats.findIndex(c => c.id === cat.id)
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCat(cat)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all relative ${
                    isSel
                      ? 'border-purple-500/50 bg-purple-500/15'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  {isSel && (
                    <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                      {selIdx + 1}
                    </span>
                  )}
                  <div className={`font-semibold text-sm leading-snug pr-7 ${isSel ? 'text-purple-200' : 'text-white/80'}`}>
                    {cat.name}
                  </div>
                  <div className="text-xs mt-1 hv-text-dim">{cat.count} otázok</div>
                </button>
              )
            })}
          </div>

          {/* Selected pills */}
          {selCats.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selCats.map((cat, i) => (
                <span
                  key={cat.id}
                  onClick={() => toggleCat(cat)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 cursor-pointer hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 transition-all"
                >
                  <span className="font-bold opacity-60">Kolo {i + 1}:</span>
                  <span>{cat.name}</span>
                  <span className="opacity-40 ml-0.5">×</span>
                </span>
              ))}
            </div>
          )}

          {/* Confirm */}
          <button
            onClick={confirmCategories}
            disabled={selCats.length === 0 || confirming}
            className="hv-btn-primary w-full py-4 text-base"
          >
            {confirming
              ? 'Ukladám…'
              : selCats.length === 0
                ? 'Vyber aspoň 1 kategóriu'
                : `Potvrdiť výber — ${roundLabel(selCats.length)} →`}
          </button>
        </div>
      </div>
    )
  }

  // ── STEP 2: Round-by-round configuration ──────────────────────────────────
  const allConfigured = totalRounds > 0 && configured.length >= totalRounds
  const presetCat = pickedCats[nextIdx]

  return (
    <div className="hv-bg hv-particles">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-xl">⚙</div>
          <div>
            <h1 className="text-xl font-black text-white">Nastavenie kôl</h1>
            <p className="hv-text-dim text-sm">Hra {code}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: totalRounds }, (_, i) => {
            const done = i < configured.length
            return (
              <div key={i} className={`rounded-xl border p-3 text-center transition-all ${
                done ? 'border-green-500/30 bg-green-500/10'
                : i === nextIdx ? 'border-purple-500/30 bg-purple-500/10'
                : 'border-white/5 bg-white/[0.02]'
              }`}>
                <div className={`text-sm font-bold ${
                  done ? 'text-green-400' : i === nextIdx ? 'text-purple-300' : 'hv-text-dim'
                }`}>
                  {done ? '✓' : `Kolo ${i + 1}`}
                </div>
                {pickedCats[i] && (
                  <div className="text-xs hv-text-dim mt-0.5 truncate px-1">{pickedCats[i].name}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Players summary */}
        <div className="hv-card p-3 flex items-center gap-3">
          <span className="hv-text-muted text-sm shrink-0">Hráči:</span>
          <div className="flex-1 flex flex-wrap gap-1">
            {gs.players.slice(0, 10).map(p => (
              <span key={p.id} className="px-2 py-0.5 text-xs bg-white/5 rounded-full text-white/60">{p.name}</span>
            ))}
            {gs.players.length > 10 && <span className="hv-text-dim text-xs">+{gs.players.length - 10}</span>}
          </div>
        </div>

        {/* Configure next round */}
        {!allConfigured && (
          <div className="hv-card-glow p-6 space-y-5">
            <h2 className="font-bold text-white text-lg">Kolo {nextIdx + 1}</h2>

            {/* Category — pre-filled or fallback dropdown */}
            {presetCat ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-purple-500/10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-lg shrink-0">🎯</div>
                <div>
                  <div className="font-semibold text-white">{presetCat.name}</div>
                  <div className="text-xs hv-text-dim">{presetCat.count} dostupných otázok</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs hv-text-dim uppercase tracking-widest font-semibold">Kategória</label>
                <select value={catId} onChange={e => setCatId(e.target.value)}
                  className="hv-input w-full px-3 py-2.5">
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.count} otázok)</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs hv-text-dim uppercase tracking-widest font-semibold">Počet otázok</label>
                <input type="number" min={1} max={20} value={qCount} onChange={e => setQCount(+e.target.value)}
                  className="hv-input w-full px-3 py-2.5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs hv-text-dim uppercase tracking-widest font-semibold">Čas / otázku (s)</label>
                <input type="number" min={5} max={120} value={seconds} onChange={e => setSeconds(+e.target.value)}
                  className="hv-input w-full px-3 py-2.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs hv-text-dim uppercase tracking-widest font-semibold">Bodovanie</label>
              <div className="grid grid-cols-2 gap-2">
                {(['simple', 'weighted'] as const).map(m => (
                  <button key={m} onClick={() => setScoring(m)}
                    className={`py-2.5 rounded-xl border font-semibold text-sm transition-all ${
                      scoring === m
                        ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                        : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                    }`}>
                    {m === 'simple' ? '🎯 Klasické' : '🏎 Rýchlostné'}
                  </button>
                ))}
              </div>
            </div>

            {err && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-300 text-sm">{err}</div>
            )}

            <button onClick={saveRound} disabled={saving || (!presetCat && !catId)}
              className="hv-btn-primary w-full py-3.5 text-base">
              {saving ? 'Ukladám…' : nextIdx < totalRounds - 1 ? `Uložiť a nastaviť kolo ${nextIdx + 2} →` : 'Uložiť posledné kolo ✓'}
            </button>
          </div>
        )}

        {/* Start game */}
        {allConfigured && (
          <div className="hv-card border-green-500/20 bg-green-500/5 p-6 space-y-4 text-center">
            <div className="text-4xl">✅</div>
            <p className="text-green-300 font-bold">Všetky kolá sú nastavené!</p>
            <button onClick={startGame} disabled={starting}
              className="hv-btn-success w-full py-4 text-lg font-black">
              {starting ? 'Spúšťam…' : '🚀 Spustiť hru!'}
            </button>
          </div>
        )}
      </div>
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

  // Find next 'ready' round — used when current round finishes
  const nextReadyRound = gs.rounds?.find(r => r.status === 'ready')

  // No active round yet (shouldn't happen in playing phase, but guard)
  if (!round) return <div className="hv-bg"><Spinner /></div>

  const s = round.status
  const isRunning = s === 'running'
  const isShown = s === 'shown'
  const isLocked = s === 'locked'
  const isResults = s === 'results'
  const isFinished = s === 'finished'

  const stats = gs.answerStats ?? {}
  const maxStat = Math.max(1, ...Object.values(stats))

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    shown:    { bg: 'bg-blue-500/15 border-blue-500/25',   text: 'text-blue-300',   label: '👁 Zobrazená otázka' },
    running:  { bg: 'bg-green-500/15 border-green-500/25', text: 'text-green-300',  label: '⏱ Timer beží' },
    locked:   { bg: 'bg-amber-500/15 border-amber-500/25', text: 'text-amber-300',  label: '🔒 Odpovede uzamknuté' },
    results:  { bg: 'bg-purple-500/15 border-purple-500/25',text: 'text-purple-300',label: '📊 Výsledky' },
    finished: { bg: 'bg-teal-500/15 border-teal-500/25',   text: 'text-teal-300',   label: '✅ Kolo skončilo' },
  }
  const sc = statusConfig[s] ?? { bg: 'bg-white/5 border-white/10', text: 'hv-text-muted', label: s }

  return (
    <div className="hv-bg hv-particles flex flex-col md:flex-row gap-0 min-h-screen">
      {/* Left sidebar: controls */}
      <div className="w-full md:w-72 bg-black/20 backdrop-blur-sm border-b md:border-b-0 md:border-r border-white/5 p-5 flex flex-col gap-4">
        {/* Status badge */}
        <div className={`rounded-xl px-3 py-2.5 text-center font-bold text-sm border ${sc.bg} ${sc.text} ${isRunning ? 'animate-pulse' : ''}`}>
          {sc.label}
        </div>

        {/* Timer ring when running */}
        {isRunning && round.timer_deadline && (
          <div className="flex justify-center">
            <TimerRing deadline={round.timer_deadline} seconds={round.question_seconds} />
          </div>
        )}

        {/* Answered count */}
        {(isRunning || isLocked || isResults) && (
          <div className="hv-card p-4 text-center">
            <div className="text-3xl font-black text-white">
              {gs.answeredCount ?? 0}<span className="hv-text-dim text-xl">/{gs.playerCount}</span>
            </div>
            <div className="hv-text-dim text-xs mt-1">odpovedí</div>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="space-y-2.5 mt-auto">
          {isShown && (
            <button onClick={() => act(`rounds/timer/start`, { seconds: round.question_seconds })}
              disabled={busy}
              className="hv-btn-success w-full py-3">
              ▶ Spustiť timer ({round.question_seconds}s)
            </button>
          )}
          {isRunning && (
            <button onClick={() => act('rounds/lock')} disabled={busy}
              className="hv-btn-warning w-full py-3">
              🔒 Uzamknúť odpovede
            </button>
          )}
          {isLocked && (
            <button onClick={() => act('rounds/results', { roundId: round.id })} disabled={busy}
              className="hv-btn-primary w-full py-3">
              📊 Zobraziť výsledky
            </button>
          )}
          {isResults && (
            <button onClick={() => act('rounds/next', { roundId: round.id })} disabled={busy}
              className="hv-btn-primary w-full py-3">
              {q && q.qIndex < q.total - 1 ? '→ Ďalšia otázka' : '✅ Ukončiť kolo'}
            </button>
          )}

          {/* ── After round finishes: start next round OR end game ── */}
          {isFinished && nextReadyRound && (
            <button
              onClick={() => act('rounds/start', { index: nextReadyRound.idx })}
              disabled={busy}
              className="hv-btn-success w-full py-3 font-black">
              ▶ Spustiť kolo {nextReadyRound.idx + 1}
            </button>
          )}
          {isFinished && !nextReadyRound && (
            <button
              onClick={() => act('end', {})}
              disabled={busy}
              className="hv-btn-primary w-full py-3 font-black">
              🏁 Ukončiť hru
            </button>
          )}
        </div>

        {/* Progress */}
        {q && !isFinished && (
          <div className="text-center hv-text-dim text-xs">
            Kolo {(round.idx ?? 0) + 1}/{gs.total_rounds} · Otázka {q.qIndex + 1}/{q.total}
          </div>
        )}
        {isFinished && (
          <div className="text-center text-xs">
            <span className="text-teal-400 font-semibold">Kolo {(round.idx ?? 0) + 1} dokončené</span>
            {nextReadyRound
              ? <span className="hv-text-dim"> · zostáva {gs.total_rounds - (round.idx ?? 0) - 1} kôl</span>
              : <span className="hv-text-dim"> · posledné kolo</span>
            }
          </div>
        )}
      </div>

      {/* Right: question + stats */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {q && (
          <>
            <div className="hv-card-glow p-6">
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
                const pct = maxStat > 0 ? Math.round((cnt / maxStat) * 100) : 0
                const isCorrectAnswer = q.correct === letter
                return (
                  <div key={letter} className={`rounded-2xl border p-4 transition-all ${
                    isCorrectAnswer ? 'border-green-500/30 bg-green-500/10' : 'border-white/5 bg-white/[0.03]'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                        isCorrectAnswer ? 'bg-green-500/30 text-green-300' : 'bg-white/10 text-white/50'
                      }`}>
                        {letter}
                      </span>
                      <span className={`font-semibold flex-1 ${isCorrectAnswer ? 'text-green-300' : 'text-white/80'}`}>{text}</span>
                      {(isLocked || isResults) && (
                        <span className="font-black text-white text-lg tabular-nums">{cnt}</span>
                      )}
                    </div>
                    {(isLocked || isResults) && (
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${
                          isCorrectAnswer ? 'bg-green-500/70' : 'bg-white/15'
                        }`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Leaderboard in results */}
            {isResults && gs.leaderboard && (
              <div className="hv-card p-5">
                <h3 className="hv-text-dim text-xs uppercase tracking-widest font-semibold mb-4">Priebežné poradie</h3>
                <GameLeaderboard players={gs.leaderboard} />
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
    <div className="hv-bg hv-particles flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center animate-fade-in space-y-3">
        <div className="text-7xl mb-2">🏆</div>
        <h1 className="text-4xl font-black hv-text-gradient">Hra skončila!</h1>
        <p className="hv-text-muted">Odhaľte výsledky po jednom</p>
      </div>

      <div className="w-full max-w-md space-y-3">
        {lb.length <= 2 ? (
          <GameLeaderboard players={lb} />
        ) : (
          <>
            {toReveal.slice(0, revealed).map((p, i) => {
              const pos = lb.length - i
              return (
                <div key={p.id}
                  className="hv-lb-row animate-reveal-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className={`hv-lb-rank ${pos === 1 ? 'gold' : pos === 2 ? 'silver' : pos === 3 ? 'bronze' : 'default'}`}
                    style={{ width: '3rem', height: '3rem', fontSize: '1.25rem' }}>
                    {pos}
                  </span>
                  <span className="flex-1 font-bold text-white text-xl">{p.name}</span>
                  <span className="font-black text-purple-300 text-xl tabular-nums">{p.score} b</span>
                </div>
              )
            })}
            {revealed < lb.length && (
              <button onClick={reveal}
                className="hv-btn-primary w-full py-4 text-lg">
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
    <div className="hv-bg hv-particles flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-5xl animate-float">⏳</div>
      <p className="text-white/80 text-lg font-semibold text-center">{message}</p>
      {gs.myPlayer && (
        <div className="hv-card-glow px-8 py-4 text-center">
          <p className="hv-text-dim text-xs uppercase tracking-widest">Tvoje skóre</p>
          <p className="text-3xl font-black text-purple-300 mt-1">{gs.myPlayer.score} b</p>
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

  if (!code) return (
    <div className="hv-bg flex items-center justify-center text-white">Chýba kód hry.</div>
  )
  if (loading) return <div className="hv-bg"><Spinner /></div>
  if (notFound) return (
    <div className="hv-bg hv-particles flex items-center justify-center text-center p-6">
      <div className="animate-fade-in space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-4xl">❓</div>
        <h2 className="text-2xl font-bold text-white">Hra nenájdená</h2>
        <p className="hv-text-muted">Kód <code className="text-purple-300 font-mono font-bold">{code}</code> neexistuje.</p>
      </div>
    </div>
  )
  if (!gs) return <div className="hv-bg"><Spinner /></div>

  const { phase, isOwner, round, lobby_locked } = gs

  // ── MODERATOR ───────────────────────────────────────────────────────────────
  if (isOwner) {
    if (phase === 'lobby') return <ModeratorLobby gs={gs} code={code} lang={lang} onRefresh={handleRefresh} />
    if (phase === 'config' || phase === 'round_setup') return <ModeratorRoundSetup gs={gs} code={code} onRefresh={handleRefresh} />
    if (phase === 'playing') return <ModeratorPlaying gs={gs} code={code} onRefresh={handleRefresh} />
    if (phase === 'final') return <ModeratorFinal gs={gs} />
  }

  // ── PLAYER ───────────────────────────────────────────────────────────────────
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
