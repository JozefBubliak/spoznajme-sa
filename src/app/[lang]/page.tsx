import type { Metadata } from "next"
import Hero from "@/components/home/Hero"
import { getDictionary } from "@/i18n/server"
import { IntlProvider } from "@/components/IntlProvider"

export const metadata: Metadata = {
  title: "DeepTalks – Rozhovory, ktoré spájajú.",
  description: "Komunikačný kompas, konverzačné hry a balíčky otázok pre blízke vzťahy.",
}

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = params
  const dict = await getDictionary(lang as any)
  return (
    <IntlProvider lang={lang as any} dict={dict}>
      <main>
        <Hero lang={lang} />
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-2xl font-semibold mb-4">{dict.what?.title ?? "Čo tu nájdete"}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href={`/${lang}/kompas`} className="rounded-xl border p-5 hover:bg-muted transition">
              <h3 className="font-medium">Komunikačný kompas</h3>
              <p className="text-sm text-muted-foreground mt-1">{dict.what?.compasT}</p>
            </a>
            <a href={`/${lang}/apps`} className="rounded-xl border p-5 hover:bg-muted transition">
              <h3 className="font-medium">Konverzačné hry</h3>
              <p className="text-sm text-muted-foreground mt-1">{dict.what?.appsT}</p>
            </a>
            <a href={`/${lang}/produkty`} className="rounded-xl border p-5 hover:bg-muted transition">
              <h3 className="font-medium">Produkty a balíčky</h3>
              <p className="text-sm text-muted-foreground mt-1">{dict.what?.productsT}</p>
            </a>
          </div>
        </section>
      </main>
    </IntlProvider>
  )
}
