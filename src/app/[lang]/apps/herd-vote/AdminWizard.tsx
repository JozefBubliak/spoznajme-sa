// src/app/[lang]/apps/herd-vote/AdminWizard.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
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

  // konfig
  const [totalRounds, setTotalRounds] = useState(3)
  const [prepSec, setPrepSec] = useState(10)
  const [qSec, setQSec] = useState(45)
  const [scoring, setScoring] = useState<'simple'|'weighted'>('simple')
  const [roundIx, setRoundIx] = useState(0)
  const [roundCfg, setRoundCfg] = useState<RoundCfg>({ categoryId: '', questions: 5 })
  const [categories, setCategories] = useState<Category[]>([])

  // 1) zisti kód aktívnej hry (ak ho wizard nedostal cez props)
  useEffect(() => {
    if (codeProp) return
    ;(async () => {
      try {
        const r = await authFetch('/api/games/active', { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          if (j?.code) setCode(j.code)
        }
      } catch {}
    })()
  }, [codeProp])

  // 2) polling stavu hry
  const authFetch = (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    }
    return fetch(url, { ...options, headers })
  }

  // načítanie kategórií z databázy
  useEffect(() => {
    if (!code || !session) return
    ;(async () => {
      try {
        const r = await authFetch('/api/herd-vote/categories', { cache: 'no-store' })
        if (!r.ok) return
        const j = await r.json()
        const cats: Category[] = Array.isArray(j.categories)
          ? j.categories.map((c: any) => ({
              id: String(c.id ?? c.slug ?? c.value ?? ''),
              name: String(c.name ?? c.title ?? c.label ?? c.slug ?? ''),
              count:
                typeof c.count === 'number'
                  ? c.count
                  : typeof c.questionsCount === 'number'
                    ? c.questionsCount
                    : undefined,
            }))
          : []
        setCategories(cats)
        if (!roundCfg.categoryId && cats.length > 0) {
          setRoundCfg(c => ({ ...c, categoryId: cats[0].id }))
        }
      } catch {}
    })()
  }, [code, session])

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
      setGame(normalized)
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
        body: body ? JSON.stringify(body) : undefined,
      })
      if (!r.ok) throw new Error(await r.text())
      await refresh()
    } catch (e:any) { setErr(e?.message ?? 'Chyba') }
    finally { setBusy(false); setTransitioning(false) }
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

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-medium">Panel moderátora</div>
        <div className="text-sm">Kód hry: <span className="font-mono">{code}</span></div>
      </div>

      {err && <div className="text-sm text-red-600">Chyba: {err}</div>}

      {/* KROK 1: Lobby + zamknutie */}
      {g?.phase === 'lobby' && (
        <div className="space-y-2">
          <div className="text-sm">Zdieľaj link / QR, počkaj na hráčov.</div>
          <div className="flex gap-2">
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
          <div className="font-medium text-sm">Zvoľte si počet kôl</div>
          <div className="flex flex-wrap gap-3 items-end">
            <label className="text-sm">Počet kôl
              <input type="number" min={1} className="block border rounded px-2 py-1"
                     value={totalRounds} onChange={e=>setTotalRounds(parseInt(e.target.value||'1',10))}/>
            </label>
            <label className="text-sm">Príprava (s)
              <input type="number" min={0} className="block border rounded px-2 py-1"
                     value={prepSec} onChange={e=>setPrepSec(parseInt(e.target.value||'0',10))}/>
            </label>
            <label className="text-sm">Čas na otázku (s)
              <input type="number" min={10} className="block border rounded px-2 py-1"
                     value={qSec} onChange={e=>setQSec(parseInt(e.target.value||'10',10))}/>
            </label>
            <label className="text-sm">Bodovanie
              <select className="block border rounded px-2 py-1"
                      value={scoring} onChange={e=>setScoring(e.target.value as any)}>
                <option value="simple">Jednoduché</option>
                <option value="weighted">Hmotnostné</option>
              </select>
            </label>
            <button className="rounded bg-green-600 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/config`, {
                      totalRounds, prepSeconds: prepSec, questionSeconds: qSec, scoringMode: scoring
                    })}>
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
            <button className="rounded bg-slate-800 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/rounds/timer/start`, { seconds: g.question_seconds ?? 45 })}>
              Spustiť odpočet
            </button>
            <button className="rounded bg-violet-700 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/rounds/lock`)}>
              Uzamknúť odpovede
            </button>
            <button className="rounded bg-indigo-700 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/rounds/results`)}>
              Zobraziť správnu odpoveď (hráčom)
            </button>
            <button className="rounded bg-blue-600 text-white px-3 py-1 disabled:opacity-50"
                    disabled={busy}
                    onClick={()=>post(`/api/games/${code}/rounds/next`)}>
              Ďalšia otázka / kolo
            </button>
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
