'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Blok, OtazkaBlok, Pohlavie, TemaObsah } from '@/lib/dotaznik/obsah/typ'
import { gtext, nazovSkupiny } from '@/lib/dotaznik/obsah/typ'
import { splna } from '@/lib/dotaznik/podmienky'
import { prepniMoznost } from '@/lib/dotaznik/odpovede-ux'
import { zrkadlaTémy, zrkadloveSkupiny } from '@/lib/dotaznik/obsah/zrkadla'

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

// Jedna obrazovková dvojica = otázka na prijímanie na jednej strane a jej
// poskytovací protikus na druhej. Párové hodnoty sa spájajú podľa `v`, nikdy
// podľa pozície v dvoch nezávisle zalomených zoznamoch.
export function MirrorQuestion({ female, male, answers, active, showAll, save }: {
  female?: OtazkaBlok; male?: OtazkaBlok; answers: Record<Pohlavie, Odpovede>;
  active: Record<Pohlavie, boolean>; showAll: boolean;
  save: (p: Pohlavie, id: string, h: Hodnota) => void
}) {
  const blocks = { z: female, m: male }
  const sides = ['z', 'm'] as const
  const seen = new Set<string>()
  const values = [...(female?.moznosti ?? []), ...(male?.moznosti ?? [])]
    .filter(option => { if (seen.has(option.v)) return false; seen.add(option.v); return true })
    .map(option => option.v)
  const panel = (p: Pohlavie) => `min-w-0 rounded-xl border p-3 sm:p-4 ${FARBY[p].panel} ${active[p] ? '' : 'opacity-55'}`
  const current = (p: Pohlavie) => blocks[p] ? answers[p][blocks[p].id] ?? {} : {}
  const shown = (p: Pohlavie) => active[p] || showAll
  function choose(p: Pohlavie, v: string, row?: string) {
    const b = blocks[p]
    if (!b) return
    const h = current(p)
    if (row) {
      const rows = { ...((h.v as Record<string, string>) ?? {}) }
      if (rows[row] === v) delete rows[row]
      else rows[row] = v
      save(p, b.id, { v: rows })
    } else if (b.typ === 'viac') {
      const next = prepniMoznost(b, Array.isArray(h.v) ? h.v as string[] : [], v)
      save(p, b.id, { ...h, v: next, favorit: next.includes(h.favorit ?? '') ? h.favorit : undefined })
    } else save(p, b.id, { ...h, v: h.v === v ? '' : v })
  }
  function choice(p: Pohlavie, v: string, row?: string) {
    const b = blocks[p]
    if (!b) return <span className="text-xs italic text-amber-200/70">Bez zrkadlovej otázky</span>
    const found = (row ? b.stlpce : b.moznosti)?.find(option => option.v === v)
    if (!shown(p)) return <span className="text-xs text-muted-foreground/40">—</span>
    if (!found) return <span className="text-xs italic text-amber-200/70">Bez párovej možnosti</span>
    const h = current(p)
    const selected = row ? (h.v as Record<string, string> | undefined)?.[row] === v
      : b.typ === 'viac' ? Array.isArray(h.v) && h.v.includes(v) : h.v === v
    const label = gtext(found.label, p)
    return <div className="flex min-w-0 items-center gap-1">
      <button type="button" aria-pressed={!!selected} onClick={() => choose(p, v, row)}
        className={`w-full rounded-xl border px-3 py-2 text-left text-xs leading-relaxed transition ${selected ? FARBY[p].button : `border-white/15 bg-black/15 text-foreground/80 ${FARBY[p].hover}`}`}>{label}</button>
      {!row && b.typ === 'viac' && b.favoritPovoleny && selected && <button type="button"
        aria-label={`Favorit: ${label}`} aria-pressed={h.favorit === v}
        onClick={() => save(p, b.id, { ...h, favorit: h.favorit === v ? undefined : v })}
        className="rounded-lg px-2 py-1 text-rose-200">{h.favorit === v ? '♥' : '♡'}</button>}
    </div>
  }
  const grid = (render: (p: Pohlavie) => React.ReactNode) =>
    <div className="grid grid-cols-2 gap-2 sm:gap-3">{sides.map(p => <div key={p} className={panel(p)}>{render(p)}</div>)}</div>
  const heading = grid(p => !blocks[p] ? <p className="text-xs italic text-amber-200/70">Bez zrkadlovej otázky</p>
    : shown(p) ? <>
    <p className="text-sm font-medium leading-relaxed text-foreground">{gtext(blocks[p].text, p)}</p>
    {blocks[p].napoveda && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{gtext(blocks[p].napoveda, p)}</p>}
    {blocks[p].typ === 'viac' && <p className="mt-1 text-[11px] text-muted-foreground">Vyber viac možností{blocks[p].favoritPovoleny ? ' a označ favorita ♥' : ''}.</p>}
  </> : <p className="text-xs italic text-muted-foreground/60">Táto časť sa zobrazí po príslušnej odpovedi.</p>)
  const content = <div className="space-y-2">
    {heading}
    {(['jeden', 'skala', 'viac'].includes(female?.typ ?? male?.typ ?? '')) && values.map(v =>
      <div key={v}>{grid(p => choice(p, v))}</div>
    )}
    {(female?.inePovolene || male?.inePovolene) && grid(p => shown(p) && blocks[p]?.inePovolene ?
      <input value={current(p).ine ?? ''} onChange={e => save(p, blocks[p]!.id, { ...current(p), ine: e.target.value })}
        placeholder="Iné alebo doplnenie…" className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs outline-none focus:border-white/50" /> : null)}
    {(female?.typ ?? male?.typ) === 'text' && grid(p => shown(p) && blocks[p] ? <textarea
      value={typeof current(p).v === 'string' ? current(p).v as string : ''}
      onChange={e => save(p, blocks[p]!.id, { v: e.target.value })} rows={2} placeholder="Napíš voľne…"
      className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/50" /> : null)}
    {(female?.typ ?? male?.typ) === 'mrezka' && (female?.riadky ?? male?.riadky ?? []).map(row => <div key={row.v} className="space-y-2">
      {grid(p => shown(p) && blocks[p] ? <p className="text-xs font-medium">{gtext((blocks[p].riadky ?? []).find(r => r.v === row.v)?.label, p)}</p> : null)}
      {[...new Set([...(female?.stlpce ?? []), ...(male?.stlpce ?? [])].map(c => c.v))].map(v =>
        <div key={v}>{grid(p => choice(p, v, row.v))}</div>
      )}
    </div>)}
    {female?.id !== male?.id && <p className="px-1 text-[10px] text-muted-foreground/60">Zrkadlová dvojica: {female?.id ?? 'bez protikusu'} ⇄ {male?.id ?? 'bez protikusu'}</p>}
  </div>
  if (female?.zbalitelna || male?.zbalitelna) return <details>
    <summary className="grid cursor-pointer grid-cols-2 gap-2 text-sm font-medium text-foreground sm:gap-3">
      <span className="rounded-xl border border-rose-300/35 bg-rose-950/20 p-3">{female ? gtext(female.text, 'z') : 'Bez zrkadlovej otázky'}</span>
      <span className="rounded-xl border border-sky-300/35 bg-sky-950/20 p-3">{male ? gtext(male.text, 'm') : 'Bez zrkadlovej otázky'}</span>
    </summary>
    <div className="mt-2">{content}</div>
  </details>
  return content
}

function Side({ b, p, ans, showAll, parentActive }: { b: Blok; p: Pohlavie; ans: Odpovede; showAll: boolean; parentActive: boolean }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const visible = parentActive && splna(b.podmienka, ans, p)
  if (!visible && !showAll) return <p className="text-xs italic text-muted-foreground/60">Táto časť sa zobrazí po príslušnej odpovedi.</p>
  const dim = visible ? '' : 'opacity-55'
  if (b.druh === 'otazka') return null
  if (b.druh === 'text') return <div className={dim}>{b.zbalitelny ? <details><summary className="cursor-pointer text-sm font-medium">{G(b.nadpis)}</summary><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{G(b.telo)}</p></details> : <><p className="text-sm font-semibold">{G(b.nadpis)}</p><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{G(b.telo)}</p></>}</div>
  if (b.druh === 'tabulka') return <div className={`${dim} overflow-x-auto`}><p className="mb-2 text-sm font-semibold">{G(b.nadpis)}</p><table className="w-full text-xs"><thead><tr>{b.hlavicka.map((h, i) => <th key={i} className="border-b border-white/20 p-2 text-left">{G(h)}</th>)}</tr></thead><tbody>{b.riadky.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="border-b border-white/10 p-2 align-top">{G(cell)}</td>)}</tr>)}</tbody></table></div>
  return <div className={dim}><p className="text-sm font-semibold">{nazovSkupiny(b, ans, p)}</p>{b.uvod && <p className="mt-2 text-sm text-foreground/75">{G(b.uvod)}</p>}</div>
}

function Rows({ blocks, maleBlocks = blocks, path, tema, answers, save, notes, setNote, showAll, active = { z: true, m: true }, mirrors = new Map(), mirrorGroups = new Map() }: {
  blocks: Blok[]; maleBlocks?: Blok[]; path: string; tema: string; answers: Record<Pohlavie, Odpovede>;
  save: (p: Pohlavie, id: string, h: Hodnota) => void; notes: Poznamky; setNote: (key: string, value: string) => void; showAll: boolean;
  active?: Record<Pohlavie, boolean>; mirrors?: Map<string, OtazkaBlok>; mirrorGroups?: Map<string, Extract<Blok, { druh: 'skupina' }>>
}) {
  const usedMale = new Set<number>()
  const pairs: { female?: Blok; male?: Blok; index: number }[] = blocks.map((female, index) => {
    const targetId = female.druh === 'otazka' ? mirrors.get(female.id)?.id ?? female.id
      : female.druh === 'skupina' ? mirrorGroups.get(female.id)?.id ?? female.id : female.id
    const maleIndex = maleBlocks.findIndex((male, i) => !usedMale.has(i) && male.id === targetId && male.druh === female.druh)
    if (maleIndex >= 0) usedMale.add(maleIndex)
    return { female, male: maleIndex >= 0 ? maleBlocks[maleIndex] : undefined, index }
  })
  maleBlocks.forEach((male, index) => { if (!usedMale.has(index)) pairs.push({ male, index }) })
  return <div className="space-y-3">{pairs.map(({ female, male, index }) => {
    const key = female ? `${path}/${index}-${female.id}` : `${path}/m-${index}-${male?.id}`
    // Pri presune bloku do inej vetvy ponechaj viditeľnú aj staršiu Admin note.
    const noteId = female?.id ?? male?.id
    const noteValue = notes[key] ?? (noteId
      ? Object.entries(notes).find(([oldKey]) => oldKey.endsWith(`-${noteId}`))?.[1]
      : undefined) ?? ''
    const childActive = { z: !!female && active.z && splna(female.podmienka, answers.z, 'z'), m: !!male && active.m && splna(male.podmienka, answers.m, 'm') }
    const visible = showAll || childActive.z || childActive.m
    if (!visible) return null
    return <div key={key} id={key} data-zrkadlo-z={female?.druh === 'otazka' ? female.id : undefined}
      data-zrkadlo-m={male?.druh === 'otazka' ? male.id : undefined}
      className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.025] p-2 sm:p-3">
      {female?.druh === 'otazka' || male?.druh === 'otazka'
        ? <MirrorQuestion female={female?.druh === 'otazka' ? female : undefined}
          male={male?.druh === 'otazka' ? male : undefined} answers={answers} active={childActive} showAll={showAll} save={save} />
        : <div className="grid grid-cols-2 gap-2 sm:gap-3">{(['z', 'm'] as const).map(p => {
          const block = p === 'z' ? female : male
          return <div key={p} className={`min-w-0 rounded-xl border p-3 sm:p-5 ${FARBY[p].panel}`}>
            {block ? <Side b={block} p={p} ans={answers[p]} showAll={showAll} parentActive={active[p]} />
              : <p className="text-xs italic text-amber-200/70">Bez zrkadlovej časti</p>}
          </div>
        })}</div>}
      <Note tema={tema} blok={key} value={noteValue} onSaved={value => setNote(key, value)} />
      {(female?.druh === 'skupina' || male?.druh === 'skupina') && <div className="mt-3 border-l border-white/15 pl-2 sm:pl-4">
        <Rows blocks={female?.druh === 'skupina' ? female.bloky : []} maleBlocks={male?.druh === 'skupina' ? male.bloky : []}
          path={key} tema={tema} answers={answers} save={save} notes={notes} setNote={setNote} showAll={showAll}
          active={childActive} mirrors={mirrors} mirrorGroups={mirrorGroups} />
      </div>}
    </div>
  })}</div>
}

