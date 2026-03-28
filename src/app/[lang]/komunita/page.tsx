import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

export default async function KomunitaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">Komunita</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Miesta, kde sa ľudia stretávajú a rozprávajú. Eventy, circle sessions a možnosť organizovať vlastné stretnutie.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
          <Link
            href={`/${lang}/komunita/akcie`}
            className="group rounded-2xl border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
          >
            <div className="text-3xl mb-3">📅</div>
            <h2 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Akcie a eventy</h2>
            <p className="text-sm text-muted-foreground">Najbližšie stretnutia. Circle sessions, pop-up eventy, špeciálne príležitosti.</p>
          </Link>

          <Link
            href={`/${lang}/komunita/organizuj`}
            className="group rounded-2xl border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm"
          >
            <div className="text-3xl mb-3">🙋</div>
            <h2 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">Organizuj stretnutie</h2>
            <p className="text-sm text-muted-foreground">Chceš zorganizovať vlastné stretnutie vo svojom meste? Pomôžeme ti s tým.</p>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <div className="rounded-2xl border border-dashed bg-muted p-8 text-center space-y-2">
            <p className="text-foreground font-medium">Newsletter komunity</p>
            <p className="text-sm text-muted-foreground">Nové eventy, tipy na rozhovory, príbehy z komunity. 1× za mesiac.</p>
            <div className="flex gap-2 max-w-sm mx-auto mt-4">
              <input
                type="email"
                placeholder="vas@email.sk"
                className="flex-1 rounded-lg border bg-background text-foreground px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
                Prihlásiť
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Newsletter čoskoro. Kontaktujte nás na ahoj@spoznajmesa.sk</p>
          </div>
        </div>
      </section>
    </div>
  )
}
