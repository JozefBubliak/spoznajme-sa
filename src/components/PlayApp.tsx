'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useQuestions } from '@/hooks/useQuestions'
import { supabase } from '@/lib/supabaseClient'
import { Heart, ChevronLeft, ChevronRight, Shuffle, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import GroupCompletionContent from '@/components/GroupCompletionContent'

const groupOptions = ['partneri', 'kamarati', 'rodina', 'rodic_dieta'] as const
type GroupKey = typeof groupOptions[number]

const groupConfig: Record<GroupKey, { label: string; emoji: string; desc: string }> = {
  partneri:    { label: 'Partneri',       emoji: '💑', desc: 'Prehlbujte váš vzťah' },
  kamarati:    { label: 'Kamaráti',       emoji: '👫', desc: 'Spoznajte sa naozaj' },
  rodina:      { label: 'Rodina',         emoji: '👨‍👩‍👦', desc: 'Prepojte generácie' },
  rodic_dieta: { label: 'Rodič–dieťa',   emoji: '👨‍👧', desc: 'Budujte porozumenie' },
}

export default function PlayApp() {
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
    canViewMore,
  } = useQuestions()

  const [group, setGroup] = useState<GroupKey | null>(null)
  const [favoritesMode, setFavoritesMode] = useState(false)
  const [favoritesList, setFavoritesList] = useState<any[]>([])
  const [currentFavoriteIndex, setCurrentFavoriteIndex] = useState(0)
  const [questionCounts, setQuestionCounts] = useState({ total: 0, remaining: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  useEffect(() => {
    if (group && !favoritesMode) loadQuestionCounts()
  }, [group, isPaid])

  useEffect(() => {
    if (favoritesMode && group) loadFavorites()
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
    const { data } = await supabase
      .from('user_favorites')
      .select(`question_id, questions (id, text, partneri, kamarati, rodina, rodic_dieta)`)
      .eq('user_id', uid)

    const filtered = (data ?? []).filter(
      (item: any) => item.questions && item.questions[groupKey]
    )
    setFavoritesList(filtered)
    const first = Array.isArray(filtered[0]?.questions)
      ? (filtered[0]?.questions[0] ?? null)
      : (filtered[0]?.questions ?? null)
    setCurrentQuestion(first)
    if (filtered.length > 0) setCurrentFavoriteIndex(0)
  }

  const handleNextQuestion = async () => {
    if (!group) return
    try {
      setIsLoading(true)
      setShowUpgrade(false)
      if (favoritesMode) {
        const nextIndex = (currentFavoriteIndex + 1) % favoritesList.length
        setCurrentFavoriteIndex(nextIndex)
        const nextQ = favoritesList[nextIndex]?.questions
        setCurrentQuestion(Array.isArray(nextQ) ? (nextQ[0] ?? null) : (nextQ ?? null))
      } else {
        const question = await fetchQuestion(group)
        if (question) {
          setCurrentQuestion(question)
          await loadQuestionCounts()
        } else {
          if (!user && !canViewMore) {
            setShowUpgrade(true)
          } else {
            setCurrentQuestion(null)
          }
        }
      }
    } catch {
      setShowUpgrade(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevQuestion = () => {
    if (!favoritesMode || favoritesList.length === 0) return
    const prevIndex = currentFavoriteIndex > 0 ? currentFavoriteIndex - 1 : favoritesList.length - 1
    setCurrentFavoriteIndex(prevIndex)
    const prevQ = favoritesList[prevIndex]?.questions
    setCurrentQuestion(Array.isArray(prevQ) ? (prevQ[0] ?? null) : (prevQ ?? null))
  }

  const handleGroupSelect = async (selectedGroup: GroupKey) => {
    setGroup(selectedGroup)
    setFavoritesMode(false)
    setCurrentQuestion(null)
    setShowUpgrade(false)
    try {
      setIsLoading(true)
      const question = await fetchQuestion(selectedGroup)
      setCurrentQuestion(question)
    } catch {
      setShowUpgrade(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFavoritesToggle = () => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    setFavoritesMode(v => !v)
    setCurrentQuestion(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          {group ? (
            <div className="flex items-center gap-2">
              <span className="text-xl">{groupConfig[group].emoji}</span>
              <div>
                <h1 className="text-base font-bold text-foreground">{groupConfig[group].label}</h1>
                {user && (
                  <p className="text-xs text-muted-foreground">
                    {isPaid ? (
                      <span className="text-primary font-medium">✨ Plný prístup · zostáva {questionCounts.remaining}/{questionCounts.total}</span>
                    ) : (
                      <span>Dennne: {dailyCount}/2 použitých</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-bold text-foreground">Spoznajme sa</h1>
          )}
        </div>
        {group && (
          <div className="flex items-center gap-2">
            {user && (
              <button
                onClick={handleFavoritesToggle}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors',
                  favoritesMode
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'border text-muted-foreground hover:text-foreground hover:border-foreground/20'
                )}
              >
                <Heart className={cn('h-3.5 w-3.5', favoritesMode && 'fill-primary text-primary')} />
                Obľúbené
              </button>
            )}
            <button
              onClick={() => { setGroup(null); setCurrentQuestion(null); setFavoritesMode(false); setShowUpgrade(false) }}
              className="px-3 py-1.5 rounded-lg border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Zmeniť skupinu
            </button>
          </div>
        )}
      </div>

      {/* Group selector */}
      {!group && (
        <div className="space-y-5">
          <p className="text-center text-muted-foreground">S kým sa chceš lepšie spoznať?</p>
          <div className="grid grid-cols-2 gap-3">
            {groupOptions.map(option => (
              <button
                key={option}
                onClick={() => handleGroupSelect(option)}
                disabled={isLoading}
                className="group rounded-2xl border bg-card p-5 text-left hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 shadow-sm disabled:opacity-50"
              >
                <div className="text-3xl mb-2">{groupConfig[option].emoji}</div>
                <div className="font-semibold text-foreground text-sm">{groupConfig[option].label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{groupConfig[option].desc}</div>
              </button>
            ))}
          </div>

          {!user && (
            <div className="rounded-xl border bg-card p-4 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Prihlás sa a získaj každý deň 2 nové otázky zadarmo + možnosť ukladať obľúbené.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Prihlásiť sa
                </button>
                <button
                  onClick={() => router.push('/upgrade')}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Plný prístup
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {group && isLoading && (
        <div className="rounded-2xl border bg-card p-12 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}

      {/* Upgrade gate */}
      {group && !isLoading && showUpgrade && (
        <div className="rounded-2xl border bg-card p-8 text-center space-y-4 shadow-sm">
          <Lock className="h-10 w-10 mx-auto text-muted-foreground/50" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Videl si všetky voľné otázky</h3>
            <p className="text-sm text-muted-foreground">
              {!user
                ? 'Prihlás sa pre 2 nové otázky denne, alebo odomkni plný prístup k 8 000+ otázkam.'
                : !isPaid
                  ? 'Denný limit bol dosiahnutý. Odomkni plný prístup pre neobmedzené otázky.'
                  : 'Videl si všetky otázky v tejto skupine.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            {!user && (
              <button
                onClick={() => router.push('/auth/login')}
                className="px-5 py-2.5 rounded-lg border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Prihlásiť sa zadarmo
              </button>
            )}
            {!isPaid && (
              <button
                onClick={() => router.push('/upgrade')}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Odomknúť za 6,99 €
              </button>
            )}
            <button
              onClick={() => { setGroup(null); setShowUpgrade(false) }}
              className="px-5 py-2.5 rounded-lg border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Zmeniť skupinu
            </button>
          </div>
        </div>
      )}

      {/* Question card */}
      {group && !isLoading && !showUpgrade && currentQuestion && (
        <div className="space-y-4">
          <div className="rounded-2xl border bg-card p-8 shadow-sm min-h-[200px] flex items-center justify-center">
            <p className="text-xl font-medium leading-relaxed text-foreground text-center">
              {currentQuestion.text}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            {favoritesMode && favoritesList.length > 1 ? (
              <div className="flex items-center gap-2 flex-1 justify-center">
                <button
                  onClick={handlePrevQuestion}
                  className="p-2 rounded-lg border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-muted-foreground px-2">
                  {currentFavoriteIndex + 1} / {favoritesList.length}
                </span>
                <button
                  onClick={handleNextQuestion}
                  className="p-2 rounded-lg border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={isLoading || (!user && !canViewMore)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                <Shuffle className="h-4 w-4" />
                Ďalšia otázka
              </button>
            )}

            {user && currentQuestion && (
              <button
                onClick={() => toggleFavorite(currentQuestion.id)}
                className={cn(
                  'p-3 rounded-xl border transition-colors',
                  favorites.includes(currentQuestion.id)
                    ? 'bg-destructive/10 border-destructive/30 text-destructive'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                title={favorites.includes(currentQuestion.id) ? 'Odstrániť z obľúbených' : 'Pridať k obľúbeným'}
              >
                <Heart
                  className={cn('h-5 w-5', favorites.includes(currentQuestion.id) && 'fill-destructive')}
                />
              </button>
            )}
          </div>

          {/* Guest upsell strip */}
          {!user && (
            <div className="rounded-xl border bg-muted px-4 py-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground flex-1">
                🎁 Voľné otázky. Prihlás sa pre viac funkcií.
              </p>
              <button
                onClick={() => router.push('/auth/login')}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Prihlásiť sa <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Group completion */}
      {group && !isLoading && !showUpgrade && !currentQuestion && (
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <GroupCompletionContent
            group={group}
            setGroup={setGroup}
            user={user}
            isPaid={isPaid}
          />
        </div>
      )}

    </div>
  )
}
