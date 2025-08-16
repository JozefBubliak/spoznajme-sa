// PATH: src/app/[lang]/kompas/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Komunikačný kompas | DeepTalks",
  description:
    "Krátke vety a minipostupy do bežných situácií. Vyber si pre koho alebo otvor tému.",
}

const topics = [
  { slug: "otvarace-ritualy",     label: "Začať rozhovor & rituály", desc: "Ľahké vety na úvod, check-iny a drobné rituály spojenia" },
  { slug: "emocie-a-regulacia",   label: "Emócie & regulácia",       desc: "ako pomenovať pocity, upokojiť sa a pomôcť druhému" },
  { slug: "hranice-a-dohody",     label: "Hranice & dohody",         desc: "jasné požiadavky, dohody a následky bez kriku" },
  { slug: "konflikt-a-spolupraca",label: "Konflikt & spolupráca",    desc: "odlišné názory bez hádok, hľadanie riešení" },
  { slug: "zmeny-a-prechody",     label: "Zmeny & prechody",         desc: "rána, odchody, návraty, nové zvyky – čo povedať" },
  { slug: "spomienky-a-spojenie", label: "Spomienky & spojenie",     desc: "vďačnosť, oceňovanie, budovanie blízkosti" },
  { slug: "digitalny-zivot",      label: "Digitálny život",          desc: "obrazovky, dohody a prevencia konfliktov" },
  { slug: "skola-a-ucenie",       label: "Škola & učenie",           desc: "podpora bez tlaku, motivácia a rutiny" },
  { slug: "zdravie-a-tazke-temy", label: "Zdravie & ťažké témy",     desc: "choroba, smútok, úzkosť – citlivé, ale praktické vety" },
  { slug: "identita-a-telo",      label: "Identita & telo",          desc: "sebaobraz, rešpekt a citlivé hranice" },
]

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
        <div className="grid md:grid-cols-2 gap-4">
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
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Témy</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {topics.map((t) => (
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
