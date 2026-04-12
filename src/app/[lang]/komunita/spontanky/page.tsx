import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'
import { SpontankaCard } from '@/components/spontanky/SpontankaCard'
import type { SpontankaWithStats } from '@/lib/spontanky/types'

type P = { params: Promise<{ lang: string }> }

async function getSpontanky(): Promise<SpontankaWithStats[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/spontanky?limit=30`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.spontanky ?? []
  } catch {
    return []
  }
}

export default async function SpontankyPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const spontanky = await getSpontanky()
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const upcoming = spontanky.filter((s) => new Date(s.datum) >= today)
  const past = spontanky.filter((s) => new Date(s.datum) < today)

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border px-4 pb-16 pt-24 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,168,128,0.18),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(197,168,128,0.1),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl space-y-6">
          <Link href={`/${lang}/komunita`} className="text-xs text-muted-foreground hover:text-foreground">
            ← Komunita
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            DeepTalks · Komunita · Slovensko
          </div>
          <h1 className="max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            &bdquo;My tam ideme.
            <br />
            <span className="gradient-text italic">Pridajte sa, ak chcete.&ldquo;</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Spontánka je malé, neformálne stretnutie. Bez organizátora, bez vstupného,
            bez pódia. Len ľudia, miesto a čas. Ty to nahodíš za 2 minúty a ostatní sa pridajú.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${lang}/komunita/spontanky/vytvorit`}
              className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm"
            >
              Vytvoriť spontánku →
            </Link>
            <a
              href="#akcie-v-okoli"
              className="btn-warm inline-flex items-center justify-center px-6 py-3 text-sm"
            >
              Pozrieť akcie v okolí
            </a>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Formát</div>
              <div className="mt-2 text-xl font-semibold text-foreground">Malé stretnutie do 30 ľudí</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Bez bariér</div>
              <div className="mt-2 text-xl font-semibold text-foreground">Bez registrácie a bez vstupného</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Koordinácia</div>
              <div className="mt-2 text-xl font-semibold text-foreground">RSVP, Prinášam, chat, QR</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Viditeľnosť</div>
              <div className="mt-2 text-xl font-semibold text-foreground">Link, okolie alebo verejne</div>
            </div>
          </div>
        </div>
      </section>

      <Container>
        <section className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="label-gold">Čo to je</p>
            <h2 className="text-3xl sm:text-4xl">Spontánka nie je festival ani oficiálne podujatie.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Je to malé, susedské alebo kamarátske stretnutie bez pódia, bez predaja
              a bez zložitej organizácie. Stačí miesto, čas a pár ľudí, ktorí chcú byť spolu.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card-elegant p-6">
              <div className="text-2xl mb-3">◈</div>
              <h3 className="text-2xl text-foreground">Spontánka</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Malá, neformálna, do 30 ľudí. Bez vstupného, bez programu, bez tlaku.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border px-3 py-1">zadarmo</span>
                <span className="rounded-full border px-3 py-1">bez pódia</span>
                <span className="rounded-full border px-3 py-1">neformálne</span>
              </div>
            </div>
            <div className="card-elegant p-6">
              <div className="text-2xl mb-3">▣</div>
              <h3 className="text-2xl text-foreground">Oficiálne podujatie</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Verejná akcia s programom, partnermi alebo vstupným. Môže vyžadovať povolenia
                a inú úroveň prípravy.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border px-3 py-1">program</span>
                <span className="rounded-full border px-3 py-1">môže mať vstupné</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="label-gold">Ako to funguje</p>
            <h2 className="text-3xl sm:text-4xl">Tri kroky, dve minúty.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-elegant p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">01</div>
              <h3 className="mt-3 text-2xl text-foreground">Vytvoríš spontánku</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Napíšeš kde, kedy a pre koho. Napríklad piknik, opekačku alebo cyklovýlet.
              </p>
            </div>
            <div className="card-elegant p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">02</div>
              <h3 className="mt-3 text-2xl text-foreground">Zdieľaš link alebo QR</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Pošleš ho do WhatsApp skupiny, susedom, rodičom zo školy alebo priateľom.
              </p>
            </div>
            <div className="card-elegant p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-primary">03</div>
              <h3 className="mt-3 text-2xl text-foreground">Ľudia sa pridajú</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                RSVP, zoznam „Prinášam", chat a koordinácia sú na jednom mieste.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="label-gold">Čo dostaneš</p>
            <h2 className="text-3xl sm:text-4xl">Každá spontánka má praktický balík funkcií.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">RSVP — Prídem / Možno / Neprídem</h3>
              <p className="mt-3 text-sm text-muted-foreground">Vidíš koľko ľudí reálne ráta s účasťou. Bez zbytočnej registrácie.</p>
            </div>
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">Zoznam „Prinášam"</h3>
              <p className="mt-3 text-sm text-muted-foreground">Každý nahodí čo prinesie. Menej chaosu, viac pokoja.</p>
            </div>
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">Chat len pre účastníkov</h3>
              <p className="mt-3 text-sm text-muted-foreground">Koordinácia bez zakladania ďalšej skupiny mimo DeepTalks.</p>
            </div>
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">Mapa a QR kód</h3>
              <p className="mt-3 text-sm text-muted-foreground">Link na zdieľanie, QR na vytlačenie a rýchle poslanie ďalej.</p>
            </div>
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">Viditeľnosť na mieru</h3>
              <p className="mt-3 text-sm text-muted-foreground">Len cez link, v okolí alebo verejne. Ty určuješ dosah.</p>
            </div>
            <div className="card-elegant p-6">
              <h3 className="text-xl text-foreground">Inteligentné upozornenia</h3>
              <p className="mt-3 text-sm text-muted-foreground">Ak systém cíti riziko, upozorní ťa ešte pred zverejnením.</p>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="label-gold">Príklady</p>
            <h2 className="text-3xl sm:text-4xl">Takto vyzerajú spontánky v praxi.</h2>
          </div>
          <div id="akcie-v-okoli">
            {upcoming.length === 0 && past.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-12 text-center space-y-3">
                <div className="text-4xl">🌱</div>
                <p className="font-medium text-foreground">V okolí zatiaľ žiadna spontánka</p>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Budeš prvý? Vytvorenie trvá 2 minúty.
                </p>
                <Link href={`/${lang}/komunita/spontanky/vytvorit`}>
                  <span className="inline-block mt-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Vytvoriť spontánku
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                {upcoming.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Nadchádzajúce</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {upcoming.map((sp) => (
                        <SpontankaCard key={sp.id} sp={sp} lang={lang} />
                      ))}
                    </div>
                  </div>
                )}
                {past.length > 0 && (
                  <div>
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Prebehlo</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {past.map((sp) => (
                        <SpontankaCard key={sp.id} sp={sp} lang={lang} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="label-gold">Je to bezpečné?</p>
            <h2 className="text-3xl sm:text-4xl">Právny kontext hovoríme rovno a zrozumiteľne.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Spontánka je neformálne stretnutie jednotlivcov, nie verejné podujatie v zmysle zákona.
              Každý účastník koná za seba. Ak by akcia mala vstupné, pódium alebo inú formálnu povahu,
              systém ťa na to upozorní.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
            Nie je to právna rada. Je to rozumný filter, ktorý chráni organizátora pred neúmyselnými chybami
            a pomáha odlíšiť spontánku od oficiálneho podujatia.
          </div>
        </section>

        <section className="mt-12 rounded-[28px] border border-primary/25 bg-primary/10 p-8 text-center space-y-5">
          <p className="label-gold">Záverečné CTA</p>
          <h2 className="text-3xl sm:text-5xl">
            Tvoja obec, tvoje susedstvo, tvoji ľudia.
            <br />
            Niekto musí byť prvý. Prečo nie ty?
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Žiadna registrácia. Žiadne vstupné. Žiadny organizátor. Len ty a tvoji ľudia.
          </p>
          <Link href={`/${lang}/komunita/spontanky/vytvorit`}>
            <span className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Vytvoriť spontánku — trvá 2 minúty →
            </span>
          </Link>
        </section>

        <div className="mt-12 rounded-2xl border border-dashed p-6 text-center space-y-2 text-sm text-muted-foreground">
          <p>Spontánky sú neformálne stretnutia. Každý koná za seba a zodpovedá za seba a svoje deti.</p>
        </div>
      </Container>
    </div>
  )
}
