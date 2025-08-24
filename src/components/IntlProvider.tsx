'use client'

import React, { createContext, useContext, useMemo } from 'react'

export type Locale =
  | 'en'
  | 'sk'
  | 'cs'
  | 'pl'
  | 'hu'
  | 'fr'
  | 'de'
  | 'uk'
  | 'ru'
  | 'es'

export type Dictionary = Record<string, unknown>

type I18nContext = {
  lang: Locale
  dict: Dictionary
  t: (path: string, fallback?: string) => string
}

const I18nCtx = createContext<I18nContext | null>(null)

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used inside <IntlProvider>.')
  return ctx
}

export type IntlProviderProps = {
  children: React.ReactNode
  lang: Locale
  dict: Dictionary
}

function IntlProvider({ children, lang, dict }: IntlProviderProps) {
  const value = useMemo<I18nContext>(() => {
    const t: I18nContext['t'] = (path, fallback) => {
      const val = path
        .split('.')
        .reduce<any>(
          (acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined),
          dict
        )
      return typeof val === 'string' ? val : fallback ?? path
    }
    return { lang, dict, t }
  }, [lang, dict])

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

// exportujem oboje (default + named), aby prešli oba spôsoby importu
export { IntlProvider }
export default IntlProvider

