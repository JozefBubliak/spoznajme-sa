import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'

type P = { params: Promise<{ lang: string }> }

const articles = [
  { slug: 'preco-deti-nehovoria', title: 'Prečo deti nehovoria', tag: 'Rodič–dieťa', time: '8 min', priority: true, desc: 'Čo sa deje v hlave tínedžera a ako otvoriť rozhovor bez odporu.' },
  { slug: 'pat-otazok-vecera', title: '5 otázok na večeru', tag: 'Páry', time: '5 min', priority: true, desc: 'Najjednoduchší rituál, ktorý zmení váš vzťah.' },
  { slug: 'smrdi-mu-z-ust', title: 'Smrdí mu z úst — ako to povedať', tag: 'Ťažké témy', time: '4 min', priority: true, desc: 'Ako povedať nepríjemné veci tak, aby sa vzťah nepokazil.' },
]

export default async function BlogPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return (
    <div className="min-h-screen">
      <section className="bg-muted py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href={`/${lang}`} className="text-xs text-muted-foreground hover:text-foreground">← Domov</Link>
          <h1 className="text-4xl font-bold text-foreground">Blog</h1>
          <p className="text-lg text-muted-foreground">Umenie rozhovoru. Praktické, ľudské, použiteľné.</p>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-3xl mx-auto space-y-5">
          {articles.map(a => (
            <Link
              key={a.slug}
              href={`/${lang}/blog/${a.slug}`}
              className="block rounded-2xl border bg-card p-6 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">{a.tag}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
                {a.priority && <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-[hsl(var(--warning))] border border-warning/20 font-medium">Priorita</span>}
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{a.title}</h2>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </Link>
          ))}

          <div className="rounded-2xl border border-dashed bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground">+ 21 ďalších článkov v príprave podľa editorial plánu.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
