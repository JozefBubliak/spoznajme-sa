import Link from "next/link"

export const metadata = {
  title: "Herd Vote – aplikácia | DeepTalks",
  description: "Party hra: hlasuj v mobile, body za zhodu s väčšinou. Pre 6–30+ ľudí, ideálne na oslavy a teambuildingy.",
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const back = `/${lang}/apps`

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      <Link href={back} className="text-sm text-muted-foreground hover:underline">← Späť na Aplikácie</Link>
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Herd Vote (väčšina vyhráva)</h1>
        <p className="text-muted-foreground max-w-2xl">
          Každý hlasuje v mobile. Body získavaš, keď sa trafíš do väčšiny. Rýchle a hlučné – skvelé na rozprúdenie energie.
        </p>
        <div className="flex gap-3 pt-1">
          <span className="px-4 py-2 rounded-md border text-sm opacity-60">Demo čoskoro</span>
        </div>
      </header>
      <section className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-5"><h3 className="font-medium">1. Hostiteľ</h3><p className="text-sm text-muted-foreground mt-1">Otvorí hru na veľkej obrazovke.</p></div>
        <div className="rounded-xl border p-5"><h3 className="font-medium">2. QR pripojenie</h3><p className="text-sm text-muted-foreground mt-1">Hráči sa pripoja cez QR a hlasujú v mobile.</p></div>
        <div className="rounded-xl border p-5"><h3 className="font-medium">3. Body</h3><p className="text-sm text-muted-foreground mt-1">Získavaj body za zhodu s väčšinou – rebríček v reálnom čase.</p></div>
      </section>
    </div>
  )
}