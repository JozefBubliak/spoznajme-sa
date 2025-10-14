'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Users, Sparkles, ArrowRight, Star, BookOpen, Gamepad2, Users2, BarChart3 } from 'lucide-react'
import coupleImage from '@/assets/couple-conversation.jpg'
import friendsImage from '@/assets/friends-conversation.jpg'
import familyImage from '@/assets/family-conversation.jpg'

export default function MarketingHomePage() {
  const audienceCategories = [
    {
      id: 'couples',
      title: 'Pre páry',
      description: 'Kvízy na objavovanie vzájomných preferencií a nastroje na zlepšenie partnerskej komunikácie',
      image: coupleImage,
      link: '/sk/produkty/pary',
      linkText: 'Párové rozhovory',
      tools: ['CoupleSync', 'Spoznajme sa']
    },
    {
      id: 'families',
      title: 'Pre rodiny',
      description: 'Pomôcky pre rodičov a deti na posilnenie lepšej komunikácie a porozumenia',
      image: familyImage,
      link: '/sk/produkty/rodic-dieta',
      linkText: 'Rodinné rozhovory',
      tools: ['Kvíz', 'Hádačka']
    },
    {
      id: 'friends',
      title: 'Pre priateľov',
      description: 'Konie a hry pre skupiny priateľov na zábavné a zmysluplné rozhovory',
      image: friendsImage,
      link: '/sk/apps/spoznajme-sa',
      linkText: 'Spoznajme sa',
      tools: ['Kartové výzvy', 'Skupinové aktivity']
    }
  ]

  const tools = [
    {
      icon: MessageCircle,
      title: 'Komunikačný kompas',
      description: 'Krátke frázy a mini-príručky pre každodenné situácie – podľa témy a publika.',
      link: '/sk/kompas'
    },
    {
      icon: Gamepad2,
      title: 'Aplikácie & Hry',
      description: 'Rýchly kvíz Fast Herd Vote a "Spoznajme sa" – kartové výzvy v balíčkoch.',
      link: '/sk/apps'
    },
    {
      icon: Users2,
      title: 'Centrum nástrojov',
      description: 'Témy, publiká a vekové mapy na jednom mieste.',
      link: '/sk/pomocky'
    },
    {
      icon: BookOpen,
      title: 'Index: čo trápi deti',
      description: 'Prehľad napísaný "detským hlasom" – praktické začiatky rozhovorov.',
      link: '/sk/indexy/co-trapi-deti'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container-modern section-spacing relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight text-gray-800">
                Skutočné spojenie<br />
                <span className="gradient-text">prostredníctvom rozhovorov</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Podpora hlbšej komunikácie pre páry, rodiny<br />
                vo skutočnom svete
              </p>
            </div>
            <div className="flex justify-center">
              <Button asChild variant="hero" size="xl" className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
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
      <section className="section-spacing bg-white">
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
                      className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium transition-colors"
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
      <section className="section-spacing bg-gradient-to-b from-gray-50 to-white">
        <div className="container-modern">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-4xl font-bold text-gray-800">
              Začnite s <span className="text-purple-600">malými zmenami</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vyberte si tému alebo publikum a získajte frázy pripravené na použitie
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <Card key={tool.title} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-sm leading-relaxed text-gray-600 mb-4">
                    {tool.description}
                  </CardDescription>
                  <Button asChild variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors">
                    <Link href={tool.link}>
                      Otvoriť
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="section-spacing bg-white border-t border-gray-100">
        <div className="container-modern">
          <div className="text-center space-y-8">
            <h2 className="font-heading text-3xl font-bold text-gray-800 mb-8">
              Pripravení začať?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="default" size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                <Link href="/sk/kompas">
                  Otvoriť kompas
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3">
                <Link href="/sk/apps/spoznajme-sa/play">
                  Začať "Spoznajme sa"
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Link href="/sk/apps/couplesync">
                  Spustiť CoupleSync
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
