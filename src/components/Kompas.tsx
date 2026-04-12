'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  KOMPAS_DATA,
  KOMPAS_MOMENTS,
  type LegacyKompasItem,
} from '@/data/kompas'

const groupImages: Record<string, string> = {
  'Rodič → Dieťa': '/images/kompas/rodic-dieta.png',
  Deti: '/images/kompas/dieta.png',
  Páry: '/images/kompas/pary.png',
  Práca: '/images/kompas/praca.png',
  Priatelia: '/images/kompas/priatelia.png',
  'Citlivé témy': '/images/kompas/citlive.png',
}

type KompasProps = {
  defaultGroup?: string | null
  hideHero?: boolean
  lockGroup?: boolean
}

function DetailBlock({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? 'border-primary/30 bg-primary/10'
          : 'border-border/50 bg-background/70'
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{value}</p>
    </div>
  )
}

function ScenarioCard({ item }: { item: LegacyKompasItem }) {
  return (
    <article className="rounded-3xl border border-border/50 bg-card/85 p-6 shadow-sm transition hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {item.topic}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {item.title}
          </h3>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Priorita #{item.priority}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <DetailBlock label="Situácia" value={item.situation} />
        <DetailBlock label="Cieľ rozhovoru" value={item.goal} />
        <DetailBlock label="Prvá veta" value={item.firstLine} accent />
        <DetailBlock label="Jemnejšia verzia" value={item.softerVersion} />
        <DetailBlock label="Priamejšia verzia" value={item.directVersion} />
        <DetailBlock label="Čomu sa vyhnúť" value={item.avoid} />
      </div>
    </article>
  )
}

export default function Kompas({
  defaultGroup = null,
  hideHero = false,
  lockGroup = false,
}: KompasProps) {
  const groups = Array.from(new Set(KOMPAS_DATA.map((item) => item.group)))
  const [selectedGroup, setSelectedGroup] = useState<string | null>(defaultGroup)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  useEffect(() => {
    setSelectedGroup(defaultGroup ?? null)
    setSelectedTopic(null)
  }, [defaultGroup])

  const groupItems = selectedGroup
    ? KOMPAS_DATA.filter((item) => item.group === selectedGroup)
    : []

  const topics = selectedGroup
    ? KOMPAS_MOMENTS.filter((moment) =>
        groupItems.some((item) => item.momentSlug === moment.slug)
      )
    : []

  const cards = selectedGroup
    ? groupItems
        .filter((item) => (selectedTopic ? item.topic === selectedTopic : true))
        .sort((a, b) => a.priority - b.priority)
    : []

  const selectedMoment = topics.find((moment) => moment.label === selectedTopic)

  return (
    <div className="min-h-screen bg-background">
      {!hideHero ? (
        <section className="relative overflow-hidden pt-28 pb-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Mapa životných momentov
            </p>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Komunikačný <span className="font-serif italic text-primary">kompas</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Nie teória komunikácie. Konkrétna prvá veta, jemnejšia verzia, priamejšia verzia a
              hranice toho, čomu sa radšej vyhnúť.
            </p>
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-6xl px-6 pb-20">
        {!lockGroup ? (
          <div className="mb-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => {
              const count = KOMPAS_DATA.filter((item) => item.group === group).length

              return (
                <button
                  key={group}
                  onClick={() => {
                    setSelectedGroup(group)
                    setSelectedTopic(null)
                  }}
                  className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                    selectedGroup === group
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10'
                      : 'border-border/40 hover:border-primary/40 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={groupImages[group] || '/images/kompas/default.png'}
                      alt={group}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-card p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-foreground">{group}</div>
                      <div className="text-xs font-medium text-muted-foreground">{count} kariet</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}

        {selectedGroup === 'Deti' && (
          <div className="mb-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <h2 className="mb-2 text-xl font-semibold text-destructive">
              Ak je ti ťažko, nie si na to sám
            </h2>
            <p className="mb-4 text-destructive/80">
              Ak máš pocit, že to nezvládaš, skús sa porozprávať s niekým, komu veríš. Alebo sa
              môžeš obrátiť na odbornú pomoc:
            </p>
            <ul className="space-y-2 font-medium text-foreground">
              <li>
                <a href="tel:116111" className="underline transition hover:text-primary">
                  Linka detskej istoty – 116 111
                </a>
              </li>
              <li>
                <a
                  href="https://ipcko.sk"
                  target="_blank"
                  rel="noreferrer"
                  className="underline transition hover:text-primary"
                >
                  IPčko – online chat a e-mailová poradňa
                </a>
              </li>
              <li>
                <a href="tel:0800800566" className="underline transition hover:text-primary">
                  Nezábudka – linka dôvery 0800 800 566
                </a>
              </li>
            </ul>
          </div>
        )}

        {selectedGroup ? (
          <div className="mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedTopic(null)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedTopic === null
                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'border-border/40 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                Všetky momenty
              </button>
              {topics.map((topic) => (
                <button
                  key={topic.slug}
                  onClick={() => setSelectedTopic(topic.label)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedTopic === topic.label
                      ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'border-border/40 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {selectedGroup}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {selectedMoment?.label ?? 'Situácie v tejto vetve'}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {selectedMoment?.description ??
                      'Vyber si konkrétny životný moment alebo si prejdi všetky priority v tejto vetve.'}
                  </p>
                </div>
                <div className="rounded-full border border-border/50 bg-background/70 px-4 py-2 text-sm font-medium text-foreground">
                  {cards.length} kariet
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {selectedGroup && selectedGroup in groupImages ? (
          <div className="mb-8">
            <Image
              src={groupImages[selectedGroup]}
              alt={selectedGroup}
              width={1200}
              height={320}
              className="h-64 w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        ) : null}

        {selectedGroup && cards.length > 0 ? (
          <div className="space-y-6">
            {cards.map((item) => (
              <ScenarioCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}

        {!selectedGroup && (
          <p className="mt-12 text-center text-lg text-muted-foreground">
            Vyber si, s kým alebo v akej situácii chceš komunikovať lepšie.
          </p>
        )}
      </div>
    </div>
  )
}
