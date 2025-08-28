// PATH: src/app/[lang]/kompas/page.tsx
import Link from "next/link"
import { KOMPAS_SECTIONS } from "@/config/kompas-sections"

export const metadata = {
  title: "Komunikačný kompas | DeepTalks",
  description:
    "Krátke vety a minipostupy do bežných situácií. Vyber si pre koho alebo otvor tému.",
}

type P = { params: Promise<{ lang: string }> }

export default async function Page({ params }: P) {
  const { lang } = await params
  const go = (p: string) => `/${lang}${p}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Komunikačný kompas</h1>
        <p className="text-muted-foreground max-w-2xl">
          Krátke, použiteľné vety a kroky do bežných situácií. Vyber si pre koho alebo otvor tému.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Pre koho</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href={go("/kompas/rodic-dieta")}
            className="rounded-xl border p-5 hover:bg-muted transition block"
          >
            <h3 className="font-medium">Rodič–dieťa</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Emócie, hranice, dohody, zmeny. Primerané veku, bez moralizovania.
            </p>
          </Link>
          <Link
            href={go("/kompas/pary")}
            className="rounded-xl border p-5 hover:bg-muted transition block"
          >
            <h3 className="font-medium">Páry</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Vyjadrenie potrieb, prevencia hádok, zdravý konflikt, rituály spojenia.
            </p>
          </Link>
          <Link
            href={go("/kompas/deti")}
            className="rounded-xl border p-5 hover:bg-muted transition block"
          >
            <h3 className="font-medium">Deti</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Témy a minipostupy priamo pre deti.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Témy</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {KOMPAS_SECTIONS.map((t) => (
            <Link
              key={t.slug}
              href={go(`/kompas/tema/${t.slug}`)}
              className="rounded-lg border p-4 hover:bg-muted transition block"
            >
              <div className="font-medium">{t.label}</div>
              <div className="text-sm text-muted-foreground">{t.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
