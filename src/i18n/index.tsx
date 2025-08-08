'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './locales/en.json'
import sk from './locales/sk.json'
import cz from './locales/cz.json'
import de from './locales/de.json'
import pl from './locales/pl.json'
import fr from './locales/fr.json'
import hu from './locales/hu.json'
import es from './locales/es.json'
import ua from './locales/ua.json'
import ru from './locales/ru.json'

export const SUPPORTED_LOCALES = [
  'en', 'sk', 'cz', 'de', 'pl', 'fr', 'hu', 'es', 'ua', 'ru'
] as const
export type Locale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'en'

const dictionaries: Record<string, Record<string, any>> = {
  en,
  sk,
  cz,
  de,
  pl,
  fr,
  hu,
  es,
  ua,
  ru,
}

function get(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('locale') as Locale | null) : null
    if (saved && SUPPORTED_LOCALES.includes(saved)) setLocale(saved)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale)
    }
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
