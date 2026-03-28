import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function KomunitaAkciePage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/komunita`} className="text-xs text-muted-foreground hover:text-foreground">← Komunita</Link>
          <div className="text-4xl">📅</div>
          <h1 className="text-4xl font-bold text-foreground">Akcie a eventy</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Najbližšie stretnutia komunity. Circle sessions, pop-up eventy, špeciálne príležitosti.
          </p>
        </div>
      </section>
      <Container>
        <div className="space-y-5">
          <div className="rounded-2xl border border-dashed bg-muted p-8 text-center space-y-2">
            <p className="text-foreground font-medium">Kalendár akcií čoskoro</p>
            <p className="text-sm text-muted-foreground">
              Prvé eventy plánujeme na jar 2026. Sledujte nás alebo sa prihláste na newsletter.
            </p>
            <Link
              href={`/${lang}/komunita`}
              className="inline-block mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
            >
              Prihlásiť na newsletter
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {['Circle session – Bratislava', 'Pop-up event – Košice', 'Online stretnutie'].map(event => (
              <div key={event} className="rounded-2xl border bg-card p-5 shadow-sm opacity-60">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border font-medium">Čoskoro</span>
                <h3 className="font-medium text-foreground mt-3">{event}</h3>
                <p className="text-sm text-muted-foreground mt-1">Dátum bude oznámený.</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
