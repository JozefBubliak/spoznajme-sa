import type { Metadata } from 'next'
import Link from 'next/link'
import { normalizeUrlLocale, buildHreflangAlternates } from '@/lib/i18n-routing'

type Props = { params: { lang: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: lang === 'sk' ? 'Aplikácie a hry' : 'Apps & Games',
    description:
      lang === 'sk'
        ? 'Prehľad dostupných hier a pomôcok na deeptalks.eu.'
        : 'Overview of available games and tools on deeptalks.eu.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/apps`,
      languages: buildHreflangAlternates('/apps'),
    },
  }
}

export default function Page({ params }: Props) {
  const lang = normalizeUrlLocale(params.lang)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">
        {lang === 'sk' ? 'Aplikácie a hry' : 'Apps & Games'}
      </h1>

      <ul className="grid md:grid-cols-2 gap-4">
        <li className="rounded-xl border p-4">
          <h2 className="font-medium">Herd Vote (kvíz)</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === 'sk'
              ? 'Rýchly tímový kvíz s kolami a bodovaním.'
              : 'Fast team quiz with rounds and scoring.'}
          </p>
          <div className="mt-3">
            <Link
              className="text-sm underline"
              href={`/${lang}/apps/herd-vote`}
            >
              {lang === 'sk' ? 'Otvoriť' : 'Open'}
            </Link>
          </div>
        </li>

        <li className="rounded-xl border p-4">
          <h2 className="font-medium">Spoznajme sa (karty otázok)</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === 'sk'
              ? 'Interaktívne otázky v balíčkoch – otvárače, hlbšie, spomienky, zábavné.'
              : 'Interactive card prompts – openers, deeper, memories, fun.'}
          </p>
          <div className="mt-3">
            <Link
              className="text-sm underline"
              href={`/${lang}/apps/spoznajme-sa`}
            >
              {lang === 'sk' ? 'Otvoriť' : 'Open'}
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}
