// PATH: src/app/[lang]/apps/spoznajme-sa/page.tsx

import Link from "next/link"

export const metadata = {
  title: "Spoznajme sa – hra s kartami | DeepTalks",
  description: "Otvárače, hlbšie otázky, spomienky aj zábava. Mobilné, jednoduché, bezpečné.",
}

// Lokálny, jednoduchý typ bez Promise:
type Props = { params: { lang: string } }

export default function Page({ params }: Props) {
  const { lang } = params
  const back = `/${lang}/apps`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <Link href={back} className="text-sm text-muted-foreground hover:underline">
        ← Späť na Konverzačné hry
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Spoznajme sa</h1>
        <p className="text-muted-foreground max-w-2xl">
          Interaktívne otázky pre 2–6 ľudí. Režimy: Otvárače, Hlbšie, Spomienky, Zábavné.
          Vždy bezpečné – s preskočením a bez citlivých tém.
        </p>
        <div className="flex gap-3 pt-1">
          <Link href="/app" className="px-4 py-2 rounded-md bg-black text-white text-sm">Spustiť hru</Link>
          <a href="#packs" className="px-4 py-2 rounded-md border text-sm">Balíčky tém</a>
        </div>
      </header>

      <section id="how" className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">1. Vyber režim</h3>
          <p className="text-sm text-muted-foreground mt-1">Otvárače, Hlbšie, Spomienky, Zábavné.</p>
        </div>
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">2. Hrajte v mobile</h3>
          <p className="text-sm text-muted-foreground mt-1">Každá karta je jasná a priateľská. Vždy sa dá preskočiť.</p>
        </div>
        <div className="rounded-xl border p-5">
          <h3 className="font-medium">3. Ulož obľúbené</h3>
          <p className="text-sm text-muted-foreground mt-1">Vráť sa k nim nabudúce alebo ich zdieľaj.</p>
        </div>
      </section>

      <section id="packs" className="space-y-3">
        <h2 className="text-xl font-semibold">Balíčky tém</h2>
        <ul className="grid md:grid-cols-2 gap-3 text-sm">
          <li className="rounded-lg border p-4"><strong>Otvárače</strong> – ľahké na začiatok.</li>
          <li className="rounded-lg border p-4"><strong>Hlbšie</strong> – hodnoty, sny, príbehy.</li>
          <li className="rounded-lg border p-4"><strong>Spomienky</strong> – minulosť, momenty, vďačnosť.</li>
          <li className="rounded-lg border p-4"><strong>Zábavné</strong> – humor, fantázia, improvizácia.</li>
        </ul>
      </section>
    </div>
  )
}
