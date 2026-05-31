'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Coffee,
  Gift,
  Heart,
  Lightbulb,
  LockKeyhole,
  MapPin,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
} from 'lucide-react'
import type { Locale } from '@/i18n/config'

const STORAGE_KEY = 'deeptalks_nezabudni_workspace_v1'

type Tab = 'today' | 'profile' | 'dates' | 'gifts' | 'date'
type Budget = 'free' | 'small' | 'medium' | 'special'
type Energy = 'low' | 'normal' | 'evening'

interface Profile {
  name: string
  flowers: string
  drink: string
  food: string
  place: string
  hardDayHelp: string
  avoidGifts: string
}

interface RelationshipDate {
  id: string
  label: string
  date: string
  note: string
}

interface GiftNote {
  id: string
  title: string
  note: string
  budget: Budget
}

interface CompletedAction {
  id: string
  title: string
  completedAt: string
}

interface Workspace {
  profile: Profile
  dates: RelationshipDate[]
  gifts: GiftNote[]
  completedActions: CompletedAction[]
}

interface Idea {
  title: string
  detail: string
  budget: Budget
  energy: Energy
}

const EMPTY_PROFILE: Profile = {
  name: '',
  flowers: '',
  drink: '',
  food: '',
  place: '',
  hardDayHelp: '',
  avoidGifts: '',
}

const EMPTY_WORKSPACE: Workspace = {
  profile: EMPTY_PROFILE,
  dates: [],
  gifts: [],
  completedActions: [],
}

const gestures: Idea[] = [
  {
    title: 'Správa bez praktického dôvodu',
    detail: 'Napíš {name}, čo si na nej v posledných dňoch všimol a ocenil. Jedna konkrétna veta stačí.',
    budget: 'free',
    energy: 'low',
  },
  {
    title: 'Jej obľúbený nápoj',
    detail: 'Prines alebo priprav jej obľúbený nápoj bez otázok a bez veľkého oznamovania.',
    budget: 'small',
    energy: 'low',
  },
  {
    title: 'Odľahči jej večer',
    detail: 'Vyber jednu drobnú povinnosť, ktorú dnes urobíš namiesto nej skôr, ako o to požiada.',
    budget: 'free',
    energy: 'normal',
  },
  {
    title: 'Krátka prechádzka vo dvojici',
    detail: 'Navrhni 20 minút bez telefónov. Nejde o výkon, iba o priestor na obyčajný rozhovor.',
    budget: 'free',
    energy: 'normal',
  },
  {
    title: 'Malé prekvapenie',
    detail: 'Vyber drobnosť, ktorá súvisí s niečím, čo spomenula v posledných dňoch.',
    budget: 'small',
    energy: 'normal',
  },
  {
    title: 'Večer podľa nej',
    detail: 'Priprav jednoduchý večer okolo toho, čo má rada: jedlo, miesto alebo pokojný program.',
    budget: 'medium',
    energy: 'evening',
  },
]

const weeklyMissions = [
  'Naplánuj jeden spoločný večer a vezmi na seba všetky praktické detaily.',
  'Trikrát počas týždňa pomenuj jednu konkrétnu vec, ktorú na nej oceňuješ.',
  'Vráť sa k jednej veci, ktorú nedávno spomenula, a ukáž, že si ju naozaj počul.',
  'Doprajte si aspoň 30 minút bez obrazoviek, úloh a organizačných tém.',
]

const dateIdeas: Idea[] = [
  {
    title: 'Káva a otázka, na ktorú bežne nezostane čas',
    detail: 'Vyberte si pokojné miesto a každý odpovedzte na jednu otázku zo Spoznajme sa.',
    budget: 'small',
    energy: 'normal',
  },
  {
    title: 'Prechádzka po známom mieste',
    detail: 'Vráťte sa tam, kde máte spoločnú spomienku. Telefóny nechajte vo vrecku.',
    budget: 'free',
    energy: 'low',
  },
  {
    title: 'Domáce mini rande',
    detail: 'Priprav obľúbené jedlo, tlmené svetlo a jednu hodinu bez seriálu aj domácich úloh.',
    budget: 'small',
    energy: 'evening',
  },
  {
    title: 'Nové miesto v meste',
    detail: 'Vyber podnik alebo zákutie, kde ste ešte neboli. Program nech je jednoduchý.',
    budget: 'medium',
    energy: 'evening',
  },
  {
    title: 'Výlet bez naháňania',
    detail: 'Naplánuj pol dňa na jednom mieste s jedlom a časovou rezervou. Menej bodov, viac pokoja.',
    budget: 'special',
    energy: 'evening',
  },
]

const budgetLabels: Record<Budget, string> = {
  free: '0 €',
  small: 'do 20 €',
  medium: 'do 60 €',
  special: 'špeciálne',
}

