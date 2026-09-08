import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

// Vetviaci uzol: Áno → témy, Ešte nie → dočasný zámok, Nie → trvalý zámok.
export default async function ModulChcem({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok={`Modul ${modul.cislo} — screening`}
      nadpis={`Chceš skúmať oblasť „${modul.nazov}“?`}
      lead="Tvoja voľba sa premietne aj partnerovi. Pri „Nie“ alebo „Ešte nie“ sa oblasť zamkne obom — aby ju druhý zbytočne nevypĺňal."
      spat={{ href: p(cesta.modul(modul.slug)), label: 'Späť na modul' }}
    >
      <Volba
        href={p(cesta.modulTemy(modul.slug))}
        nazov="Áno, chcem to skúmať"
        popis="Otvorí sa zoznam tém v tomto module."
        ton="ano"
      />
      <Volba
        href={p(`${cesta.modulZamknute(modul.slug)}?typ=docasny`)}
        nazov="Ešte nie"
        popis="Dočasný zámok — vrátiš sa, keď budeš pripravený/á."
        ton="mozno"
      />
      <Volba
        href={p(`${cesta.modulZamknute(modul.slug)}?typ=trvaly`)}
        nazov="Nie"
        popis="Trvalý zámok — oblasť ma nezaujíma a nechcem ju praktikovať."
        ton="nie"
      />
    </Krok>
  )
}
