'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/integrations/supabase/client'

interface Game { code: string; phase: string; playerCount: number }

export default function HerdVoteClient({ lang }: { lang: string }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<Game[]>([])
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) { router.replace(`/${lang}/auth/login`); return }
      setUser(session.user)
      setLoading(false)
      fetch('/api/games/active').then(r => r.ok ? r.json() : { games: [] })
        .then(d => setGames(d.games ?? []))
        .catch(() => {})
    })
  }, [lang, router])

  const createGame = async () => {
    setCreating(true); setErr('')
    try {
      const r = await fetch('/api/games', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const d = await r.json()
      if (r.ok && d.gameCode) {
        router.push(`/${lang}/play/${d.gameCode}`)
      } else {
        setErr(d.error ?? 'Chyba pri vytváraní hry')
        setCreating(false)
      }
    } catch {
      setErr('Chyba spojenia')
      setCreating(false)
    }
  }

  const phaseLabel = (p: string) => ({
    lobby: '👥 Lobby', config: '⚙ Nastavenie', round_setup: '⚙ Nastavenie kôl',
    playing: '▶ Prebieha', final: '🏁 Skončená',
  }[p] ?? p)

  const phaseColor = (p: string) => ({
    lobby: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    playing: 'bg-green-500/20 text-green-300 border-green-500/30',
    final: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  }[p] ?? 'bg-gray-500/20 text-gray-300 border-gray-500/30')

  if (loading) return (
    <div className="hv-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full animate-spin" />
        <p className="hv-text-muted text-sm">Načítavam…</p>
      </div>
    </div>
  )

  return (
    <div className="hv-bg hv-particles">
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* Header */}
        <header className="text-center pt-6 space-y-3">
          <div className="inline-flex items-center gap-2 hv-badge bg-purple-500/15 text-purple-300 border border-purple-500/20 mb-2">
            <span>🐂</span>
            <span>Multiplayer Quiz</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            <span className="hv-text-gradient">Herd Vote</span>
          </h1>
          <p className="hv-text-muted text-lg max-w-md mx-auto leading-relaxed">
            Hraj spolu. Mysli rovnako. Vyhraj ako skupina.
          </p>
        </header>

        {/* Create new game */}
        <div className="hv-card-glow p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-3xl">
            🎮
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Nová hra</h2>
            <p className="hv-text-muted text-sm mt-1">
              Vytvor hru, zdieľaj QR kód s hráčmi a začni.
            </p>
          </div>
          {err && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-300 text-sm">
              {err}
            </div>
          )}
          <button
            onClick={createGame}
            disabled={creating}
            className="hv-btn-primary w-full py-4 text-lg"
          >
            {creating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Vytváram…
              </span>
            ) : (
              '+ Vytvoriť hru'
            )}
          </button>
        </div>

        {/* Active games */}
        {games.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="hv-text-muted text-xs font-semibold uppercase tracking-widest">Moje aktívne hry</h2>
              <div className="flex-1 hv-divider" />
            </div>
            {games.map(g => (
              <div key={g.code}
                className="hv-card p-5 flex items-center gap-4 cursor-pointer group"
                onClick={() => router.push(`/${lang}/play/${g.code}`)}>
                <div className="flex-1 min-w-0">
                  <div className="font-mono font-black text-white text-xl tracking-[0.2em]">{g.code}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`hv-badge text-[0.65rem] border ${phaseColor(g.phase)}`}>
                      {phaseLabel(g.phase)}
                    </span>
                    <span className="hv-text-dim text-xs">·</span>
                    <span className="hv-text-muted text-xs">{g.playerCount} hráčov</span>
                  </div>
                </div>
                <button className="hv-btn-secondary px-4 py-2.5 text-sm group-hover:bg-purple-500/20 group-hover:border-purple-500/30 group-hover:text-purple-200 transition-all">
                  Otvoriť →
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
