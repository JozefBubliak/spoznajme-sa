'use client'

import { Button } from '@/components/ui/button'
import { supabaseQuiz } from '@/lib/supabaseQuizClient'
import { useParams } from 'next/navigation'

// Ensure this route is rendered dynamically for all languages
export const dynamic = 'force-dynamic'

export default function QuizLoginPage() {
  const { lang } = useParams<{ lang: string }>()

  const loginWithGoogle = async () => {
    await supabaseQuiz.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/quiz-callback?lang=${lang}`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold">Prihlásiť sa ako moderátor kvízu</h1>
        <Button
          onClick={loginWithGoogle}
          className="bg-purple-600 hover:bg-purple-700 w-full text-white"
        >
          Pokračovať cez Google
        </Button>
      </div>
    </div>
  )
}
