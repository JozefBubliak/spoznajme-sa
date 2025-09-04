import type { Metadata } from 'next'
import { buildHreflangAlternates } from '@/lib/i18n-routing'

export const metadata: Metadata = {
  title: 'DeepTalks – praktická komunikácia pre rodiny a páry',
  description:
    'Krátke vety, minipostupy a nástroje na lepšie rozhovory. Pre rodičov, páry a učiteľov.',
  alternates: {
    canonical: 'https://deeptalks.eu/',
    languages: buildHreflangAlternates('/'),
  },
}

