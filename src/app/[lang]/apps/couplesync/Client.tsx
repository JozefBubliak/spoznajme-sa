'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Props = { dict: any; lang: string }

function MagicLinkButton({ lang, label }: { lang: string; label: string }) {
  const router = useRouter()
  const handleClick = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const array = new Uint8Array(22)
    crypto.getRandomValues(array)
    let token = ''
    array.forEach((n) => (token += chars[n % chars.length]))
    router.push(`/${lang}/apps/couplesync/start?room=${token}`)
  }
  return (
    <Button onClick={handleClick} size="lg">
      {label}
    </Button>
  )
}

export default function Client({ dict, lang }: Props) {
  const cs = dict.apps.games.couplesync
  const back = dict.apps.games.ctaBack
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-16">
      <Link
        href={`/${lang}/apps`}
        className="text-sm text-muted-foreground hover:underline"
      >
        ← {back}
      </Link>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{cs.heroTitle}</h1>
        <p className="text-lg text-muted-foreground">{cs.heroSubtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild size="lg">
            <Link href={`/auth/login?next=/${lang}/apps/couplesync/start`}>
              {cs.ctaEmail}
            </Link>
          </Button>
          <MagicLinkButton lang={lang} label={cs.ctaMagic} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">{cs.whyTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {cs.whyPoints.map((p: string, i: number) => (
            <div key={i} className="rounded-xl border p-4 text-sm text-left">
              {p}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">{cs.benefitsTitle}</h2>
        <ul className="space-y-2 text-center">
          {cs.benefitsList.map((b: string, i: number) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">{cs.barriersTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {cs.barriersCards.map((b: string, i: number) => (
            <div key={i} className="rounded-xl border p-5 text-center text-sm">
              {b}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">{cs.howTitle}</h2>
        <ol className="list-decimal list-inside space-y-2 max-w-xl mx-auto text-left">
          {cs.howSteps.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-center">{cs.privacyTitle}</h2>
        <ul className="space-y-2 max-w-xl mx-auto text-left">
          {cs.privacyPoints.map((p: string, i: number) => (
            <li key={i} className="flex gap-2">
              <span>✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-sm pt-2">
          <Link href="/privacy" className="underline">
            Privacy
          </Link>
        </p>
      </section>

      <footer className="text-center text-sm text-muted-foreground pt-4">
        {cs.footerNotice}
      </footer>
    </div>
  )
}