export default function PairedPreview({ tema }: { tema: TemaObsah }) {
  const trojky = tema.slug.startsWith('trojky-skupiny/trojka-')
  const trojScreening: OtazkaBlok[] = [
    {
      druh: 'otazka', id: 'troj_screening_admin', typ: 'jeden',
      text: 'Chceš preskúmať túto tému?',
      moznosti: [
        { v: 'ano', label: 'Áno — chcem preskúmať túto tému' },
        { v: 'neskor', label: 'Ešte nie — chcem sa k nej vrátiť neskôr, keď bude správny čas' },
        { v: 'nie', label: 'Nie — nechcem túto tému skúmať (trvalé uzamknutie)' },
      ],
    },
    {
      druh: 'otazka', id: 'troj_screening_dovod', typ: 'text',
      text: 'Dôvod v 1 vete (nepovinné; ak ho vyplníš, druhá osoba ho uvidí)',
      podmienka: { ot: 'troj_screening_admin', jeNiektora: ['neskor', 'nie'] },
    },
  ]
  const mirrors = useMemo(() => zrkadlaTémy(tema), [tema])
  const mirrorGroups = useMemo(() => zrkadloveSkupiny(tema), [tema])
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
      <span className="text-xs text-muted-foreground">Odpovede sú len miestna simulácia. Zrkadlové dvojice spájajú opačné roly podľa rovnakej hodnoty odpovede; ostatné otázky sú vlastné odpovede každého z dvojice. Stav uloženia Admin notes je pri každej poznámke.</span>
    </div>
    {notesError && <p role="alert" className="mb-4 text-sm text-amber-200">{notesError}</p>}
    <Note tema={tema.slug} blok="tema" value={notes.tema ?? ''} onSaved={value => setNote('tema', value)} />
    {([['uvod', tema.uvod], ['telo', tema.telo], ['zaver', tema.zaver ?? []]] as const).map(([id, blocks]) => blocks.length > 0 && <section key={id} className="mt-7">
      <h3 className="mb-3 border-b border-white/15 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">{id === 'uvod' ? 'Úvod' : id === 'telo' ? 'Otázky a vetvy' : 'Záver'}</h3>
      <Note tema={tema.slug} blok={id} value={notes[id] ?? ''} onSaved={value => setNote(id, value)} />
      {trojky && id === 'telo' && <div className="mt-3"><Rows blocks={trojScreening} path="screening" tema={tema.slug} answers={answers} save={save} notes={notes} setNote={setNote} showAll={showAll} /></div>}
      <div className="mt-3"><Rows blocks={blocks} path={id} tema={tema.slug} answers={answers} save={save} notes={notes} setNote={setNote} showAll={showAll} mirrors={mirrors} mirrorGroups={mirrorGroups}
        active={trojky && id === 'telo' ? { z: answers.z.troj_screening_admin?.v === 'ano', m: answers.m.troj_screening_admin?.v === 'ano' } : undefined} /></div>
    </section>)}
  </div>
}
