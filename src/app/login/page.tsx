
'use client'

import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const params = useSearchParams()
  const next = params.get('next')

  const loginWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })
    if (error) {
      console.error('Google login error', error)
      alert('Prihlásenie cez Google zlyhalo')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> Prihlás sa a odomkni viac otázok
        </h1>

        <p className="text-gray-600">
          Získaj každý deň nové otázky zdarma a bonusové otázky v každej skupine.
        </p>

        <ul className="text-left text-sm text-gray-700 space-y-1">
          <li>🎁 10 otázok navyše v každej skupine</li>
          <li>📆 2 nové otázky denne zdarma</li>
          <li>❤️ Možnosť označiť obľúbené</li>
          <li>🔒 Bezpečné prihlásenie cez Google</li>
        </ul>

        <Button
          onClick={loginWithGoogle}
          className="bg-purple-600 hover:bg-purple-700 w-full text-white"
        >
          Pokračovať cez Google
        </Button>

        <p className="text-xs text-gray-400">
          Prihlásenie je bezplatné. Neposielame spam. Odhlásiš sa kedykoľvek.
        </p>
      </div>
    </div>
  )
}
