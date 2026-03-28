import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const segments = [
  { slug: 'firmy', emoji: '🏢', label: 'Firemné tímy', desc: 'Teambuildingové aktivity a workshopy pre lepšiu komunikáciu v tíme.' },
  { slug: 'skoly', emoji: '🎒', label: 'Školy a pedagógovia', desc: 'Programy pre triedy, učiteľov a školských psychológov.' },
  { slug: 'workshop', emoji: '🎤', label: 'Workshopy na mieru', desc: 'Jednorázové alebo opakované workshopy vedené facilitátorom.' },
  { slug: 'dopyt', emoji: '✉️', label: 'Odoslať dopyt', desc: 'Nezáväzný dopyt. Odpovieme do 24 hodín.', cta: true },
]

export default async function B2BPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">Pre organizácie</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Spoznajme sa v práci, škole aj na evente. Facilitované rozhovory, kartičky a workshopy pre skupiny.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
          {segments.map(s => (
            <Link
              key={s.slug}
              href={`/${lang}/b2b/${s.slug}`}
              className={`group rounded-2xl border p-6 transition-all shadow-sm ${s.cta ? 'bg-primary/10 border-primary/30 hover:bg-primary/20' : 'bg-card hover:border-primary/40 hover:bg-primary/5'}`}
            >
              <div className="text-3xl mb-3">{s.emoji}</div>
              <h2 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{s.label}</h2>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 rounded-2xl border bg-card p-8 text-center space-y-3">
          <p className="text-muted-foreground text-sm">Referencia</p>
          <p className="text-foreground font-medium max-w-lg mx-auto">
            „Naši zamestnanci si po workshope začali viac rozumieť. Odporúčame každému tímu."
          </p>
          <p className="text-xs text-muted-foreground">— HR manažér, slovenská technologická firma</p>
        </div>
      </section>
    </div>
  )
}
