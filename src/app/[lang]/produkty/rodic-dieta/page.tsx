import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function ProduktyRodicDietaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/produkty`} className="text-xs text-muted-foreground hover:text-foreground">← Produkty</Link>
          <div className="text-4xl">👨‍👧</div>
          <h1 className="text-4xl font-bold text-foreground">Produkty rodič–dieťa</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Pomôcky pre rodičov. Otázky podľa veku, skripty pre ťažké témy, fyzické kartičky.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/skupiny/rodic-dieta`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Sekcia rodič–dieťa
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { name: 'Fyzické kartičky – Rodič+Dieťa', price: '18–25 €', desc: 'Sada otázok podľa veku. Pre deti 5–15 rokov.' },
            { name: 'Kompas skripty', price: 'Zadarmo', desc: 'Krátke vety do ťažkých momentov. Emócie, škola, obrazovky.' },
            { name: 'Vekové mapy', price: 'Zadarmo', desc: 'Čo zaujíma deti v rôznych vekoch? Praktický prehľad.' },
          ].map(p => (
            <div key={p.name} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-foreground">{p.name}</h2>
                <span className="text-sm font-bold text-primary ml-3 shrink-0">{p.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <button disabled className="mt-4 px-4 py-2 rounded-lg border text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed">
                Čoskoro
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
