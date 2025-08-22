'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

const groupLabels = {
  partneri: '🟣 Partneri',
  kamarati: '🔵 Kamaráti',
  rodina: '🟢 Rodina',
  rodic_dieta: '🟠 Rodič–dieťa',
}

type GroupKey = keyof typeof groupLabels

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState<any>(null)
  const [groupState, setGroupState] = useState<Record<GroupKey, boolean>>({
    partneri: false,
    kamarati: false,
    rodina: false,
    rodic_dieta: false,
  })
  const [status, setStatus] = useState<1 | 2 | 3 | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      let tries = 0
      let session = null

      while (!session && tries < 5) {
        const result = await supabase.auth.getSession()
        session = result.data.session
        if (!session) {
          await new Promise(resolve => setTimeout(resolve, 300))
          tries++
        }
      }

      const user = session?.user
      if (!user) {
        router.replace('/auth')
      } else if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
        router.replace('/')
      } else {
        setUser(user)
      }

      setIsLoading(false)
    }

    fetchUser()
  }, [router])

  useEffect(() => {
    fetchNextQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchNextQuestion = async () => {
    setStatus(null)

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .is('admin_status', null)
      .order('id', { ascending: true })
      .limit(1)

    if (!error && data && data.length > 0) {
      const q = data[0]
      console.log('[DEBUG] Načítaná otázka:', q.id, q.text)
      setQuestion(q)
      setGroupState({
        partneri: q.partneri,
        kamarati: q.kamarati,
        rodina: q.rodina,
        rodic_dieta: q.rodic_dieta,
      })
    } else {
      setQuestion(null)
    }
  }

  const handleSaveAndNext = async () => {
    if (!question) return

    const updateData = {
      ...groupState,
      admin_status: status ?? 3, // ak nič neklikneš, berieme ako OK
    }

    console.log('[DEBUG] Ukladám otázku:', question.id)
    console.log('[DEBUG] Dáta:', updateData)

    const { error } = await supabase
      .from('questions')
      .update(updateData)
      .eq('id', question.id)

    if (!error) {
      setStatus(null)
      fetchNextQuestion()
    } else {
      console.error('Chyba pri ukladaní:', error)
    }
  }

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Načítavam používateľa...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 space-y-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> Admin rozhranie
        </h1>

        {question ? (
          <>
            <p className="text-sm text-gray-500">ID otázky: <strong>{question.id}</strong></p>
            <p className="text-lg font-medium text-gray-800">{question.text}</p>

            <div className="grid grid-cols-2 gap-4 text-left">
              {Object.keys(groupLabels).map((key) => {
                const groupKey = key as GroupKey
                return (
                  <label key={groupKey} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={groupState[groupKey]}
                      onChange={() =>
                        setGroupState(prev => ({ ...prev, [groupKey]: !prev[groupKey] }))
                      }
                    />
                    <span>{groupLabels[groupKey]}</span>
                  </label>
                )
              })}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant={status === 1 ? 'destructive' : 'outline'}
                onClick={() => setStatus(1)}
              >
                ❌ Potrebné upraviť
              </Button>

              <Button
                variant={status === 2 ? 'destructive' : 'outline'}
                onClick={() => setStatus(2)}
              >
                🗑️ Označiť na zmazanie
              </Button>

              <Button
                variant={status === 3 ? 'default' : 'outline'}
                onClick={() => setStatus(3)}
              >
                ✅ Text v poriadku
              </Button>
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveAndNext} className="w-full">
                Uložiť a ďalšia otázka
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Žiadne ďalšie otázky na spracovanie.
          </p>
        )}
      </div>
    </div>
  )
}
