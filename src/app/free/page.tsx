
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { BrainIcon, Share2, Heart } from 'lucide-react'
import Layout from '@/components/Layout'

const groupOptions = ['partneri', 'kamarati', 'rodina', 'rodic_dieta'] as const
type GroupKey = (typeof groupOptions)[number]

const groupLabels: Record<GroupKey, string> = {
  partneri: '💑 Partneri',
  kamarati: '👫 Kamaráti',
  rodina: '👨‍👩‍👧‍👦 Rodina',
  rodic_dieta: '👨‍👧 Rodič – Dieťa'
}

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              {group ? groupLabels[group] : 'Spoznajme sa - Zadarmo'}
            </h1>
            <p className="text-purple-100 mt-2">Bezplatné otázky pre lepšie spoznanie</p>
          </div>

          <div className="p-6 md:p-8">
            {!group ? (
              <>
                <p className="text-gray-600 text-center text-lg mb-6">
                  S kým sa chceš lepšie spoznať?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupOptions.map(option => (
                    <Button
                      key={option}
                      onClick={() => setGroup(option)}
                      disabled={shownIds.length >= FREE_IDS[option].length}
                      className={`h-16 text-lg ${
                        shownIds.length >= FREE_IDS[option].length
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      }`}
                    >
                      {groupLabels[option]}
                    </Button>
                  ))}
                </div>
              </>
            ) : questionText !== null ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-6 md:p-8">
                    <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                      {questionText}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                    Ďalšia otázka
                  </Button>
                  <Button variant="outline" onClick={() => setGroup(null)}>
                    Zmeniť skupinu
                  </Button>
                </div>

                <div className="flex justify-center gap-4 mt-4 text-sm">
                  <button 
                    onClick={() => navigator.clipboard.writeText(questionText)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Share2 size={16} /> Skopírovať otázku
                  </button>
                  <button
                    onClick={() => router.push('/auth/login')}
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <Heart size={16} /> Označiť ako obľúbenú
                  </button>
                </div>
              </div>
            ) : hasSeenAllInGroup ? (
              <div className="text-center space-y-6">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Všetky bezplatné otázky videné!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Zobrazil si všetky otázky pre skupinu{' '}
                    <span className="font-semibold">{group ? groupLabels[group] : ''}</span>.
                  </p>
                  <p className="text-gray-700 text-lg">
                    Chceš pokračovať a získať prístup k ďalším otázkam zdarma každý deň? 
                    <strong> Prihlás sa alebo si kúp plný prístup.</strong>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="outline" onClick={() => setGroup(null)}>
                    Iná skupina
                  </Button>
                  <Button
                    onClick={() => router.push('/auth/login')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Prihlásiť sa zdarma
                  </Button>
                  <Button
                    onClick={() => router.push('/upgrade')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Získať plný prístup
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400">Načítavam...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
