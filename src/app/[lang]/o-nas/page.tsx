import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function ONasPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">O nás</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Veríme, že každý vzťah — rodičovský, partnerský, priateľský — závisí od schopnosti pýtať sa a počúvať.
          </p>
        </div>
      </section>
      <Container>
        <div className="max-w-2xl space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Prečo sme začali</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spoznajme sa vzniklo zo jednoduchého pozorovania: ľudia trávia čas vedľa seba, ale len málo času skutočne spolu.
              Rodičia a deti, partneri, kolegovia — rozprávame sa o povinnostiach a logistike, ale zriedka o tom, čo nás naozaj trápi alebo teší.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Správne otázky dokážu toto zmeniť. Nie terapeutické cvičenia, nie komplikované techniky — stačí sa pýtať inak.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Čo robíme</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Otázky podľa kontextu', desc: 'Pre páry, rodičov, priateľov, kolegov. Podľa veku, témy a situácie.' },
                { label: 'Fyzické kartičky', desc: 'Hmatateľný nástroj na stôl. Päť edícií. Darček aj každodenný rituál.' },
                { label: 'Digitálne nástroje', desc: 'Aplikácie, kvízy a facilitátorské nástroje pre moderné skupiny.' },
                { label: 'Workshopy a B2B', desc: 'Pre firmy, školy a organizácie, ktoré investujú do ľudí.' },
              ].map(item => (
                <div key={item.label} className="rounded-xl border bg-card p-4 shadow-sm">
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Hodnoty</h2>
            <div className="space-y-3">
              {[
                { value: 'Úprimnosť', desc: 'Povieme vám, ak niečo nie je pripravené. Radšej "čoskoro" ako prázdna obálka.' },
                { value: 'Jednoduchosť', desc: 'Najlepší rozhovor začína jednou otázkou. Nepotrebujete aplikáciu ani manuál.' },
                { value: 'Inklúzia', desc: 'Hlboké rozhovory nie sú len pre psychológov alebo koučov. Sú pre každého.' },
              ].map(item => (
                <div key={item.value} className="flex gap-3">
                  <span className="text-primary font-semibold text-sm shrink-0 pt-0.5">{item.value}</span>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-3">
            <p className="font-medium text-foreground">Chcete spolupracovať?</p>
            <p className="text-sm text-muted-foreground">Sme otvorení partnerstvám, mediálnej spolupráci a odborným spoluautorstvám.</p>
            <Link href={`/${lang}/kontakt`} className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
