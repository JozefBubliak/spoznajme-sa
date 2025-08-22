// PATH: src/app/[lang]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { normalizeUrlLocale, buildHreflangAlternates } from '@/lib/i18n-routing'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  const title =
    lang === 'sk'
      ? 'DeepTalks – praktická komunikácia pre rodiny a páry'
      : 'DeepTalks – practical communication for families and couples'

  const description =
    lang === 'sk'
      ? 'Krátke vety, minipostupy a nástroje na lepšie rozhovory. Pre rodičov, páry a učiteľov.'
      : 'Short phrases, mini-playbooks and tools for better conversations. For parents, couples and educators.'

  return {
    title,
    description,
    alternates: {
      canonical: `https://deeptalks.eu/${lang}`,
      languages: buildHreflangAlternates('/'),
    },
  }
}

// (voliteľné) predgenerovanie jazykových verzií
export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const go = (p: string) => `/${lang}${p}`

  const t = <T extends string>(sk: T, en: T) => (lang === 'sk' ? sk : en)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-14">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {t('Lepšie rozhovory, bližšie vzťahy.', 'Better conversations, closer relationships.')}
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          {t(
            'Praktické vety, minipostupy a hry pre rodiny a páry. Zrozumiteľné, použiteľné a bez moralizovania.',
            'Practical phrases, mini-playbooks and games for families and couples. Clear, usable and down-to-earth.'
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href={go('/kompas')}
            className="inline-flex items-center justify-center rounded-md bg-black text-white px-5 py-2.5 text-sm"
          >
            {t('Komunikačný kompas', 'Communication Compass')}
          </Link>
          <Link
            href={go('/apps')}
            className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm"
          >
            {t('Aplikácie a hry', 'Apps & Games')}
          </Link>
        </div>
      </section>

      {/* Benefits / value props */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            h: t('Krátke & použiteľné', 'Short & usable'),
            p: t('Vety a postupy, ktoré zvládneš hneď, aj v náročných situáciách.', 'Phrases and steps you can use immediately, even in tough moments.'),
          },
          {
            h: t('Bez moralizovania', 'No moralizing'),
            p: t('Jasné návody bez hanby a pocitov viny. Realisticky, s rešpektom.', 'Clear guidance without shame or guilt. Realistic and respectful.'),
          },
          {
            h: t('Pre rodiny a páry', 'For families & couples'),
            p: t('Rodič–dieťa, páry, škola. Rituály, hranice, konflikt, emócie.', 'Parent–child, couples, school. Rituals, boundaries, conflict, emotions.'),
          },
        ].map((b, i) => (
          <div key={i} className="rounded-xl border p-5">
            <h3 className="font-medium">{b.h}</h3>
            <p className="text-sm text-muted-foreground mt-1">{b.p}</p>
          </div>
        ))}
      </section>

      {/* Featured hubs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('Čo chceš riešiť?', 'What do you want to work on?')}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={go('/kompas')} className="rounded-xl border p-5 hover:bg-muted transition block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{t('Komunikačný kompas', 'Communication Compass')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('Krátke vety a minipostupy do bežných situácií – podľa tém a publika.',
                     'Short phrases and mini-playbooks for everyday situations – by topic and audience.')}
                </p>
              </div>
              <span className="text-sm underline shrink-0">{t('Otvoriť', 'Open')}</span>
            </div>
          </Link>

          <Link href={go('/apps')} className="rounded-xl border p-5 hover:bg-muted transition block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{t('Aplikácie a hry', 'Apps & Games')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('Rýchly kvíz Herd Vote a „Spoznajme sa“ – otázky v balíčkoch.',
                     'Fast Herd Vote quiz and “Get to know us” – card prompts in packs.')}
                </p>
              </div>
              <span className="text-sm underline shrink-0">{t('Otvoriť', 'Open')}</span>
            </div>
          </Link>

          <Link href={go('/pomocky')} className="rounded-xl border p-5 hover:bg-muted transition block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{t('Pomôcky (hub)', 'Tools hub')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('Témy, publiká a vekové mapy na jednom mieste.', 'Topics, audiences and age maps in one place.')}
                </p>
              </div>
              <span className="text-sm underline shrink-0">{t('Otvoriť', 'Open')}</span>
            </div>
          </Link>

          <Link href={go('/indexy/co-trapi-deti')} className="rounded-xl border p-5 hover:bg-muted transition block">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{t('Indexy: čo trápi deti', 'Indexes: what troubles kids')}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('Prehľad tém „hlasom dieťaťa“ – praktické vstupy do rozhovoru.',
                     'Overview written in the “child’s voice” – practical starters for talk.')}
                </p>
              </div>
              <span className="text-sm underline shrink-0">{t('Otvoriť', 'Open')}</span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border p-6 md:p-8 bg-muted/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              {t('Začni malými zmenami v každodenných rozhovoroch.', 'Start with small changes in everyday talks.')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('Vyber si tému alebo publikum a hneď máš použiteľné vety.', 'Pick a topic or audience and get ready-to-use phrases.')}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={go('/kompas')} className="rounded-md bg-black text-white px-4 py-2 text-sm">
              {t('Otvoriť kompas', 'Open Compass')}
            </Link>
            <Link href={go('/apps/spoznajme-sa')} className="rounded-md border px-4 py-2 text-sm">
              {t('Spustiť „Spoznajme sa“', 'Start “Get to know us”')}
            </Link>
            <Link href={go('/apps/couplesync')} className="rounded-md border px-4 py-2 text-sm">
              {t('Spustiť CoupleSync', 'Start CoupleSync')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