const inputClass =
  'w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary/50'

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function pickNext<T>(items: T[], current?: T) {
  const available = items.filter((item) => item !== current)
  return available[Math.floor(Math.random() * available.length)] ?? items[0]
}

function personalize(text: string, name: string) {
  return text.split('{name}').join(name.trim() || 'jej')
}

function daysUntil(value: string) {
  if (!value) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${value}T00:00:00`)
  if (Number.isNaN(target.getTime())) return null
  target.setFullYear(today.getFullYear())
  if (target < today) target.setFullYear(target.getFullYear() + 1)
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000)
}

function loadWorkspace(): Workspace {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<Workspace>
    return {
      profile: { ...EMPTY_PROFILE, ...(stored.profile ?? {}) },
      dates: Array.isArray(stored.dates) ? stored.dates : [],
      gifts: Array.isArray(stored.gifts) ? stored.gifts : [],
      completedActions: Array.isArray(stored.completedActions) ? stored.completedActions : [],
    }
  } catch {
    return EMPTY_WORKSPACE
  }
}

function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-3xl border border-border/60 bg-card/80 p-5 sm:p-6 ${className}`}>
      {children}
    </section>
  )
}

export default function NezabudniClient({ lang }: { lang: Locale }) {
  const [tab, setTab] = useState<Tab>('today')
  const [workspace, setWorkspace] = useState<Workspace>(EMPTY_WORKSPACE)
  const [ready, setReady] = useState(false)
  const [idea, setIdea] = useState<Idea>(gestures[0])
  const [dateIdea, setDateIdea] = useState<Idea>(dateIdeas[0])
  const [dateBudget, setDateBudget] = useState<Budget>('free')
  const [dateEnergy, setDateEnergy] = useState<Energy>('low')
  const [dateDraft, setDateDraft] = useState({ label: '', date: '', note: '' })
  const [giftDraft, setGiftDraft] = useState({ title: '', note: '', budget: 'small' as Budget })

  useEffect(() => {
    setWorkspace(loadWorkspace())
    setIdea(pickNext(gestures))
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace))
  }, [ready, workspace])

  const upcomingDates = useMemo(
    () =>
      workspace.dates
        .map((item) => ({ ...item, days: daysUntil(item.date) }))
        .sort((a, b) => (a.days ?? 9999) - (b.days ?? 9999)),
    [workspace.dates],
  )
  const weeklyMission = weeklyMissions[workspace.completedActions.length % weeklyMissions.length]

  function updateProfile(field: keyof Profile, value: string) {
    setWorkspace((current) => ({
      ...current,
      profile: { ...current.profile, [field]: value },
    }))
  }

  function completeIdea() {
    setWorkspace((current) => ({
      ...current,
      completedActions: [
        {
          id: uid(),
          title: idea.title,
          completedAt: new Date().toISOString(),
        },
        ...current.completedActions,
      ].slice(0, 12),
    }))
    setIdea(pickNext(gestures, idea))
  }

  function addDate() {
    if (!dateDraft.label.trim() || !dateDraft.date) return
    setWorkspace((current) => ({
      ...current,
      dates: [...current.dates, { id: uid(), ...dateDraft }],
    }))
    setDateDraft({ label: '', date: '', note: '' })
  }

  function addGift() {
    if (!giftDraft.title.trim()) return
    setWorkspace((current) => ({
      ...current,
      gifts: [{ id: uid(), ...giftDraft }, ...current.gifts],
    }))
    setGiftDraft({ title: '', note: '', budget: 'small' })
  }

  function removeDate(id: string) {
    setWorkspace((current) => ({
      ...current,
      dates: current.dates.filter((item) => item.id !== id),
    }))
  }

  function removeGift(id: string) {
    setWorkspace((current) => ({
      ...current,
      gifts: current.gifts.filter((item) => item.id !== id),
    }))
  }

  function generateDate() {
    const filtered = dateIdeas.filter(
      (item) => item.budget === dateBudget && item.energy === dateEnergy,
    )
    setDateIdea(pickNext(filtered.length > 0 ? filtered : dateIdeas, dateIdea))
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'today', label: 'Dnes', icon: <Lightbulb className="h-4 w-4" /> },
    { key: 'profile', label: 'Profil', icon: <Heart className="h-4 w-4" /> },
    { key: 'dates', label: 'Dátumy', icon: <CalendarDays className="h-4 w-4" /> },
    { key: 'gifts', label: 'Darčeky', icon: <Gift className="h-4 w-4" /> },
    { key: 'date', label: 'Rande', icon: <MapPin className="h-4 w-4" /> },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link
          href={`/${lang}/apps`}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Nástroje
        </Link>

        <header className="mt-6 rounded-3xl border border-rose-400/20 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_55%)] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
              Nezabudni na ňu
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5" />
              súkromné lokálne uloženie
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Menej improvizácie. Viac malých vecí, ktoré ukazujú, že ju naozaj vnímaš.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Praktický zápisník pre gestá, dôležité dátumy, darčekové poznámky a rande.
            Údaje v tejto verzii zostávajú iba v tvojom prehliadači.
          </p>
        </header>

        <nav className="mt-5 grid grid-cols-5 gap-1 rounded-2xl border border-border/60 bg-card/80 p-1.5">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition sm:flex-row sm:justify-center sm:gap-2 sm:text-xs ${
                tab === item.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-background/80 hover:text-foreground'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {tab === 'today' && (
            <>
              <div className="grid gap-5 lg:grid-cols-[1.4fr_0.85fr]">
                <Panel className="border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    <Sparkles className="h-4 w-4" />
                    Dnešný nápad
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-foreground">{idea.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {personalize(idea.detail, workspace.profile.name)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border border-border/70 bg-background/50 px-3 py-1">
                      {budgetLabels[idea.budget]}
                    </span>
                    <span className="rounded-full border border-border/70 bg-background/50 px-3 py-1">
                      {idea.energy === 'low' ? 'do 5 minút' : idea.energy === 'normal' ? 'pokojný moment' : 'večer'}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={completeIdea}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      <Check className="h-4 w-4" />
                      Hotovo
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdea(pickNext(gestures, idea))}
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Iný nápad
                    </button>
                  </div>
                </Panel>

                <Panel>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Týždenná misia
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">{weeklyMission}</p>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Jedna úloha na celý týždeň. Bez bodovania a bez tlaku.
                  </p>
                </Panel>
              </div>

              <Panel>
                <div className="flex items-start gap-3">
                  <Coffee className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h2 className="font-semibold text-foreground">Keď má ťažký deň</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {workspace.profile.hardDayHelp.trim()
                        ? workspace.profile.hardDayHelp
                        : 'Do profilu si môžeš uložiť, čo jej v náročný deň reálne pomáha. Nie každý potrebuje radu; niekedy stačí pokoj, čaj alebo praktická pomoc.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setTab('profile')}
                      className="mt-3 text-xs font-semibold text-primary hover:underline"
                    >
                      {workspace.profile.hardDayHelp.trim() ? 'Upraviť poznámku' : 'Doplniť do profilu'}
                    </button>
                  </div>
                </div>
              </Panel>

              {workspace.completedActions.length > 0 && (
                <Panel>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Posledné splnené gestá
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {workspace.completedActions.slice(0, 4).map((action) => (
                      <div key={action.id} className="rounded-2xl border border-border/60 bg-background/50 p-4">
                        <p className="text-sm font-medium text-foreground">{action.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(action.completedAt).toLocaleDateString('sk-SK')}
                        </p>
                      </div>
                    ))}
                  </div>
                </Panel>
              )}
            </>
          )}

          {tab === 'profile' && (
            <Panel>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Profil partnerky</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Malá pamäťová pomôcka, nie hodnotenie človeka.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['name', 'Meno alebo prezývka', 'Ako ju oslovuješ?'],
                  ['flowers', 'Obľúbené kvety', 'Napr. pivonky'],
                  ['drink', 'Obľúbený nápoj', 'Káva, čaj, víno...'],
                  ['food', 'Jedlo alebo maškrta', 'Čo ju poteší?'],
                  ['place', 'Miesto, kam rada chodí', 'Park, podnik, príroda...'],
                  ['avoidGifts', 'Čomu sa pri darčekoch vyhnúť', 'Čo jej nesedí?'],
                ].map(([field, label, placeholder]) => (
                  <label key={field} className="space-y-2 text-xs font-medium text-muted-foreground">
                    {label}
                    <input
                      value={workspace.profile[field as keyof Profile]}
                      onChange={(event) => updateProfile(field as keyof Profile, event.target.value)}
                      placeholder={placeholder}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-4 block space-y-2 text-xs font-medium text-muted-foreground">
                Čo jej pomáha, keď má ťažký deň?
                <textarea
                  value={workspace.profile.hardDayHelp}
                  onChange={(event) => updateProfile('hardDayHelp', event.target.value)}
                  placeholder="Napr. potrebuje najprv pokoj, potom čaj a objatie. Rady až keď sa opýta."
                  rows={4}
                  className={inputClass}
                />
              </label>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Save className="h-3.5 w-3.5 text-primary" />
                Zmeny sa ukladajú automaticky iba v tomto prehliadači.
              </p>
            </Panel>
          )}

          {tab === 'dates' && (
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Panel>
                <h2 className="text-xl font-semibold text-foreground">Pridať dôležitý dátum</h2>
                <div className="mt-5 space-y-4">
                  <input
                    value={dateDraft.label}
                    onChange={(event) => setDateDraft({ ...dateDraft, label: event.target.value })}
                    placeholder="Výročie, narodeniny..."
                    className={inputClass}
                  />
                  <input
                    type="date"
                    value={dateDraft.date}
                    onChange={(event) => setDateDraft({ ...dateDraft, date: event.target.value })}
                    className={inputClass}
                  />
                  <textarea
                    value={dateDraft.note}
                    onChange={(event) => setDateDraft({ ...dateDraft, note: event.target.value })}
                    placeholder="Krátka poznámka"
                    rows={3}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={addDate}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Pridať dátum
                  </button>
                </div>
              </Panel>
              <Panel>
                <h2 className="text-xl font-semibold text-foreground">Najbližšie dátumy</h2>
                <div className="mt-5 space-y-3">
                  {upcomingDates.length === 0 && (
                    <p className="text-sm text-muted-foreground">Zatiaľ tu nemáš žiadny uložený dátum.</p>
                  )}
                  {upcomingDates.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-4">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(`${item.date}T00:00:00`).toLocaleDateString('sk-SK')} ·{' '}
                          {item.days === 0 ? 'dnes' : `o ${item.days} dní`}
                        </p>
                        {item.note && <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>}
                      </div>
                      <button type="button" onClick={() => removeDate(item.id)} aria-label="Odstrániť dátum">
                        <Trash2 className="h-4 w-4 text-muted-foreground transition hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === 'gifts' && (
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <Panel>
                <h2 className="text-xl font-semibold text-foreground">Darčekový zápisník</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Zapíš si drobnosť hneď, keď ju spomenie. Neskôr nebudeš hádať.
                </p>
                <div className="mt-5 space-y-4">
                  <input
                    value={giftDraft.title}
                    onChange={(event) => setGiftDraft({ ...giftDraft, title: event.target.value })}
                    placeholder="Kniha, koncert, maličkosť..."
                    className={inputClass}
                  />
                  <textarea
                    value={giftDraft.note}
                    onChange={(event) => setGiftDraft({ ...giftDraft, note: event.target.value })}
                    placeholder="Kde si to spomínala? Aký variant?"
                    rows={3}
                    className={inputClass}
                  />
                  <select
                    value={giftDraft.budget}
                    onChange={(event) => setGiftDraft({ ...giftDraft, budget: event.target.value as Budget })}
                    className={inputClass}
                  >
                    {Object.entries(budgetLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addGift}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    <Plus className="h-4 w-4" />
                    Pridať poznámku
                  </button>
                </div>
              </Panel>
              <Panel>
                <h2 className="text-xl font-semibold text-foreground">Uložené nápady</h2>
                <div className="mt-5 space-y-3">
                  {workspace.gifts.length === 0 && (
                    <p className="text-sm text-muted-foreground">Zatiaľ tu nemáš žiadny darčekový nápad.</p>
                  )}
                  {workspace.gifts.map((gift) => (
                    <div key={gift.id} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-4">
                      <Gift className="mt-0.5 h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{gift.title}</p>
                          <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                            {budgetLabels[gift.budget]}
                          </span>
                        </div>
                        {gift.note && <p className="mt-2 text-xs text-muted-foreground">{gift.note}</p>}
                      </div>
                      <button type="button" onClick={() => removeGift(gift.id)} aria-label="Odstrániť darček">
                        <Trash2 className="h-4 w-4 text-muted-foreground transition hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          )}

          {tab === 'date' && (
            <Panel className="border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Rande plánovač</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Vyber rozpočet a energiu. Plánovač navrhne jeden zvládnuteľný program.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <select value={dateBudget} onChange={(event) => setDateBudget(event.target.value as Budget)} className={inputClass}>
                  {Object.entries(budgetLabels).map(([value, label]) => (
                    <option key={value} value={value}>Rozpočet: {label}</option>
                  ))}
                </select>
                <select value={dateEnergy} onChange={(event) => setDateEnergy(event.target.value as Energy)} className={inputClass}>
                  <option value="low">Energia: pokojná</option>
                  <option value="normal">Energia: bežná</option>
                  <option value="evening">Energia: celý večer</option>
                </select>
              </div>
              <div className="mt-5 rounded-2xl border border-border/60 bg-background/60 p-5">
                <p className="text-lg font-semibold text-foreground">{dateIdea.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dateIdea.detail}</p>
              </div>
              <button
                type="button"
                onClick={generateDate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                <RefreshCw className="h-4 w-4" />
                Navrhnúť rande
              </button>
            </Panel>
          )}

          <Panel className="border-primary/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Chceš aj párové prepojenie?</p>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
                  Nudge Engine pridáva spoločný cloudový režim: párovací kód, jazyky lásky,
                  históriu gest a prispôsobené tipy.
                </p>
              </div>
              <Link
                href={`/${lang}/apps/nudge`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Otvoriť Nudge Engine
                <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </main>
  )
}
