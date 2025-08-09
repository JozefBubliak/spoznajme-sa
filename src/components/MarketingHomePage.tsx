'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function MarketingHomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 space-y-24">
      {/* Hero */}
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-block rounded-full border px-3 py-1 text-xs text-muted-foreground">
            Novinka
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Spoznajme sa — otázky, ktoré prehlbujú vzťahy
          </h1>
          <p className="text-muted-foreground text-lg">
            Premyslené otázky pre partnerov, priateľov aj rodinu. Zábavné, hlboké a bezpečné.
          </p>
          <div className="flex gap-3">
            <Link href="/app">
              <Button className="h-11 px-6">Začať hneď</Button>
            </Link>
            <Link href="/free">
              <Button variant="outline" className="h-11 px-6">Vyskúšať zdarma</Button>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            10 otázok zadarmo • 2 nové otázky denne po prihlásení • jednorazové odomknutie všetkého
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Ukážka otázky</div>
              <blockquote className="rounded-xl bg-muted p-6 text-lg leading-relaxed">
                Ktorá spomienka z posledného roka ťa urobila naozaj šťastným/šťastnou a prečo?
              </blockquote>
              <div className="flex gap-2">
                <Button className="flex-1">Ďalšia otázka</Button>
                <Button variant="outline" className="flex-1">Uložiť medzi obľúbené</Button>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl bg-primary/30" />
        </div>
      </section>

      {/* Benefity */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Prečo to funguje</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Hlboké spojenie', desc: 'Otázky sú navrhnuté odborníkmi tak, aby podporovali otvorenosť a dôveru.' },
            { title: 'Žiadne trápne ticho', desc: 'Dostaneš zmysluplné témy, ktoré rozhýbu rozhovor prirodzene.' },
            { title: 'Pre všetkých', desc: 'Partneri, kamaráti, rodina — vyberieš si skupinu a náladu.' },
          ].map((i) => (
            <div key={i.title} className="rounded-xl border p-6 bg-card shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">{i.title}</h3>
              <p className="text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ako to funguje */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Ako to funguje</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            { step: '1', title: 'Vyber skupinu', desc: 'Partneri, kamaráti, rodina alebo rodič–dieťa.' },
            { step: '2', title: 'Otvor otázku', desc: 'Jedna otázka naraz — ľahké začať, ľahké pokračovať.' },
            { step: '3', title: 'Zdieľajte odpovede', desc: 'Budujte porozumenie, blízkosť a nové rituály.' },
          ].map((s) => (
            <li key={s.step} className="rounded-xl border p-6 bg-card">
              <div className="h-9 w-9 rounded-full border flex items-center justify-center mb-4">{s.step}</div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Pripravení začať?</h2>
        <p className="text-muted-foreground">
          Spusti bez registrácie, alebo sa prihlás a získaj 2 nové otázky denne.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/app"><Button className="h-11 px-6">Začať</Button></Link>
          <Link href="/login"><Button variant="outline" className="h-11 px-6">Prihlásiť sa</Button></Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t pt-12">
        <h3 className="text-xl font-semibold mb-6">Časté otázky</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="font-medium">Je to naozaj zdarma?</div>
            <p className="text-muted-foreground">
              Áno. Máš 10 otázok bez registrácie a po prihlásení 2 nové otázky denne. Plný prístup je jednorazová platba.
            </p>
          </div>
          <div>
            <div className="font-medium">Pre koho sú otázky určené?</div>
            <p className="text-muted-foreground">
              Pre partnerov, priateľov, rodinu aj rodiča s dieťaťom. Vyber si skupinu a chuť rozhovoru.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
