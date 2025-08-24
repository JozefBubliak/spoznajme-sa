'use client'
import { createContext, useContext } from 'react'
import type { Locale } from '@/i18n/config'

type Ctx = { lang: Locale; dict: Record<string, any> }
const I18nCtx = createContext<Ctx | null>(null)

// minimalistický EN fallback (UI nespadne, kým sa provider nenačíta)
const FALLBACK_DICT = {
  brand: 'DeepTalks',
  nav: { home: 'Home', products: 'Products', tools: 'Tools', blog: 'Blog', downloads: 'Downloads' },
}

export function IntlProvider({ lang, dict, children }: { lang: Locale; dict: any; children: React.ReactNode }) {
  return <I18nCtx.Provider value={{ lang, dict }}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) {
    const t = (path: string, fallback?: string) =>
      path.split('.').reduce((acc: any, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), FALLBACK_DICT) ??
      (fallback ?? path)
    return { lang: 'en' as Locale, dict: FALLBACK_DICT, t }
  }
  function t(path: string, fallback?: string) {
    return path.split('.').reduce((acc: any, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), ctx?.dict || {}) ??
      (fallback ?? path)
  }
  return { ...ctx, t }
}
