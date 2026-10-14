'use client'

import { useEffect, useState } from 'react'
import type { Blok, OtazkaBlok, Pohlavie, TemaObsah } from '@/lib/dotaznik/obsah/typ'
import { gtext } from '@/lib/dotaznik/obsah/typ'
import { splna } from '@/lib/dotaznik/podmienky'
import { prepniMoznost } from '@/lib/dotaznik/odpovede-ux'

type Hodnota = { v?: unknown; ine?: string; favorit?: string }
type Odpovede = Record<string, Hodnota>
type Poznamky = Record<string, string>
const localKey = (tema: string) => `dotaznik-admin-poznamky:${tema}`
function localNotes(tema: string): Poznamky {
  try { return JSON.parse(window.localStorage.getItem(localKey(tema)) ?? '{}') as Poznamky } catch { return {} }
}
function saveLocal(tema: string, blok: string, value: string) {
  window.localStorage.setItem(localKey(tema), JSON.stringify({ ...localNotes(tema), [blok]: value }))
}

const FARBY = {
  z: { panel: 'border-rose-300/35 bg-rose-950/20', title: 'text-rose-200', button: 'border-rose-300/40 bg-rose-300 text-rose-950', hover: 'hover:border-rose-300/60' },
  m: { panel: 'border-sky-300/35 bg-sky-950/20', title: 'text-sky-200', button: 'border-sky-300/40 bg-sky-300 text-sky-950', hover: 'hover:border-sky-300/60' },
} as const

function Note({ tema, blok, value, onSaved }: { tema: string; blok: string; value: string; onSaved: (value: string) => void }) {
  const [text, setText] = useState(value)
  const [state, setState] = useState('')
  useEffect(() => setText(value), [value, blok])
  async function save() {
    setState('Ukladám…')
    try {
      const res = await fetch('/api/dotaznik/admin-poznamky', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, blok, poznamka: text }),
      })
      if (!res.ok) throw new Error('save')
      onSaved(text)
      setState('Uložené')
    } catch {
      try { saveLocal(tema, blok, text); onSaved(text); setState('Uložené iba v tomto prehliadači') }
      catch { setState('Nepodarilo sa uložiť. Skús znova.') }
    }
  }
  return <details className="mt-2 rounded-xl border border-amber-300/25 bg-amber-300/5 px-3 py-2">
    <summary className="cursor-pointer text-xs font-semibold text-amber-200">Admin note {value ? '●' : '+'}</summary>
    <div className="mt-2">
      <label className="sr-only" htmlFor={`note-${blok}`}>Admin note</label>
      <textarea id={`note-${blok}`} value={text} onChange={e => { setText(e.target.value); setState('Neuložené') }} rows={3} maxLength={10000}
        className="w-full rounded-lg border border-amber-300/25 bg-background/80 p-3 text-sm text-foreground outline-none focus:border-amber-300/70" placeholder="Poznámka k tejto časti…" />
      <div className="mt-2 flex items-center gap-3"><button type="button" onClick={save} disabled={text === value}
        className="rounded-full bg-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-950 disabled:opacity-40">Uložiť poznámku</button>
        <span role="status" className="text-xs text-amber-100/70">{state}</span></div>
    </div>
  </details>
}

