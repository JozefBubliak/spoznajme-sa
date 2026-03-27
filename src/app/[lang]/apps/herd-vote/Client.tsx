'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminPanel from '@/components/AdminPanel'
import Button from '@/components/quiz/Button'
import { supabaseClient } from '@/integrations/supabase/client'

interface ClientProps {
  lang: string
}

export default function HerdVoteClient({ lang }: ClientProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<any[]>([])
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession()
      if (!session?.user) {
        router.replace(`/${lang}/auth/login`)
        return
      }
      setUser(session.user)
      setLoading(false)

      // Load user's games
      fetchGames(session.user.id)
    }

    checkUser()
  }, [lang, router])

  const fetchGames = async (userId: string) => {
    try {
      const response = await fetch('/api/games/active')
      if (response.ok) {
        const data = await response.json()
        setGames(data.games || [])
      }
    } catch (error) {
      console.error('Failed to fetch games:', error)
    }
  }

  const createGame = async () => {
    setCreating(true)
    try {
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/${lang}/play/${data.gameCode}`)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Failed to create game:', error)
      alert('Failed to create game')
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div>Loading...</div>
    </div>
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐂 Herd Vote Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Vytvorte multiplayer kvízovú hru pre vašich priateľov alebo študentov
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Vytvoriť novú hru</h2>
          <Button
            onClick={createGame}
            disabled={creating}
            className="w-full py-3 text-lg"
          >
            {creating ? 'Vytváram...' : '🎮 Vytvoriť hru'}
          </Button>
        </div>

        {games.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Vaše aktívne hry</h2>
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game.code} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Hra {game.code}</div>
                    <div className="text-sm text-gray-500">
                      Fáza: {game.phase} • Hráči: {game.playerCount || 0}
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push(`/${lang}/play/${game.code}`)}
                    className="px-4 py-2"
                  >
                    Otvoriť
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}