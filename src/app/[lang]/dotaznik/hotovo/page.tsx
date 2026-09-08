import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../_ui'

type P = { params: Promise<{ lang: string }> }

export default async function DotaznikHotovo({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Dokončené"
      nadpis="Máš to za sebou. Teraz je rad na partnerovi/partnerke."
      lead="Výsledok sa odomkne, keď dotazník dokončíte obaja. Do tej chvíle nikto nevidí odpovede toho druhého."
      spat={{ href: p(cesta.moduly), label: 'Mapa modulov' }}
    >
      <Volba href={p(cesta.vyhodnotenie)} nazov="Skontrolovať stav vyhodnotenia" />
      <Volba href={p(cesta.moduly)} nazov="Vrátiť sa a doplniť ďalší modul" />
    </Krok>
  )
}
