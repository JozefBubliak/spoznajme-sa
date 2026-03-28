'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, ArrowRight, BookOpen, Gamepad2, Users2, BarChart3 } from 'lucide-react'
import coupleImage from '@/assets/couple-conversation.jpg'
import friendsImage from '@/assets/friends-conversation.jpg'
import familyImage from '@/assets/family-conversation.jpg'

export default function MarketingHomePage() {
  const audienceCategories = [
    {
      id: 'couples',
      title: 'Pre páry',
      description: 'Kvízy na objavovanie vzájomných preferencií a nástroje na zlepšenie partnerskej komunikácie',
      image: coupleImage,
      link: '/sk/produkty/pary',
      linkText: 'Párové rozhovory',
    },
    {
      id: 'families',
      title: 'Pre rodiny',
      description: 'Pomôcky pre rodičov a deti na posilnenie lepšej komunikácie a porozumenia',
      image: familyImage,
      link: '/sk/produkty/rodic-dieta',
      linkText: 'Rodinné rozhovory',
    },
    {
      id: 'friends',
      title: 'Pre priateľov',
      description: 'Hry pre skupiny priateľov na zábavné a zmysluplné rozhovory',
      image: friendsImage,
      link: '/sk/apps/spoznajme-sa',
      linkText: 'Spoznajme sa',
    },
  ]

  const tools = [
    {
      icon: MessageCircle,
      title: 'Komunikačný kompas',
      description: 'Krátke frázy a mini-príručky pre každodenné situácie – podľa témy a publika.',
      link: '/sk/kompas',
    },
    {
      icon: Gamepad2,
      title: 'Aplikácie & Hry',
      description: 'Rýchly kvíz Fast Herd Vote a "Spoznajme sa" – kartové výzvy v balíčkoch.',
      link: '/sk/apps',
    },
    {
      icon: Users2,
      title: 'Centrum nástrojov',
      description: 'Témy, publiká a vekové mapy na jednom mieste.',
      link: '/sk/pomocky',
    },
    {
      icon: BookOpen,
      title: 'Index: čo trápi deti',
      description: 'Prehľad napísaný "detským hlasom" – praktické začiatky rozhovorov.',
      link: '/sk/indexy/co-trapi-deti',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
        <div className="container-modern section-spacing relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl leading-tight text-foreground">
                Skutočné spojenie<br />
                <span className="gradient-text">prostredníctvom rozhovorov</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Podpora hlbšej komunikácie pre páry, rodiny<br />
                vo skutočnom svete
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                <Link href="/sk/kompas">
                  Začať rozhovor
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Categories Section */}
      <section className="section-spacing bg-background">
        <div className="container-modern">
          <div className="grid gap-8 lg:grid-cols-3">
            {audienceCategories.map((category) => (
              <div key={category.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm text-white/90 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <Link
                      href={category.link}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {category.linkText} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section-spacing bg-muted">
        <div className="container-modern">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl text-foreground">
              Začnite s <span className="gradient-text">malými zmenami</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vyberte si tému alebo publikum a získajte frázy pripravené na použitie
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Card key={tool.title} className="group card-elegant hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button asChild variant="outline" size="sm" className="group-hover:border-primary/50 transition-colors">
                    <Link href={tool.link}>Otvoriť</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-background border-t">
        <div className="container-modern">
          <div className="text-center space-y-8">
            <h2 className="text-3xl text-foreground">Pripravení začať?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                <Link href="/sk/kompas">Otvoriť kompas</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-3">
                <Link href="/sk/apps/spoznajme-sa/play">Začať "Spoznajme sa"</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-3">
                <Link href="/sk/apps/couplesync">Spustiť CoupleSync</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
