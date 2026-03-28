import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

export default async function B2BDopytPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/b2b`} className="text-xs text-muted-foreground hover:text-foreground">← Pre organizácie</Link>
          <div className="text-4xl">✉️</div>
          <h1 className="text-4xl font-bold text-foreground">Odoslať dopyt</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Napíšte nám. Odpovieme do 24 hodín s konkrétnym návrhom pre vašu skupinu.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Meno a organizácia</label>
              <input
                type="text"
                placeholder="Jana Nováková, Firma s.r.o."
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                placeholder="jana@firma.sk"
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Čo hľadáte?</label>
              <select className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Vyberte typ</option>
                <option value="firmy">Firemný teambuilding</option>
                <option value="skoly">Školský program</option>
                <option value="workshop">Workshop na mieru</option>
                <option value="karticky">Fyzické kartičky (bulk)</option>
                <option value="ine">Niečo iné</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Správa (voliteľné)</label>
              <textarea
                rows={4}
                placeholder="Počet ľudí, dátum, špeciálne požiadavky..."
                className="w-full rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Odoslať dopyt
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Formulár je zatiaľ informatívny. Napíšte nám priamo na{' '}
              <a href="mailto:ahoj@spoznajmesa.sk" className="text-primary hover:underline">ahoj@spoznajmesa.sk</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
