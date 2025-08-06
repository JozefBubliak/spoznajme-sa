'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'

export default function HistoryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [history, setHistory] = useState<{ id: number; text: string }[]>([])

  // Na testovanie: pevne zadané ID otázok
  const mockHistoryIds = [5, 6, 7, 8]

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        fetchHistory(mockHistoryIds)
      }
    }

    const fetchHistory = async (ids: number[]) => {
      const { data, error } = await supabase
        .from('questions')
        .select('id, text')
        .in('id', ids)

      if (!error && data) {
        setHistory(data)
      }
    }

    getUser()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Clock className="text-blue-500" /> História otázok
        </h1>

        {history.length === 0 ? (
          <p className="text-gray-500">Zatiaľ si nevidel žiadne otázky.</p>
        ) : (
          <ul className="text-left space-y-3 text-gray-800">
            {history.map(q => (
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
