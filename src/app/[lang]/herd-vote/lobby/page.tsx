'use client'
// /sk/herd-vote/lobby
// Create a new game (requires login) OR join existing game by code
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabaseClient } from '@/integrations/supabase/client'

type Game = { code: string; phase: string; playerCount: number }

export default function HerdVoteLobbyPage() {
  const router = useRouter()
  const params = useParams() as { lang?: string }
  const lang = params?.lang ?? 'sk'

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  // Join by code
  const [joinCode, setJoinCode] = useState('')
  const [joining, setJoining] = useState(false)
  const [joinErr, setJoinErr] = useState('')

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (session?.user) {
        fetch('/api/games/active')
          .then(r => r.ok ? r.json() : { games: [] })
          .then(d => setGames(d.games ?? []))
          .catch(() => {})
      }
    })
  }, [])

  const createGame = async () => {
    if (!user) {
      router.push(`/auth?next=/${lang}/herd-vote/lobby`)
      return
    }
    setCreating(true)
    setErr('')
    try {
      const r = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const d = await r.json()
      if (r.ok && d.gameCode) {
        router.push(`/${lang}/herd-vote/play/${d.gameCode}`)
      } else {
        setErr(d.error ?? 'Chyba pri vytváraní hry')
        setCreating(false)
      }
    } catch {
      setErr('Chyba spojenia')
      setCreating(false)
    }
  }

  const joinGame = async () => {
    const code = joinCode.trim().toUpperCase()
    if (!code) { setJoinErr('Zadaj kód hry'); return }
    setJoining(true)
    setJoinErr('')
    // Just navigate — _Join.tsx handles actual join
    router.push(`/${lang}/herd-vote/play/${code}`)
  }

  const phaseLabel = (p: string) => ({
    lobby: '👥 Čaká na hráčov',
    config: '⚙ Nastavenie',
    round_setup: '⚙ Nastavenie kôl',
    playing: '▶ Prebieha',
    final: '🏁 Skončená',
  }[p] ?? p)

  if (loading) {
    return (
      <div className="hv-bg flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="hv-bg hv-particles min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-12 space-y-6">

        {/* CREATE GAME */}
        <div className="hv-card-glow p-8 space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-3xl">
            🎮
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Nová hra</h1>
            <p className="text-sm text-white/50 mt-1">
              Vytvor hru, zdieľaj QR kód a začni.
            </p>
          </div>

          {!user && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-sm text-amber-300">
              Na vytvorenie hry sa musíš prihlásiť.
            </div>
          )}

          {err && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-300 text-sm">
              {err}
            </div>
          )}

          <button
            onClick={createGame}
            disabled={creating}
            className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
          >
            {creating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Vytváram…
              </span>
            ) : user ? '+ Vytvoriť hru' : '🔐 Prihlásiť sa a vytvoriť hru'}
          </button>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 uppercase tracking-widest">alebo</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* JOIN BY CODE */}
        <div className="hv-card p-6 space-y-4">
          <h2 className="font-bold text-white text-center">Pripojiť sa ku hre</h2>
          <p className="text-xs text-white/40 text-center">
            Zadaj kód, ktorý ti dal moderátor
          </p>
          <input
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && joinGame()}
            placeholder="Napr. AB12CD"
            maxLength={8}
            className="hv-input w-full px-4 py-3.5 text-center text-2xl font-black font-mono tracking-[0.3em] uppercase"
          />
          {joinErr && (
            <div className="text-red-300 text-sm text-center">{joinErr}</div>
          )}
          <button
            onClick={joinGame}
            disabled={joining || !joinCode.trim()}
            className="hv-btn-secondary w-full py-3.5 font-bold"
          >
            {joining ? 'Hľadám hru…' : 'Pripojiť sa →'}
          </button>
        </div>

        {/* ACTIVE GAMES (logged in) */}
        {user && games.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs text-white/40 uppercase tracking-widest font-semibold px-1">
              Moje aktívne hry
            </h3>
            {games.map(g => (
              <div
                key={g.code}
                onClick={() => router.push(`/${lang}/herd-vote/play/${g.code}`)}
                className="hv-card p-4 flex items-center gap-4 cursor-pointer hover:border-purple-500/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-mono font-black text-white text-lg tracking-[0.2em]">
                    {g.code}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="hv-badge text-[0.65rem] border border-purple-500/30 bg-purple-500/10 text-purple-300">
                      {phaseLabel(g.phase)}
                    </span>
                    <span className="hv-text-dim text-xs">· {g.playerCount} hráčov</span>
                  </div>
                </div>
                <span className="hv-btn-secondary px-3 py-1.5 text-xs">Otvoriť →</span>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  )
}
