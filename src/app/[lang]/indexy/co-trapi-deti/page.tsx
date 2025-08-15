// PATH: src/app/[lang]/indexy/co-trapi-deti/page.tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { normalizeUrlLocale, buildHreflangAlternates } from "@/lib/i18n-routing"
import { type Locale, SUPPORTED_LOCALES } from "@/i18n/config"
import { getDictionary } from "@/i18n/server"

// ── Dôležité: žiadny vlastný Props typ, necháme to voľné (any)
//    aby to nepadlo na tvojom globálnom PageProps s Promise.
export async function generateMetadata(args: any): Promise<Metadata> {
  // args.params môže byť objekt alebo Promise podľa tvojho globálneho typu
  const p = args?.params ?? (await args?.params)
  const lang = normalizeUrlLocale(p?.lang as string)

  return {
    title: lang === "sk" ? "Čo trápi deti – index" : "What troubles kids – index",
    description:
      lang === "sk"
        ? "Prehľad tém a odkazov na užitočné komunikačné pomôcky."
        : "Overview of topics and links to practical communication tools.",
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-deti`,
      languages: buildHreflangAlternates("/indexy/co-trapi-deti"),
    },
  }
}

export default async function Page(args: any) {
  const p = args?.params ?? (await args?.params)
  const lang = normalizeUrlLocale(p?.lang as string)

  if (!SUPPORTED_LOCALES.includes(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">
        {lang === "sk"
          ? "Čo trápi deti v komunikácii s rodičmi"
          : "What troubles kids when communicating with parents"}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {lang === "sk"
          ? "Pracujeme na prehľade tém. Zatiaľ si môžete pozrieť hlavné pomôcky podľa tém a situácií."
          : "We’re preparing a structured index. For now, check the main tools by topic and situation."}
      </p>
    </div>
  )
}
