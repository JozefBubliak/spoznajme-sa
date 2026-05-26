'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/lib/supabaseClient'

async function relRpc<T = unknown>(
  fn: string,
  args: Record<string, unknown> = {},
): Promise<{ data: T | null; error: { message: string } | null }> {
  const { data: { session } } = await supabase.auth.getSession()

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
      'Content-Profile': 'rel',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(args),
  })

  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { msg = (await res.json()).message ?? msg } catch { /* ignore */ }
    return { data: null, error: { message: msg } }
  }

  const text = await res.text()
  const data: T = text ? JSON.parse(text) : null
  return { data, error: null }
}

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  lang: string
  code: string
  userId: string
}

type State = 'joining' | 'already' | 'error'

export function NudgeJoin({ lang, code }: Props) {
  const router = useRouter()
  const [state, setState] = useState<State>('joining')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    let cancelled = false

    async function join() {
      // Check if already in a couple first
      const { data: existing } = await relRpc('get_my_couple')
      const hasCouple = Array.isArray(existing) ? existing.length > 0 : !!existing

      if (hasCouple) {
        if (!cancelled) setState('already')
        return
      }

      const { error } = await relRpc('join_couple', { p_code: code })

      if (cancelled) return

      if (error) {
        if (error.message.includes('already in a couple')) {
          setState('already')
        } else {
          setErrorMsg(error.message)
          setState('error')
        }
        return
      }

      // Success — go to the app home where setup wizard awaits
      router.replace(`/${lang}/apps/nudge/home`)
    }

    join()
    return () => { cancelled = true }
  }, [code, lang, router])

  // ── Loading ────────────────────────────────────────────────────────────────

  if (state === 'joining') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Pripájam ťa k páru…</p>
        </div>
      </div>
    )
  }

  // ── Already in a couple ───────────────────────────────────────────────────

  if (state === 'already') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm w-full rounded-3xl border border-border/60 bg-card/80 p-8 text-center space-y-4">
          <p className="text-3xl">🔗</p>
          <h1 className="text-xl font-bold text-foreground">Už si v páre</h1>
          <p className="text-sm text-muted-foreground">
            Tvoj účet je už prepojený s iným partnerom. Nemôžeš byť v dvoch pároch naraz.
          </p>
          <Link
            href={`/${lang}/apps/nudge/home`}
            className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Ísť do aplikácie
          </Link>
        </div>
      </div>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-sm w-full rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center space-y-4">
        <p className="text-3xl">⚠️</p>
        <h1 className="text-xl font-bold text-foreground">Niečo sa pokazilo</h1>
        <p className="text-sm text-destructive">{errorMsg}</p>
        <p className="text-xs text-muted-foreground">
          Skús požiadať partnera o nový link, alebo pokračuj manuálne.
        </p>
        <Link
          href={`/${lang}/apps/nudge/home`}
          className="inline-block rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          Späť do aplikácie
        </Link>
      </div>
    </div>
  )
}
