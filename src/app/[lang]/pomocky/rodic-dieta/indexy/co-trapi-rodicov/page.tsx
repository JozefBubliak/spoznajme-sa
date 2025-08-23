// PATH: src/app/[lang]/pomocky/rodic-dieta/indexy/co-trapi-rodicov/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Čo trápi rodičov v komunikácii s deťmi | DeepTalks',
  description:
    'Výzvy, na ktoré narážajú rodičia pri komunikácii s deťmi – od každodenných konfliktov po náročné situácie.',
}

export default function Page() {
  return (
    <article className="prose max-w-3xl">
      <h1>Čo trápi rodičov v komunikácii s deťmi</h1>
      <p className="text-muted-foreground">
        Rodičia často zápasia s nastavením hraníc, pochopením potrieb a
        zvládaním emócií detí.
      </p>
      <section className="mt-6">
        <h2 className="text-lg font-semibold">Najčastejšie obavy</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nedorozumenia a záchvaty hnevu.</li>
          <li>Pocit, že deti nepočúvajú alebo ignorujú pravidlá.</li>
          <li>Hľadanie rovnováhy medzi autoritou a empatiou.</li>
        </ul>
      </section>
    </article>
  )
}
