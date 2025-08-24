'use client'

import { SUPPORTED_LOCALES, useI18n } from '@/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <select
      aria-label="Language selector"
      className="h-9 rounded-md border bg-background px-2 text-sm"
      value={locale}
      onChange={(e) => setLocale(e.target.value as any)}
    >
      {SUPPORTED_LOCALES.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
