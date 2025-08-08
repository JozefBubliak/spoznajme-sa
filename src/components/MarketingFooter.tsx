'use client'

import { useI18n } from '@/i18n'
import Link from 'next/link'

export function MarketingFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="font-semibold">{t('meta.brand')}</div>
          <p className="text-sm text-muted-foreground max-w-md">
            {t('meta.description')}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/terms" className="hover:underline">{t('footer.terms')}</Link>
          <Link href="/privacy" className="hover:underline">{t('footer.privacy')}</Link>
          <span className="ml-auto text-muted-foreground">© {year} {t('meta.brand')}. {t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  )
}
