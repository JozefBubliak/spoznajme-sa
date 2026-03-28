'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowDown, MessageCircle, Gamepad2, Heart } from 'lucide-react'
import coupleImage from '@/assets/couple-conversation.jpg'
import friendsImage from '@/assets/friends-conversation.jpg'
import familyImage from '@/assets/family-conversation.jpg'

/* ─── Stats ─── */
const stats = [
  { value: '92%',   label: 'Closer Bond' },
  { value: '500+',  label: 'Curated Prompts' },
  { value: 'Zero',  label: 'Digital Friction' },
  { value: 'Psych', label: 'Backed Design' },
]

/* ─── Ecosystem cards ─── */
const ecosystem = [
  {
    icon: MessageCircle,
    title: 'Communication Compass',
    desc: 'The ultimate toolkit for navigating difficult emotions and daily transitions with psychological safety.',
    link: '/sk/kompas',
    cta: 'Learn More',
  },
  {
    icon: Gamepad2,
    title: 'Conversation Games',
    desc: 'Playful, card-based experiences that strip away the awkwardness and spark meaningful group storytelling.',
    link: '/sk/apps',
    cta: 'Explore Deck',
  },
  {
    icon: Heart,
    title: 'CoupleSync',
    desc: 'A private digital space for partners to map desires, rituals, and boundaries without judgment.',
    link: '/sk/apps/couplesync',
    cta: 'Get Started',
  },
]

/* ─── Audience ─── */
const audiences = [
  { img: coupleImage, badge: 'Soulmates',  title: 'Couples',  link: '/sk/produkty/pary' },
  { img: familyImage, badge: 'The Core',   title: 'Family',   link: '/sk/produkty/rodic-dieta' },
  { img: friendsImage, badge: 'The Chosen', title: 'Friends', link: '/sk/apps' },
]

/* ─── Journey steps ─── */
const journey = [
  { num: '01', title: 'Discover', desc: 'Choose the theme or relationship that needs focus today.' },
  { num: '02', title: 'Choose',   desc: 'Select between guided mini-steps or playful card challenges.' },
  { num: '03', title: 'Interact', desc: 'Put the devices down. Use our prompts to light the way.' },
  { num: '04', title: 'Connect',  desc: 'Experience the quiet magic of truly being seen and heard.' },
]

export default function MarketingHomePage() {
  return (
    <div className="bg-background text-foreground">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="label-gold text-[0.65rem]">Redefining Intimacy</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[1.05] tracking-tight">
            <span className="text-foreground">Connection</span>
            <br />
            <span className="gradient-text italic font-normal">is an Art.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            DeepTalks provides the canvas. Thoughtful prompts and guided experiences
            designed to move you past the surface and into the heart.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
            <Link
              href="/sk/kompas"
              className="btn-hero inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              Explore Experiences
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Social proof avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80',
                  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=64&h=64&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80',
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="User"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Join 15,000+ deep talkers</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </section>

      {/* ═══════════ STATS BAR ═══════════ */}
      <section className="border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-8 px-6 text-center ${i > 0 ? 'border-l border-border' : ''}`}
            >
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ ECOSYSTEM ═══════════ */}
      <section className="section-spacing">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <span className="label-gold">The Ecosystem</span>
            <h2 className="text-3xl sm:text-5xl leading-tight">
              A sanctuary for <br className="hidden sm:block" />
              <span className="gradient-text">every relationship.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              From daily rituals to tectonic life shifts, our tools bridge the gap
              between silence and understanding.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ecosystem.map((card) => (
              <Link key={card.title} href={card.link} className="card-elegant group p-8 space-y-5 block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  {card.cta} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AUDIENCE ═══════════ */}
      <section className="section-spacing bg-card/30">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl sm:text-4xl text-center">
            For every human constellation.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((a) => (
              <Link key={a.title} href={a.link} className="group relative overflow-hidden rounded-2xl aspect-[3/4] block">
                <Image
                  src={a.img}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                  <span className="text-xs text-primary font-medium tracking-wider uppercase">{a.badge}</span>
                  <h3 className="text-2xl font-bold text-white">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PHILOSOPHY ═══════════ */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl sm:text-4xl leading-snug">
              Silence shouldn&apos;t be<br />the default setting.
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              In a world of fast scrolling and shallow likes, we are losing the ability
              to truly hear one another. We exist in the same rooms, but different
              universes. DeepTalks was born from a simple truth: the quality of our
              relationships is determined by the quality of our conversations.
            </p>
          </div>

          {/* Testimonial */}
          <blockquote className="card-elegant p-8 text-center space-y-4">
            <p className="text-foreground italic leading-relaxed text-lg">
              &ldquo;The first time we used the &lsquo;Openers&rsquo; deck, I learned
              something about my father I hadn&apos;t known in 20 years. Life-changing.&rdquo;
            </p>
            <footer className="text-sm text-muted-foreground">
              <span className="gold-rule" />Sarah K., London
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ═══════════ JOURNEY ═══════════ */}
      <section className="section-spacing bg-card/30">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-3">
            <span className="label-gold">The Journey</span>
            <h2 className="text-3xl sm:text-4xl">Simple by design.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step) => (
              <div key={step.num} className="space-y-3">
                <span className="text-4xl font-bold text-primary/30">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl leading-tight">
            Ready to start the <br />
            <span className="gradient-text">real conversation?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No more &ldquo;How was your day?&rdquo; — Let&apos;s talk about what really matters.
          </p>
          <Link
            href="/sk/kompas"
            className="btn-hero inline-flex items-center gap-2 px-10 py-4 text-lg"
          >
            Launch The Compass
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <span className="font-semibold">DeepTalks</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Thoughtful prompts and guided experiences for deeper human connection.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</h4>
            <div className="space-y-2 text-sm">
              <Link href="/pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/free" className="block text-muted-foreground hover:text-foreground transition-colors">Try Free</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} DeepTalks. All rights reserved.</span>
            <span>Made with ❤️ for better conversations</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
