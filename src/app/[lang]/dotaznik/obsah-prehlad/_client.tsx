'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { Blok, OtazkaBlok, Podmienka, Pohlavie, TabulkaBlok, TemaObsah, TextBlok } from '@/lib/dotaznik/obsah/typ'
import { gtext } from '@/lib/dotaznik/obsah/typ'

// ─────────────────────────────────────────────────────────────────────────────
// Admin prehľad: rovnaké vizuálne komponenty ako skutočný dotazník (_kniha.tsx),
// len bez interaktivity/ukladania — takto to naozaj vidí respondent, len
// všetky témy naraz, s prepínačom pohlavia a fulltextovým hľadaním.
// ─────────────────────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function podmienkaText(p?: Podmienka): string | undefined {
  if (!p) return undefined
  const casti: string[] = []
  if (p.vsetky) casti.push(...p.vsetky.map((cast) => podmienkaText(cast)).filter((text): text is string => Boolean(text)))
  if (p.asponJedna) {
    const alternativy = p.asponJedna.map((cast) => podmienkaText(cast)).filter((text): text is string => Boolean(text))
    if (alternativy.length) casti.push(`aspoň jedna z: (${alternativy.join(') ALEBO (')})`)
  }
  if (p.pohlavie) casti.push(`len pohlavie: ${p.pohlavie}`)
  if (p.ot && p.je) casti.push(`${p.ot} = ${p.je}`)
  if (p.ot && p.nie) casti.push(`${p.ot} ≠ ${p.nie}`)
  if (p.ot && p.jeNiektora) casti.push(`${p.ot} ∈ [${p.jeNiektora.join(', ')}]`)
  if (p.ot && p.obsahuje) casti.push(`${p.ot} obsahuje „${p.obsahuje}"`)
  if (p.ot && p.obsahujeNiektoru) casti.push(`${p.ot} obsahuje niektorú z [${p.obsahujeNiektoru.join(', ')}]`)
  return casti.length ? casti.join(', ') : undefined
}

