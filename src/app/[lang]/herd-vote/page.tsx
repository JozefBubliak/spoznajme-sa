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

  const stats = [
    { value: '23', label: 'kategórií' },
    { value: '2 600+', label: 'otázok' },
    { value: '4–20', label: 'hráčov' },
    { value: '0', label: 'inštalácií' },
  ]

  const steps = [
    { n: '1', title: 'Vytvor hru', desc: 'Prihlás sa a klikni. Dostaneš 6-znakový kód a QR. Trvá to 10 sekúnd.' },
    { n: '2', title: 'Hráči sa pripoja', desc: 'Naskenujú QR alebo zadajú kód v telefóne. Žiadna aplikácia, žiadna registrácia.' },
    { n: '3', title: 'Ty moderuješ', desc: 'Čítaš otázky, spúšťaš časomieru, odhaľuješ správne odpovede aj zaujímavosti.' },
    { n: '4', title: 'Rebríček naživo', desc: 'Body podľa rýchlosti, série 🔥, pohyb v poradí a finálne pódium s konfetami.' },
  ]

  const categories = [
    { icon: '🎬', name: 'Popkultúra – Hudba, Film, Seriály' },
    { icon: '🐾', name: 'Zvieratá & rastliny' },
    { icon: '🪐', name: 'Vesmír a planéty' },
    { icon: '🎨', name: 'Kultúra a umenie' },
    { icon: '⚽', name: 'Šport' },
    { icon: '🏛️', name: 'História Svet' },
    { icon: '💬', name: 'Slang a internetová kultúra' },
    { icon: '🤯', name: 'Zábavné rekordy & kuriozity' },
    { icon: '🇸🇰', name: 'História Slovensko' },
    { icon: '🧠', name: 'Logika & rýchla matematika' },
    { icon: '💻', name: 'Technológie a vynálezy' },
    { icon: '🎯', name: 'Tipni si' },
  ]

  const audiences = [
    { icon: '👨‍👩‍👦', title: 'Rodina', desc: 'Večer pri stole namiesto telefónov v ruke.' },
    { icon: '👫', title: 'Partia', desc: 'Rozhýbe aj skupinu, ktorá sa ešte dobre nepozná.' },
    { icon: '💼', title: 'Tím / práca', desc: 'Teambuilding bez trápnosti a nútených aktivít.' },
    { icon: '🏫', title: 'Škola', desc: 'Trieda proti triede. Rýchle, férové, bez vylučovania.' },
  ]

  return (
    <div className="hv-bg hv-particles min-h-screen">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 pt-14 pb-14 md:pt-20">
        <div className="text-center space-y-4 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
            <span>🐂</span> Pub-kvíz s moderátorom
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
            Otázka na plátne.<br />
            <span className="hv-text-gradient">Odpovede na mobiloch.</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Ty čítaš otázky a moderuješ, hráči ťukajú na telefóne. Body za rýchlosť,
            série a naživo sa mení rebríček. Hra na 15–45 minút.
          </p>
        </div>

        <HerdVoteEntryClient lang={lang as Locale} />

        <div className="mt-10 grid grid-cols-4 gap-3 max-w-lg mx-auto">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white tabular-nums">{s.value}</div>
              <div className="text-[0.65rem] md:text-xs uppercase tracking-widest text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-xs font-black text-white/60 uppercase tracking-[0.25em] text-center mb-10">
          Ako to funguje
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(s => (
            <div key={s.n} className="hv-card p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/20 border border-purple-400/30 flex items-center justify-center text-sm font-black text-white">
                {s.n}
              </div>
              <h3 className="font-bold text-white text-sm">{s.title}</h3>
              <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xs font-black text-white/60 uppercase tracking-[0.25em]">Kategórie</h2>
            <p className="text-white/45 text-sm mt-1">Vyber si sadu na každé kolo. Otázky sa v hre neopakujú.</p>
          </div>
          <Link href={`/${lang}/herd-vote/kategorie`}
            className="shrink-0 text-xs font-bold text-purple-300 hover:text-purple-200 transition-colors whitespace-nowrap">
            Všetky →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <span key={c.name}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-sm font-semibold text-white/80 backdrop-blur-sm">
              <span>{c.icon}</span>{c.name}
            </span>
          ))}
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="max-w-5xl mx-auto px-5 py-14">
        <h2 className="text-xs font-black text-white/60 uppercase tracking-[0.25em] text-center mb-10">
          Pre koho
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {audiences.map(a => (
            <div key={a.title} className="hv-card p-5 space-y-2">
              <div className="text-2xl">{a.icon}</div>
              <h3 className="font-bold text-white text-sm">{a.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="max-w-xl mx-auto px-5 py-16 text-center">
        <div className="hv-card-glow p-8 md:p-10 space-y-4">
          <div className="text-4xl">🚀</div>
          <h2 className="text-2xl md:text-3xl font-black text-white">Pripravený hrať?</h2>
          <p className="text-sm text-white/55">
            Nič sa neinštaluje. Nič sa neplatí za skúšku. Otvor lobby a pošli link.
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
