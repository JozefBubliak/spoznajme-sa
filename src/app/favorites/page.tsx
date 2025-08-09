'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
export default function FavoritesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<{ id: number; text: string }[]>([])
  // Zatiaľ pevne dané ID otázok (mock), neskôr načítame z tabuľky `favorites`
  const mockFavoriteIds = [1, 2, 3, 4]
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        fetchFavorites(mockFavoriteIds)
      }
    }
    const fetchFavorites = async (ids: number[]) => {
      const { data, error } = await supabase
        .from('questions')
        .select('id, text')
        .in('id', ids)
      if (!error && data) {
        setFavorites(data)
      }
    }
    getUser()
  }, [router])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Heart className="text-pink-500" /> Obľúbené otázky
        </h1>
        {favorites.length === 0 ? (
          <p className="text-gray-500">Nemáš zatiaľ žiadne obľúbené otázky.</p>
        ) : (
          <ul className="text-left space-y-3 text-gray-800">
            {favorites.map(q => (
              <li key={q.id} className="border-b pb-2">
                {q.text}
              </li>
            ))}
          </ul>
        )}
        <Button variant="outline" onClick={() => router.push('/app')}>
          Naspäť do aplikácie
        </Button>
      </div>
    </div>
  )
}
