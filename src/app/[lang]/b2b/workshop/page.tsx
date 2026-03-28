import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function B2BWorkshopPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/b2b`} className="text-xs text-muted-foreground hover:text-foreground">← Pre organizácie</Link>
          <div className="text-4xl">🎤</div>
          <h1 className="text-4xl font-bold text-foreground">Workshopy na mieru</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Jednorázové alebo opakované workshopy vedené skúseným facilitátorom. Online aj prezenčne.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/b2b/dopyt`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Odoslať dopyt
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { duration: '90 min', title: 'Základný workshop', desc: 'Úvod do hlbokých rozhovorov. Pre skupiny 8–20 ľudí. Online alebo prezenčne.', price: 'od 290 €' },
            { duration: '3 hod', title: 'Rozšírený workshop', desc: 'Hlbší program s praktickými cvičeniami a kartičkami pre každého účastníka.', price: 'od 490 €' },
            { duration: '1 deň', title: 'Celodenný program', desc: 'Kompletný facilitovaný deň. Vhodný pre retreaty a strategické stretnutia.', price: 'od 990 €' },
            { duration: 'Séria', title: 'Opakované workshopy', desc: 'Mesačné alebo kvartálne stretnutia pre dlhodobú kultúrnu zmenu.', price: 'Individuálne' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">{item.duration}</span>
                  <h2 className="font-semibold text-foreground mt-2">{item.title}</h2>
                </div>
                <span className="text-sm font-bold text-primary shrink-0 ml-3">{item.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
