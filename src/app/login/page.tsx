'use client'
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
export default function LoginPage() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> PrihlĂˇs sa a odomkni viac otĂˇzok
        </h1>
        <p className="text-gray-600">
          ZĂ­skaj kaĹľdĂ˝ deĹ novĂ© otĂˇzky zdarma a bonusovĂ© otĂˇzky v kaĹľdej skupine.
        </p>
        <ul className="text-left text-sm text-gray-700 space-y-1">
          <li>đźŽ 10 otĂˇzok navyĹˇe v kaĹľdej skupine</li>
          <li>đź“† 2 novĂ© otĂˇzky denne zdarma</li>
          <li>âť¤ď¸Ź MoĹľnosĹĄ oznaÄŤiĹĄ obÄľĂşbenĂ©</li>
          <li>đź”’ BezpeÄŤnĂ© prihlĂˇsenie cez Google</li>
        </ul>
        <Button
          onClick={loginWithGoogle}
          className="bg-purple-600 hover:bg-purple-700 w-full text-white"
        >
          PokraÄŤovaĹĄ cez Google
        </Button>
        <p className="text-xs text-gray-400">
          PrihlĂˇsenie je bezplatnĂ©. Neposielame spam. OdhlĂˇsiĹˇ sa kedykoÄľvek.
        </p>
      </div>
    </div>
  )
}
