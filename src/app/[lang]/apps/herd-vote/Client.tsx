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

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="pt-8">
          <h1 className="text-4xl font-black text-white">🐂 Herd Vote</h1>
          <p className="text-gray-400 mt-2">Multiplayer kvíz — vytvor hru, pozvi hráčov, spusti súboj.</p>
        </div>

        {/* Create new */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center space-y-4">
          <div className="text-5xl">🎮</div>
          <h2 className="text-xl font-bold text-white">Nová hra</h2>
          <p className="text-gray-500 text-sm">Vytvor hru, zdieľaj kód s hráčmi a začni.</p>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button
            onClick={createGame}
            disabled={creating}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-800 text-white font-black text-lg hover:brightness-110 disabled:opacity-40 transition-all active:scale-95"
          >
            {creating ? 'Vytváram…' : '+ Vytvoriť hru'}
          </button>
        </div>

        {/* Active games */}
        {games.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-wide">Moje aktívne hry</h2>
            {games.map(g => (
              <div key={g.code}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => router.push(`/${lang}/play/${g.code}`)}>
                <div className="flex-1">
                  <div className="font-mono font-black text-white text-lg tracking-widest">{g.code}</div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    {phaseLabel(g.phase)} · {g.playerCount} hráčov
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-violet-700 hover:bg-violet-600 text-white font-semibold text-sm transition-colors">
                  Otvoriť →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