function Question({ b, p, ans, save }: { b: OtazkaBlok; p: Pohlavie; ans: Odpovede; save: (id: string, h: Hodnota) => void }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const h = ans[b.id] ?? {}
  const color = FARBY[p]
  const options = (b.moznosti ?? []).map(x => ({ v: x.v, label: G(x.label) }))
  function pick(v: string) {
    if (b.typ === 'viac') {
      const next = prepniMoznost(b, Array.isArray(h.v) ? h.v as string[] : [], v)
      save(b.id, { ...h, v: next, favorit: next.includes(h.favorit ?? '') ? h.favorit : undefined })
    } else save(b.id, { ...h, v })
  }
  return <div>
    <p className="text-sm font-medium leading-relaxed text-foreground">{G(b.text)}</p>
    {b.napoveda && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{G(b.napoveda)}</p>}
    {b.typ === 'viac' && <p className="mt-1 text-[11px] text-muted-foreground">Vyber viac možností{b.favoritPovoleny ? ' a označ favorita ♥' : ''}.</p>}
    {(b.typ === 'jeden' || b.typ === 'skala' || b.typ === 'viac') && <div className={`mt-3 ${b.typ === 'viac' ? 'flex flex-wrap gap-2' : 'space-y-2'}`}>
      {options.map(o => {
        const active = b.typ === 'viac' ? Array.isArray(h.v) && h.v.includes(o.v) : h.v === o.v
        return <div key={o.v} className="relative">
          <button type="button" aria-pressed={!!active} onClick={() => pick(o.v)}
            className={`rounded-xl border px-3 py-2 text-left text-xs transition ${b.typ === 'viac' ? '' : 'w-full'} ${active ? color.button : `border-white/15 bg-black/15 text-foreground/80 ${color.hover}`}`}>{o.label}</button>
          {b.favoritPovoleny && b.typ === 'viac' && active && <button type="button" aria-label={`Favorit: ${o.label}`} aria-pressed={h.favorit === o.v}
            onClick={() => save(b.id, { ...h, favorit: h.favorit === o.v ? undefined : o.v })} className="ml-1 rounded-lg px-2 py-1 text-rose-200">{h.favorit === o.v ? '♥' : '♡'}</button>}
        </div>
      })}
    </div>}
    {b.inePovolene && <input value={h.ine ?? ''} onChange={e => save(b.id, { ...h, ine: e.target.value })} placeholder="Iné alebo doplnenie…"
      className="mt-3 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs outline-none focus:border-white/50" />}
    {b.typ === 'text' && <textarea value={typeof h.v === 'string' ? h.v : ''} onChange={e => save(b.id, { v: e.target.value })} rows={2} placeholder="Napíš voľne…"
      className="mt-3 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/50" />}
    {b.typ === 'mrezka' && <div className="mt-3 space-y-3">{(b.riadky ?? []).map(r => <div key={r.v}>
      <p className="mb-1 text-xs text-muted-foreground">{G(r.label)}</p>
      <div className="flex flex-wrap gap-1">{(b.stlpce ?? []).map(c => {
        const selected = (h.v as Record<string, string> | undefined)?.[r.v] === c.v
        return <button key={c.v} type="button" aria-pressed={selected} onClick={() => save(b.id, { v: { ...((h.v as object) ?? {}), [r.v]: c.v } })}
          className={`rounded-lg border px-2 py-1 text-xs ${selected ? color.button : `border-white/15 ${color.hover}`}`}>{G(c.label)}</button>
      })}</div>
    </div>)}</div>}
    <p className="mt-3 text-[10px] text-muted-foreground/55">#{b.id}</p>
  </div>
}

function Side({ b, p, ans, save, showAll, parentActive }: { b: Blok; p: Pohlavie; ans: Odpovede; save: (id: string, h: Hodnota) => void; showAll: boolean; parentActive: boolean }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const visible = parentActive && splna(b.podmienka, ans, p)
  if (!visible && !showAll) return <p className="text-xs italic text-muted-foreground/60">Táto časť sa zobrazí po príslušnej odpovedi.</p>
  const dim = visible ? '' : 'opacity-55'
  if (b.druh === 'otazka') return <div className={dim}>{b.zbalitelna ? <details><summary className="cursor-pointer text-sm">{G(b.text)}</summary><div className="mt-3"><Question b={b} p={p} ans={ans} save={save} /></div></details> : <Question b={b} p={p} ans={ans} save={save} />}</div>
  if (b.druh === 'text') return <div className={dim}>{b.zbalitelny ? <details><summary className="cursor-pointer text-sm font-medium">{G(b.nadpis)}</summary><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{G(b.telo)}</p></details> : <><p className="text-sm font-semibold">{G(b.nadpis)}</p><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{G(b.telo)}</p></>}</div>
  if (b.druh === 'tabulka') return <div className={`${dim} overflow-x-auto`}><p className="mb-2 text-sm font-semibold">{G(b.nadpis)}</p><table className="w-full text-xs"><thead><tr>{b.hlavicka.map((h, i) => <th key={i} className="border-b border-white/20 p-2 text-left">{G(h)}</th>)}</tr></thead><tbody>{b.riadky.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-white/10 p-2 align-top">{G(cell)}</td>)}</tr>)}</tbody></table></div>
  return <div className={dim}><p className="text-sm font-semibold">{G(b.nadpis)}</p>{b.uvod && <p className="mt-2 text-sm text-foreground/75">{G(b.uvod)}</p>}</div>
}

function Rows({ blocks, path, tema, answers, save, notes, setNote, showAll, active = { z: true, m: true } }: {
  blocks: Blok[]; path: string; tema: string; answers: Record<Pohlavie, Odpovede>;
  save: (p: Pohlavie, id: string, h: Hodnota) => void; notes: Poznamky; setNote: (key: string, value: string) => void; showAll: boolean;
  active?: Record<Pohlavie, boolean>
}) {
  return <div className="space-y-3">{blocks.map((b, index) => {
    const key = `${path}/${index}-${b.id}`
    const childActive = { z: active.z && splna(b.podmienka, answers.z, 'z'), m: active.m && splna(b.podmienka, answers.m, 'm') }
    const visible = showAll || childActive.z || childActive.m
    if (!visible) return null
    return <div key={key} id={key} className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.025] p-2 sm:p-3">
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {(['z', 'm'] as const).map(p => <div key={p} className={`min-w-0 rounded-xl border p-3 sm:p-5 ${FARBY[p].panel}`}>
          <Side b={b} p={p} ans={answers[p]} save={(id, h) => save(p, id, h)} showAll={showAll} parentActive={active[p]} />
        </div>)}
      </div>
      <Note tema={tema} blok={key} value={notes[key] ?? ''} onSaved={value => setNote(key, value)} />
      {b.druh === 'skupina' && <div className="mt-3 border-l border-white/15 pl-2 sm:pl-4"><Rows blocks={b.bloky} path={key} tema={tema} answers={answers} save={save} notes={notes} setNote={setNote} showAll={showAll} active={childActive} /></div>}
    </div>
  })}</div>
}

