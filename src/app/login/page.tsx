'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Brain, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const params = useSearchParams()
  const next = params.get('next')

  const [email, setEmail] = useState('')
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const redirectTo = `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`

  const loginWithGoogle = async () => {
    try {
      setLoadingGoogle(true)
      setMessage(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })
      if (error) throw error
    } catch (err) {
      console.error('Google login error', err)
      setMessage('Prihlásenie cez Google zlyhalo. Skús to znova.')
    } finally {
      setLoadingGoogle(false)
    }
  }

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setMessage('Zadaj e-mail.')
    try {
      setLoadingEmail(true)
      setMessage(null)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      })
      if (error) throw error
      setMessage('Skontroluj e-mail – poslali sme ti prihlasovací odkaz.')
    } catch (err) {
      console.error('Email login error', err)
      setMessage('Nepodarilo sa odoslať odkaz. Skús iný e-mail alebo neskôr.')
    } finally {
      setLoadingEmail(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-sky-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur bg-white/70 dark:bg-white/10 border border-white/40 dark:border-white/10 shadow-xl rounded-2xl p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2 text-slate-800 dark:text-white">
            <Brain className="text-fuchsia-500" />
            Zaregistruj sa a zapoj sa do rozhovorov
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Jeden účet pre všetky konverzačné hry, otázky a nástroje na DeepTalks.
          </p>

          <ul className="text-left text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <li>🔓 Prístup k uzamknutým sekciám a aplikáciám</li>
            <li>💾 Ukladanie výsledkov a súkromných miestností pre páry</li>
            <li>💬 Komentáre, hodnotenia a odporúčania</li>
            <li>🗓️ Denné otázky a nové balíčky obsahu</li>
          </ul>

          <div className="space-y-3">
            <Button
              type="button"
              onClick={loginWithGoogle}
              disabled={loadingGoogle}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loadingGoogle ? 'Prebieha prihlásenie…' : 'Pokračovať cez Google'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white/70 dark:bg-white/10 px-3 text-xs text-slate-500 dark:text-slate-300">
                  alebo e-mailom
                </span>
              </div>
            </div>

            <form onSubmit={sendMagicLink} className="space-y-2 text-left">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="napr. ty@priklad.sk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button
                type="submit"
                disabled={loadingEmail}
                className="w-full flex items-center justify-center gap-2"
                variant="secondary"
              >
                <Mail className="h-4 w-4" />
                {loadingEmail ? 'Posielame odkaz…' : 'Vytvoriť účet / Prihlásiť sa odkazom'}
              </Button>
            </form>
          </div>

          {message && (
            <p className="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
              {message}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Registrácia je bezplatná. Žiadny spam. Účet aj dáta môžeš kedykoľvek vymazať.
            {' '}Tvoje súkromie chránime – údaje nezdieľame s tretími stranami.
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pokračovaním súhlasíš s <a href="/terms" className="underline hover:no-underline">Podmienkami používania</a> a{' '}
            <a href="/privacy" className="underline hover:no-underline">Zásadami ochrany súkromia</a>.
          </p>
        </div>
      </div>
    </div>
  )
}