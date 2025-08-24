'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import en from './locales/en.json'
import sk from './locales/sk.json'
import cs from './locales/cs.json'
import de from './locales/de.json'
import pl from './locales/pl.json'
import fr from './locales/fr.json'
import hu from './locales/hu.json'
import es from './locales/es.json'
import uk from './locales/uk.json'
import ru from './locales/ru.json'

export const SUPPORTED_LOCALES = [
  'en','sk','cs','de','pl','fr','hu','es','uk','ru'
] as const
export type Locale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'en'

const dictionaries: Record<string, Record<string, unknown>> = { en, sk, cs, de, pl, fr, hu, es, uk, ru }

function get(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

// normalizácia jazykových kódov (cz->cs, ua->uk; zhodenie -SK/-CZ atď.)
function normalizeLocale(code: string | null | undefined): Locale | null {
  if (!code) return null
  const lower = code.toLowerCase()
  const base = lower.split('-')[0] // sk-sk -> sk
  const tryList = [lower, base]

  for (const c of tryList) {
    if (c === 'cz') return 'cs'
    if (c === 'ua') return 'uk'
    if ((SUPPORTED_LOCALES as readonly string[]).includes(c)) return c as Locale
  }
  return null
}

// klientská autodetekcia
function detectClientLocale(): Locale {
  // 1) ?lang=xx
  const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const q = sp?.get('lang')
  const qNorm = normalizeLocale(q)
  if (qNorm) return qNorm

  // 2) /xx/ prefix
  const prefix = typeof window !== 'undefined' ? window.location.pathname.slice(1).split('/')[0] : ''
  const pNorm = normalizeLocale(prefix)
  if (pNorm) return pNorm

  // 3) localStorage
  const saved = typeof window !== 'undefined' ? localStorage.getItem('locale') : null
  const sNorm = normalizeLocale(saved || undefined)
  if (sNorm) return sNorm

  // 4) prehliadač
  const langs = (typeof navigator !== 'undefined' && navigator.languages?.length
    ? navigator.languages
    : typeof navigator !== 'undefined'
      ? [navigator.language]
      : []) as string[]
  for (const l of langs) {
    const m = normalizeLocale(l)
    if (m) return m
  }

  // 5) fallback
  return DEFAULT_LOCALE
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE)

  // autodetekcia po mount-e (client)
  useEffect(() => {
    const auto = detectClientLocale()
    setLocale(auto)
  }, [])

  // sync <html lang> + persist
  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale
    if (typeof window !== 'undefined') localStorage.setItem('locale', locale)
  }, [locale])

  const t = useMemo(() => {
    return (key: string) => {
      const current = dictionaries[locale] || {}
      const fallback = dictionaries[DEFAULT_LOCALE] || {}
      const val = get(current, key)
      if (typeof val === 'string') return val
      const fb = get(fallback, key)
      return typeof fb === 'string' ? fb : key
    }
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
