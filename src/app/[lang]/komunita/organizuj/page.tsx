import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function KomunitaOrganizujPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/komunita`} className="text-xs text-muted-foreground hover:text-foreground">← Komunita</Link>
          <div className="text-4xl">🙋</div>
          <h1 className="text-4xl font-bold text-foreground">Organizuj stretnutie</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Chceš priniesť kultúru hlbokých rozhovorov do svojho mesta alebo komunity? Pomôžeme ti s tým.
          </p>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground">Ako to funguje</h2>
            {[
              { step: '1', title: 'Napíš nám', desc: 'Povedz nám o sebe a o tom, čo chceš zorganizovať.' },
              { step: '2', title: 'Dostaneš toolkit', desc: 'Materiály, otázky, manuál facilitátora a podporu pred eventom.' },
              { step: '3', title: 'Zorganizuješ event', desc: 'Ty si hostiteľ. My sme v zálohe, ak niečo potrebuješ.' },
              { step: '4', title: 'Zdieľaš spätnú väzbu', desc: 'Pomôžeš nám zlepšiť sa a komunite rásť.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{s.step}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-semibold text-foreground">Záujem o organizovanie</h2>
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
              <label className="block text-sm font-medium text-foreground mb-1.5">Mesto a typ stretnutia</label>
              <textarea
                rows={3}
                placeholder="Bratislava, chcem robiť mesačné circle sessions pre priateľov..."
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <button className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Odoslať záujem
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Napíšte nám priamo: <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
