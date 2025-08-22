'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation'

// Ensure this route is rendered dynamically for all languages
export const dynamic = 'force-dynamic'

export default function QuizLoginPage() {
  const { lang } = useParams<{ lang: string }>()
  const [remember, setRemember] = useState(true)

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=/${lang}/apps/quiz`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold">Prihlásiť sa ako moderátor kvízu</h1>
        <div className="space-y-4">
          <Button
            onClick={loginWithGoogle}
            className="bg-purple-600 hover:bg-purple-700 w-full text-white"
          >
            Pokračovať cez Google
          </Button>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Zostať prihlásený</label>
          </div>
          <p className="text-sm text-muted-foreground">
            Rola moderátora je dostupná iba registrovaným používateľom. Po
            vytvorení hry získate trvalý odkaz na svoju miestnosť viazaný na
            váš účet.
          </p>
        </div>
      </div>
    </div>
  )
}
