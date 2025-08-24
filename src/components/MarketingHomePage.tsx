'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Users, Sparkles, ArrowRight, Star, Shield, Zap } from 'lucide-react'

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10"></div>
        <div className="container-modern section-spacing relative">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Sparkles className="h-4 w-4" />
                  Nový spôsob komunikácie
                </span>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
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
                  <Button asChild variant="glass" size="xl">
                    <Link href="/sk/apps/spoznajme-sa" aria-label="Kartičky Spoznajme sa">
                      Kartičky
                    </Link>
                  </Button>
                </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="card-connection p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse-connection"></div>
                  <span className="text-sm font-medium text-muted-foreground">Živá ukážka</span>
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground">
                  "Ak by si mal/mala možnosť napísať list svojmu mladšiemu ja, čo by si mu/jej poradil/a?"
                </blockquote>
                <div className="flex gap-3">
                  <Button variant="connection" className="flex-1">
                    Ďalšia otázka
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Uložiť
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-gradient-to-b from-transparent to-muted/20">
        <div className="container-modern">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">
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
    </div>
  )
}
