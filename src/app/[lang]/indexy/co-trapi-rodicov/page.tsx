import type { Metadata } from "next"
import { Container } from "@/components/Container"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { getIndexFrontmatter } from "@/lib/content"
import { buildHreflangAlternates, normalizeUrlLocale } from "@/lib/i18n-routing"

type Props = { params: { lang: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getIndexFrontmatter(lang, "co-trapi-rodicov")
  return {
    title: fm?.title || "Čo trápi rodičov",
    description: fm?.seoDescription || "Čoskoro.",
    alternates: {
      canonical: `https://deeptalks.eu/${lang}/indexy/co-trapi-rodicov`,
      languages: buildHreflangAlternates("/indexy/co-trapi-rodicov"),
    },
  }
}

export default function Page({ params }: Props) {
  const lang = normalizeUrlLocale(params.lang)
  const fm = getIndexFrontmatter(lang, "co-trapi-rodicov")

  return (
    <Container>
      <Breadcrumbs
        items={[
          { href: `/${lang}`, label: "Domov" },
          { href: `/${lang}/indexy`, label: "Indexy" },
          { label: "Čo trápi rodičov" },
        ]}
      />
      <h1 className="text-3xl font-semibold mt-4">
        {fm?.title || "Čo trápi rodičov"}
      </h1>
      <p className="text-muted-foreground mt-2">
        {fm?.description || "Čoskoro."}
      </p>
    </Container>
  )
}
