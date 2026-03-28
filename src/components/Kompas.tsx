'use client'

import { useState } from 'react'
import { KOMPAS_DATA } from '@/data/kompas'

const groupImages: Record<string, string> = {
  'Rodič → Dieťa': '/images/kompas/rodic-dieta.png',
  Deti: '/images/kompas/dieta.png',
  Páry: '/images/kompas/pary.png',
  Práca: '/images/kompas/praca.png',
  Priatelia: '/images/kompas/priatelia.png',
  'Citlivé témy': '/images/kompas/citlive.png',
}

interface KompasItem {
  group: string
  topic: string
  subtopic: string
  phrases: string[]
}

function SubtopicCard({ item }: { item: KompasItem }) {
  const [mode, setMode] = useState<'all' | 'step'>('all')
  const [visibleCount, setVisibleCount] = useState(1)

  const phrasesToShow =
    mode === 'all' ? item.phrases : item.phrases.slice(0, visibleCount)

  return (
    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-6 transition hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-foreground">{item.subtopic}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              mode === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Všetky
          </button>
          <button
            onClick={() => {
              setMode('step')
              setVisibleCount(1)
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              mode === 'step'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Postupne
          </button>
        </div>
      </div>

      {item.phrases.length > 0 ? (
        <div className="space-y-4">
          {phrasesToShow.map((phrase, i) => (
            <div
              key={i}
              className={`flex ${
                i % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  i % 2 === 0
                    ? 'bg-primary/10 text-foreground rounded-bl-none border border-primary/20'
                    : 'bg-accent/30 text-foreground rounded-br-none border border-accent/30'
                }`}
              >
                {phrase}
              </div>
            </div>
          ))}

          {mode === 'step' && visibleCount < item.phrases.length && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisibleCount(visibleCount + 1)}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition"
              >
                Ďalšia veta →
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground italic text-center">
          (Obsah zatiaľ čaká na doplnenie)
        </p>
      )}
    </div>
  )
}

export default function Kompas() {
  const groups = Array.from(new Set(KOMPAS_DATA.map((item) => item.group)))
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const topics = selectedGroup
    ? Array.from(
        new Set(
          KOMPAS_DATA.filter((item) => item.group === selectedGroup).map(
            (item) => item.topic
          )
        )
      )
    : []

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const subtopics =
    selectedGroup && selectedTopic
      ? KOMPAS_DATA.filter(
          (item) => item.group === selectedGroup && item.topic === selectedTopic
        )
      : []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            Komunikačný nástroj
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Komunikačný <span className="italic font-serif text-primary">kompas</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Praktické vety a kroky, keď nevieš, ako začať rozhovor. Vyber si pre koho, zvoľ tému a
            otvor konkrétnu situáciu.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Group selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => {
                setSelectedGroup(group)
                setSelectedTopic(null)
              }}
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                selectedGroup === group
                  ? 'border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10'
                  : 'border-border/40 hover:border-primary/40 hover:shadow-md'
              }`}
            >
              <div className="w-full aspect-video overflow-hidden bg-muted">
                <img
                  src={groupImages[group] || '/images/kompas/default.png'}
                  alt={group}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center font-semibold text-foreground bg-card">
                {group}
              </div>
            </button>
          ))}
        </div>

        {/* Children safety block */}
        {selectedGroup === 'Deti' && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 mb-10 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">
              Ak je ti ťažko, nie si na to sám ❤️
            </h2>
            <p className="text-destructive/80 mb-4">
              Ak máš pocit, že to nezvládaš, skús sa porozprávať s niekým, komu veríš.{' '}
              Alebo sa môžeš obrátiť na odbornú pomoc:
            </p>
            <ul className="space-y-2 text-foreground font-medium">
              <li>
                ☎️ <a href="tel:116111" className="underline hover:text-primary transition">Linka detskej istoty – 116 111</a>
              </li>
              <li>
                💬{' '}
                <a href="https://ipcko.sk" target="_blank" className="underline hover:text-primary transition">
                  IPčko – online chat a e-mailová poradňa
                </a>
              </li>
              <li>
                🌿 <a href="tel:0800800566" className="underline hover:text-primary transition">Nezábudka – linka dôvery 0800 800 566</a>
              </li>
            </ul>
          </div>
        )}

        {/* Topic selection */}
        {selectedGroup && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selectedTopic === topic
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                    : 'bg-card border-border/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        {/* Subtopics */}
        {selectedGroup && selectedTopic && (
          <div>
            <div className="mb-8">
              <img
                src={groupImages[selectedGroup]}
                alt={selectedGroup}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {subtopics.map((item, idx) => (
                <SubtopicCard key={idx} item={item} />
              ))}
            </div>
          </div>
        )}

        {!selectedGroup && (
          <p className="text-center text-muted-foreground mt-12 text-lg">
            Vyber si, s kým chceš lepšie komunikovať 👆
          </p>
        )}
      </div>
    </div>
  )
}