export default function PairedPreview({ tema }: { tema: TemaObsah }) {
  const [answers, setAnswers] = useState<Record<Pohlavie, Odpovede>>({ z: {}, m: {} })
  const [notes, setNotes] = useState<Poznamky>({})
  const [notesError, setNotesError] = useState('')
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    let active = true
    fetch(`/api/dotaznik/admin-poznamky?tema=${encodeURIComponent(tema.slug)}`)
      .then(async r => { if (!r.ok) throw new Error('load'); return r.json() })
      .then(data => { if (active) { setNotes({ ...localNotes(tema.slug), ...Object.fromEntries((data.poznamky as { blok: string; poznamka: string }[]).map(n => [n.blok, n.poznamka])) }); setNotesError('') } })
      .catch(() => { if (active) { setNotes(localNotes(tema.slug)); setNotesError('Databázové poznámky zatiaľ nie sú dostupné. Zmeny sa ukladajú iba v tomto prehliadači.') } })
    return () => { active = false }
  }, [tema.slug])
  function save(p: Pohlavie, id: string, h: Hodnota) { setAnswers(a => ({ ...a, [p]: { ...a[p], [id]: h } })) }
  const setNote = (key: string, value: string) => setNotes(n => ({ ...n, [key]: value }))
  return <div>
    <div className="sticky top-12 z-20 mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-[#101013]/95 p-2 shadow-xl backdrop-blur sm:gap-3 sm:p-3">
      <div className="rounded-xl border border-rose-300/40 bg-rose-950/50 px-3 py-2 text-sm font-semibold text-rose-100">♀ Žena <span className="hidden font-normal text-rose-200/70 sm:inline">· jej vlastné odpovede</span></div>
      <div className="rounded-xl border border-sky-300/40 bg-sky-950/50 px-3 py-2 text-sm font-semibold text-sky-100">♂ Muž <span className="hidden font-normal text-sky-200/70 sm:inline">· jeho vlastné odpovede</span></div>
    </div>
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <button type="button" onClick={() => setShowAll(v => !v)} className="rounded-full border border-white/20 px-3 py-1.5 text-xs hover:border-amber-200">{showAll ? 'Skryť neaktívne vetvy' : 'Ukázať aj neaktívne vetvy'}</button>
      <button type="button" onClick={() => setAnswers({ z: {}, m: {} })} className="rounded-full border border-white/20 px-3 py-1.5 text-xs hover:border-amber-200">Resetovať odpovede</button>
      <span className="text-xs text-muted-foreground">Odpovede sú len miestna simulácia. Admin notes sa ukladajú trvalo.</span>
    </div>
    {notesError && <p role="alert" className="mb-4 text-sm text-amber-200">{notesError}</p>}
    <Note tema={tema.slug} blok="tema" value={notes.tema ?? ''} onSaved={value => setNote('tema', value)} />
    {([['uvod', tema.uvod], ['telo', tema.telo], ['zaver', tema.zaver ?? []]] as const).map(([id, blocks]) => blocks.length > 0 && <section key={id} className="mt-7">
      <h3 className="mb-3 border-b border-white/15 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">{id === 'uvod' ? 'Úvod' : id === 'telo' ? 'Otázky a vetvy' : 'Záver'}</h3>
      <Note tema={tema.slug} blok={id} value={notes[id] ?? ''} onSaved={value => setNote(id, value)} />
      <div className="mt-3"><Rows blocks={blocks} path={id} tema={tema.slug} answers={answers} save={save} notes={notes} setNote={setNote} showAll={showAll} /></div>
    </section>)}
  </div>
}