function blokHaystack(b: Blok): string {
  if (b.druh === 'text') {
    return [gtext(b.telo, 'm'), gtext(b.telo, 'z'), b.nadpis ? gtext(b.nadpis, 'm') : '', b.nadpis ? gtext(b.nadpis, 'z') : ''].join(' ␟ ')
  }
  if (b.druh === 'tabulka') {
    return [
      b.nadpis ? gtext(b.nadpis, 'm') + ' ' + gtext(b.nadpis, 'z') : '',
      b.hlavicka.map((h) => gtext(h, 'm') + ' ' + gtext(h, 'z')).join(' '),
      b.riadky.flat().map((c) => gtext(c, 'm') + ' ' + gtext(c, 'z')).join(' '),
    ].join(' ␟ ')
  }
  if (b.druh === 'otazka') {
    return [
      gtext(b.text, 'm'),
      gtext(b.text, 'z'),
      b.napoveda ? gtext(b.napoveda, 'm') : '',
      b.napoveda ? gtext(b.napoveda, 'z') : '',
      ...(b.moznosti ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
      ...(b.riadky ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
      ...(b.stlpce ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
    ].join(' ␟ ')
  }
  // skupina — len vlastný nadpis/uvod, deti sa filtrujú samostatne
  return [
    b.nadpis ? gtext(b.nadpis, 'm') + ' ' + gtext(b.nadpis, 'z') : '',
    b.uvod ? gtext(b.uvod, 'm') + ' ' + gtext(b.uvod, 'z') : '',
  ].join(' ␟ ')
}

function filterBloky(bloky: Blok[], q: string): Blok[] {
  if (!q) return bloky
  const out: Blok[] = []
  for (const b of bloky) {
    if (b.druh === 'skupina') {
      const deti = filterBloky(b.bloky, q)
      const selfMatch = normalize(blokHaystack(b)).includes(q)
      if (deti.length > 0) out.push({ ...b, bloky: deti })
      else if (selfMatch) out.push(b)
      continue
    }
    if (normalize(blokHaystack(b)).includes(q)) out.push(b)
  }
  return out
}

function countLeaves(bloky: Blok[]): number {
  let n = 0
  for (const b of bloky) {
    if (b.druh === 'skupina') n += countLeaves(b.bloky)
    else n += 1
  }
  return n
}

type PrehladPolozka = { nazov: Parameters<typeof gtext>[0]; slugs: readonly string[] }
type PrehladSkupina = { id: string; nazov: string; popis: string; polozky: readonly PrehladPolozka[] }

const PREHLAD_SKUPINY: readonly PrehladSkupina[] = [
  {
    id: 'vztah-tuzba',
    nazov: '1. Vzťah, blízkosť a túžba',
    popis: 'Ako sa cítime vo vzťahu, čo v nás prebúdza chuť a čo jej môže brániť.',
    polozky: [
      { nazov: 'Dlhodobá intimita vo vzťahu', slugs: ['mentalna-priprava-tuzba/mentalna-priprava-tuzba'] },
      { nazov: 'Kontext vzťahu a životná situácia', slugs: ['kontext-vztahu-zivotna-situacia/kontext-vztahu-zivotna-situacia'] },
      { nazov: 'Libido a chuť', slugs: ['mentalna-priprava-tuzba/libido-chut'] },
      { nazov: 'Brzdy a spúšťače vzrušenia', slugs: ['mentalna-priprava-tuzba/brzdy-spustace'] },
      { nazov: 'Sebaprijatie, telo a hanba', slugs: ['telo-hanba-citlive/telo-hanba-citlive'] },
      { nazov: 'Špecifické obdobia a obmedzenia', slugs: ['telo-hanba-citlive/specificke-obdobia'] },
    ],
  },
  {
    id: 'dohoda',
    nazov: '2. Dohoda, komunikácia a starostlivosť',
    popis: 'Súhlas, dorozumenie počas intimity a spoločná starostlivosť o zdravie a pohodlie.',
    polozky: [
      { nazov: 'Súhlas, bezpečie a komunikácia', slugs: ['suhlas-safewords/suhlas-safewords'] },
      { nazov: 'Komunikácia počas a po', slugs: ['komunikacia-pocas-po/komunikacia-pocas-po'] },
      { nazov: 'Zdravie, ochrana a hygiena', slugs: ['zdravie-ochrana-hygiena/zdravie-ochrana-hygiena'] },
    ],
  },
  {
    id: 'naladenie',
    nazov: '3. Naladenie, bozky a pomalá blízkosť',
    popis: 'Prejavy túžby a náklonnosti, ktoré budujú napätie ešte pred intenzívnejšími praktikami.',
    polozky: [
      { nazov: 'Predohra a naladenie', slugs: ['predohra-stupnovanie/predohra-stupnovanie'] },
      { nazov: 'Bozky, dotyky a manuálna stimulácia', slugs: ['bozky/bozky'] },
      { nazov: 'Tantra, slow sex a spiritualita', slugs: ['tantra-slow-sex-spiritualita/tantra-slow-sex-spiritualita'] },
    ],
  },
  {
    id: 'zmysly',
    nazov: '4. Zmysly, atmosféra a prostredie',
    popis: 'Zrak, sluch, čuch, chuť a hmat spolu s miestom a atmosférou, v ktorej sa vieme uvoľniť.',
    polozky: [
      { nazov: 'Zrak, sluch, čuch, chuť a hmat', slugs: ['zmyslova-hra/zmyslova-hra'] },
      { nazov: 'Miesta, prostredie a atmosféra', slugs: ['prostredie-atmosfera/prostredie-atmosfera'] },
    ],
  },
  {
    id: 'slova-predstavy',
    nazov: '5. Slová, predstavy a spojenie na diaľku',
    popis: 'Ako túžbu vyjadrujeme hlasom, fantáziou, správami, obrazom alebo spoločnou predstavou.',
    polozky: [
      {
        nazov: 'Dirty talk',
        slugs: [
          'dirty-talk-oslovenia/ton',
          'dirty-talk-oslovenia/obsah',
          'dirty-talk-oslovenia/oslovenia',
          'dirty-talk-oslovenia/jazyk-tela',
        ],
      },
      { nazov: 'Fantázie — screening a preklad do reality', slugs: ['fantazie-preklad-reality/fantazie-preklad-reality'] },
      { nazov: 'Digitálna a diaľková intimita', slugs: ['digitalna-dialkova/digitalna-dialkova'] },
    ],
  },
  {
    id: 'solo-pomocky',
    nazov: '6. Sólo objavovanie, pomôcky a hra bez penetrácie',
    popis: 'Spoznávanie vlastného tela, spoločné objavovanie a formy potešenia bez penetrácie.',
    polozky: [
      { nazov: 'Masturbácia a sólo aktivity', slugs: ['manualna-stimulacia/manualna-stimulacia'] },
      { nazov: 'Erotické pomôcky a hračky', slugs: ['vibratory-stimulatory/vibratory-stimulatory'] },
      { nazov: 'Nepenetratívne trenie', slugs: ['nepenetrativne-trenie/nepenetrativne-trenie'] },
    ],
  },
  {
    id: 'techniky',
    nazov: '7. Priebeh, techniky a orgazmus',
    popis: 'Čo nám vyhovuje pri tempe, intenzite, polohách a najbežnejších sexuálnych praktikách.',
    polozky: [
      { nazov: 'Tempo a intenzita', slugs: ['tempo-rytmus-choreografia/tempo-rytmus-choreografia'] },
      { nazov: 'Orgazmus a jeho kontrola', slugs: ['orgazmus-kontrola/orgazmus-kontrola'] },
      { nazov: 'Polohy', slugs: ['polohy/polohy'] },
      { nazov: 'Vaginálna penetrácia', slugs: ['vaginalna-penetracia/vaginalna-penetracia'] },
      { nazov: 'Orálna intimita', slugs: ['oral-vulva-klitoris/oral-vulva-klitoris'] },
    ],
  },
  {
    id: 'pritazlivost',
    nazov: '8. Príťažlivosť a rodová zvedavosť',
    popis: 'Priestor pre zvedavosť voči rovnakému pohlaviu a trans partnerke bez vnucovania predpokladov.',
    polozky: [
      { nazov: 'Interakcie s rovnakým pohlavím', slugs: ['bi-zvedavost/bi-zvedavost'] },
      { nazov: 'Trans žena — žena s penisom', slugs: ['trans-partnerka/trans-partnerka'] },
    ],
  },
  {
    id: 'specificke-praktiky',
    nazov: '9. Špecifickejšie praktiky a dynamiky',
    popis: 'Rolové, pozorovacie, mocenské a intenzívnejšie telesné praktiky.',
    polozky: [
      { nazov: 'Roleplay a scenáre', slugs: ['roleplay-scenare/roleplay-scenare'] },
      { nazov: 'Voyeurizmus a exhibicionizmus', slugs: ['voyeur-exhib/voyeur-exhib'] },
      { nazov: 'Face Sitting', slugs: ['oral-kombinacie-polohy/face-sitting'] },
      { nazov: 'Anál a stimulácia zadku', slugs: ['analna-penetracia/analna-penetracia'] },
      { nazov: 'BDSM a mocenská dynamika', slugs: ['dominancia-submisia/dominancia-submisia'] },
    ],
  },
  {
    id: 'telo-tekutiny',
    nazov: '10. Telo, tekutiny a fetiše',
    popis: 'Prirodzené vône a chute tela, telesné tekutiny a osobitejšie erotické záujmy.',
    polozky: [
      { nazov: 'Prirodzenosť tela — vôňa a chuť', slugs: ['telesne-tekutiny/prirodzenost'] },
      {
        nazov: {
          m: 'Jej prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
          z: 'Moja prirodzená vlhkosť — vôňa, chuť a ochutnávanie',
        },
        slugs: ['telesne-tekutiny/zenska-vlhkost'],
      },
      { nazov: 'Semeno a ejakulácia', slugs: ['telesne-tekutiny/semeno'] },
      { nazov: 'Menštruačná krv a period play', slugs: ['telesne-tekutiny/menstrualna-krv'] },
      { nazov: 'Watersports', slugs: ['telesne-tekutiny/watersports'] },
      { nazov: 'Fetiše a špecifické záujmy', slugs: ['telesne-tekutiny/telesne-tekutiny'] },
    ],
  },
  {
    id: 'dalsi-ludia',
    nazov: '11. Ďalší ľudia a vzťahové dohody',
    popis: 'Túžby a dohody, v ktorých do erotiky alebo vzťahu vstupujú ďalší ľudia.',
    polozky: [
      { nazov: 'CNM/ENM a vzťahové štruktúry', slugs: ['cnm-enm/cnm-enm'] },
      { nazov: 'Zdieľanie partnera — hotwife / cuckold', slugs: ['zdielanie-partnera/zdielanie-partnera'] },
      { nazov: 'Swinging a výmena partnerov', slugs: ['swinging/swinging'] },
      { nazov: 'Trojky, skupiny a gangbang', slugs: ['trojky-skupiny/trojky-skupiny'] },
    ],
  },
  {
    id: 'tabu',
    nazov: '12. Tabu a osobné mantinely',
    popis: 'Najcitlivejšie predstavy a hranice, o ktorých má zmysel hovoriť bez tlaku a hodnotenia.',
    polozky: [{ nazov: 'Tabu témy a mantinely', slugs: ['tabu-mantinely/tabu-mantinely'] }],
  },
]

const PORADIE_TEM = new Map<string, number>(
  PREHLAD_SKUPINY.flatMap((skupina) => skupina.polozky).flatMap((polozka) => polozka.slugs).map((slug, index) => [slug, index]),
)

// ── vizuálne komponenty (1:1 podľa _kniha.tsx, bez interaktivity) ──────────

function Prose({ nadpis, telo, ton }: { nadpis?: string; telo: string; ton?: string }) {
  const box =
    ton === 'vystraha'
      ? 'border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
      : ton === 'info'
        ? 'border-primary/25 bg-primary/5 text-foreground/80'
        : ton === 'citat'
          ? 'border-l-2 border-primary/40 bg-transparent pl-4 text-foreground/80 italic'
          : 'border-transparent bg-transparent text-foreground/80'
  const wrap = ton === 'citat' ? '' : 'rounded-2xl border p-4'
  return (
    <div className={`${wrap} ${box}`}>
      {nadpis && <div className="mb-1.5 text-sm font-semibold text-foreground">{nadpis}</div>}
      {telo
        .split('\n\n')
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="mt-1.5 text-sm leading-relaxed first:mt-0">
            {p}
          </p>
        ))}
    </div>
  )
}

function ChipsStatic({ moznosti, viac }: { moznosti: { v: string; label: string }[]; viac?: boolean }) {
  return (
    <div className={viac ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}>
      {moznosti.map((m) => (
        <div
          key={m.v}
          className={`rounded-xl border border-border bg-card/40 px-3.5 py-2 text-left text-sm font-medium text-foreground ${viac ? '' : 'w-full'}`}
        >
          {m.label}
        </div>
      ))}
    </div>
  )
}

function OtazkaPoleStatic({ blok, p }: { blok: OtazkaBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const moznosti = (blok.moznosti ?? []).map((m) => ({ v: m.v, label: G(m.label) }))
  const meta = [`typ: ${blok.typ}`, blok.rola && `rola: ${blok.rola}`, podmienkaText(blok.podmienka)].filter(Boolean).join(' · ')

  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <div className="text-sm font-medium text-foreground">{G(blok.text)}</div>
      {blok.napoveda && <p className="mt-1 text-xs text-muted-foreground">{G(blok.napoveda)}</p>}
      {blok.typ === 'viac' && (
        <p className="mt-1 text-[11px] text-primary/80">
          {blok.favoritPovoleny ? 'Viac možností + jeden favorit v interaktívnej simulácii.' : 'Môžeš označiť viac možností.'}
        </p>
      )}

      <div className="mt-3">
        {(blok.typ === 'jeden' || blok.typ === 'skala') && (
          <div className="space-y-2">
            <ChipsStatic moznosti={moznosti} />
            {blok.inePovolene && (
              <input
                disabled
                placeholder="Iné alebo doplnenie… (voliteľné)"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground outline-none"
              />
            )}
          </div>
        )}

        {blok.typ === 'viac' && (
          <div className="space-y-2">
            <ChipsStatic viac moznosti={moznosti} />
            {blok.inePovolene && (
              <input
                disabled
                placeholder="Iné…"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground outline-none"
              />
            )}
          </div>
        )}

        {blok.typ === 'text' && (
          <textarea
            disabled
            rows={2}
            placeholder="Napíš voľne… (voliteľné)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground outline-none"
          />
        )}

        {blok.typ === 'mrezka' && (
          <div className="space-y-3">
            {(blok.riadky ?? []).map((r) => (
              <div key={r.v}>
                <div className="mb-1.5 text-xs font-medium text-muted-foreground">{G(r.label)}</div>
                <ChipsStatic viac moznosti={(blok.stlpce ?? []).map((c) => ({ v: c.v, label: G(c.label) }))} />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground/40">
        #{blok.id}
        {meta ? ` · ${meta}` : ''}
      </p>
    </div>
  )
}

function TabulkaStatic({ blok, p }: { blok: TabulkaBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70">
      {blok.nadpis && (
        <div className="border-b border-border/70 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground">{G(blok.nadpis)}</div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground">
            {blok.hlavicka.map((h, i) => (
              <th key={i} className="border-b border-border/60 px-3 py-2 text-left font-medium">
                {G(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blok.riadky.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className="border-b border-border/40 px-3 py-2 align-top text-foreground/80">
                  {G(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TextStatic({ blok, p }: { blok: TextBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const telo = G(blok.telo)
  if (!telo && !blok.nadpis) return null
  return <Prose nadpis={blok.nadpis ? G(blok.nadpis) : undefined} telo={telo} ton={blok.ton} />
}

function Bloky({ bloky, p }: { bloky: Blok[]; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  return (
    <>
      {bloky.map((b) => {
        if (b.druh === 'text') return <TextStatic key={b.id} blok={b} p={p} />
        if (b.druh === 'tabulka') return <TabulkaStatic key={b.id} blok={b} p={p} />
        if (b.druh === 'skupina') {
          const pod = podmienkaText(b.podmienka)
          return (
            <div key={b.id} className="space-y-4 rounded-2xl border border-border/60 bg-card/20 p-4">
              {b.nadpis && (
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  <span>{G(b.nadpis)}</span>
                  {pod && <span className="text-[10px] normal-case tracking-normal text-muted-foreground/50">{pod}</span>}
                </div>
              )}
              {b.uvod && <p className="text-sm leading-relaxed text-muted-foreground">{G(b.uvod)}</p>}
              <Bloky bloky={b.bloky} p={p} />
            </div>
          )
        }
        return <OtazkaPoleStatic key={b.id} blok={b} p={p} />
      })}
    </>
  )
}

// ── stránka ─────────────────────────────────────────────────────────────────

export default function ObsahPrehladClient({ lang, temy }: { lang: string; temy: TemaObsah[] }) {
  const [query, setQuery] = useState('')
  const [pohlavie, setPohlavie] = useState<Pohlavie>('z')

  const q = normalize(query.trim())

  const sekcie = useMemo(() => {
    return temy.map((tema) => {
      const nazovMatch = normalize(gtext(tema.nadpis, 'm') + ' ' + gtext(tema.nadpis, 'z')).includes(q)
      const zobrazitVsetko = !q || nazovMatch
      const uvod = zobrazitVsetko ? tema.uvod : filterBloky(tema.uvod, q)
      const telo = zobrazitVsetko ? tema.telo : filterBloky(tema.telo, q)
      const zaver = zobrazitVsetko ? tema.zaver ?? [] : filterBloky(tema.zaver ?? [], q)
      const pocet = countLeaves(tema.uvod) + countLeaves(tema.telo) + countLeaves(tema.zaver ?? [])
      const pocetZobrazene = countLeaves(uvod) + countLeaves(telo) + countLeaves(zaver)
      const viditelna = !q || nazovMatch || pocetZobrazene > 0
      return { tema, uvod, telo, zaver, pocet, pocetZobrazene, viditelna }
    }).sort((a, b) => (PORADIE_TEM.get(a.tema.slug) ?? 999) - (PORADIE_TEM.get(b.tema.slug) ?? 999))
  }, [temy, q])

  const viditelne = sekcie.filter((s) => s.viditelna)
  const celkovyPocet = sekcie.reduce((acc, s) => acc + s.pocet, 0)
  const celkovyPocetZobrazenych = viditelne.reduce((acc, s) => acc + s.pocetZobrazene, 0)

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Admin · Obsah dotazníka</p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Presne to, čo uvidí respondent</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {temy.length} tém, {celkovyPocet} otázok/textov — rovnaké karty a text ako v ostrom dotazníku, len všetko na jednej
        stránke. Skupiny s podmienkou (napr. „len pre mužov") sú tu vždy zobrazené. Presne to, čo vidí respondent
        (s vetvením a klikaním, bez ukladania), otvoríš tlačidlom „▶ Vyplniť ako žena / muž" pri každej téme.
      </p>

      <div className="sticky top-2 z-10 mt-6 space-y-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hľadaj čokoľvek — napr. „spontánny sex“, „mapa zmyslov“, „žiarlivosť“…"
          className="w-full rounded-full border border-border bg-background/95 px-5 py-3 text-sm text-foreground shadow-lg backdrop-blur placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          autoFocus
        />
        <div className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/95 px-2 py-1.5 shadow backdrop-blur">
          <div className="flex gap-1">
            {(['z', 'm'] as const).map((pg) => (
              <button
                key={pg}
                onClick={() => setPohlavie(pg)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  pohlavie === pg ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {pg === 'z' ? 'Ženská verzia' : 'Mužská verzia'}
              </button>
            ))}
          </div>
          {q && (
            <p className="pr-2 text-xs text-muted-foreground">
              {celkovyPocetZobrazenych} zhôd v {viditelne.length} témach
            </p>
          )}
        </div>
      </div>

      {q && viditelne.length === 0 && <p className="mt-10 text-sm text-muted-foreground">Nič sa nenašlo pre „{query}“.</p>}

      {!q && (
        <nav className="mt-8 space-y-6">
          {PREHLAD_SKUPINY.map((skupina) => {
            const maObsah = skupina.polozky.some((polozka) =>
              sekcie.some((s) => (polozka.slugs as readonly string[]).includes(s.tema.slug)),
            )
            if (!maObsah) return null
            return (
              <div key={skupina.id}>
                <h2 className="text-sm font-semibold text-foreground">{skupina.nazov}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{skupina.popis}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skupina.polozky.map((polozka) => {
                    const temyPolozky = sekcie.filter((s) =>
                      (polozka.slugs as readonly string[]).includes(s.tema.slug),
                    )
                    if (temyPolozky.length === 0) return null
                    const pocet = temyPolozky.reduce((sucet, s) => sucet + s.pocet, 0)
                    return (
                      <a
                        key={polozka.slugs[0]}
                        href={`#${temyPolozky[0].tema.slug}`}
                        className="rounded-full border border-border/70 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                      >
                        {gtext(polozka.nazov, pohlavie)} <span className="text-muted-foreground/50">({pocet})</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>
      )}

      <div className="mt-8 space-y-14">
        {viditelne.map((s) => (
          <section key={s.tema.slug} id={s.tema.slug} className="scroll-mt-32">
            <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-border/60 pb-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{gtext(s.tema.nadpis, pohlavie)}</h2>
              <span className="text-xs text-muted-foreground">
                {s.pocetZobrazene}
                {q ? ` / ${s.pocet}` : ''} · <span className="text-muted-foreground/50">{s.tema.slug}</span>
              </span>
            </div>
            <div className="mb-5 flex flex-wrap gap-2">
              {(['z', 'm'] as const).map((pg) => (
                <Link
                  key={pg}
                  href={`/${lang}/dotaznik/nahlad/${s.tema.slug}?p=${pg}`}
                  className="rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/25"
                >
                  ▶ Simulovať ako {pg === 'z' ? 'žena' : 'muž'}
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              <Bloky bloky={s.uvod} p={pohlavie} />
              <Bloky bloky={s.telo} p={pohlavie} />
              {s.zaver.length > 0 && <Bloky bloky={s.zaver} p={pohlavie} />}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <Link href="../moduly" className="hover:text-foreground">
          ← Späť na mapu tém
        </Link>
      </div>
    </div>
  )
}
