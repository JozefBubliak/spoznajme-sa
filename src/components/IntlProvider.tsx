'use client'

import React, { createContext, useContext, type ReactNode } from 'react'

type Dict = Record<string, unknown>

type IntlContextValue = {
  locale: string
  dict: Dict
}

const IntlContext = createContext<IntlContextValue | null>(null)

type IntlProviderProps = {
  /** preferované meno prop-u */
  locale?: string
  /** spätná kompatibilita – používajúci kód môže posielať `lang` */
  lang?: string
  dict: Dict
  children: ReactNode
}

/**
 * Provider, ktorý sprístupní preklady (dict) a jazyk (locale/lang).
 * Ak dostane `locale` aj `lang`, prednosť má `locale`.
 */
export function IntlProvider({ locale, lang, dict, children }: IntlProviderProps) {
  const resolvedLocale = locale ?? lang ?? 'en'
  return (
    <IntlContext.Provider value={{ locale: resolvedLocale, dict }}>
      {children}
    </IntlContext.Provider>
  )
}

/**
 * Hook s prekladovou funkciou t(path, fallback)
 */
export function useIntl() {
  const ctx = useContext(IntlContext)
  if (!ctx) {
    throw new Error('useIntl must be used within <IntlProvider>')
  }

  const t = (path: string, fallback?: string): string => {
    let acc: unknown = ctx.dict
    for (const k of path.split('.')) {
      if (acc && typeof acc === 'object') {
        acc = (acc as Dict)[k]
      } else {
        acc = undefined
        break
      }
    }
    const val = acc ?? (fallback ?? path)
    return typeof val === 'string' ? val : String(val)
  }

  return { ...ctx, t }
}

/** Back-compat alias pre existujúci kód */
export function useI18n() {
  return useIntl()
}

