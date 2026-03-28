import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { Container } from '@/components/Container'

type P = { params: Promise<{ lang: string; slug: string }> }

const articles: Record<string, { title: string; tag: string; time: string; content: string[] }> = {
  'preco-deti-nehovoria': {
    title: 'Prečo deti nehovoria',
    tag: 'Rodič–dieťa',
    time: '8 min',
    content: [
      'Tínedžer sedí pri večeri a na každú otázku odpovie jednou slovom. „Dobre." „Nič." „Neviem." Rodič si myslí, že niečo robí zle. Možno áno. Možno vôbec nie.',
      'Výskum ukazuje, že adolescenti nehovoria nie preto, že nechcú. Hovoria málo preto, že nevedia, či bude bezpečné povedať to, čo si myslia. Testujú hranice. Sledujú reakcie. A podľa toho rozhodujú.',
      'Kľúč nie je v tom, čo sa pýtate. Je v tom, ako reagujete na odpovede.',
      '**Tri reakcie, ktoré zatvárajú rozhovor:**\n- „To nie je problém." (Invalidácia)\n- „Mali by ste..." (Rada pred pochopením)\n- „Keď som bol/a v tvojom veku..." (Presunutie pozornosti)',
      '**Tri reakcie, ktoré otvoria ďalší rozhovor:**\n- „Zaujímavé. Povedz mi viac."\n- „Jak to na teba vplýva?"\n- Ticho. Len počúvajte.',
      'Najdlhšie rozhovory s deťmi začínajú rodič, ktorý nechce opraviť, ale chce pochopiť.',
    ],
  },
  'pat-otazok-vecera': {
    title: '5 otázok na večeru',
    tag: 'Páry',
    time: '5 min',
    content: [
      'Výskumníci z Harvardu sledovali 700 párov počas 75 rokov. Najdôležitejší faktor dlhého a šťastného partnerstva? Nie peniaze, nie zdravie, nie dokonalá komunikácia. Kvalita vzťahov — a tá závisí od toho, koľko času si partneri naozaj venujú.',
      'Nie hodinami vedľa televízie. Ale minútami, keď sa naozaj pýtajú a počúvajú.',
      'Tu je päť otázok, ktoré môžete skúsiť dnes večer pri jedálenskom stole:',
      '1. **Čo bolo dnes najlepšie?** (Nie „ako bol deň" — konkrétna otázka vyvolá konkrétnu odpoveď.)',
      '2. **Čo ťa v poslednom čase zaujíma alebo trápi?** (Otvorená. Dá priestor aj emóciám, aj myšlienkam.)',
      '3. **Je niečo, čo by si teraz potreboval/a odo mňa?** (Priama. Väčšina partnerov sa nikdy nespýta.)',
      '4. **Čo sa tešíš najbližší týždeň?** (Pomáha obom pozrieť sa dopredu s optimizmom.)',
      '5. **Čo si v poslednom čase o mne zistil/a?** (Najodvážnejšia. Ale najúčinnejšia.)',
      'Nemusíte sa pýtať všetkých päť naraz. Jedna otázka je dosť. Rituál robí zázraky.',
    ],
  },
  'smrdi-mu-z-ust': {
    title: 'Smrdí mu z úst — ako to povedať',
    tag: 'Ťažké témy',
    time: '4 min',
    content: [
      'Nepríjemné veci ťažko vysloviť. Nie preto, že sme zbabelí — ale preto, že sa bojíme, čo sa stane so vzťahom po tom, čo to povieme.',
      'Pritom výskum je jednoznačný: ľudia by radšej chceli vedieť. 94 % opýtaných v štúdii Journal of Personal Relationships uviedlo, že by chceli byť upozornení na nepríjemné osobné veci.',
      'Problém je v spôsobe, nie v obsahu.',
      '**Zlý spôsob:** „Musím ti niečo povedať. Trochu ti smrdí z úst."\n→ Dôraz na stav, bez riešenia, bez empatii.',
      '**Lepší spôsob:** „Všimol/a som si niečo a hovorím ti to, pretože mi na tebe záleží. Mohlo by to byť zubami alebo jedlom — ale radšej vedieť, nie?"\n→ Kontext starostlivosti, konkrétne, bez súdenia.',
      'Všetky ťažké veci idú ľahšie, keď druhý vie, prečo to hovoríte. Povedzte to. Najprv zámer, potom správu.',
    ],
  },
}

export default async function BlogArticlePage({ params }: P) {
  const { lang: raw, slug } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const article = articles[slug]
  if (!article) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <Link href={`/${lang}/blog`} className="text-xs text-muted-foreground hover:text-foreground">← Blog</Link>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">{article.tag}</span>
            <span className="text-xs text-muted-foreground">{article.time} čítania</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">{article.title}</h1>
        </div>
      </section>

      <Container>
        <div className="max-w-2xl space-y-5">
          {article.content.map((block, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {block}
            </p>
          ))}

          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Chcete hlbšie rozhovory vo svojom vzťahu?</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${lang}/apps/spoznajme-sa`} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90">
                Vyskúšať otázky
              </Link>
              <Link href={`/${lang}/blog`} className="px-4 py-2 rounded-lg border text-sm font-medium text-foreground hover:bg-muted">
                Ďalšie články
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
