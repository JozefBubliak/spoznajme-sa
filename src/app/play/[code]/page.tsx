// PATH: src/app/play/[code]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RealtimeClient } from '@/lib/realtime/client'
import { channelFor } from '@/lib/realtime/types'

type Player = { id: string; name: string; score: number }

export default function PlayJoinPage() {
  const params = useParams()
  const code = String((params as any)?.code || '').toUpperCase()

  const [name, setName] = useState('')
  const [me, setMe] = useState<Player | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [err, setErr] = useState<string>('')

  // polling lobby
  useEffect(() => {
    let t: any
    const tick = async () => {
      if (!code) return
      try {
        const r = await fetch(`/api/games/${code}/players`, { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          setPlayers(j.players || [])
        }
      } catch {}
      t = setTimeout(tick, 2000)
    }
    tick()
    return () => t && clearTimeout(t)
  }, [code])

  // realtime odbery – START/LOCK/RESULTS
  useEffect(() => {
    if (!code) return
    const ch = channelFor(code)
    const unsub = RealtimeClient.subscribe(ch, (ev) => {
      if (ev.type === 'game:start')   console.log('[PLAYER] START', ev)
      if (ev.type === 'round:lock')   console.log('[PLAYER] LOCK', ev)
      if (ev.type === 'round:results')console.log('[PLAYER] RESULTS', ev)
    })
    return () => unsub()
  }, [code])

  const join = async () => {
    setErr('')
    const n = name.trim()
    if (!n) { setErr('Napíš názov tímu / meno.'); return }
    try {
      const r = await fetch(`/api/games/${code}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n })
      })
      const j = await r.json()
      if (!r.ok) { setErr(j.error || 'Nepodarilo sa pripojiť'); return }
      setMe({ id: j.playerId, name: j.name, score: 0 })
    } catch {
      setErr('Chyba spojenia')
    }
  }

  return (
    <div className='mx-auto max-w-xl p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Herd Vote – pripojenie</h1>
      <div className='text-sm text-gray-600'>Kód hry: <b>{code}</b></div>

      {!me ? (
        <div className='rounded border p-4 space-y-3'>
          <label className='block text-sm'>Názov tímu / meno</label>
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            className='w-full border rounded px-3 py-2'
            placeholder='Napr. Super tím'
          />
          <button onClick={join} className='px-4 py-2 bg-blue-600 text-white rounded'>Pripojiť sa</button>
          {err && <div className='text-red-600 text-sm'>{err}</div>}
        </div>
      ) : (
        <div className='rounded border p-4'>
          Ste prihlásený ako <b>{me.name}</b>. Čakajte na štart kola…
        </div>
      )}

      <div className='rounded border p-4'>
        <div className='font-semibold mb-2'>Lobby ({players.length}):</div>
        <ul className='list-disc pl-6'>
          {players.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      </div>
    </div>
  )
}
