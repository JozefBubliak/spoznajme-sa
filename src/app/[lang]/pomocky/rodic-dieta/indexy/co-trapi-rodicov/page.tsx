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
        Čoskoro - výzvy a frustrujúce situácie z pohľadu rodičov.
      </p>
      <div className="border rounded-lg p-6 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          TODO: Obsah pre rodičovskú perspektívu komunikačných výziev.
        </p>
      </div>
    </article>
  )
}
