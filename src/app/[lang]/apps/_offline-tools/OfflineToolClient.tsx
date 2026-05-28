'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp, RefreshCw, Shuffle, Star } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { OfflineItem, OfflineTool } from './tools'

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function StepList({ item, accent }: { item: OfflineItem; accent: string }) {
  if (!item.steps?.length) return null
  return (
    <ol className="space-y-2">
      {item.steps.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span className={cx('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white bg-gradient-to-r', accent)}>
            {index + 1}
          </span>
          <span className="text-sm leading-relaxed text-slate-600">{step}</span>
        </li>
      ))}
    </ol>
  )
}

function ResultCard({ item, tool }: { item: OfflineItem; tool: OfflineTool }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70">
      <div className={cx('bg-gradient-to-r p-6 text-white', tool.theme)}>
        <div className="text-5xl">{item.emoji}</div>
        <h2 className="mt-3 text-3xl font-black">{item.title}</h2>
        <p className="mt-2 text-white/85">{item.desc}</p>
      </div>
      <div className="space-y-4 p-6">
        <StepList item={item} accent={tool.theme} />
        {item.why && (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
            <span className="font-bold">Prečo: </span>{item.why}
          </div>
        )}
      </div>
    </div>
  )
}

function IdeaTool({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  const ideas = tool.items
  const [name, setName] = useState('')
  const [likes, setLikes] = useState('')
  const [budget, setBudget] = useState('10-30 EUR')
  const [idea, setIdea] = useState<OfflineItem | null>(null)

  const generate = () => {
    const base = pickRandom(ideas)
    setIdea({
      ...base,
      desc: name.trim()
        ? `${base.desc} Prispôsob to pre ${name.trim()} a jej/jeho záujmy: ${likes || 'niečo jednoduché a osobné'}.`
        : base.desc,
      why: `Rozpočet: ${budget}. Najlepšie funguje, keď to pôsobí konkrétne a nie ako povinnosť.`,
    })
  }

  return (
    <main className={cx('min-h-screen bg-gradient-to-br', tool.bg)}>
      <ToolHeader tool={tool} lang={lang} />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70">
          <h2 className="text-xl font-black text-slate-900">Profil nápadu</h2>
          <p className="mt-1 text-sm text-slate-500">Stačí pár detailov. Dáta sa nikam neukladajú, slúžia len na okamžitý nápad.</p>
          <div className="mt-5 space-y-4">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Meno" className="w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200" />
            <textarea value={likes} onChange={e => setLikes(e.target.value)} placeholder="Čo má rád/rada? Jedlo, miesta, nálady, záujmy..." rows={3} className="w-full resize-none rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200" />
            <div className="flex flex-wrap gap-2">
              {['do 10 EUR', '10-30 EUR', '30-100 EUR', '100 EUR+'].map(option => (
                <button key={option} onClick={() => setBudget(option)} className={cx('rounded-xl px-4 py-2 text-sm font-bold transition', budget === option ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={generate} className={cx('flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-5 py-4 text-lg font-black text-white shadow-lg transition hover:brightness-105', tool.button)}>
          <Shuffle className="h-5 w-5" /> {idea ? 'Ďalší nápad' : 'Daj mi nápad'}
        </button>
        {idea ? <ResultCard item={idea} tool={tool} /> : <EmptyState tool={tool} />}
      </div>
    </main>
  )
}

function EmptyState({ tool }: { tool: OfflineTool }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white/70 p-10 text-center">
      <div className="text-6xl">{tool.icon}</div>
      <p className="mt-4 text-sm text-slate-500">{tool.emptyText}</p>
    </div>
  )
}

function ToolHeader({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  return (
    <header className={cx('bg-gradient-to-r px-4 py-5 text-white', tool.theme)}>
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <Link href={`/${lang}/apps`} className="rounded-xl p-2 transition hover:bg-white/10" aria-label="Späť na nástroje">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black">{tool.icon} {tool.title}</h1>
          <p className="text-sm text-white/75">{tool.subtitle}</p>
        </div>
      </div>
    </header>
  )
}

function RandomTool({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  const [filter, setFilter] = useState('all')
  const [budget, setBudget] = useState<string | null>(null)
  const [current, setCurrent] = useState<OfflineItem | null>(null)
  const [seen, setSeen] = useState<string[]>([])

  const pool = useMemo(() => tool.items.filter(item => {
    const catOk = filter === 'all' || item.cat === filter
    const budgetOk = !budget || String(item.budget) === budget
    return catOk && budgetOk
  }), [tool.items, filter, budget])

  const draw = () => {
    if (!pool.length) return
    const unseen = pool.filter(item => !seen.includes(item.title))
    const source = unseen.length ? unseen : pool
    const next = pickRandom(source)
    setCurrent(next)
    setSeen(prev => unseen.length ? [...prev, next.title] : [next.title])
  }

  return (
    <main className={cx('min-h-screen bg-gradient-to-br', tool.bg)}>
      <ToolHeader tool={tool} lang={lang} />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
        {tool.budgets && (
          <section>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Rozpočet</p>
            <div className="grid grid-cols-3 gap-3">
              {tool.budgets.map(option => (
                <button key={option.key} onClick={() => setBudget(budget === option.key ? null : option.key)} className={cx('rounded-2xl p-4 text-center text-sm font-bold transition', budget === option.key ? `bg-gradient-to-br ${option.color} text-white shadow-lg` : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50')}>
                  <span className="block">{option.label}</span>
                  <span className={cx('mt-1 block text-xs', budget === option.key ? 'text-white/80' : 'text-slate-400')}>{option.desc}</span>
                </button>
              ))}
            </div>
          </section>
        )}
        {tool.filters && (
          <div className="flex flex-wrap gap-2">
            {tool.filters.map(option => (
              <button key={option.key} onClick={() => { setFilter(option.key); setCurrent(null); }} className={cx('rounded-xl px-4 py-2 text-sm font-bold transition', filter === option.key ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50')}>
                {option.label}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Zobrazené: {seen.filter(title => pool.some(item => item.title === title)).length} / {pool.length}</span>
          {seen.length > 0 && <button onClick={() => { setSeen([]); setCurrent(null); }} className="inline-flex items-center gap-1 hover:text-slate-800"><RefreshCw className="h-3 w-3" /> Reset</button>}
        </div>
        <button onClick={draw} disabled={!pool.length} className={cx('flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-5 py-4 text-lg font-black text-white shadow-lg transition hover:brightness-105 disabled:opacity-50', tool.button)}>
          <Shuffle className="h-5 w-5" /> {current ? tool.nextAction : tool.primaryAction} <span className="text-sm text-white/65">({pool.length})</span>
        </button>
        {current ? <ResultCard item={current} tool={tool} /> : <EmptyState tool={tool} />}
      </div>
    </main>
  )
}

function MissionsTool({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  const [target, setTarget] = useState<'him' | 'her'>('him')
  const [mission, setMission] = useState<OfflineItem | null>(null)
  const [done, setDone] = useState<string[]>([])
  const list = target === 'him' ? tool.items : (tool.itemsAlt ?? tool.items)
  const available = list.filter(item => !done.includes(item.title))

  const draw = () => {
    const source = available.length ? available : list
    if (!available.length) setDone([])
    setMission(pickRandom(source))
  }

  return (
    <main className={cx('min-h-screen bg-gradient-to-br', tool.bg)}>
      <ToolHeader tool={tool} lang={lang} />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <div className="flex rounded-2xl border bg-white p-1 shadow-sm">
          <button onClick={() => { setTarget('him'); setMission(null); }} className={cx('flex-1 rounded-xl py-3 text-sm font-black transition', target === 'him' ? 'bg-amber-500 text-white shadow' : 'text-slate-500 hover:bg-slate-50')}>🧔 Misia pre neho</button>
          <button onClick={() => { setTarget('her'); setMission(null); }} className={cx('flex-1 rounded-xl py-3 text-sm font-black transition', target === 'her' ? 'bg-amber-500 text-white shadow' : 'text-slate-500 hover:bg-slate-50')}>👩 Misia pre ňu</button>
        </div>
        <div className="text-center text-sm text-slate-500">Splnené dnes: {done.filter(title => list.some(item => item.title === title)).length} / {list.length}</div>
        <button onClick={draw} className={cx('flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r px-5 py-4 text-lg font-black text-white shadow-lg transition hover:brightness-105', tool.button)}>
          <Shuffle className="h-5 w-5" /> {mission ? tool.nextAction : tool.primaryAction}
        </button>
        {mission ? (
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70">
            <div className={cx('bg-gradient-to-r p-8 text-center text-white', tool.theme)}>
              <div className="text-7xl">{mission.emoji}</div>
              <p className="mt-4 text-lg font-black text-white/80">Tvoja misia dnes</p>
              <h2 className="text-3xl font-black">{mission.title}</h2>
            </div>
            <div className="space-y-5 p-6">
              <p className="text-center text-lg leading-relaxed text-slate-700">{mission.desc}</p>
              <button onClick={() => { setDone(prev => [...prev, mission.title]); setMission(null); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 py-3 font-bold text-green-700 transition hover:bg-green-100">
                <Star className="h-4 w-4" /> Splnené
              </button>
            </div>
          </div>
        ) : <EmptyState tool={tool} />}
      </div>
    </main>
  )
}

function LibraryTool({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const items = tool.items.filter(item => filter === 'all' || item.cat === filter)

  return (
    <main className={cx('min-h-screen bg-gradient-to-br', tool.bg)}>
      <ToolHeader tool={tool} lang={lang} />
      <div className="mx-auto max-w-xl space-y-6 px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {tool.filters?.map(option => (
            <button key={option.key} onClick={() => setFilter(option.key)} className={cx('rounded-xl px-3 py-2 text-sm font-bold transition', filter === option.key ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-50')}>
              {option.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {items.map(item => {
            const open = expanded === item.title
            return (
              <article key={item.title} className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <button onClick={() => setExpanded(open ? null : item.title)} className="flex w-full items-center gap-4 p-4 text-left">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-black text-slate-900">{item.title}</span>
                    <span className="block text-sm text-slate-500">{item.context ?? item.desc}</span>
                  </span>
                  {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>
                {open && (
                  <div className="space-y-4 border-t border-slate-100 p-5">
                    {item.minPlayers && <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.minPlayers}+ hráči · {item.duration}{item.usesPhone ? ' · krátko s telefónom' : ' · bez telefónu'}</p>}
                    <StepList item={item} accent={tool.theme} />
                    {item.soft && (
                      <div className="grid gap-3">
                        <Phrase label="Jemná veta" tone="green" value={item.soft} />
                        <Phrase label="Priama veta" tone="blue" value={item.direct} />
                        <Phrase label="Vyhnúť sa" tone="red" value={item.avoid} />
                        <Phrase label="Otázka na pokračovanie" tone="amber" value={item.question} />
                      </div>
                    )}
                    {item.note && <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">💡 {item.note}</p>}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

function Phrase({ label, value, tone }: { label: string; value?: string; tone: 'green' | 'blue' | 'red' | 'amber' }) {
  if (!value) return null
  const tones = {
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
  }
  return (
    <div>
      <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className={cx('rounded-2xl px-4 py-3 text-sm italic leading-relaxed', tones[tone])}>{value}</p>
    </div>
  )
}

export default function OfflineToolClient({ tool, lang }: { tool: OfflineTool; lang: Locale }) {
  if (tool.kind === 'missions') return <MissionsTool tool={tool} lang={lang} />
  if (tool.kind === 'library') return <LibraryTool tool={tool} lang={lang} />
  if (tool.kind === 'ideas') return <IdeaTool tool={tool} lang={lang} />
  return <RandomTool tool={tool} lang={lang} />
}
