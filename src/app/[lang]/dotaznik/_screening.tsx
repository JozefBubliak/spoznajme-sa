'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { usePar } from './_par'
import { useStavy, partnerZamok, partnerDovod, najdiStav, ulozStav } from './_stav'
import { Krok, Volba } from './_ui'

export default function Screening({
  lang,
  modul,
  tema,
  nazov,
  spatHref,
  cielAno,
  cielEsteNie,
  cielNie,
  krok = 'Screening — bez tlaku',
  nadpis,
  lead,
  extra,
  neskorHref = '/dotaznik/moduly',
  neskorLabel = 'Rozhodnem sa neskôr — späť na moduly',
  zdielanieDovod = false,
}: {
  lang: string
  modul: string
  tema: string | null
  nazov: string
  spatHref: string
  cielAno: string
  cielEsteNie: string
  cielNie: string
  /** Nadradený rámec (napr. „Modul 8 — 🎭"). */
  krok?: string
  /** Prebije predvolenú otázku „Chceš skúmať „…"?". */
  nadpis?: string
  /** Prebije predvolené vysvetlenie zámku. */
  lead?: string
  /** Doplnkový obsah pod tlačidlami (napr. „Preskočiť na ďalší modul", info o zrkadlovej téme). */
  extra?: ReactNode
  neskorHref?: string
  neskorLabel?: string
  /** Pri „Ešte nie“ / „Nie“ ponúkne nastavenie zdieľania (len zámok, alebo aj dôvod v 1 vete). */
  zdielanieDovod?: boolean
}) {
  const router = useRouter()
  const { par, ready } = usePar()
  const { stavy, nacitane } = useStavy(par)
  const [busy, setBusy] = useState<string | null>(null)
  const [zamykam, setZamykam] = useState<'este_nie' | 'nie' | null>(null)
  const [dovod, setDovod] = useState('')

  const p = (s: string) => `/${lang}${s}`

  if (!ready || (par && !nacitane)) {
    return <Krok nadpis="Načítavam…" />
  }

  if (!par) {
    return (
      <Krok
        krok="Chýba pár"
        nadpis="Najprv si vytvor alebo otvor pár."
        lead="Screening sa ukladá k páru — bez neho sa nedá pokračovať."
        spat={{ href: p('/dotaznik/par'), label: 'Vytvoriť pár' }}
      >
        <Volba href={p('/dotaznik/par')} nazov="Prejsť na párovanie" ton="ano" />
      </Krok>
    )
  }

  const zamok = partnerZamok(stavy, par, modul, tema)
  const mojStav = najdiStav(stavy, par.slot, modul, tema)
  const dovodPartnera = partnerDovod(stavy, par, modul, tema)

  if (zamok) {
    return (
      <Krok
        krok="Zamknuté partnerom"
        nadpis={
          zamok === 'trvaly'
            ? `Druhá osoba túto oblasť skúmať nechce.`
            : `Druhá osoba pri tejto oblasti ešte váha.`
        }
        lead={
          zamok === 'trvaly'
            ? 'Téma „' + nazov + '" je pre vás uzavretá. Nezobrazí sa dôvod ani žiadne odpovede.'
            : 'Téma „' + nazov + '" je zatiaľ dočasne zamknutá. Skús to neskôr.'
        }
        spat={{ href: p(spatHref), label: 'Späť' }}
      >
        {dovodPartnera && (
          <p className="rounded-2xl border border-border/70 bg-card/40 p-4 text-sm text-foreground">
            Dôvod od druhej osoby: <span className="italic">„{dovodPartnera}“</span>
          </p>
        )}
        <Volba href={p('/dotaznik/moduly')} nazov="Späť na mapu modulov" />
      </Krok>
    )
  }

  async function zvol(stav: 'ano' | 'este_nie' | 'nie', ciel: string) {
    if (!par) return
    // Zámok s nastaviteľným zdieľaním: najprv ukáž možnosti, až „Potvrdiť“ uloží.
    if (zdielanieDovod && stav !== 'ano' && zamykam !== stav) {
      setZamykam(stav)
      return
    }
    setBusy(stav)
    await ulozStav(par, modul, tema, stav,
      zdielanieDovod && stav !== 'ano' ? { zdielanie: dovod.trim() ? 'aj_dovod' : 'len_zamok', dovod: dovod.trim() || undefined } : undefined)
    router.push(p(ciel))
  }

  return (
    <Krok
      krok={krok}
      nadpis={nadpis ?? `Chceš skúmať „${nazov}“?`}
      lead={
        lead ??
        'Ak zvolíš „Nie“ alebo „Ešte nie“, oblasť sa zamkne aj partnerovi — aby ju zbytočne ' +
          'nevypĺňal. Dôvod sa nezobrazí.'
      }
      spat={{ href: p(spatHref), label: 'Späť' }}
    >
      {mojStav && (
        <p className="text-xs text-muted-foreground">
          Naposledy si zvolil/a:{' '}
          <span className="font-medium text-foreground">
            {mojStav === 'ano' ? 'Áno' : mojStav === 'este_nie' ? 'Ešte nie' : 'Nie'}
          </span>
          . Môžeš to zmeniť.
        </p>
      )}

      <button
        onClick={() => zvol('ano', cielAno)}
        disabled={!!busy}
        className="group block w-full rounded-2xl border border-border/70 bg-card/70 p-5 text-left transition hover:border-[hsl(var(--success))]/50 hover:bg-card disabled:opacity-50"
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">{zdielanieDovod ? 'Áno' : 'Áno, chcem to skúmať'}</span>
          <span className="text-muted-foreground group-hover:translate-x-0.5">→</span>
        </div>
        {zdielanieDovod && <p className="mt-1 text-sm text-muted-foreground">Chcem preskúmať túto tému</p>}
      </button>

      <button
        onClick={() => zvol('este_nie', cielEsteNie)}
        disabled={!!busy}
        className="group block w-full rounded-2xl border border-border/70 bg-card/70 p-5 text-left transition hover:border-[hsl(var(--warning))]/50 hover:bg-card disabled:opacity-50"
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Ešte nie</span>
          <span className="text-muted-foreground group-hover:translate-x-0.5">→</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{zdielanieDovod ? 'Chcem sa k nej vrátiť neskôr, keď bude správny čas' : 'Dočasný zámok — vrátiš sa neskôr.'}</p>
      </button>

      <button
        onClick={() => zvol('nie', cielNie)}
        disabled={!!busy}
        className="group block w-full rounded-2xl border border-border/70 bg-card/70 p-5 text-left transition hover:border-[hsl(var(--destructive))]/50 hover:bg-card disabled:opacity-50"
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-foreground">Nie</span>
          <span className="text-muted-foreground group-hover:translate-x-0.5">→</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{zdielanieDovod ? 'Nechcem túto tému skúmať (trvalé uzamknutie)' : 'Trvalý zámok — nezaujíma ma to.'}</p>
      </button>

      {zdielanieDovod && zamykam && (
        <div className="space-y-3 rounded-2xl border border-border/70 bg-card/40 p-5">
          <p className="text-sm font-semibold text-foreground">
            Voľba „{zamykam === 'nie' ? 'Nie' : 'Ešte nie'}“ — dôvod (nepovinné)
          </p>
          <p className="text-sm text-muted-foreground">
            Druhá osoba uvidí len to, že téma je zamknutá. Ak napíšeš dôvod, uvidí aj ten. Ak ho nechaš prázdny, nezobrazí sa nič.
          </p>
          <input
            type="text"
            maxLength={200}
            value={dovod}
            onChange={e => setDovod(e.target.value)}
            placeholder="Dôvod v 1 vete"
            className="w-full rounded-xl border border-border/70 bg-background px-3 py-2 text-sm text-foreground"
          />
          <button
            onClick={() => zvol(zamykam, zamykam === 'nie' ? cielNie : cielEsteNie)}
            disabled={!!busy}
            className="w-full rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background disabled:opacity-50"
          >
            Potvrdiť
          </button>
        </div>
      )}

      {extra}

      <Link href={p(neskorHref)} className="mt-2 block text-xs text-muted-foreground hover:text-foreground">
        {neskorLabel}
      </Link>
    </Krok>
  )
}
