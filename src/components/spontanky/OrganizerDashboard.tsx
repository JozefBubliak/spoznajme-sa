'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { SpontankaDetail, PrinesItem, Stav } from '@/lib/spontanky/types'

const NOTIF_TEMPLATES = [
  {
    title: 'Zmena detailov',
    sub: 'Informuj o zmene času, miesta alebo dôležitých detailov.',
    text: 'Ahojte! Malá zmena — posúvame začiatok o 30 minút. Miesto ostáva rovnaké. Tešíme sa!',
  },
  {
    title: 'Pripomienka pred akciou',
    sub: 'Zaslaž deň pred alebo ráno v deň akcie.',
    text: 'Ahojte! Zajtra sa vidíme. Nezabudnite deku a dobrú náladu. Tešíme sa na vás!',
  },
  {
    title: 'Výzva k Prinášam zoznamu',
    sub: 'Upozorni účastníkov na voľné položky.',
    text: 'Niektoré položky v zozname Prinášam ešte nemajú nosiča — kto môže prísť na pomoc? Stačí kliknúť v zozname. Ďakujeme!',
  },
  {
    title: 'Vlastná správa',
    sub: 'Čokoľvek čo chceš povedať všetkým naraz.',
    text: '',
  },
]

function Section({ title, children, defaultOpen = false, id }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean; id?: string
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section id={id} className="scroll-mt-24 rounded-xl border overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center px-4 py-3 bg-muted/50 hover:bg-muted transition-colors text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </section>
  )
}

function FieldInput({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  )
}

