'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePar } from './_par'
import { useStavy, partnerZamok, najdiStav, ulozStav } from './_stav'
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
}: {
  lang: string
  modul: string
  tema: string | null
  nazov: string
  spatHref: string
  cielAno: string
  cielEsteNie: string
  cielNie: string
}) {
  const router = useRouter()
  const { par, ready } = usePar()
  const { stavy, nacitane } = useStavy(par)
  const [busy, setBusy] = useState<string | null>(null)

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

  if (zamok) {
    return (
      <Krok
        krok="Zamknuté partnerom"
        nadpis={
          zamok === 'trvaly'
            ? `Partner/ka túto oblasť skúmať nechce.`
            : `Partner/ka pri tejto oblasti ešte váha.`
        }
        lead={
          zamok === 'trvaly'
            ? 'Téma „' + nazov + '" je pre vás uzavretá. Nezobrazí sa dôvod ani žiadne odpovede.'
            : 'Téma „' + nazov + '" je zatiaľ dočasne zamknutá. Skús to neskôr.'
        }
        spat={{ href: p(spatHref), label: 'Späť' }}
      >
        <Volba href={p('/dotaznik/moduly')} nazov="Späť na mapu modulov" />
      </Krok>
    )
  }

  async function zvol(stav: 'ano' | 'este_nie' | 'nie', ciel: string) {
    if (!par) return
    setBusy(stav)
    await ulozStav(par, modul, tema, stav)
    router.push(p(ciel))
  }

  return (
    <Krok
      krok="Screening — bez tlaku"
      nadpis={`Chceš skúmať „${nazov}“?`}
      lead={
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
          <span className="text-base font-semibold text-foreground">Áno, chcem to skúmať</span>
          <span className="text-muted-foreground group-hover:translate-x-0.5">→</span>
        </div>
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
        <p className="mt-1 text-sm text-muted-foreground">Dočasný zámok — vrátiš sa neskôr.</p>
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
        <p className="mt-1 text-sm text-muted-foreground">Trvalý zámok — nezaujíma ma to.</p>
      </button>

      <Link href={p('/dotaznik/moduly')} className="mt-2 block text-xs text-muted-foreground hover:text-foreground">
        Rozhodnem sa neskôr — späť na moduly
      </Link>
    </Krok>
  )
}
