'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { UserCircle } from 'lucide-react'
type Props = {
  dict: any
  lang: string
}

export default function QuizPageClient({ dict, lang }: Props) {
  const { user, loading } = useAuth()
  const game = dict.apps.games.quiz
  const back = dict.apps.games.ctaBack

  return (
    <div className="space-y-8">
      <div className="flex justify-end text-sm text-muted-foreground gap-2 items-center">
        <UserCircle className="h-5 w-5" />
        {loading ? '...' : user ? user.email : 'Neprihlásený'}
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{game.name}</h1>
        <p className="text-lg text-muted-foreground">{game.description}</p>
        <Image
          src="/images/placeholder.jpg"
          alt=""
          width={600}
          height={300}
          className="mx-auto rounded-lg"
        />
        <Button asChild size="lg" className="mt-4">
          {user ? (
            <Link href={`/${lang}${game.link}`}>{game.cta}</Link>
          ) : (
            <Link href={`/login?next=/${lang}/apps/quiz`}>
              Prihlásiť sa ako moderátor
            </Link>
          )}
        </Button>
        {!user && (
          <p className="text-sm text-muted-foreground">
            Rola moderátora je dostupná iba registrovaným používateľom. Po
            vytvorení hry získate trvalý odkaz na svoju miestnosť viazaný na
            váš účet.
          </p>
        )}
      </div>

      <section className="mx-auto max-w-xl space-y-4">
        <h2 className="text-2xl font-semibold text-center">Ako to funguje</h2>
        <ol className="list-decimal list-inside space-y-2 text-left">
          {game.manual.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <div className="text-center">
        <Button variant="link" asChild>
          <Link href={`/${lang}/apps`}>{back}</Link>
        </Button>
      </div>
    </div>
  )
}

