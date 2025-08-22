'use client'

import { Button } from '@/components/ui/button'
import { Brain, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const registerWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      console.error('Google register error', error)
      alert('Nepodarilo sa prihlásiť cez Google')
    }
  }

  const registerWithEmail = async () => {
    const email = prompt('Zadaj e-mail')?.trim()
    if (!email) return
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.error('Email register error', error)
      alert('Nepodarilo sa odoslať e-mail')
    } else {
      alert('Skontroluj si e-mail a dokonči prihlásenie')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-purple-700">
          <Brain className="text-pink-500" /> Zaregistruj sa a zapoj sa do rozhovorov
        </h1>
        <p className="text-gray-600">
          Jeden účet pre všetky konverzačné hry, otázky a nástroje na DeepTalks.
        </p>

        <ul className="text-left text-sm text-gray-700 space-y-1">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-purple-600 mt-0.5" /> Prístup k uzamknutým sekciám a aplikáciám
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-purple-600 mt-0.5" /> Ukladanie výsledkov a súkromných miestností pre páry
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-purple-600 mt-0.5" /> Komentáre, hodnotenia a personalizované odporúčania
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="text-purple-600 mt-0.5" /> Denné otázky a nové balíčky obsahu
          </li>
        </ul>

        <div className="space-y-2">
          <Button
            onClick={registerWithGoogle}
            className="bg-purple-600 hover:bg-purple-700 w-full text-white"
          >
            Pokračovať cez Google
          </Button>
          <Button
            variant="outline"
            onClick={registerWithEmail}
            className="w-full"
          >
            Pokračovať e-mailom
          </Button>
          <div className="text-sm">
            <a href="/login" className="underline">Mám účet – Prihlásiť sa</a>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Registrácia je bezplatná. Žiadny spam. Účet aj dáta môžeš kedykoľvek vymazať.<br />
          Tvoje súkromie chránime – údaje nezdieľame s tretími stranami.
        </p>
      </div>
    </div>
  )
}
