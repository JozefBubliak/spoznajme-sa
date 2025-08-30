// PATH: src/app/[lang]/apps/quiz/Client.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Player } from '@/lib/herdvote/store'
import { useAuth } from '@/hooks/useAuth'
import { UserCircle } from 'lucide-react'

interface Props {
  lang: string
}

export default function QuizAdminClient({ lang }: Props) {
  const router = useRouter()
  const { user, loading, session } = useAuth()

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=/${lang}/apps/quiz`)
  }, [loading, user, router, lang])

  const [gameCode, setGameCode] = useState('')
  const [players, setPlayers] = useState<Player[]>([])

  const authFetch = (url: string, options: RequestInit = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    }
    return fetch(url, { ...options, headers })
  }

  const createGame = async () => {
    const r = await authFetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: {} }),
    })
    const j = await r.json()
    if (j?.gameCode) {
      setGameCode(j.gameCode)
      setPlayers([])
    } else {
      alert(j.error || 'Nepodarilo sa vytvoriť hru')
    }
  }

  useEffect(() => {
    if (!session) return
    if (!gameCode) createGame()
  }, [session, gameCode])

  useEffect(() => {
    if (!gameCode) return
    let id: ReturnType<typeof setInterval>
    const poll = async () => {
      try {
        const r = await authFetch(`/api/games/${gameCode}/players`, { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          setPlayers(Array.isArray(j.players) ? j.players : [])
        }
      } catch {
        // ignore
      }
    }
    poll()
    id = setInterval(poll, 2000)
    return () => clearInterval(id)
  }, [gameCode])

  const joinUrl = useMemo(() => {
    if (!gameCode) return ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/${lang}/play/${gameCode}`
  }, [gameCode, lang])

  const shareJoinUrl = async () => {
    if (!joinUrl) return
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Herd Vote', url: joinUrl })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(joinUrl)
        alert('Link skopírovaný do schránky')
      }
    } catch {
      // ignore
    }
  }

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="mb-4">Na spustenie hry sa prihláste ako moderátor.</p>
        <a className="text-blue-600 underline" href={`/login?next=/${lang}/apps/quiz`}>
          Prihlásiť sa
        </a>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="flex justify-end text-sm text-muted-foreground gap-2 items-center">
        <UserCircle className="h-5 w-5" />
        <span>{user.email}</span>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold">Informácie o hre</h2>
        <div className="space-y-1">
          <div>
            <span className="font-medium">Kód hry:</span> {gameCode || '—'}
          </div>
          {joinUrl && (
            <>
              <div className="break-all">
                <span className="font-medium">Link pre hráčov:</span>{' '}
                <a
                  href={joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {joinUrl}
                </a>
              </div>
              <div className="flex gap-2">
                <button onClick={shareJoinUrl} className="px-2 py-1 text-sm rounded border">
                  Zdieľať
                </button>
              </div>
              <div className="flex justify-center pt-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(joinUrl)}`}
                  alt="QR kód"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border p-4 space-y-4">
        <h2 className="font-semibold">Lobby</h2>
        <div className="space-y-2">
          {players.length > 0 ? (
            players.map(p => (
              <div key={p.id} className="border rounded p-2">
                {p.name}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Zatiaľ sa nikto nepripojil</p>
          )}
        </div>
      </div>
    </div>
  )
}

