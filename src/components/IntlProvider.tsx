'use client'

import React, { createContext, useContext, type ReactNode } from 'react'

type Dict = Record<string, unknown>

type IntlContextValue = {
  locale: string
  dict: Dict
}

const IntlContext = createContext<IntlContextValue | null>(null)

type IntlProviderProps = {
  locale: string
  dict: Dict
  children: ReactNode
}

/**
 * Provider, ktorý sprístupní preklady (dict) a locale.
 */
export function IntlProvider({ locale, dict, children }: IntlProviderProps) {
  return (
    <IntlContext.Provider value={{ locale, dict }}>
      {children}
    </IntlContext.Provider>
  )
}

/**
 * Hook na používanie prekladov.
 * - vráti { locale, dict, t }
 * - t('a.b.c', 'fallback') -> vyhľadá hodnotu v slovníku; ak chýba, vráti fallback alebo samotnú cestu
 */
export function useIntl() {
  const ctx = useContext(IntlContext)

  // Dôležité: ak Provider nie je nad stromom, nech to zlyhá zrozumiteľne
  if (!ctx) {
    throw new Error('useIntl must be used within <IntlProvider>')
  }

  const t = (path: string, fallback?: string) => {
    const value = path
      .split('.')
      .reduce<unknown>(
        (acc, k) =>
          acc && typeof acc === 'object' ? (acc as Dict)[k] : undefined,
        ctx.dict
      )

    // ak sa nenašlo, použi fallback alebo kľúč
    const resolved = value ?? (fallback ?? path)
    return typeof resolved === 'string' ? resolved : String(resolved)
  }

  return { ...ctx, t }
}

