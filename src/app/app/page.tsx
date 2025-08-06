'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'

const groupOptions = ['partneri', 'kamarati', 'rodina', 'rodic_dieta'] as const

export default function AppPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<typeof groupOptions[number] | null>(null)
  const [question, setQuestion] = useState<string | null>(null)
  const [questionCount, setQuestionCount] = useState<number>(0)
  const [isPaid, setIsPaid] = useState<boolean>(false)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        const paid = localStorage.getItem('paid') === 'true'
        setIsPaid(paid)
      } else {
        navigate('/login')
      }

      setIsLoading(false)
    }

    getUser()
  }, [navigate])

  useEffect(() => {
    if (!isPaid) {
      const today = new Date().toISOString().slice(0, 10)
      const lastUsed = localStorage.getItem('last_use_date')
      if (lastUsed !== today) {
        localStorage.setItem('last_use_date', today)
        localStorage.setItem('question_count', '0')
      }
      const count = parseInt(localStorage.getItem('question_count') || '0')
      setQuestionCount(count)
    }
  }, [isPaid])

  useEffect(() => {
    if (group) {
      fetchQuestion()
    }
  }, [group])

  const fetchQuestion = async () => {
    if (!group) return

    if (!isPaid && questionCount >= 2) {
      alert('Pre dnešok si už použil 2 otázky. Odomkni plnú verziu.')
      return
    }

    const { data, error } = await supabase
      .from('questions')
      .select('text')
      .eq(group, true)

    if (error) {
      console.error('Chyba pri načítaní otázky:', error)
      return
    }

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      setQuestion(data[randomIndex].text)

      if (!isPaid) {
        const count = questionCount + 1
        localStorage.setItem('question_count', count.toString())
        setQuestionCount(count)
      }
    } else {
      setQuestion('Žiadne otázky pre túto skupinu.')
    }
  }

  if (isLoading) {
    return <div className="text-center p-10 text-gray-500">Načítavam...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-xl w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
          <Brain className="text-pink-500" /> Spoznajme sa
        </h1>

        {!group ? (
          <>
            <p className="text-gray-600">Vyber si skupinu:</p>
            <div className="grid grid-cols-2 gap-2">
              {groupOptions.map(option => (
                <Button
                  key={option}
                  onClick={() => setGroup(option)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {option.charAt(0).toUpperCase() + option.slice(1).replace('_', '–')}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-800">{question || 'Načítavam otázku...'}</p>

            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={fetchQuestion}>Ďalšia otázka</Button>
              <Button variant="outline" onClick={() => setGroup(null)}>
                Zmeniť skupinu
              </Button>
            </div>

            {!isPaid && (
              <p className="text-sm text-gray-500 mt-2">
                {questionCount}/2 otázok dnes zdarma. Viac odomkneš po platbe.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
