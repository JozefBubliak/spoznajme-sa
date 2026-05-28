import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import HerdVoteEntryClient from './HerdVoteEntryClient'

type P = { params: Promise<{ lang: string }> }

export default async function HerdVoteHubPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  const categories = [
    { icon: '👨‍👩‍👦', title: 'Rodina', desc: 'Spomienky, tradície, detstvo a to, čo si o sebe myslíme, že už vieme.' },
    { icon: '💑', title: 'Páry', desc: 'Láskavé aj prekvapivé otázky, ktoré ukážu, ako dobre sa naozaj poznáte.' },
    { icon: '👫', title: 'Priatelia', desc: 'Večerný formát pre skupiny, ktoré sa chcú zabaviť aj trochu odhaliť.' },
    { icon: '💼', title: 'Tím / práca', desc: 'Psychologicky bezpečné otázky na spoznávanie kolegov bez trápnosti.' },
    { icon: '🏫', title: 'Škola', desc: 'Pre triedy a detské skupiny. Ľahké, zrozumiteľné a bez vylučovania.' },
    { icon: '🎉', title: 'Zmiešané skupiny', desc: 'Pre partie, ktoré sa ešte dobre nepoznajú, ale chcú sa rýchlo rozhýbať.' },
  ]

  const steps = [
    { n: '01', title: 'Vyber kategóriu', desc: 'Rodina, priatelia, práca alebo čistý zábavný kvíz.' },
    { n: '02', title: 'Vytvor lobby', desc: 'Prihlás sa, klikni a dostaneš kód + QR. Trvá 10 sekúnd.' },
    { n: '03', title: 'Hráči sa pripoja', desc: 'Každý naskenuje QR alebo zadá kód na telefóne. Bez inštalácie.' },
    { n: '04', title: 'Hraj a porovnaj', desc: 'Moderátor spúšťa otázky, hráči odpovedajú, výsledky sa ukážu hneď.' },
  ]

  return (
    <div className="hv-bg hv-particles min-h-screen">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 pt-12 pb-12 text-center">
        <HerdVoteEntryClient lang={lang as Locale} />
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <h2 className="text-xl font-black text-white/80 uppercase tracking-widest text-center mb-8">
          Ako to funguje
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(s => (
            <div key={s.n} className="hv-card p-5 space-y-3">
              <div className="text-3xl font-black text-purple-500/40 font-mono">{s.n}</div>
              <h3 className="font-bold text-white text-sm">{s.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-4xl mx-auto px-5 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-white/80 uppercase tracking-widest">
            Kategórie
          </h2>
          <Link href={`/${lang}/herd-vote/kategorie`}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
            Všetky kategórie →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map(c => (
            <div key={c.title} className="hv-card p-5 space-y-2">
              <div className="text-2xl">{c.icon}</div>
              <h3 className="font-bold text-white text-sm">{c.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-xl mx-auto px-5 py-16 text-center space-y-5">
        <div className="hv-card-glow p-8 space-y-4">
          <div className="text-4xl">🚀</div>
          <h2 className="text-2xl font-black text-white">Pripravený hrať?</h2>
          <p className="text-sm text-white/50">
            Hra trvá 15–45 minút. Ideálna pre 4–20 ľudí.
          </p>
          <Link
            href={`/${lang}/herd-vote/lobby`}
            className="hv-btn-primary w-full py-4 text-base font-black rounded-2xl block text-center"
          >
            Vytvoriť hru zadarmo →
          </Link>
        </div>
      </section>

    </div>
  )
}
