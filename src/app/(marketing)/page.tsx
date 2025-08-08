'use client'

import { I18nProvider } from '@/i18n'            // ⬅ pridaj
import MarketingHomePage from '@/components/MarketingHomePage'

export default function Page() {
  return (
    <I18nProvider /* ak treba, môžeš pridať: locale="sk" */>
      <MarketingHomePage />
    </I18nProvider>
  )
}
