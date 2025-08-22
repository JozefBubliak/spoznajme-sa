'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseQuiz } from '@/lib/supabaseQuizClient'

export default function QuizAuthCallback() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const handleRedirect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await supabaseQuiz.auth.getSession()

      const cookiesArr = document.cookie.split('; ')
      const authCookie = cookiesArr.find((c) => c.includes('-auth-token'))
      if (authCookie) {
        const [name, value] = authCookie.split('=')
        document.cookie = `sb-quiz-auth-token=${value}; path=/; max-age=604800`
        cookiesArr
          .filter((c) => c.startsWith('sb-'))
          .forEach((c) => {
            const [n] = c.split('=')
            document.cookie = `${n}=; path=/; max-age=0`
          })
      }

      const lang = params.get('lang') || 'sk'
      router.push(`/${lang}/apps/quiz`)
    }
    handleRedirect()
  }, [params, router])

  return <p className="text-center p-10 text-gray-500">Prihlasovanie...</p>
}
