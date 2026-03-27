'use client'
import { useEffect, useState, useCallback } from 'react'

export default function useGameState(code: string) {
  const [game, setGame] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(() => {
    if (!code) return
    setLoading(true)
    fetch(`/api/games/${code}`)
      .then(res => res.json())
      .then(data => setGame(data))
      .finally(() => setLoading(false))
  }, [code])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { game, loading, refetch }
}
