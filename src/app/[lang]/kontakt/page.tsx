import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function KontaktPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">Kontakt</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Napíšte nám. Odpovieme do 24 hodín.
          </p>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Email</p>
              <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline text-sm">ahoj@spoznajmesa.sk</a>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Rýchly kontakt pre</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Objednávky a produkty → <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a></li>
                <li>• B2B a workshopy → <a href={`/${lang}/b2b/dopyt`} className="text-primary hover:underline">dopytový formulár</a></li>
                <li>• Technické problémy → <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a></li>
                <li>• Média a spolupráca → <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a></li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <p className="text-sm font-medium text-foreground mb-1">Doba odozvy</p>
              <p className="text-sm text-muted-foreground">Pracovné dni: do 24 hodín. Víkendy: do 48 hodín.</p>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-foreground">Správa</h2>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Meno</label>
              <input
                type="text"
                placeholder="Vaše meno"
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                placeholder="vas@email.sk"
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Správa</label>
              <textarea
                rows={4}
                placeholder="Ako vám môžeme pomôcť?"
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Odoslať
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Formulár je informatívny. Napíšte priamo na email vyššie.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
