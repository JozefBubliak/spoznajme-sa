'use client'
// /sk/herd-vote/lobby — the moderator's entry: create a new game or resume one.
// Login-gated. Players never come here; they join via the code / QR link.
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import AccessGate from '@/components/AccessGate'

type Game = { code: string; phase: string; playerCount: number }

function LobbyContent({ lang }: { lang: string }) {
  const router = useRouter()

  const [games, setGames] = useState<Game[]>([])
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    fetch('/api/games/active')
      .then(r => (r.ok ? r.json() : { games: [] }))
      .then(d => setGames(d.games ?? []))
      .catch(() => {})
  }, [])

  const createGame = async () => {
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

  const phaseLabel = (p: string) => ({
    lobby: '👥 Čaká na hráčov',
    config: '⚙ Nastavenie',
    round_setup: '⚙ Nastavenie kôl',
    playing: '▶ Prebieha',
    final: '🏁 Skončená',
  }[p] ?? p)

  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-12 space-y-6">

        {/* CREATE GAME */}
        <div className="hv-card-glow p-8 space-y-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20 flex items-center justify-center text-3xl">
            🎮
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Nová hra</h1>
            <p className="text-sm text-white/50 mt-1">
              Ty si moderátor. Vytvor hru, ukáž hráčom QR kód a riaď priebeh.
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
            className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl"
          >
            {creating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Vytváram…
              </span>
            ) : '+ Vytvoriť hru'}
          </button>
        </div>

        {/* ACTIVE GAMES — resume */}
        {games.length > 0 && (
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

        {/* Player? not here */}
        <p className="text-center text-xs text-white/35">
          Chceš sa len pripojiť ako hráč?{' '}
          <Link href={`/${lang}/herd-vote`} className="text-purple-300/80 hover:text-purple-200 underline underline-offset-2">
            Zadaj kód hry
          </Link>
        </p>

      </div>
    </div>
  )
}

// ── Page export — wraps with AccessGate ──────────────────────────────────────
export default function HerdVoteLobbyPage() {
  const params = useParams() as { lang?: string }
  const lang = params?.lang ?? 'sk'
  return (
    <AccessGate productSlug="herd-vote" lang={lang}>
      <LobbyContent lang={lang} />
    </AccessGate>
  )
}
