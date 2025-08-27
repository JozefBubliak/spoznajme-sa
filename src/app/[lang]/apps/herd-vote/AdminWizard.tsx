// src/app/[lang]/apps/herd-vote/AdminWizard.tsx
'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

type Phase =
  | 'lobby' | 'config' | 'round_setup'
  | 'playing' | 'locked' | 'reveal' | 'round_results' | 'final'

type Game = {
  code: string
  phase: Phase
  lobby_locked: boolean
  total_rounds?: number
  active_round_index?: number // 0-based
  prep_seconds?: number
  question_seconds?: number
  scoring_mode?: 'simple'|'weighted'
  timer_deadline?: string | null
}

type RoundCfg = {
  topic?: string
  categoryId?: string
  questions?: number
}

type Category = {
  id: string
  name: string
  count?: number
}

export default function AdminWizard({ code: codeProp }: { code?: string }) {
  const [code, setCode] = useState(codeProp ?? '')
  const [game, setGame] = useState<Game | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const { session } = useAuth()

  const authFetch = useCallback((url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> | undefined),
    }
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`
    }
    return fetch(url, { ...options, headers })
  }, [session?.access_token])

  // konfig
  const [totalRounds, setTotalRounds] = useState(3)
  const [prepSec, setPrepSec] = useState(10)
  const [qSec, setQSec] = useState(45)
  const [scoring, setScoring] = useState<'simple'|'weighted'>('simple')
  const [roundIx, setRoundIx] = useState(0)
  const [roundCfg, setRoundCfg] = useState<RoundCfg>({ topic: '', questions: 5 })
  const [players, setPlayers] = useState<{id:string; name:string}[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const r = await authFetch('/api/herd-vote/categories', { cache: 'no-store' })
        if (!r.ok) return
        const j = await r.json()
        const cats: Category[] = Array.isArray(j.categories) ? j.categories : []
        setCategories(cats)
        if (cats.length > 0) {
          const firstId = cats[0]?.id
          if (firstId) {
            setRoundCfg(cfg => ({ ...cfg, categoryId: cfg.categoryId ?? firstId }))
          }
        }
      } catch {}
    })()
  }, [authFetch])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function toPhase(status?: string): Phase {
    switch (status) {
      case 'lobby': return 'lobby'
      case 'setup': return 'config'
      case 'running': return 'playing'
      case 'ended': return 'final'
      default: return 'lobby'
    }
  }

  const refresh = useMemo(() => async () => {
    if (!code) return
    setErr(null)
    try {
      const r = await authFetch(`/api/games/${code}`, { cache: 'no-store' })
      if (!r.ok) throw new Error(await r.text())
      const raw = await r.json()
      const normalized: Game = {
        code: raw.code ?? code,
        phase: raw.phase ?? toPhase(raw.status),
        lobby_locked: raw.lobby_locked ?? (raw.is_open === false),
        total_rounds: raw.total_rounds ?? raw.roundsCount ?? 3,
        active_round_index: raw.active_round_index ?? raw.activeRoundIndex ?? 0,
        prep_seconds: raw.prep_seconds ?? raw.prepSeconds ?? 10,
        question_seconds: raw.question_seconds ?? raw.questionSeconds ?? 45,
        scoring_mode: raw.scoring_mode ?? raw.scoringMode ?? 'simple',
        timer_deadline: raw.timer_deadline ?? raw.timerDeadline ?? null,
      }
      setGame(prev => {
        // Ak server ešte neprepol fázu, zachovaj lokálne rozpracované "round_setup"
        if (prev?.phase === 'round_setup' && normalized.phase === 'config') {
          return { ...prev, ...normalized, phase: 'round_setup' }
        }
        return normalized
      })

      // Fetch current players in lobby/ game
      try {
        const rp = await authFetch(`/api/games/${code}/players`, { cache: 'no-store' })
        if (rp.ok) {
          const pj = await rp.json()
          setPlayers(pj.players || [])
        }
      } catch {}
    } catch (e:any) { setErr(e?.message ?? 'Chyba') }
  }, [code])

  useEffect(() => {
    if (transitioning) return
    refresh()
    const t = setInterval(refresh, 2500)
    return () => clearInterval(t)
  }, [refresh, transitioning])

  async function post(url: string, body?: any) {
    setBusy(true); setErr(null); setTransitioning(true)
    try {
      const r = await authFetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      })
      if (!r.ok) {
        let msg = await r.text()
        try {
          msg = JSON.parse(msg).error || msg
        } catch {}
        throw new Error(msg)
      }
      await refresh()
    } catch (e:any) { setErr(e?.message ?? 'Chyba') }

    finally { setBusy(false) }
  }

  const createGame = useCallback(async () => {
    setBusy(true); setErr(null)
    try {
      const r = await authFetch('/api/games', { method: 'POST' })
      if (r.status === 401) {
        // session expirovala alebo chýba – presmeruj na login
        if (typeof window !== 'undefined') window.location.href = '/login'
        return
      }
      if (!r.ok) throw new Error(await r.text())
      const j = await r.json()
      setCode(j.code || j.gameCode)
      setGame(null)
      // reset konfigurácie pre novú hru
      setTotalRounds(3)
      setPrepSec(10)
      setQSec(45)
      setScoring('simple')
      setRoundIx(0)
      setRoundCfg({ topic: '', questions: 5 })
      setPlayers([])
    } catch (e:any) { setErr(e?.message ?? 'Chyba') }
    finally { setBusy(false) }
  }, [authFetch])

  async function endGame() {
    if (!code) return
    setBusy(true); setErr(null)
    try {
      const r = await authFetch(`/api/games/${code}/end`, { method: 'POST' })
      if (!r.ok) throw new Error(await r.text())
      setCode('')
      setGame(null)
      setTotalRounds(3)
      setPrepSec(10)
      setQSec(45)
      setScoring('simple')
      setRoundIx(0)
      setRoundCfg({ topic: '', questions: 5 })
      setPlayers([])
    } catch (e:any) { setErr(e?.message ?? 'Chyba') }
    finally { setBusy(false) }

  }

  if (!code) {
    return (
      <div className="rounded border p-4">
        <div className="font-medium mb-1">Panel moderátora</div>
        <div className="text-sm text-muted-foreground">Zadaj kód hry alebo vytvor novú.</div>
        <div className="mt-2 flex gap-2">
          <input className="border rounded px-2 py-1"
                 placeholder="Kód (napr. BNQ7R2)"
                 value={code}
                 onChange={(e)=>setCode(e.target.value.toUpperCase().trim())}/>
          <button className="rounded bg-black text-white px-3 py-1" onClick={refresh}>Načítať</button>
        </div>
      </div>
    )
  }

  const g = game

  async function startCountdown() {
    if (!code || !g) return
    const seconds = g.question_seconds ?? 45
    await post(`/api/games/${code}/rounds/timer/start`, { seconds })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      await post(`/api/games/${code}/rounds/lock`)
      await post(`/api/games/${code}/rounds/results`)
      await post(`/api/games/${code}/rounds/next`)
    }, seconds * 1000)
  }

  const joinUrl = useMemo(() => {
    if (!code) return ''
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || ''
    const langSegment =
      typeof window !== 'undefined'
        ? window.location.pathname.split('/')[1]
        : ''
    return `${origin}/${langSegment}/play/${encodeURIComponent(code)}`
  }, [code])

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="font-medium">Panel moderátora</div>


      {err && <div className="text-sm text-red-600">Chyba: {err}</div>}

      {/* KROK 1: Lobby + zamknutie */}
      {g?.phase === 'lobby' && (
        <div className="space-y-2">
          <div className="text-sm">Zdieľaj link / QR, počkaj na hráčov.</div>

          <div className="flex flex-wrap items-start gap-4">
            <img
              alt="QR kód na pripojenie"
              className="h-40 w-40 rounded border bg-white p-2"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(joinUrl)}`}
            />
            <div className="space-y-2">
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm break-all text-blue-600 underline"
              >
                {joinUrl}
              </a>
              <button
                className="rounded bg-slate-800 text-white px-3 py-1"
                onClick={() => navigator.clipboard?.writeText(joinUrl)}
              >
                Skopírovať link
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Prihlásení hráči ({players.length}):</div>
            <ul className="text-sm list-disc pl-6">
              {players.map(p => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </div>

          <div>

            <button className="rounded bg-amber-600 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/lock-lobby`, { locked: true })}>
              Zamknúť prihlasovanie
            </button>
          </div>
        </div>
      )}

      {/* KROK 2: Konfigurácia hry (po zamknutí lobby) */}
      {g?.phase === 'config' && (
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium">Prihlásení hráči ({players.length}):</div>
            <ul className="text-sm list-disc pl-6">
              {players.map(p => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          </div>

          <div className="font-medium text-sm">Nastavenie hry</div>
          <div className="text-xs text-muted-foreground">
            Zadajte počet kôl. Detaily jednotlivých kôl nastavíte v ďalšom kroku.
          </div>

          <div className="flex flex-wrap gap-3 items-end">
            <label className="text-sm">Počet kôl
              <input type="number" min={1} className="block border rounded px-2 py-1"
                     value={totalRounds} onChange={e=>setTotalRounds(parseInt(e.target.value||'1',10))}/>
            </label>
            <button
              className="rounded bg-green-600 text-white px-3 py-1 disabled:opacity-50"
              disabled={busy}
              onClick={async () => {
                await post(`/api/games/${code}/config`, {
                  rounds: totalRounds,
                  prepSeconds: prepSec,
                  questionSeconds: qSec,
                  scoring: scoring,
                })
                // Prepnime lokálnu fázu na nastavovanie jednotlivých kôl
                setGame(g => g ? { ...g, phase: 'round_setup', total_rounds: totalRounds } : g)
                setRoundIx(0)
                setRoundCfg({ topic: '', questions: 5 })
              }}
            >
              Uložiť & pokračovať
            </button>
          </div>
        </div>
      )}

      {/* KROK 3: Nastavenie kôl po jednom */}
      {g?.phase === 'round_setup' && (
        <div className="space-y-2">
          <div className="text-sm">Nastavenie kola {roundIx+1}/{g.total_rounds}</div>
          <div className="flex gap-3 items-end">
            <label className="text-sm">Kategória
              <select className="block border rounded px-2 py-1"
                      value={roundCfg.categoryId ?? ''}
                      onChange={e=>setRoundCfg(c=>({ ...c, categoryId: e.target.value }))}>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="text-sm">Počet otázok
              <input type="number" min={1} className="block border rounded px-2 py-1"
                     value={roundCfg.questions ?? 5}
                     onChange={e=>setRoundCfg(c=>({ ...c, questions: parseInt(e.target.value||'1',10) }))}/>
            </label>
            <button className="rounded bg-blue-600 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={async ()=>{
                      await post(`/api/games/${code}/rounds/config`, {
                        index: roundIx,
                        categoryId: roundCfg.categoryId,
                        questions: roundCfg.questions,
                      })
                      const last = (roundIx + 1) >= (g.total_rounds || 1)
                      if (last) {
                        await post(`/api/games/${code}/rounds/start`, { index: 0 })
                      } else {
                        setRoundIx(x=>x+1)
                        await refresh()
                      }
                    }}>
              {(roundIx + 1) >= (g.total_rounds || 1) ? 'Ideme hrať' : 'Nastaviť ďalšie kolo'}
            </button>
          </div>
        </div>
      )}

      {/* KROK 4: Priebeh kola – odpočet, lock, reveal */}
      {(g?.phase === 'playing' || g?.phase === 'locked' || g?.phase === 'reveal') && (
        <div className="space-y-2">
          <div className="text-sm">
            Kolo { (g.active_round_index ?? 0)+1 } / {g.total_rounds} • Fáza: <b>{g.phase}</b>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded bg-slate-800 text-white px-3 py-1 disabled:opacity-50"
              disabled={busy || g.phase !== 'playing'}
              onClick={startCountdown}
            >
              Spustiť odpočet
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            Uzamknutie, vyhodnotenie aj prechod na ďalšiu otázku prebehne automaticky po odpočte.
          </div>
          {g.timer_deadline && (
            <div className="text-xs text-muted-foreground">
              Deadline: {new Date(g.timer_deadline).toLocaleTimeString()}
            </div>
          )}
        </div>
      )}

      {/* KROK 6: Záverečné výsledky s „revealom“ odspodu */}
      {g?.phase === 'final' && (
        <FinalReveal code={code}/>
      )}
    </div>
  )
}

function FinalReveal({ code }: { code: string }) {
  const [board, setBoard] = useState<{team:string; points:number}[]>([])
  const [shown, setShown] = useState(0) // koľko spodných miest je odhalených

  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/games/${code}/leaderboard`, { cache: 'no-store' })
      if (r.ok) setBoard(await r.json())
    })()
  }, [code])

  const ordered = board.slice().sort((a,b)=>a.points-b.points) // od posledného
  const toShow = ordered.slice(0, shown)

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm">Záverečné poradie</div>
      <button className="rounded bg-slate-900 text-white px-3 py-1"
              onClick={()=>setShown(s=> Math.min(s+1, ordered.length-1))}>
        Odhaľ ďalšie miesto
      </button>
      <ul className="text-sm list-decimal pl-6">
        {toShow.map((t,i)=>(
          <li key={t.team}>{t.team} — {t.points} b</li>
        ))}
      </ul>
      {shown >= ordered.length-1 && (
        <div className="mt-3 p-3 rounded border">
          🏆 <b>TOP 2</b>: {ordered.slice(-2).map(t=>t.team).join(' vs ')} — odhaľte víťaza manuálne pre maximálne napätie 😉
        </div>
      )}
    </div>
  )
}
