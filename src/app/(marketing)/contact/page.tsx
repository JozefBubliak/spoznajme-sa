import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | DeepTalks',
  description: 'How to reach us.',
}

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="text-muted-foreground">
        Email: hello@deeptalks.eu
      </p>
    </main>
  )
}
