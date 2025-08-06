'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { BrainIcon, Share2, Heart } from 'lucide-react'

const groupOptions = ['partneri', 'kamarati', 'rodina', 'rodic_dieta'] as const
type GroupKey = (typeof groupOptions)[number]

const FREE_IDS: Record<GroupKey, number[]> = {
  partneri: [1365, 7458, 6537, 7809, 5297, 2820, 4177, 5448, 6328, 7058],
  kamarati: [1910, 7999, 187, 1560, 3922, 6945, 4879, 2400, 5267, 1457],
  rodina: [4393, 2844, 8874, 2100, 2863, 5500, 1417, 1425, 7494, 7674],
  rodic_dieta: [1160, 27, 3350, 3587, 5715, 1225, 3599, 2253, 4116, 2356],
}

export default function FreePage() {
  const [group, setGroup] = useState<GroupKey | null>(null)
  const [questionText, setQuestionText] = useState<string | null>(null)
  const [shownIds, setShownIds] = useState<number[]>([])
  const router = useRouter()

  const MAX_QUESTIONS = 10

  useEffect(() => {
    if (group) {
      setShownIds([])
      setQuestionText(null)
      fetchNextQuestion(group, [])
    }
  }, [group])

  const fetchNextQuestion = async (group: GroupKey, used: number[]) => {
    const availableIds = FREE_IDS[group].filter(id => !used.includes(id))

    if (availableIds.length === 0) {
      setQuestionText(null)
      return
    }

    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)]

    const { data, error } = await supabase
      .from('questions')
      .select('id, text')
      .eq('id', randomId)
      .single()

    if (error || !data) {
      console.error('Chyba pri načítaní otázky:', error)
      setQuestionText('Nepodarilo sa načítať otázku.')
      return
    }

    setShownIds(prev => [...prev, data.id])
    setQuestionText(data.text)
  }

  const handleNext = () => {
    if (group) {
      fetchNextQuestion(group, shownIds)
    }
  }

  const hasSeenAllInGroup = group ? shownIds.length >= FREE_IDS[group].length : false
  const seenAllGroups = groupOptions.every(gr =>
    shownIds.length >= FREE_IDS[gr as GroupKey].length
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-xl w-full transition-all">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
          <BrainIcon className="text-pink-500" /> Spoznajme sa
        </h1>

        {!group ? (
          <>
            <p className="text-gray-600">S kým sa chcete lepšie spoznať?</p>
            <div className="grid grid-cols-2 gap-2">
              {groupOptions.map(option => (
                <Button
                  key={option}
                  onClick={() => setGroup(option)}
                  disabled={shownIds.length >= FREE_IDS[option].length}
                  className={`${
                    shownIds.length >= FREE_IDS[option].length
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' –')}
                </Button>
              ))}
            </div>
          </>
        ) : questionText !== null ? (
          <>
            <p className="text-lg font-medium text-gray-800">{questionText}</p>

            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleNext}>Ďalšia otázka</Button>
              <Button variant="outline" onClick={() => setGroup(null)}>
                Zmeniť skupinu
              </Button>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-sm text-blue-600 underline">
              <button onClick={() => navigator.clipboard.writeText(questionText)}>
                <Share2 size={16} className="inline mr-1" /> Skopírovať otázku
              </button>
              <span className="opacity-50 cursor-not-allowed">
                <Heart size={16} className="inline mr-1" /> Len pre prihlásených
              </span>
            </div>
          </>
        ) : hasSeenAllInGroup ? (
          <>
            <p className="text-gray-800">
              Zobrazil si všetky otázky pre skupinu{' '}
              <span className="font-semibold">{group.replace('_', ' –')}</span>.
            </p>
            <p className="text-sm text-gray-500">
              Chceš skúsiť inú skupinu alebo odomknúť všetky otázky?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" onClick={() => setGroup(null)}>
                Iná skupina
              </Button>
              <Button onClick={() => router.push('/login')}>Získať plný prístup</Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">Načítavam...</p>
        )}
      </div>
    </div>
  )
}
