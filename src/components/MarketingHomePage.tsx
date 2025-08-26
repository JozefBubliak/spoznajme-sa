'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Users, Sparkles, ArrowRight, Star } from 'lucide-react'

export default function MarketingHomePage() {
  const features = [
    {
      icon: Heart,
      title: 'Hlboké spojenie',
      description: 'Otázky navrhnuté odborníkmi na komunikáciu, ktoré pomáhajú budovať skutočnú blízkosť a dôveru.',
    },
    {
      icon: MessageCircle,
      title: 'Prirodzené rozhovory',
      description: 'Žiadne trápne ticho. Zmysluplné témy, ktoré rozhýbu rozhovor organicky a spontánne.',
    },
    {
      icon: Users,
      title: 'Pre každý vzťah',
      description: 'Partneri, kamaráti, rodina, rodič-dieťa — vyberieš si kontext a atmosféru rozhovoru.',
    }
  ]

  const testimonials = [
    {
      quote:
        'Vďaka otázkam zo Spoznajme sa sme sa s partnerom naučili rozprávať o veciach, na ktoré sme sa nikdy nespýtali.',
      author: 'Jana, 29',
      image:
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=256&q=80',
    },
    {
      quote: 'Konečne máme rozhovory, z ktorých si niečo odnesieme. Je to ako hra, ktorá nás zbližuje.',
      author: 'Marek, 34',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="container-modern section-spacing relative">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Nový spôsob komunikácie
                </span>
                <h1 className="font-heading text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Spoznajme sa</span>
                  <br />
                  <span className="text-foreground">hlbšie</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Premyslené otázky, ktoré pomáhajú partnerom, priateľom a rodinám komunikovať zmysluplne,
                budovať dôveru a vytvárať skutočné spojenie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl" className="group">
                  <Link href="/sk/apps/couplesync" aria-label="CoupleSync dotazník">
                    CoupleSync
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="xl" className="group">
                  <Link href="/sk/apps/spoznajme-sa" aria-label="Kartičky Spoznajme sa">
                    Kartičky
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80"
                alt="Spokojný pár pri rozhovore"
                width={1000}
                height={800}
                className="rounded-3xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-gradient-to-b from-transparent to-muted/20">
        <div className="container-modern">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-4xl font-bold">
              <span className="gradient-connection">Prečo to funguje</span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-connection animate-scale-in">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing bg-gradient-to-b from-muted/20 to-transparent">
        <div className="container-modern">
          <h2 className="text-center font-heading text-4xl font-bold mb-16">
            <span className="gradient-connection">Ohlasy používateľov</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.author} className="backdrop-blur-sm bg-background/60 border-0 shadow-lg animate-fade-in">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <Image src={t.image} alt={t.author} width={80} height={80} className="rounded-full object-cover" />
                  <p className="text-lg leading-relaxed">{t.quote}</p>
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium">{t.author}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-spacing text-center bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <h2 className="text-4xl font-heading font-bold mb-4">Pripravení začať?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Vyskúšajte otázky, ktoré vás priblížia k tým, na ktorých vám záleží.
        </p>
        <Button asChild variant="secondary" size="xl" className="group">
          <Link href="/sk/apps/couplesync" aria-label="Začať so Spoznajme sa">
            Začať hneď
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>
    </div>
  )
}
