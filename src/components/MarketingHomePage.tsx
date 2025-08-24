'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Users, Sparkles, ArrowRight, Star, Shield, Zap, BookOpen, Play, Target } from 'lucide-react'

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

  const categories = [
    {
      icon: Heart,
      title: 'Pre páry',
      description: 'Kvízy na objavovanie vzájomných preferencií, komunikačné nástroje pre rôzne životné situácie a rozhovory, ktoré posilnia váš vzťah.',
      buttonText: 'CoupleSync kvíz',
      href: '/sk/apps/couplesync',
      gradient: 'from-pink-400/20 to-red-400/20'
    },
    {
      icon: Users,
      title: 'Pre rodiny',
      description: 'Pomôcky pre rodičov a deti na vzájomnú komunikáciu a pochopenie sa. Nástroje, ktoré spájajú generácie.',
      buttonText: 'Rodinné rozhovory',
      href: '/sk/pomocky/audience/rodina',
      gradient: 'from-blue-400/20 to-purple-400/20'
    },
    {
      icon: Users,
      title: 'Pre priateľov',
      description: 'Konverzačné kartičky a party hry, ktoré pomôžu lepšiemu spoznaniu sa ľudí a vytvoreniu hlbších priateľstiev.',
      buttonText: 'Spoznajme sa',
      href: '/sk/apps/spoznajme-sa',
      gradient: 'from-green-400/20 to-teal-400/20'
    }
  ]

  const tools = [
    {
      icon: MessageCircle,
      title: 'Komunikačný kompas',
      description: 'Krátke frázy a mini-príručky pre každodenné situácie – podľa témy a publika.',
      buttonText: 'Otvoriť'
    },
    {
      icon: Play,
      title: 'Aplikácie & Hry',
      description: 'Rýchly kvíz Fast Herd Vote a "Spoznajme sa" – kartové výzvy v balíčkoch.',
      buttonText: 'Otvoriť'
    },
    {
      icon: Target,
      title: 'Centrum nástrojov',
      description: 'Témy, publiká a vekové mapy na jednom mieste.',
      buttonText: 'Otvoriť'
    },
    {
      icon: BookOpen,
      title: 'Indexy: čo trápi deti',
      description: 'Prehľad napísaný "detským hlasom" – praktické začiatky rozhovorov.',
      buttonText: 'Otvoriť'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-pink-50/30 to-red-100/40"></div>
        <div className="absolute inset-0" style={{ 
          background: 'var(--gradient-peachy)',
          opacity: 0.8
        }}></div>
        
        <div className="container-modern section-spacing relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-primary border border-primary/20">
                  <Sparkles className="h-5 w-5" />
                  Nový spôsob komunikácie
                </span>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-primary">Lepšie rozhovory,</span>
                  <br />
                  <span className="text-foreground">bližšie vzťahy</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Praktické frázy, mini-príručky a hry pre rodiny a páry. Jasné, použiteľné a 
                prízemné riešenia pre skutočnú komunikáciu.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button asChild variant="hero" size="xl" className="group shadow-lg">
                  <Link href="/sk/apps/couplesync" aria-label="Začať rozhovor">
                    Začať rozhovor
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="xl" className="backdrop-blur-sm">
                  <Link href="/sk/kompas" aria-label="Preskúmať nástroje">
                    Preskúmať nástroje
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl border border-white/40 p-8 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Živá ukážka</span>
                  </div>
                  <blockquote className="text-xl leading-relaxed text-foreground font-medium">
                    "Ak by si mal/mala možnosť napísať list svojmu mladšiemu ja, čo by si mu/jej poradil/a?"
                  </blockquote>
                  <div className="flex gap-4 pt-2">
                    <Button variant="hero" className="flex-1">
                      Ďalšia otázka
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-5 w-5 mr-2" />
                      Uložiť
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-spacing bg-gradient-to-b from-transparent via-muted/30 to-transparent">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold text-foreground">
              Na čom chcete <span className="text-primary">pracovať?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Vyberte si typ vzťahu a získajte nástroje šité na mieru pre skutočnú komunikáciu
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {categories.map((category, index) => (
              <Card key={category.title} className="relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                    <category.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-6">
                  <CardDescription className="text-base leading-relaxed text-center text-muted-foreground">
                    {category.description}
                  </CardDescription>
                  <Button asChild variant="hero" className="w-full" size="lg">
                    <Link href={category.href}>
                      {category.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section-spacing bg-gradient-to-br from-muted/20 to-accent/10">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold">
              Začnite s <span className="text-primary">malými zmenami</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Vyberte si tému alebo publikum a získajte frázy pripravené na použitie
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {tools.map((tool, index) => (
              <Card key={tool.title} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed text-center">
                    {tool.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground" size="sm">
                    {tool.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button asChild variant="hero" size="xl" className="shadow-lg">
              <Link href="/sk/kompas">
                Otvoriť kompas
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" className="backdrop-blur-sm">
              <Link href="/sk/apps/spoznajme-sa">
                Začať "Spoznajme sa"
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="hover:bg-primary hover:text-primary-foreground">
              <Link href="/sk/apps/couplesync">
                Spustiť CoupleSync
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-gradient-to-b from-transparent to-muted/20">
        <div className="container-modern">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold">
              <span className="text-primary">Prečo to funguje</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Náš prístup je založený na overených princípoch komunikácie a psychológie vzťahov
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={feature.title} className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <feature.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
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
