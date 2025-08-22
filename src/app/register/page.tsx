'use client'

import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const registerWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> Zaregistruj sa a objav viac otázok
        </h1>
        <p className="text-gray-600">
          Vytvor si účet a získaj každý deň nové otázky zdarma.
        </p>
        <Button
          onClick={registerWithGoogle}
          className="bg-purple-600 hover:bg-purple-700 w-full text-white"
        >
          Pokračovať cez Google
        </Button>
        <p className="text-xs text-gray-400">
          Registrácia je bezplatná. Neposielame spam. Odhlásiš sa kedykoľvek.
        </p>
      </div>
    </div>
  )
}
