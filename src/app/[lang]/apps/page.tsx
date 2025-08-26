import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/server'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type P = { params: Promise<{ lang: string }> }

export default async function AppsPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()
  const dict = await getDictionary(lang as Locale)
  const apps = dict.apps
  const games = apps.games
  const categories = [
    { key: 'quizzes', slugs: ['quiz'] },
    { key: 'cards', slugs: ['spoznajme-sa'] },
    { key: 'puzzles', slugs: ['hadacka'] },
    { key: 'surveys', slugs: ['couplesync'] },
  ]

  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">
          {apps.bannerTitle}
        </h1>
        <p className="text-lg text-muted-foreground">{apps.bannerSubtitle}</p>
        <nav className="flex justify-center gap-4 pt-4 text-sm">
          {categories.map((cat) => (
            <Link key={cat.key} href={`#${cat.key}`} className="hover:underline">
              {apps.categories[cat.key]}
            </Link>
          ))}
        </nav>
      </section>

      <section id="games" className="space-y-12">
        {categories.map((cat) => (
          <div key={cat.key} id={cat.key} className="space-y-6">
            <h2 className="text-2xl font-semibold">
              {apps.categories[cat.key]}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.slugs.map((slug) => {
                const g = games[slug]
                return (
                  <Card key={slug}>
                    <Image
                      src="/images/placeholder.jpg"
                      alt=""
                      width={400}
                      height={200}
                      className="h-40 w-full object-cover"
                    />
                    <CardHeader>
                      <CardTitle>{g.name}</CardTitle>
                      <CardDescription>{g.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link href={`/${lang}/apps/${slug}`}>{g.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
