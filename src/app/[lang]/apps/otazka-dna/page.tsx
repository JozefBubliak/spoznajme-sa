import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'Otázka dňa | DeepTalks',
  description:
    'Jeden denný impulz, ktorý dokáže otvoriť rozhovor doma, vo vzťahu aj medzi priateľmi.',
}

const sampleQuestions = [
  'Čo ťa dnes potešilo — a povedal si to niekomu?',
  'Na koho si dnes myslel/a a ešte si mu to nepovedal/a?',
  'Čo by si dnes urobil/a inak, keby si sa nemusel/a báť reakcie?',
  'Ktorá obyčajná vec ti dnes dala pocit, že život je stále dobrý?',
]

const howItWorks = [
  {
    title: 'Jedna otázka denne',
    desc: 'Krátky formát bez výhovorky „nemáme čas“. Ide o malý impulz, nie o hodinový rozhovor.',
  },
  {
    title: 'Bez bariéry',
    desc: 'Otázku môžeš zobraziť na webe, poslať niekomu alebo si ju odložiť na večer.',
  },
  {
    title: 'Vstup do ďalších vetiev',
    desc: 'Keď otázka zarezonuje, prirodzene môže pokračovať do Daily Connection, kartičiek alebo Kompasu.',
  },
]

const nextSteps = [
  {
    title: 'Daily Connection',
    desc: 'Keď chceš denný rituál vo dvojici, Daily Connection pridá párovanie odpovedí a pokračovanie v rozhovore.',
    href: '/apps/daily-connection',
  },
  {
    title: 'Konverzačné kartičky',
    desc: 'Keď jedna otázka nestačí a chceš celý večer, kartičky sú prirodzené ďalšie pokračovanie.',
    href: '/apps/spoznajme-sa',
  },
  {
    title: 'Komunikačný kompas',
    desc: 'Keď otázka otvorí ťažkú tému a potrebuješ konkrétny jazyk, Kompas dá ďalšie vety a smer.',
    href: '/kompas',
  },
]

export default async function OtazkaDnaPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_58%)]">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6 py-8">
            <Link href={`/${lang}/apps`} className="text-xs text-muted-foreground hover:text-foreground">
              ← Nástroje
            </Link>
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Otázka dňa
              </span>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Jeden dobrý impulz denne vie otvoriť viac než dlhé plány na „niekedy“.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Otázka dňa je jednoduchý lead magnet aj reálny nástroj. Bez komplikácií. Každý deň jedna otázka, ktorú môžeš
                položiť partnerovi, dieťaťu, kamarátovi alebo si ju nechať pre seba.
              </p>
            </div>
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Dnešný výber</p>
              <p className="mt-3 text-xl leading-relaxed text-foreground">
                „Čo ti dnes nik nepovedal, ale potreboval/a si to počuť?“
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Krátka otázka je často lepší začiatok než veľké „musíme sa porozprávať“.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="space-y-12">
          <section className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ako to funguje</p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Malý formát, veľký dosah.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ukážky otázok</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Otázky nemajú byť komplikované. Majú byť presné.</h2>
              <div className="mt-6 space-y-3">
                {sampleQuestions.map((question) => (
                  <div key={question} className="rounded-2xl border border-border/60 bg-background/70 p-5 text-base leading-relaxed text-foreground">
                    „{question}“
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/80 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Kam to vedie ďalej</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Otázka dňa je vstupná brána, nie slepá ulička.</h2>
              <div className="mt-6 space-y-3">
                {nextSteps.map((item) => (
                  <Link
                    key={item.title}
                    href={`/${lang}${item.href}`}
                    className="block rounded-2xl border border-border/60 bg-background/70 p-5 transition hover:border-primary/30 hover:text-primary"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <div className="mt-4 text-sm font-medium text-primary">Otvoriť →</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
