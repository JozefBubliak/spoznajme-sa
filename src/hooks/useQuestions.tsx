
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

type GroupKey = 'partneri' | 'kamarati' | 'rodina' | 'rodic_dieta'

interface Question {
  id: number
  text: string
  partneri: boolean
  kamarati: boolean
  rodina: boolean
  rodic_dieta: boolean
}

const FREE_IDS: Record<GroupKey, number[]> = {
  partneri: [1365, 7458, 6537, 7809, 5297, 2820, 4177, 5448, 6328, 7058],
  kamarati: [1910, 7999, 187, 1560, 3922, 6945, 4879, 2400, 5267, 1457],
  rodina: [4393, 2844, 8874, 2100, 2863, 5500, 1417, 1425, 7494, 7674],
  rodic_dieta: [1160, 27, 3350, 3587, 5715, 1225, 3599, 2253, 4116, 2356],
}

export function useQuestions() {
  const { user, profile, isPaid } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [viewedQuestions, setViewedQuestions] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [dailyCount, setDailyCount] = useState(0)

  useEffect(() => {
    if (user) {
      fetchUserData()
    }
  }, [user])

  const fetchUserData = async () => {
    const uid = user?.id
    if (!uid) {
      // Ensure state is reset for guests
      setViewedQuestions([])
      setFavorites([])
      setDailyCount(0)
      return
    }

      const { data: historyData, error: historyError } = await supabase
        .from('user_question_history')
        .select('question_id')
        .eq('user_id', uid)

      if (historyError) {
        console.error(historyError)
        setViewedQuestions([])
      } else {
        setViewedQuestions((historyData ?? []).map(h => h.question_id))
      }

    // Fetch favorites
    try {
      const { data: favData } = await supabase
        .from('user_favorites')
        .select('question_id')
        .eq('user_id', uid)
      setFavorites((favData ?? []).map((f: { question_id: number }) => f.question_id))
    } catch {
      setFavorites([])
    }

    // Check daily usage from profile
    if (profile) {
      const today = new Date().toISOString().split('T')[0]
      if (profile.daily_questions_date === today) {
        setDailyCount(profile.daily_questions_used ?? 0)
      } else {
        setDailyCount(0)
        try {
          await supabase
            .from('user_profiles')
            .update({ daily_questions_date: today, daily_questions_used: 0 })
            .eq('id', uid)
        } catch { /* ignore */ }
      }
    } else {
      setDailyCount(0)
    }
  }

  const fetchQuestion = async (group: GroupKey, favoritesOnly = false) => {
    const uid = user?.id
    if (!uid && !FREE_IDS[group]) return null

    let availableIds: number[] = []

    if (!uid) {
      // Non-authenticated users get free questions
      availableIds = FREE_IDS[group]
    } else if (favoritesOnly) {
      // Show only favorites for authenticated users
      availableIds = favorites
    } else if (isPaid) {
      // Paid users get all questions, excluding viewed ones
      const { data: allQuestions } = await supabase
        .from('questions')
        .select('id')
        .eq(group, true)
        .eq('admin_status', 3)

      if (allQuestions) {
        availableIds = allQuestions
          .map(q => q.id)
          .filter(id => !viewedQuestions.includes(id))
      }
    } else {
      // Free authenticated users get daily limit
      if (dailyCount >= 2) {
        throw new Error('Denný limit dosiahnutý')
      }

      const { data: randomQuestions } = await supabase
        .from('questions')
        .select('id')
        .eq(group, true)
        .eq('admin_status', 3)
        .limit(50)

      if (randomQuestions) {
        availableIds = randomQuestions
          .map(q => q.id)
          .filter(id => !viewedQuestions.includes(id))
          .slice(0, 2 - dailyCount)
      }
    }

    if (availableIds.length === 0) return null

    const randomId = availableIds[Math.floor(Math.random() * availableIds.length)]

    const { data: question } = await supabase
      .from('questions')
      .select('*')
      .eq('id', randomId)
      .single()

    if (question && uid) {
      // Mark as viewed in history
      try {
        await supabase
          .from('user_question_history')
          .upsert({ user_id: uid, question_id: question.id })
      } catch { /* ignore if table doesn't exist */ }

      setViewedQuestions(prev => [...prev, question.id])

      // Update daily count for non-paid users
      if (!isPaid) {
        const newCount = dailyCount + 1
        setDailyCount(newCount)
        try {
          await supabase
            .from('user_profiles')
            .update({ daily_questions_used: newCount })
            .eq('id', uid)
        } catch { /* ignore */ }
      }
    }

    return question
  }

  const toggleFavorite = async (questionId: number) => {
    const uid = user?.id
    if (!uid) return

    const isFavorite = favorites.includes(questionId)

    if (isFavorite) {
      try {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', uid)
          .eq('question_id', questionId)
      } catch { /* ignore */ }
      setFavorites(prev => prev.filter(id => id !== questionId))
    } else {
      try {
        await supabase
          .from('user_favorites')
          .insert({ user_id: uid, question_id: questionId })
      } catch { /* ignore */ }
      setFavorites(prev => [...prev, questionId])
    }
  }

  const getQuestionCounts = async (group: GroupKey) => {
    if (!user || !isPaid) return { total: 0, remaining: 0 }

    const { data: totalData } = await supabase
      .from('questions')
      .select('id', { count: 'exact' })
      .eq(group, true)
      .eq('admin_status', 3)

    const total = totalData?.length || 0
    const viewed = viewedQuestions.length
    const remaining = Math.max(0, total - viewed)

    return { total, remaining }
  }

  return {
    currentQuestion,
    setCurrentQuestion,
    viewedQuestions,
    favorites,
    dailyCount,
    fetchQuestion,
    toggleFavorite,
    getQuestionCounts,
    canViewMore: !user || isPaid || dailyCount < 2
  }
}
