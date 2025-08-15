import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | DeepTalks',
  description: 'Plans that scale with you.',
}

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <ul className="space-y-2 text-muted-foreground">
        <li><b>Free</b> – for trying things out</li>
        <li><b>Pro</b> – for events and teams</li>
      </ul>
    </main>
  )
}
