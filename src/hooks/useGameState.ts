'use client'
import { useEffect, useState } from 'react'

export default function useGameState(code: string) {
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!code) return
    setLoading(true)
    fetch(`/api/games/${code}`)
      .then(res => res.json())
      .then(data => setGame(data))
      .finally(() => setLoading(false))
  }, [code])

  return { game, loading }
}
