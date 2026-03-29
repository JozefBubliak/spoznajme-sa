'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const CHIP_OPTIONS = [
  'piknik', 'opekačka', 'výlet', 'šport', 'bicykel', 'beh',
  'deti', 'rodiny', 'susedia', 'príroda', 'kultúra', 'hudba',
]

const PRINESIEM_SUGGESTIONS = [
  'Špekačky', 'Chlieb', 'Horčica', 'Koláče', 'Voda', 'Pivo',
  'Deka', 'Lopta', 'Frisbee', 'Gitara', 'Repelent', 'Opaľovací krém',
  'Vrecká na odpad', 'Lekárnička',
]

interface GatingWarning {
  level: 'red' | 'yellow' | 'info'
  text: string
}

function checkGating(data: {
  popis: string
  ocakavany_pocet: string
  miesto_hlavne_nazov: string
}): GatingWarning[] {
  const warnings: GatingWarning[] = []
  const text = (data.popis + ' ' + data.miesto_hlavne_nazov).toLowerCase()

  if (/vstupné|vstupom|predaj|predáva|lístok/.test(text)) {
    warnings.push({
      level: 'red',
      text: 'Spontánky sú zadarmo. Ak plánuješ vstupné alebo predaj, použi typ "Oficiálne podujatie".',
    })
  }
  if (/pódium|ozvučenie|sound|staging|ohňostroj|pyrotechnik/.test(text)) {
    warnings.push({
      level: 'yellow',
      text: 'Pódium a ozvučenie môžu vyžadovať povolenia od obce. Over to vopred.',
    })
  }
  if (/chko|národný park|tatry|np /.test(text)) {
    warnings.push({
      level: 'yellow',
      text: 'Chránené územie — over pravidlá vstupu a parkovania pred akciou.',
    })
  }

  const pocetNum = parseInt(data.ocakavany_pocet.replace(/\D.*/, '') || '0')
  if (pocetNum > 50) {
    warnings.push({
      level: 'yellow',
      text: 'Väčšie akcie (50+ ľudí) môžu vyžadovať ohlásenie na obci. Odporúčame overiť.',
    })
  }

  return warnings
}

interface PrinesItem {
  id: string
  nazov: string
  mnozstvo: string
}

