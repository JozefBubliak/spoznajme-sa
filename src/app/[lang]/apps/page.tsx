import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Button } from '@/components/ui/button'

// Import images
import quizGameImage from '@/assets/quiz-game.jpg'
import spoznajmeSaImage from '@/assets/spoznajme-sa-cards.jpg'
import hadackaImage from '@/assets/hadacka-game.jpg'
import couplesyncImage from '@/assets/couplesync-app.jpg'
import anoNieHmImage from '@/assets/hadacka-game.jpg'

type P = { params: Promise<{ lang: string }> }

export default async function AppsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  const apps = dict.apps
  const games = apps.games

  const gameList = [
    { slug: 'quiz', catKey: 'quizzes', image: quizGameImage, icon: '🧠' },
    { slug: 'spoznajme-sa', catKey: 'cards', image: spoznajmeSaImage, icon: '🃏' },
    { slug: 'hadacka', catKey: 'puzzles', image: hadackaImage, icon: '🎭' },
    { slug: 'couplesync', catKey: 'surveys', image: couplesyncImage, icon: '💕' },
    {
      slug: 'daily-connection',
      catKey: 'daily-connection',
      image: couplesyncImage,
      icon: '🔥',
      title: 'Daily Connection',
      description: 'Každý deň jedna otázka pre vás dvoch. Malý rituál, ktorý drží blízkosť pri živote.',
      cta: 'Otvoriť Daily Connection',
      chipLabel: 'Daily Connection',
    },
    { slug: 'ano-nie-hm', catKey: 'party', image: anoNieHmImage, icon: '⏱️' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full mb-8">
            {apps.bannerCTA}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="gradient-text">{apps.bannerTitle}</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            {apps.bannerSubtitle}
          </p>
          <nav className="flex flex-wrap justify-center gap-3">
            {gameList.map((g) => (
              <Link
                key={g.catKey}
                href={`#${g.catKey}`}
                className="px-5 py-2 text-sm font-medium text-foreground/80 bg-card/60 backdrop-blur-sm border border-border/40 rounded-full transition-all hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5"
              >
                <span className="mr-1.5">{g.icon}</span>
                {g.chipLabel ?? apps.categories[g.catKey]}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {gameList.map((item) => {
              const g = games[item.slug]
              const title = item.title ?? g?.name
              const description = item.description ?? g?.description
              const cta = item.cta ?? g?.cta
              return (
                <div
                  key={item.slug}
                  id={item.catKey}
                  className="group relative rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-border/40 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={g.name}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <span className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center text-xl bg-background/80 backdrop-blur-sm rounded-xl border border-border/40">
                      {item.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                    <Button
                      asChild
                      className="w-full"
                      variant="default"
                    >
                      <Link href={`/${lang}/apps/${item.slug}`}>
                        {cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
