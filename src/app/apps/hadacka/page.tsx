"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'

export default function HadackaLandingPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Top header with auth status */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/apps/hadacka" className="text-xl font-bold gradient-text">
            🎮 Hádačka naživo
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Odhlásiť sa
                </Button>
              </>
            ) : (
              <Button asChild size="sm">
                <Link href="/login">Prihlásiť sa</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Hádačka naživo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Párty konverzačná hra pre skupiny. Jeden moderátor, všetci sa bavia.
            Žiadne telefóny, iba zábava a smiech!
          </p>
          {user ? (
            <p className="text-lg">
              Vitaj {user.email}! Prajeme príjemne strávený čas pri moderovaní.
            </p>
          ) : (
            <p className="text-md text-muted-foreground">
              Na spustenie hry je potrebné prihlásenie moderátora.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button asChild size="lg" className="btn-primary">
                <Link href="/apps/hadacka/moderator">
                  🎮 Vytvoriť hru
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-primary">
                <Link href="/login">Prihlásiť sa ako moderátor</Link>
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
              <Link
                href="/apps/hadacka/display"
                target="_blank"
                rel="noopener noreferrer"
              >
                📺 Otvoriť Player Display
              </Link>
            </Button>
          </div>
        </div>

        {/* How to Play */}
        <Card className="mb-8 card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Ako sa hrá
            </CardTitle>
            <CardDescription>
              Tri jednoduché kroky k zábave
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="font-semibold">Vyber hru</h3>
                <p className="text-sm text-muted-foreground">
                  Nastav tímy, kategórie a pravidlá podľa svojej skupiny
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="font-semibold">Pozvi ľudí</h3>
                <p className="text-sm text-muted-foreground">
                  Zdieľaj Player Display na TV alebo projektore pre všetkých
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="font-semibold">Začni sa rozprávať</h3>
                <p className="text-sm text-muted-foreground">
                  Hádajte slová, bavte sa a spoznávajte navzájom
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Modes */}
        <Card className="mb-8 card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎭 Herné módy
            </CardTitle>
            <CardDescription>
              Rôzne spôsoby ako hádať slová
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2 p-4 border rounded-lg">
                <div className="text-2xl">💬</div>
                <h4 className="font-semibold">Opis/TABU</h4>
                <p className="text-xs text-muted-foreground">
                  Opíš slovo bez použitia zakázaných výrazov
                </p>
              </div>
              <div className="text-center space-y-2 p-4 border rounded-lg">
                <div className="text-2xl">🎭</div>
                <h4 className="font-semibold">Pantomíma</h4>
                <p className="text-xs text-muted-foreground">
                  Ukáž slovo len pohybmi a grifásmi
                </p>
              </div>
              <div className="text-center space-y-2 p-4 border rounded-lg">
                <div className="text-2xl">☝️</div>
                <h4 className="font-semibold">Jedno slovo</h4>
                <p className="text-xs text-muted-foreground">
                  Povedz len jedno slovo ako nápovedu
                </p>
              </div>
              <div className="text-center space-y-2 p-4 border rounded-lg">
                <div className="text-2xl">🔀</div>
                <h4 className="font-semibold">Mix módov</h4>
                <p className="text-xs text-muted-foreground">
                  Kombinuj všetky módy v jednej hre
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="mb-8 card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📚 Kategórie slov
            </CardTitle>
            <CardDescription>
              Vyber si kategórie podľa svojej skupiny
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">🐕 Zvieratá</Badge>
              <Badge variant="secondary">🍕 Jedlo a nápoje</Badge>
              <Badge variant="secondary">⚽ Šport</Badge>
              <Badge variant="secondary">💻 Technológie</Badge>
              <Badge variant="secondary">🎵 Hudba</Badge>
              <Badge variant="secondary">🏠 Domácnosť</Badge>
              <Badge variant="secondary">🌍 Cestovanie</Badge>
              <Badge variant="secondary">🎬 Film a TV</Badge>
              <Badge variant="secondary">📚 Vzdelávanie</Badge>
              <Badge variant="secondary">🎪 Zábava</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card className="mb-8 card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👥 Pre koho je hra vhodná
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  👨‍👩‍👧‍👦 Rodiny
                </h4>
                <p className="text-sm text-muted-foreground">
                  Skvelá na rodinné večery a oslavy. Děti aj dospelí sa zabavia.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  🎉 Párty a večierky
                </h4>
                <p className="text-sm text-muted-foreground">
                  Rozprúdi atmosféru na každej akcii. Ľudia sa spoznajú a zabavia.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  💼 Firemné tímy
                </h4>
                <p className="text-sm text-muted-foreground">
                  Team building aktivity, ktoré skutočne fungujú a spájajú kolektív.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  🏫 Školy a kurzy
                </h4>
                <p className="text-sm text-muted-foreground">
                  Učenie cez hru. Zlepšuje slovnú zásobu a komunikačné zručnosti.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-4 py-8 border-t">
          <div className="flex justify-center gap-4">
            <Link 
              href="/apps/hadacka/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Ochrana súkromia
            </Link>
            <Link 
              href="/apps/hadacka/changelog" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Changelog
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Súčasť <Link href="/" className="underline">DeepTalks.eu</Link> - 
            Pomáhame ľuďom lepšie komunikovať
          </p>
        </div>
      </div>
    </div>
  )
}