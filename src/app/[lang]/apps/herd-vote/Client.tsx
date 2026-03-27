'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/integrations/supabase/client'

interface Player { id: string; name: string; score: number }

type Phase = 'idle' | 'lobby' | 'config' | 'round_setup' | 'playing' | 'final'

export default function HerdVoteClient({ lang }: { lang: string }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [gameCode, setGameCode] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [lobbyLocked, setLobbyLocked] = useState(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [creating, setCreating] = useState(false)
  const [locking, setLocking] = useState(false)
  const [err, setErr] = useState('')

  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    if (typeof window === 'undefined') return ''
    const origin = window.location.origin
    return `${origin}/${lang}/play/${gameCode}`
  }, [gameCode, lang])

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.replace(`/${lang}/auth/login`)
        return
      }
      setUser(session.user)
      setLoading(false)
    })
  }, [lang, router])

  useEffect(() => {
    if (!gameCode) return

    const fetchGameState = async () => {
      try {
        const res = await fetch(`/api/games/${gameCode}/state`, { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        setPhase(data.phase ?? 'lobby')
        setLobbyLocked(Boolean(data.lobby_locked))
        setPlayers(data.players ?? [])
      } catch {
        // ignore network blips
      }
    }

    fetchGameState()
    const interval = setInterval(fetchGameState, 2000)
    return () => clearInterval(interval)
  }, [gameCode])

  const createGame = async () => {
    setCreating(true)
    setErr('')

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await res.json()
      if (res.ok && json.gameCode) {
        setGameCode(String(json.gameCode).toUpperCase())
        setPhase('lobby')
        setLobbyLocked(false)
        setPlayers([])
      } else {
        setErr(json.error ?? 'Nepodarilo sa vytvoriť hru')
      }
    } catch {
      setErr('Chyba spojenia')
    } finally {
      setCreating(false)
    }
  }

  const copyLink = async () => {
    if (!joinUrl) return
    await navigator.clipboard?.writeText(joinUrl)
  }

  const shareLink = async () => {
    if (!joinUrl) return
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Herd Vote', text: 'Pridaj sa do hry', url: joinUrl })
        return
      } catch {
        // ignore
      }
    }
    await copyLink()
  }

  const lockLobby = async () => {
    if (!gameCode) return
    setLocking(true)
    setErr('')

    try {
      const res = await fetch(`/api/games/${gameCode}/lock-lobby`, { method: 'POST' })
      const json = await res.json()
      if (res.ok) {
        setPhase(json.phase ?? 'config')
        setLobbyLocked(true)
      } else {
        setErr(json.error ?? 'Nepodarilo sa zamknúť lobby')
      }
    } catch {
      setErr('Chyba spojenia')
    } finally {
      setLocking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="pt-8">
          <h1 className="text-4xl font-black text-white">Herd Vote – moderátor</h1>
          <p className="text-gray-400 mt-2">Vytvor hru, pošli link a QR, a čakaj na pripojenie hráčov.</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <button
            onClick={createGame}
            disabled={creating}
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 disabled:opacity-50"
          >
            {creating ? 'Vytváram…' : 'Vytvoriť novú hru'}
          </button>

          {gameCode && (
            <div className="space-y-3 text-white">
              <div className="text-sm">Kód hry</div>
              <div className="text-5xl font-black tracking-wider text-white">{gameCode}</div>

              <div className="text-sm">Link pre hráčov</div>
              <a
                className="text-blue-400 underline break-all"
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {joinUrl}
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={copyLink}
                  className="px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-sm hover:bg-gray-700"
                >
                  Kopírovať link
                </button>
                <button
                  onClick={shareLink}
                  className="px-3 py-2 rounded-md border border-gray-600 bg-black text-sm text-white hover:bg-gray-800"
                >
                  Zdieľať
                </button>
              </div>

              <div className="pt-3 flex justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}`}
                  alt="QR pre pripojenie hráčov"
                  className="border border-gray-700 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {gameCode ? (
          <div className="rounded-2xl border border-gray-800 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Lobby ({players.length} hráčov)</h2>
              <span className="rounded-full px-3 py-1 text-xs font-semibold text-white bg-amber-500">
                {phase === 'lobby' ? 'waiting' : phase}
              </span>
            </div>

            <div className="mt-3 grid gap-2 max-h-40 overflow-y-auto">
              {players.length === 0 ? (
                <p className="text-sm text-gray-500">Zatiaľ nikto neprišiel.</p>
              ) : (
                players.map(player => (
                  <div key={player.id} className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-sm">
                    <span>{player.name}</span>
                    <span>{player.score} b</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={lockLobby}
                disabled={phase !== 'lobby' || lobbyLocked || players.length === 0 || locking}
                className="w-full px-4 py-2 rounded-lg bg-black text-white font-bold hover:bg-gray-800 disabled:opacity-40"
              >
                {locking ? 'Uzatváram…' : 'Zamknúť lobby a nastaviť hru'}
              </button>
            </div>

            {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
          </div>
        ) : null}
      </div>
    </div>
  )
}
