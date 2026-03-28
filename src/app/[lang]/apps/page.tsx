import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Import images
import quizGameImage from '@/assets/quiz-game.jpg'
import spoznajmeSaImage from '@/assets/spoznajme-sa-cards.jpg'
import hadackaImage from '@/assets/hadacka-game.jpg'
import couplesyncImage from '@/assets/couplesync-app.jpg'

type P = { params: Promise<{ lang: string }> }

export default async function AppsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  const apps = dict.apps
  const games = apps.games
  const categories = [
    { key: 'quizzes', slugs: ['quiz'], image: quizGameImage },
    { key: 'cards', slugs: ['spoznajme-sa'], image: spoznajmeSaImage },
    { key: 'puzzles', slugs: ['hadacka'], image: hadackaImage },
    { key: 'surveys', slugs: ['couplesync'], image: couplesyncImage },
  ]

  const imageMap: Record<string, any> = {
    'quiz': quizGameImage,
    'spoznajme-sa': spoznajmeSaImage,
    'hadacka': hadackaImage,
    'couplesync': couplesyncImage,
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-muted">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-6">
            {apps.bannerCTA}
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">
            {apps.bannerTitle}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {apps.bannerSubtitle}
          </p>
          <nav className="flex flex-wrap justify-center gap-4 pt-4">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`#${cat.key}`}
                className="px-4 py-2 text-sm font-medium text-primary bg-card/80 hover:bg-card border border-primary/20 rounded-full transition-all hover:shadow-md"
              >
                {apps.categories[cat.key]}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {categories.map((cat) =>
              cat.slugs.map((slug) => {
                const g = games[slug]
                const gameImage = imageMap[slug]
                return (
                  <Card key={slug} className="group overflow-hidden card-elegant hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={gameImage}
                        alt={g.name}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-foreground">
                        {g.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {g.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Link href={slug === 'couplesync' ? g.link : `/${lang}/apps/${slug}`}>
                          {g.cta}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
