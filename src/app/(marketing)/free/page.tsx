import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resources | DeepTalks',
  description:
    'Start meaningful conversations today with our curated free question packs, guides, and facilitation tools.',
  alternates: {
    canonical: 'https://deeptalks.eu/free',
  },
}

const resources = [
  {
    title: 'Weekly Conversation Prompt',
    description:
      'A thoughtful question in your inbox every Monday to spark reflection and connection.',
    action: { label: 'Subscribe for free', href: '/newsletter' },
  },
  {
    title: 'Starter Question Pack',
    description:
      'Ten essential prompts to help you and your loved ones ease into deeper conversations.',
    action: { label: 'Download PDF', href: '/downloads/starter-pack.pdf' },
  },
  {
    title: 'Mini Facilitation Guide',
    description:
      'Step-by-step tips for hosting a 30-minute DeepTalks circle with friends or colleagues.',
    action: { label: 'Read online', href: '/blog/facilitation-guide' },
  },
]

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 space-y-12">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Free resources</p>
        <h1 className="text-4xl font-bold">Everything you need to get started</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          DeepTalks is about creating small moments of connection every day. These free resources are designed to
          help you build momentum and bring the magic of structured conversations into your home, classroom, or
          community.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <article key={resource.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{resource.title}</h2>
            <p className="mt-3 flex-1 text-sm text-muted-foreground">{resource.description}</p>
            <a
              href={resource.action.href}
              className="mt-6 inline-flex items-center font-medium text-primary underline-offset-4 hover:underline"
            >
              {resource.action.label}
            </a>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Bring DeepTalks to your group</h2>
        <p className="mt-2 text-muted-foreground">
          Ready to go deeper? Explore our paid plans for access to unlimited question packs, facilitation templates,
          and advanced analytics.
        </p>
        <a
          href="/pricing"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          View pricing
        </a>
      </section>
    </main>
  )
}
