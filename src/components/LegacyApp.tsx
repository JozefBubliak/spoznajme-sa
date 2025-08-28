'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useQuestions } from '@/hooks/useQuestions'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Brain, Heart, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react'
import Layout from '@/components/Layout'
import GroupCompletionContent from '@/components/GroupCompletionContent'

const groupOptions = ['partneri', 'kamarati', 'rodina', 'rodic_dieta'] as const
type GroupKey = typeof groupOptions[number]

const groupLabels: Record<GroupKey, string> = {
  partneri: '💑 Partneri',
  kamarati: '👫 Kamaráti',
  rodina: '👨‍👩‍👦 Rodina',
  rodic_dieta: '👨‍👧 Rodič–dieťa'
}

export default function LegacyApp() {
const router = useRouter()
  const { user, isPaid, loading } = useAuth()
  const {
    currentQuestion,
    setCurrentQuestion,
    favorites,
    dailyCount,
    fetchQuestion,
    toggleFavorite,
    getQuestionCounts,
    canViewMore
  } = useQuestions()

  const [group, setGroup] = useState<GroupKey | null>(null)
  const [favoritesMode, setFavoritesMode] = useState(false)
  const [favoritesList, setFavoritesList] = useState<any[]>([])
  const [currentFavoriteIndex, setCurrentFavoriteIndex] = useState(0)
  const [questionCounts, setQuestionCounts] = useState({ total: 0, remaining: 0 })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (group && !favoritesMode) {
      loadQuestionCounts()
    }
  }, [group, isPaid])

  useEffect(() => {
    if (favoritesMode && group) {
      loadFavorites()
    }
  }, [favoritesMode, group, favorites])

  const loadQuestionCounts = async () => {
    if (!group) return
    const counts = await getQuestionCounts(group)
    setQuestionCounts(counts)
  }

    const loadFavorites = async () => {
      const uid = user?.id
      if (!group || !uid) return

      const groupKey = group as GroupKey

      if (false) {
        const { data } = await supabase
          .from('user_favorites')
          .select(`
          question_id,
          questions (
            id, text, partneri, kamarati, rodina, rodic_dieta
          )
        `)
          .eq('user_id', uid)

        const filteredFavorites =
          data?.filter(
            (item: any) =>
              item.questions &&
              Array.isArray(item.questions) &&
              item.questions.length > 0 &&
              item.questions[0][groupKey]
          ) || []

        setFavoritesList(filteredFavorites)
        const first = filteredFavorites[0]?.questions?.[0] ?? null
        setCurrentQuestion(first)
        if (filteredFavorites.length > 0 && first) {
          setCurrentFavoriteIndex(0)
        }
      } else {
        setFavoritesList([])
        setCurrentQuestion(null)
      }
    }

  const handleNextQuestion = async () => {
    if (!group) return

    try {
      setIsLoading(true)

      if (favoritesMode) {
        const nextIndex = (currentFavoriteIndex + 1) % favoritesList.length
        setCurrentFavoriteIndex(nextIndex)
        const nextQuestion = favoritesList[nextIndex]?.questions?.[0] ?? null
        setCurrentQuestion(nextQuestion)
      } else {
        const question = await fetchQuestion(group)
        if (question) {
          setCurrentQuestion(question)
          await loadQuestionCounts()
        } else {
          if (!user) {
            setCurrentQuestion(null)
          } else if (!isPaid && dailyCount >= 2) {
            alert('Denný limit otázok dosiahnutý. Odomkni plný prístup pre viac otázok!')
          } else {
            alert('Videl si už všetky otázky v tejto skupine!')
          }
        }
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevQuestion = () => {
    if (!favoritesMode || favoritesList.length === 0) return

    const prevIndex = currentFavoriteIndex > 0
      ? currentFavoriteIndex - 1
      : favoritesList.length - 1
    setCurrentFavoriteIndex(prevIndex)
    const prevQuestion = favoritesList[prevIndex]?.questions?.[0] ?? null
    setCurrentQuestion(prevQuestion)
  }

  const handleGroupSelect = async (selectedGroup: GroupKey) => {
    setGroup(selectedGroup)
    setFavoritesMode(false)
    setCurrentQuestion(null)

    try {
      setIsLoading(true)
      const question = await fetchQuestion(selectedGroup)
      setCurrentQuestion(question)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoritesToggle = () => {
    if (!user) {
      alert('Pre obľúbené otázky sa musíš prihlásiť!')
      router.push('/auth/login')
      return
    }
    setFavoritesMode(!favoritesMode)
    setCurrentQuestion(null)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Brain className="animate-spin h-8 w-8 mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Načítavam...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {group ? groupLabels[group] : 'Vyber si skupinu'}
                </h1>
                {user && (
                  <div className="text-primary-foreground/80 text-sm">
                    {isPaid ? (
                      <div className="flex items-center gap-4">
                        <span>✨ Plný prístup</span>
                        {group && !favoritesMode && (
                        <span className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            Zostáva: {questionCounts.remaining}/{questionCounts.total}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span>🆓 Denné otázky: {dailyCount}/2</span>
                    )}
                  </div>
                )}
              </div>

              {group && (
                <div className="flex gap-2">
                  {user && (
                    <Button
                      variant={favoritesMode ? "secondary" : "outline"}
                      size="sm"
                      onClick={handleFavoritesToggle}
                      className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Obľúbené
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGroup(null)
                      setCurrentQuestion(null)
                      setFavoritesMode(false)
                    }}
                    className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30"
                  >
                    Zmeniť skupinu
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {!group ? (
              <div className="space-y-6">
                <p className="text-muted-foreground text-center text-lg">
                  S kým sa chceš lepšie spoznať?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupOptions.map(option => (
                    <Button
                      key={option}
                      onClick={() => handleGroupSelect(option)}
                      className="h-16 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                      disabled={isLoading}
                    >
                      {groupLabels[option]}
                    </Button>
                  ))}
                </div>
                {!user && (
                  <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">💡 Tip</h3>
                    <p className="text-primary/80 text-sm">
                      Prihlás sa a získaj každý deň 2 nové otázky zo každej skupiny ZADARMO!
                      Plus možnosť označiť si obľúbené otázky.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => router.push('/auth/login')}
                    >
                      Prihlásiť sa
                    </Button>
                  </div>
                )}
              </div>
            ) : currentQuestion ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-muted rounded-lg p-6 md:p-8">
                    <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                      {currentQuestion.text}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {favoritesMode && favoritesList.length > 1 ? (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handlePrevQuestion}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground px-3">
                        {currentFavoriteIndex + 1} / {favoritesList.length}
                      </span>
                      <Button variant="outline" size="sm" onClick={handleNextQuestion}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={isLoading || (!user && !canViewMore)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoading ? 'Načítavam...' : 'Ďalšia otázka'}
                    </Button>
                  )}

                  {user && currentQuestion && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(currentQuestion.id)}
                      className={`flex items-center gap-2 ${
                        favorites.includes(currentQuestion.id)
                          ? 'text-destructive border-destructive/30'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(currentQuestion.id) ? 'fill-destructive' : ''
                        }`}
                      />
                      {favorites.includes(currentQuestion.id) ? 'Obľúbené' : 'Pridať k obľúbeným'}
                    </Button>
                  )}
                </div>

                {!user && (
                  <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-warning text-sm">
                      🎁 Vidíš otázky zadarmo! Pre viac funkcií sa
                      <Button
                        variant="link"
                        size="sm"
                        className="text-warning underline px-1"
                        onClick={() => router.push('/auth/login')}
                      >
                        prihlás
                      </Button>
                      alebo
                      <Button
                        variant="link"
                        size="sm"
                        className="text-warning underline px-1"
                        onClick={() => router.push('/upgrade')}
                      >
                        kúp plný prístup
                      </Button>.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              group && (
                <GroupCompletionContent
                  group={group}
                  setGroup={setGroup}
                  user={user}
                  isPaid={isPaid}
                />
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
