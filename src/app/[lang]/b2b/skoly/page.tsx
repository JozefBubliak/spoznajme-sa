import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string }> }

export default async function B2BSkolyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}/b2b`} className="text-xs text-muted-foreground hover:text-foreground">← Pre organizácie</Link>
          <div className="text-4xl">🎒</div>
          <h1 className="text-4xl font-bold text-foreground">Školy a pedagógovia</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Programy pre triedy, školských psychológov a pedagógov. Budovanie vzťahov a komunikačných zručností.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/b2b/dopyt`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
              Odoslať dopyt
            </Link>
          </div>
        </div>
      </section>
      <Container>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: 'Triedna hodina', desc: 'Štruktúrovaný rozhovor pre triedy. Peer-to-peer komunikácia.' },
            { title: 'Školský psychológ', desc: 'Nástroje pre individuálne aj skupinové stretnutia so žiakmi.' },
            { title: 'Rodičovské združenie', desc: 'Bridging generácií. Rodičia + deti + škola.' },
            { title: 'Prevencia šikany', desc: 'Empatia a aktívne počúvanie ako prevencia konfliktov.' },
            { title: 'Sociálno-emocionálne učenie', desc: 'SEL program. Kvality, pocity, hodnoty. Pre rôzne vekové skupiny.' },
            { title: 'Pedagogická rada', desc: 'Komunikácia v pedagogickom tíme. Vzájomné spoznanie sa.' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
