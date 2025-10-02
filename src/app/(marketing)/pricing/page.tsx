import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | DeepTalks',
  description:
    'Choose the DeepTalks plan that fits your group. Explore flexible options for families, couples, and facilitators.',
  alternates: {
    canonical: 'https://deeptalks.eu/pricing',
  },
}

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    description:
      'Perfect for curious pairs who want to try a guided conversation before committing.',
    features: ['Access to rotating free question packs', 'Weekly conversation prompts', 'Mobile web experience'],
  },
  {
    name: 'Family',
    price: '€9 / month',
    description:
      'Designed for families and couples who want deeper, more frequent check-ins.',
    features: ['Unlimited question packs', 'Shared conversation journal', 'Printable conversation guides'],
  },
  {
    name: 'Facilitator',
    price: '€29 / month',
    description:
      'For coaches, educators, and community leaders who host group sessions.',
    features: ['All Family features', 'Session planning templates', 'Priority support and onboarding'],
  },
]

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-10">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pricing</p>
        <h1 className="text-4xl font-bold">Simple plans for intentional conversations</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Whether you are meeting one-on-one or guiding a room full of people, DeepTalks helps you keep
          conversations meaningful, structured, and engaging. Pick the plan that unlocks the right tools for you.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <p className="text-3xl font-bold text-primary">{tier.price}</p>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>
            <ul className="mt-auto space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-8 text-center">
        <h2 className="text-2xl font-semibold">Need a custom plan?</h2>
        <p className="mt-2 text-muted-foreground">
          Tell us about your organisation or event and we will tailor DeepTalks to your format, language, and
          facilitation style.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Talk to us
        </a>
      </section>
    </main>
  )
}
