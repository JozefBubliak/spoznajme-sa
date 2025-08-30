'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  dict: any
  lang: string
}

export default function QuizPageClient({ dict, lang }: Props) {
  const back = dict.apps.games.ctaBack

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">🧠 Kvíz</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Zábavná tímová hra, ktorá preverí vaše vedomosti a spestrí každý event.
          Moderátor vytvorí hru a hráči sa pripoja cez QR kód alebo zdieľaný link.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="btn-primary">
            <Link href={`/${lang}/apps/quiz`}>🎮 Vytvoriť hru (moderátor)</Link>
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Ako to funguje?</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Moderátor vytvorí miestnosť a zdieľa QR alebo link</li>
            <li>Hráči sa pripoja cez mobil</li>
            <li>Odpovedáte na otázky a zbierate body</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Prečo práve Kvíz?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🎉 Skvelá zábava na teambuildingy, školy a večierky</li>
            <li>📱 Bez registrácie – stačí mobil</li>
            <li>⚡ Jednoduché ovládanie pre hráčov aj moderátora</li>
            <li>👥 Hrá sa v malých aj veľkých skupinách</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Ukážky z hry</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Image
              src="/images/quiz-lobby.png"
              alt="Lobby s QR kódom"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
            <Image
              src="/images/quiz-question.png"
              alt="Ukážka otázky"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
            <Image
              src="/images/quiz-results.png"
              alt="Priebežné výsledky"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
            <Image
              src="/images/quiz-winner.png"
              alt="Finálny rebríček"
              width={400}
              height={300}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Návod pre moderátora</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Klikni na „Vytvoriť hru“</li>
            <li>Nastav počet kôl a otázky</li>
            <li>Zdieľaj QR kód hráčom</li>
            <li>Spusti hru a sleduj priebežné výsledky</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Návod pre hráča</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Pripoj sa cez odkaz alebo QR kód</li>
            <li>Zadaj svoje meno a čakaj v lobby</li>
            <li>Odpovedaj na otázky čo najlepšie</li>
            <li>Po každom kole sleduj priebežné poradie</li>
          </ol>
        </div>
      </section>

      <div className="text-center">
        <Button variant="link" asChild>
          <Link href={`/${lang}/apps`}>{back}</Link>
        </Button>
      </div>
    </div>
  )
}