export function CreateForm({ lang }: { lang: string }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [nazov, setNazov] = useState('')
  const [datum, setDatum] = useState('')
  const [cas, setCas] = useState('10:00')
  const [popis, setPopis] = useState('')
  const [typAktivity, setTypAktivity] = useState<string[]>([])
  const [preKoho, setPreKoho] = useState('')
  const [pocet, setPocet] = useState('')
  const [miestoHlavne, setMiestoHlavne] = useState('')
  const [miestoZraz, setMiestoZraz] = useState('')
  const [miestoZrazCas, setMiestoZrazCas] = useState('')
  const [viditelnost, setViditelnost] = useState<'sukromne' | 'okolie' | 'verejne'>('okolie')
  const [creatorMeno, setCreatorMeno] = useState('')
  const [prinesiem, setPrinesiem] = useState<PrinesItem[]>([])
  const [newItem, setNewItem] = useState('')
  const [newItemMnozstvo, setNewItemMnozstvo] = useState('')
  const [acceptDisclaimer, setAcceptDisclaimer] = useState(false)

  const warnings = checkGating({ popis, ocakavany_pocet: pocet, miesto_hlavne_nazov: miestoHlavne })
  const hasRedWarning = warnings.some(w => w.level === 'red')

  const toggleChip = (chip: string) => {
    setTypAktivity(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  const addPrinesItem = (nazovItem: string) => {
    if (!nazovItem.trim()) return
    setPrinesiem(prev => [...prev, { id: crypto.randomUUID(), nazov: nazovItem.trim(), mnozstvo: newItemMnozstvo.trim() }])
    setNewItem('')
    setNewItemMnozstvo('')
  }

  const removePrinesItem = (id: string) => setPrinesiem(prev => prev.filter(i => i.id !== id))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hasRedWarning) return
    if (!acceptDisclaimer) { setError('Musíš súhlasiť s disclaimerom'); return }

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/spontanky', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nazov,
          datum,
          cas,
          popis,
          typ_aktivity: typAktivity,
          pre_koho: preKoho,
          ocakavany_pocet: pocet,
          miesto_hlavne_nazov: miestoHlavne,
          miesto_zraz_nazov: miestoZraz,
          miesto_zraz_cas: miestoZrazCas,
          viditelnost,
          creator_meno: creatorMeno,
          prinesiem_items: prinesiem.map(({ nazov, mnozstvo }) => ({ nazov, mnozstvo })),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(Array.isArray(data.error) ? data.error.map((e: any) => e.message).join(', ') : (data.error ?? 'Chyba'))
        return
      }
      router.push(`/${lang}/komunita/spontanky/${data.id}`)
    } catch {
      setError('Chyba spojenia')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8 pb-12">

      {/* Gating warnings */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          {warnings.map((w, i) => (
            <div key={i} className={cn(
              'rounded-xl px-4 py-3 text-sm flex gap-2',
              w.level === 'red' && 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300 border border-red-200 dark:border-red-800',
              w.level === 'yellow' && 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
            )}>
              <span>{w.level === 'red' ? '🚫' : '⚠️'}</span>
              <span>{w.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Základné údaje */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Základné údaje</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Názov *</label>
            <input
              required
              value={nazov}
              onChange={e => setNazov(e.target.value)}
              placeholder="Rodinný výjazd do Hanisky"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Dátum *</label>
              <input
                required
                type="date"
                value={datum}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDatum(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Čas *</label>
              <input
                required
                type="time"
                value={cas}
                onChange={e => setCas(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Popis</label>
            <textarea
              rows={3}
              value={popis}
              onChange={e => setPopis(e.target.value)}
              placeholder="Rodičia s deťmi, otvorené aj pre nových ľudí. Vezmite deku, niečo pod zub..."
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Typ aktivity</label>
            <div className="flex flex-wrap gap-2">
              {CHIP_OPTIONS.map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleChip(chip)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    typAktivity.includes(chip)
                      ? 'bg-primary text-primary-foreground border-transparent'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/40',
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Pre koho</label>
              <input
                value={preKoho}
                onChange={e => setPreKoho(e.target.value)}
                placeholder="Rodičia s deťmi, susedia"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Očakávaný počet</label>
              <input
                value={pocet}
                onChange={e => setPocet(e.target.value)}
                placeholder="10–20 ľudí"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Tvoje meno (zobrazí sa pri spontánke) *</label>
            <input
              required
              value={creatorMeno}
              onChange={e => setCreatorMeno(e.target.value)}
              placeholder="Mária K."
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>
      </section>

      {/* Miesto */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Miesto a logistika</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Hlavný zraz — miesto *</label>
            <input
              required
              value={miestoHlavne}
              onChange={e => setMiestoHlavne(e.target.value)}
              placeholder="Parkovisko pri lese, Haniská"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-xs text-muted-foreground font-medium">Druhý zraz (voliteľné) — napr. pre cyklistov</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  value={miestoZraz}
                  onChange={e => setMiestoZraz(e.target.value)}
                  placeholder="Kaufland Prešov"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <input
                  type="time"
                  value={miestoZrazCas}
                  onChange={e => setMiestoZrazCas(e.target.value)}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Viditeľnosť */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">Viditeľnosť</h2>
        <div className="grid grid-cols-3 gap-3">
          {([
            { val: 'sukromne', icon: '🔒', label: 'Súkromné', sub: 'Len cez link/QR' },
            { val: 'okolie',   icon: '📍', label: 'Okolie',   sub: 'Vidí okolie a obec' },
            { val: 'verejne',  icon: '🌍', label: 'Verejné',  sub: 'Vidí každý' },
          ] as const).map(opt => (
            <button
              key={opt.val}
              type="button"
              onClick={() => setViditelnost(opt.val)}
              className={cn(
                'rounded-xl p-3 border text-left transition-all',
                viditelnost === opt.val
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border hover:border-primary/30',
              )}
            >
              <div className="text-xl mb-1">{opt.icon}</div>
              <div className="text-sm font-medium">{opt.label}</div>
              <div className="text-xs text-muted-foreground">{opt.sub}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Prinášam */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-1">Zoznam Prinášam</h2>
        <p className="text-xs text-muted-foreground mb-4">Čo by malo byť na akcii — účastníci si potom rozdelia.</p>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRINESIEM_SUGGESTIONS.filter(s => !prinesiem.find(i => i.nazov === s)).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setPrinesiem(prev => [...prev, { id: crypto.randomUUID(), nazov: s, mnozstvo: '' }])}
              className="px-2.5 py-1 rounded-full text-xs border border-dashed border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>

        {/* Added items */}
        {prinesiem.length > 0 && (
          <div className="space-y-2 mb-4">
            {prinesiem.map(item => (
              <div key={item.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-muted/40 text-sm">
                <span className="flex-1 font-medium">{item.nazov}</span>
                {item.mnozstvo && <span className="text-muted-foreground text-xs">{item.mnozstvo}</span>}
                <button
                  type="button"
                  onClick={() => removePrinesItem(item.id)}
                  className="text-muted-foreground hover:text-destructive ml-2 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Custom item */}
        <div className="flex gap-2">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPrinesItem(newItem) } }}
            placeholder="Pridať vlastnú položku..."
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            value={newItemMnozstvo}
            onChange={e => setNewItemMnozstvo(e.target.value)}
            placeholder="množstvo"
            className="w-24 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => addPrinesItem(newItem)}>Pridať</Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="rounded-xl border border-dashed p-4">
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Toto je neformálne stretnutie jednotlivcov, nie organizovaná verejná akcia. Nejde o právnu radu ani záväzný organizačný servis. Každý účastník koná ako jednotlivec a zodpovedá za seba a svoje deti. Jedlo, pitie a vybavenie si nesie každý sám alebo dobrovoľne zdieľa. Alkohol len pre dospelých, nie pre vodičov. Treba rešpektovať pravidlá miesta, nočný pokoj a pravidlá nakladania s odpadom. Ak sa akcia rozrastie, bude mať vstupné, ozvučenie alebo iné charakteristiky verejného podujatia, môžu platiť zákonné povinnosti.
        </p>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptDisclaimer}
            onChange={e => setAcceptDisclaimer(e.target.checked)}
            className="mt-0.5"
          />
          <span className="text-sm">Rozumiem a súhlasím s vyššie uvedenými podmienkami.</span>
        </label>
      </section>

      {error && (
        <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={saving || hasRedWarning || !acceptDisclaimer}
      >
        {saving ? 'Vytváram…' : 'Vytvoriť spontánku'}
      </Button>
    </form>
  )
}
