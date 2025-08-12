import type { Metadata } from 'next'
import Link from 'next/link'
import { buildHreflangAlternates, normalizeUrlLocale } from '@/lib/i18n-routing'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = normalizeUrlLocale(params.lang)
  return {
    title: 'DeepTalks – Spoznajte sa lepšie',
    description:
      'Praktické pomôcky, otázky a hry pre rodičov a deti, páry, priateľov aj rodiny. Otvorte rozhovory, riešte napätie a budujte blízkosť.',
    alternates: {
      canonical: `https://deeptalks.eu/${lang}`,
      languages: buildHreflangAlternates('/'),
    },
  }
}

export default function LangHomePage({ params }: { params: { lang: string } }) {
  const { lang } = params

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="pt-8 md:pt-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Rozhovory, ktoré spájajú.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Pomôcky do každodenných situácií, otázky na spoznanie, hry na oslavy a kvízy.
            Funguje pre <strong>rodič–dieťa</strong>, <strong>páry</strong>,{' '}
            <strong>kamarátov</strong> aj <strong>rodinu</strong>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/pomocky`}
              className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-900"
            >
              Prejsť na pomôcky
            </Link>
            <Link
              href={`/${lang}/produkty`}
              className="inline-flex items-center rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Produkty a balíčky
            </Link>
          </div>
        </div>
      </section>

      {/* 4 HLAVNÉ SPÔSOBY POUŽITIA */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Čo tu nájdete</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <h3 className="font-medium">Pomôcky do bežných situácií</h3>
            <p className="text-gray-600 mt-1">
              Rýchle techniky a vety pre náročné momenty (domáce úlohy, emócie, hranice,
              dohody o obrazovkách…). Podľa témy, veku a publika.
            </p>
            <div className="mt-3">
              <Link href={`/${lang}/pomocky`} className="text-sm text-blue-600 hover:underline">
                Pozrieť pomôcky →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="font-medium">Otázky a balíčky na rozhovor</h3>
            <p className="text-gray-600 mt-1">
              Otvárače, hlbšie konverzácie, spomienky aj zábava. Žiadne áno/nie – vždy
              príbehy a zdieľanie.
            </p>
            <div className="mt-3">
              <Link href={`/${lang}/produkty`} className="text-sm text-blue-600 hover:underline">
                Prejsť na balíčky →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="font-medium">Hry na oslavy a pre skupiny</h3>
            <p className="text-gray-600 mt-1">
              Icebreakery, kvízy „Ako dobre ma poznáš?“, tímové hry a party módy.
              Pripravené pre mobil – aj pre viac telefónov naraz.
            </p>
            <div className="mt-3">
              <Link href={`/${lang}/produkty`} className="text-sm text-blue-600 hover:underline">
                Pozrieť hry →
              </Link>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="font-medium">Vzdelávanie a články</h3>
            <p className="text-gray-600 mt-1">
              Blog, ebooky a videá s komunikačnými technikami (NVC, Gottman, CBT, ACT…).
              Prakticky a zrozumiteľne.
            </p>
            <div className="mt-3">
              <Link href={`/${lang}/blog`} className="text-sm text-blue-600 hover:underline">
                Čítať blog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RÝCHLE VSTUPY PODĽA PUBLIKA */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Začať podľa publika</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card link={`/${lang}/pomocky/rodic-dieta`} title="Rodič–dieťa" desc="Vekové mapy, emócie, dohody." />
          <Card link={`/${lang}/pomocky/pary`} title="Páry" desc="Otázky, rituály, konflikty." />
          <Card link={`/${lang}/pomocky/kamarati-party`} title="Kamaráti & party" desc="Icebreakery, hry, kvízy." />
          <Card link={`/${lang}/pomocky/rodina`} title="Rodina" desc="Spomienky, hodnoty, generácie." />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-6">
        <div className="rounded-2xl border p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Chceš začať hneď?</h3>
            <p className="text-gray-600 mt-1">Vyber tému a dostaň hotové vety a kroky.</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/${lang}/pomocky`} className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-900">
              Otvoriť pomôcky
            </Link>
            <Link href={`/${lang}/produkty`} className="inline-flex items-center rounded-lg border px-4 py-2 hover:bg-gray-50">
              Pozrieť produkty
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Card({ link, title, desc }: { link: string; title: string; desc: string }) {
  return (
    <Link href={link} className="block rounded-xl border p-5 hover:shadow-sm transition">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-gray-600 text-sm mt-1">{desc}</div>
    </Link>
  )
}
