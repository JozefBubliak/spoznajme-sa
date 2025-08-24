// PATH: src/app/[lang]/kompas/temy/page.tsx
import Link from "next/link"
import { KOMPAS_TOPICS } from "@/config/kompas-topics"
import { normalizeUrlLocale } from "@/lib/i18n-routing"

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  // Pozn.: useI18n je client hook – na serveri necháme jednoduchý fallback:
  const t = (key: string, fb: string) => fb

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Témy</h1>
      <p className="text-muted-foreground mt-2">Veľký prehľad tém Komunikačného kompasu.</p>
      <div className="grid mt-6 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {KOMPAS_TOPICS.map((x) => (
          <Link
            key={x.slug}
            href={`/${lang}/kompas/tema/${x.slug}`}
            className="rounded-xl border p-5 hover:shadow-sm transition"
          >
            <div className="font-medium">{t(x.i18nKey, x.fallback)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