export function OrganizerDashboard({
  initial,
  lang,
  baseUrl,
}: {
  initial: SpontankaDetail
  lang: string
  baseUrl: string
}) {
  const sp = initial
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  // ── Stats ──
  const pridem = initial.ucastnici.filter(u => u.status === 'pridem').length
  const mozno = initial.ucastnici.filter(u => u.status === 'mozno').length
  const nepridem = initial.ucastnici.filter(u => u.status === 'nepridem').length
  const volnePrinesiem = initial.prinesiem.filter(i => !i.claimed_by_participant_id).length

  // ── Edit state ──
  const [nazov, setNazov] = useState(sp.nazov)
  const [datum, setDatum] = useState(sp.datum)
  const [cas, setCas] = useState(sp.cas)
  const [popis, setPopis] = useState(sp.popis)
  const [miestoHlavne, setMiestoHlavne] = useState(sp.miesto_hlavne_nazov)
  const [miestoZraz, setMiestoZraz] = useState(sp.miesto_zraz_nazov)
  const [miestoZrazCas, setMiestoZrazCas] = useState(sp.miesto_zraz_cas)
  const [pocet, setPocet] = useState(sp.ocakavany_pocet)
  const [viditelnost, setViditelnost] = useState(sp.viditelnost)
  const [savingEdit, setSavingEdit] = useState(false)

  const saveEdit = async (fields: Record<string, unknown>) => {
    setSavingEdit(true)
    const res = await fetch(`/api/spontanky/${sp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    setSavingEdit(false)
    if (res.ok) showToast('Uložené ✓')
    else showToast('Chyba pri ukladaní')
  }

  // ── Prinesiem management ──
  const [prinesiem, setPrinesiem] = useState<PrinesItem[]>(initial.prinesiem)
  const [newPrinesNazov, setNewPrinesNazov] = useState('')
  const [addingPrines, setAddingPrines] = useState(false)

  const addPrinesItem = async () => {
    if (!newPrinesNazov.trim()) return
    setAddingPrines(true)
    const res = await fetch(`/api/spontanky/${sp.id}/prinesiem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nazov: newPrinesNazov.trim(), mnozstvo: '' }),
    })
    if (res.ok) {
      const data = await res.json()
      setPrinesiem(prev => [...prev, data.item])
      setNewPrinesNazov('')
    }
    setAddingPrines(false)
  }

  const deletePrinesItem = async (id: string) => {
    setPrinesiem(prev => prev.filter(i => i.id !== id))
    await fetch(`/api/spontanky/${sp.id}/prinesiem/${id}`, { method: 'DELETE' })
  }

  // ── Notifications ──
  const [selectedNotif, setSelectedNotif] = useState(0)
  const [notifText, setNotifText] = useState(NOTIF_TEMPLATES[0].text)
  const [sendingNotif, setSendingNotif] = useState(false)

  const sendNotif = async () => {
    if (!notifText.trim()) return
    setSendingNotif(true)
    const res = await fetch(`/api/spontanky/${sp.id}/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: notifText }),
    })
    setSendingNotif(false)
    if (res.ok) { showToast('Správa odoslaná ✓'); setNotifText('') }
    else showToast('Chyba pri odosielaní')
  }

  // ── Status management ──
  const [stav, setStav] = useState<Stav>(sp.stav as Stav)
  const [dovod, setDovod] = useState('')
  const [showCancelForm, setShowCancelForm] = useState(false)
  const [changingStav, setChangingStav] = useState(false)

  const changeStav = async (newStav: Stav, dovod_zrusenia?: string) => {
    setChangingStav(true)
    const res = await fetch(`/api/spontanky/${sp.id}/stav`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stav: newStav, dovod_zrusenia }),
    })
    setChangingStav(false)
    if (res.ok) {
      setStav(newStav)
      setShowCancelForm(false)
      showToast('Stav zmenený ✓')
    } else {
      showToast('Chyba')
    }
  }

  // ── Share ──
  const copyUrl = async () => {
    await navigator.clipboard.writeText(baseUrl)
    showToast('Link skopírovaný ✓')
  }

  const shareUrl = async () => {
    if (navigator.share) {
      await navigator.share({ title: sp.nazov, url: baseUrl })
      return
    }
    await copyUrl()
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const stavColors: Record<string, string> = {
    aktivna: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pozastavena: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    zrusena: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    ukoncena: 'bg-muted text-muted-foreground',
  }
  const stavLabels: Record<string, string> = {
    aktivna: '✓ Aktívna', pozastavena: '⏸ Pozastavená', zrusena: '✕ Zrušená', ukoncena: '✓ Ukončená',
  }

  const quickActions = [
    {
      title: 'Upraviť detaily',
      desc: 'Názov, čas, miesto, počet aj viditeľnosť na jednom mieste.',
      action: () => scrollToSection('sp-edit-basic'),
    },
    {
      title: 'Poslať správu',
      desc: 'Jedným klikom pripomenieš zmenu času alebo voľné veci v Prinášam.',
      action: () => scrollToSection('sp-notify'),
    },
    {
      title: 'QR a zdieľanie',
      desc: 'Link, WhatsApp aj QR kód pripravený na rýchle šírenie ďalej.',
      action: () => scrollToSection('sp-share'),
    },
    {
      title: 'Stav spontánky',
      desc: 'Pozastavenie, obnova, ukončenie alebo zrušenie s dôvodom.',
      action: () => scrollToSection('sp-status'),
    },
  ]

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(baseUrl)}`

  return (
    <div className="space-y-5 pb-12">

      {/* Header */}
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className={cn('inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-2', stavColors[stav])}>
              {stavLabels[stav]}
            </span>
            <h2 className="text-lg font-semibold leading-snug mb-1">{sp.nazov}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(sp.datum).toLocaleDateString('sk-SK', { weekday: 'short', day: 'numeric', month: 'long' })} · {sp.cas} · {sp.miesto_hlavne_nazov}
            </p>
          </div>
          <Link href={`/${lang}/komunita/spontanky/${sp.id}`}>
            <Button variant="outline" size="sm">Zobraziť →</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: pridem,   label: 'Príde',        color: 'text-green-600 dark:text-green-400' },
          { n: mozno,    label: 'Možno',         color: 'text-amber-600 dark:text-amber-400' },
          { n: nepridem, label: 'Nepríde',       color: 'text-muted-foreground' },
          { n: volnePrinesiem, label: 'Voľné v Prinášam', color: 'text-primary' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-3 text-center">
            <div className={cn('text-2xl font-bold mb-0.5', s.color)}>{s.n}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {quickActions.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={item.action}
            className="rounded-2xl border bg-card px-4 py-4 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="text-sm font-semibold text-foreground">{item.title}</div>
            <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Edit sections */}
      <Section id="sp-edit-basic" title="Základné údaje" defaultOpen>
        <div className="space-y-3">
          <FieldInput label="Názov" value={nazov} onChange={setNazov} />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput label="Dátum" value={datum} onChange={setDatum} type="date" />
            <FieldInput label="Čas" value={cas} onChange={setCas} type="time" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Popis</label>
            <textarea
              value={popis}
              onChange={e => setPopis(e.target.value)}
              rows={3}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>
          <FieldInput label="Očakávaný počet" value={pocet} onChange={setPocet} placeholder="10–20 ľudí" />
          <Button
            size="sm"
            disabled={savingEdit}
            onClick={() => saveEdit({ nazov, datum, cas, popis, ocakavany_pocet: pocet })}
          >
            {savingEdit ? 'Ukladám…' : 'Uložiť zmeny'}
          </Button>
        </div>
      </Section>

      <Section id="sp-edit-location" title="Miesto">
        <div className="space-y-3">
          <FieldInput label="Hlavný zraz" value={miestoHlavne} onChange={setMiestoHlavne} />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <FieldInput label="Druhý zraz (voliteľné)" value={miestoZraz} onChange={setMiestoZraz} />
            </div>
            <FieldInput label="Čas zrazu" value={miestoZrazCas} onChange={setMiestoZrazCas} type="time" />
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
            Zmena miesta odošle systémovú správu do chatu.
          </div>
          <Button
            size="sm"
            disabled={savingEdit}
            onClick={() => saveEdit({ miesto_hlavne_nazov: miestoHlavne, miesto_zraz_nazov: miestoZraz, miesto_zraz_cas: miestoZrazCas })}
          >
            {savingEdit ? 'Ukladám…' : 'Uložiť zmeny'}
          </Button>
        </div>
      </Section>

      <Section id="sp-visibility" title="Viditeľnosť">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {([
            { val: 'sukromne', icon: '🔒', label: 'Súkromné' },
            { val: 'okolie',   icon: '📍', label: 'Okolie' },
            { val: 'verejne',  icon: '🌍', label: 'Verejné' },
          ] as const).map(opt => (
            <button
              key={opt.val}
              onClick={() => setViditelnost(opt.val)}
              className={cn(
                'rounded-xl p-3 border text-center text-sm transition-all',
                viditelnost === opt.val ? 'border-primary bg-primary/5 font-medium' : 'border-border hover:border-primary/30',
              )}
            >
              <div className="text-lg mb-0.5">{opt.icon}</div>
              {opt.label}
            </button>
          ))}
        </div>
        <Button size="sm" disabled={savingEdit} onClick={() => saveEdit({ viditelnost })}>
          {savingEdit ? 'Ukladám…' : 'Uložiť'}
        </Button>
      </Section>

      <Section id="sp-bring" title="Zoznam Prinášam — správa">
        <div className="space-y-2 mb-3">
          {prinesiem.length === 0 && (
            <p className="text-sm text-muted-foreground">Žiadne položky</p>
          )}
          {prinesiem.map(item => (
            <div key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background text-sm">
              <span className="flex-1">{item.nazov}</span>
              {item.claimed_by_meno && (
                <span className="text-xs text-muted-foreground">{item.claimed_by_meno}</span>
              )}
              {!item.claimed_by_participant_id && (
                <button onClick={() => deletePrinesItem(item.id)} className="text-muted-foreground hover:text-destructive text-xs ml-1">✕</button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newPrinesNazov}
            onChange={e => setNewPrinesNazov(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPrinesItem() } }}
            placeholder="Pridať položku…"
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button size="sm" variant="outline" disabled={addingPrines || !newPrinesNazov.trim()} onClick={addPrinesItem}>
            {addingPrines ? '…' : 'Pridať'}
          </Button>
        </div>
        {volnePrinesiem > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            {volnePrinesiem} položiek ešte nemá potvrdeného nosiča. Hodí sa poslať pripomienku účastníkom.
          </p>
        )}
      </Section>

      {/* Notifications */}
      <Section id="sp-notify" title="Poslať správu účastníkom">
        <div className="space-y-2 mb-3">
          {NOTIF_TEMPLATES.map((t, i) => (
            <div
              key={i}
              onClick={() => { setSelectedNotif(i); setNotifText(t.text) }}
              className={cn(
                'rounded-xl border p-3 cursor-pointer transition-all',
                selectedNotif === i ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30',
              )}
            >
              <div className="text-sm font-medium mb-0.5">{t.title}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </div>
          ))}
        </div>
        <textarea
          value={notifText}
          onChange={e => setNotifText(e.target.value)}
          rows={3}
          placeholder="Text správy…"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none mb-2"
        />
        <Button size="sm" disabled={sendingNotif || !notifText.trim()} onClick={sendNotif}>
          {sendingNotif ? 'Odosielam…' : 'Odoslať všetkým'}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Správa ide naraz všetkým účastníkom a zároveň ostane viditeľná v chate ako organizačná stopa.
        </p>
      </Section>

      {/* Status */}
      <Section id="sp-status" title="Stav spontánky">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Aktuálny stav: <span className={cn('font-medium', stavColors[stav])}>{stavLabels[stav]}</span></p>

          <div className="rounded-xl bg-muted/40 px-3 py-3 text-xs leading-relaxed text-muted-foreground">
            Pozastavenie je mäkký stop stav pre neisté počasie alebo čakanie na potvrdenie. Zrušenie je finálny krok a
            odošle dôvod účastníkom. Ukončenie je vhodné po prebehlej akcii, keď chceš len uzavrieť organizáciu.
          </div>

          {stav === 'aktivna' && (
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" disabled={changingStav} onClick={() => changeStav('pozastavena')}>
                ⏸ Pozastaviť
              </Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5" disabled={changingStav} onClick={() => setShowCancelForm(true)}>
                ✕ Zrušiť
              </Button>
              <Button variant="outline" size="sm" disabled={changingStav} onClick={() => changeStav('ukoncena')}>
                ✓ Ukončiť
              </Button>
            </div>
          )}

          {stav === 'pozastavena' && (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={changingStav} onClick={() => changeStav('aktivna')}>
                ▶ Obnoviť
              </Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30" disabled={changingStav} onClick={() => setShowCancelForm(true)}>
                ✕ Zrušiť
              </Button>
            </div>
          )}

          {(stav === 'zrusena' || stav === 'ukoncena') && (
            <p className="text-sm text-muted-foreground">Spontánka je uzavretá.</p>
          )}

          {showCancelForm && (
            <div className="rounded-xl border p-4 space-y-3 bg-muted/30">
              <p className="text-sm font-medium text-destructive">Zrušiť spontánku</p>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Dôvod zrušenia (odošle sa účastníkom)</label>
                <input
                  value={dovod}
                  onChange={e => setDovod(e.target.value)}
                  placeholder="Napr: Zlé počasie, presúvame na iný termín…"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={changingStav}
                  onClick={() => changeStav('zrusena', dovod || undefined)}
                >
                  Potvrdiť zrušenie
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCancelForm(false)}>Späť</Button>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Share */}
      <Section id="sp-share" title="QR kód a zdieľanie">
        <div className="space-y-3">
          <div className="rounded-2xl border bg-muted/30 p-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={qrUrl}
                alt={`QR kód pre ${sp.nazov}`}
                className="h-40 w-40 rounded-xl border bg-white p-2"
              />
              <div>
                <p className="text-sm font-medium text-foreground">QR pripravený na zdieľanie</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Hodí sa na screenshot, vytlačenie alebo rýchle poslanie do skupiny.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
            <span className="text-xs text-muted-foreground flex-1 truncate">{baseUrl}</span>
            <button onClick={copyUrl} className="text-xs text-primary font-medium hover:underline shrink-0">Kopírovať</button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={shareUrl}>
              Zdieľať
            </Button>
            <Link href={`https://wa.me/?text=${encodeURIComponent(baseUrl)}`} target="_blank">
              <Button variant="outline" size="sm">WhatsApp</Button>
            </Link>
            <Link href={qrUrl} target="_blank">
              <Button variant="outline" size="sm">QR</Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            Stránka detailu aj správy sú už napojené, takže organizátor má jeden stabilný uzol na link, QR aj ďalšie kroky.
          </p>
        </div>
      </Section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  )
}
