import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | DeepTalks',
  description: 'Who we are and what we do.',
}

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="text-muted-foreground">
        We build simple, human‑friendly tools for better conversations.
      </p>
    </main>
  )
}
