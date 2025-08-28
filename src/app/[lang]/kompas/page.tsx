// PATH: src/app/[lang]/kompas/page.tsx
import Kompas from "@/components/Kompas"

export const metadata = {
  title: "Komunikačný kompas | DeepTalks",
  description:
    "Krátke vety a minipostupy do bežných situácií. Vyber si pre koho alebo otvor tému.",
}

export default function Page() {
  return <Kompas />
}
