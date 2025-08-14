// PATH: src/app/[lang]/apps/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Konverzačné hry – DeepTalks",
  description:
    "Hry, ktoré rozprúdia rozhovor – otázky, kartičky a kvízy. Pre páry, kamarátov, rodiny a party.",
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const go = (p: string) => `/${lang}${p}`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Konverzačné hry</h1>
        <p className="text-muted-foreground max-w-2xl">
          Chceš sa rýchlo naladiť na dobrý rozhovor? Vyber si hru podľa situácie. Niektoré spustíš hneď v
          mobile, ďalšie pripravujeme.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Kamaráti</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border p-5">
            <h3 className="font-medium">Spoznajme sa (karty)</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Otvárače, hlbšie otázky, spomienky a zábava. Ideálne pre 2–6 ľudí.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href={go("/apps/spoznajme-sa")}
                className="px-3 py-2 rounded-md bg-black text-white text-sm"
              >
                Zistiť viac
              </Link>
              <Link href={"/app"} className="px-3 py-2 rounded-md border text-sm">
                Spustiť hru
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Party</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border p-5">
            <h3 className="font-medium">Herd Vote (väčšina vyhráva)</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Hlasuj v mobile a zbieraj body za zhodu s väčšinou. Rýchle, hlučné a ideálne na rozprúdenie
              energie.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href={go("/apps/herd-vote")}
                className="px-3 py-2 rounded-md bg-black text-white text-sm"
              >
                Zistiť viac
              </Link>
              <span className="px-3 py-2 rounded-md border text-sm opacity-60 cursor-not-allowed">
                Demo čoskoro
              </span>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
