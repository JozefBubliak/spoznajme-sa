import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Heart, KeyRound, LockKeyhole,
  MessageCircleHeart, ShieldCheck, Sparkles, UsersRound,
  Brain, Flame, AlertTriangle, Compass,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const features = [
  {
    icon: ShieldCheck,
    title: "Súkromie na prvom mieste",
    text: "Citlivé odpovede zostávajú tvoje. Partner vidí iba bezpečne vyhodnotený prienik.",
  },
  {
    icon: Sparkles,
    title: "Otázky, ktoré dávajú zmysel",
    text: "Každá téma má vlastný tok otázok podľa rolí, hraníc a toho, čo chcete preskúmať.",
  },
  {
    icon: MessageCircleHeart,
    title: "Rozhovor bez tlaku",
    text: "Výsledok nie je verdikt. Je to pokojné miesto, odkiaľ sa dá začať rozprávať.",
  },
];

const steps = [
  { number: "01", icon: KeyRound, title: "Vytvoríte spoločný kód", text: "Jeden z vás otvorí bezpečnú párovú reláciu." },
  { number: "02", icon: Heart, title: "Odpovedáte každý za seba", text: "Bez sledovania odpovedí toho druhého a bez tlaku." },
  { number: "03", icon: UsersRound, title: "Objavíte spoločný priestor", text: "Uvidíte zhody, možné témy a miesta vhodné na rozhovor." },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <Heart className="h-4.5 w-4.5 fill-current" />
      </div>
      <span className="font-semibold tracking-tight text-foreground">Intímne Preferencie</span>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[510px]">
      <div className="absolute inset-[12%] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute left-[8%] top-[18%] h-[64%] w-[48%] rotate-[-8deg] rounded-[2.5rem] border border-white/70 bg-white/75 p-5 shadow-2xl shadow-primary/10 backdrop-blur">
        <div className="mb-7 flex items-center justify-between">
          <div className="h-2.5 w-20 rounded-full bg-primary/15" />
          <div className="h-8 w-8 rounded-full bg-rose-100" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">Téma na objavenie</p>
        <p className="mt-2 max-w-[170px] text-lg font-semibold leading-tight text-foreground">Čo vás dokáže zblížiť?</p>
        <div className="mt-6 space-y-2.5">
          {["Chcem preskúmať", "Možno neskôr", "Zatiaľ nie"].map((label, index) => (
            <div key={label} className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${index === 0 ? "border-primary/25 bg-primary/5" : "border-border/70 bg-white/60"}`}>
              <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${index === 0 ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                {index === 0 && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-[11px] font-medium text-foreground/75">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[4%] top-[9%] h-[72%] w-[50%] rotate-[7deg] rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary via-[#765394] to-[#ab7094] p-5 text-white shadow-2xl shadow-primary/25">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Heart className="h-4 w-4 fill-white/70" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">Prienik</span>
        </div>
        <div className="mt-16">
          <div className="flex items-end gap-1.5">
            {[34, 55, 43, 72, 58, 86, 67].map((height, index) => (
              <div key={height + index} className="flex-1 rounded-t-full bg-white/20" style={{ height: `${height}px` }}>
                {index === 5 && <div className="h-full rounded-t-full bg-rose-200/90" />}
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-white/20 pt-4">
            <p className="text-xs text-white/70">Spoločný priestor</p>
            <p className="mt-1 text-2xl font-semibold">6 nových tém</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[7%] flex max-w-[210px] items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-primary/10 backdrop-blur">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
          <LockKeyhole className="h-4 w-4" />
        </div>
        <p className="text-[11px] font-medium leading-snug text-foreground/75">Vaše osobné odpovede zostávajú súkromné.</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const primaryHref = isAuthenticated ? "/app" : "/register";
  const primaryLabel = isAuthenticated ? "Otvoriť aplikáciu" : "Začať spolu";

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf8f5]">
      <header className="relative z-10 border-b border-primary/5 bg-[#fbf8f5]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#ako-to-funguje" className="transition-colors hover:text-foreground">Ako to funguje</a>
            <a href="#sukromie" className="transition-colors hover:text-foreground">Súkromie</a>
          </nav>
          <div className="flex items-center gap-2">
            {!isAuthenticated && <Link to="/login" className="hidden px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary sm:block">Prihlásiť sa</Link>}
            <Link to={primaryHref} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
              {primaryLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-rose-100/60 blur-3xl" />
          <div className="absolute right-[-8rem] top-[-5rem] h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pb-20 pt-16 lg:grid-cols-[1.06fr_0.94fr] lg:pb-28 lg:pt-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur">
                <ShieldCheck className="h-3.5 w-3.5" /> Bezpečný priestor pre dvoch
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
                Spoznajte sa ešte <span className="text-primary">o kúsok bližšie.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Jemný a súkromný spôsob, ako vo dvojici objavovať túžby, hranice a témy, o ktorých sa niekedy ťažko začína hovoriť.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to={primaryHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90">
                  {primaryLabel} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#ako-to-funguje" className="inline-flex items-center justify-center rounded-full border border-primary/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/25 hover:bg-white">
                  Pozrieť, ako to funguje
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
                {["Bez hodnotenia", "Súkromné odpovede", "Vlastné tempo"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-green-600" /> {item}</span>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section id="sukromie" className="border-y border-primary/5 bg-white/50">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 py-16 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-primary/8 bg-white/70 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="h-5 w-5" /></div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="ako-to-funguje" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Jednoduchý začiatok</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">Tri kroky. Žiadny tlak.</h2>
            <p className="mt-4 text-muted-foreground">Každý odpovedá sám za seba. Spoločne uvidíte iba to, čo vám môže pomôcť nájsť nový rozhovor.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(({ number, icon: Icon, title, text }) => (
              <article key={number} className="relative overflow-hidden rounded-3xl border border-primary/10 bg-[#f7f0f4] p-6">
                <span className="absolute right-5 top-3 text-5xl font-semibold tracking-tighter text-primary/8">{number}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-sm"><Icon className="h-4.5 w-4.5" /></div>
                <h3 className="mt-8 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-primary/5 bg-[#f7f0f4]/60">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Oblasti, ktoré preskúmate</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">Päť okruhov. Jeden spoločný obraz.</h2>
              <p className="mt-4 text-muted-foreground">Každá oblasť sa pýta na veci, o ktorých sa páry buď boja hovoriť, alebo jednoducho nevedia, ako začať.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Flame, label: "Intimita a sexualita", desc: "Túžby, hranice, roly a fantázie — každý sám za seba, výsledok spoločne.", color: "bg-rose-50 text-rose-600", tag: "Jadro aplikácie" },
                { icon: Brain, label: "Attachment a vzorce", desc: "Ako milujete, prečo reagujete tak ako reagujete a čo ste prevzali z minulosti.", color: "bg-purple-50 text-purple-600", tag: "Psychologická vrstva" },
                { icon: AlertTriangle, label: "Konflikty a spúšťače", desc: "Konkrétne reakcie pod tlakom, čo každý potrebuje po hádke a kde sú hranice.", color: "bg-amber-50 text-amber-600", tag: "Vzťahová dynamika" },
                { icon: ShieldCheck, label: "Tabuizované témy", desc: "Žiarlivosť, nevera, závislosti, trauma — veci, o ktorých sa mlčí, kým nie je neskoro.", color: "bg-slate-100 text-slate-600", tag: "Odvaha hovoriť" },
                { icon: Compass, label: "Spoločná budúcnosť", desc: "Nie sny, ale konkrétne rozhodnutia — bývanie, deti, kariéra, záväzky.", color: "bg-blue-50 text-blue-600", tag: "Dlhodobý výhľad" },
              ].map(({ icon: Icon, label, desc, color, tag }) => (
                <article key={label} className="group rounded-3xl border border-primary/8 bg-white/80 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/15">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}><Icon className="h-5 w-5" /></div>
                  <span className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{tag}</span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
                </article>
              ))}
              <article className="rounded-3xl border border-dashed border-primary/20 bg-primary/3 p-6 flex flex-col justify-center items-start">
                <Sparkles className="h-5 w-5 text-primary/40 mb-3" />
                <p className="text-sm font-medium text-foreground/60">Ďalšie oblasti pribudnú postupne podľa vašich odpovedí.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-28 right-0 h-64 w-64 rounded-full bg-rose-300/20 blur-2xl" />
            <div className="relative">
              <Heart className="mx-auto h-7 w-7 fill-white/20" />
              <h2 className="mx-auto mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em]">Začnite rozhovor, ktorý môže patriť iba vám dvom.</h2>
              <Link to={primaryHref} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-xl transition-transform hover:-translate-y-0.5">
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p>Súkromný priestor pre otvorenejšie rozhovory.</p>
        </div>
      </footer>
    </div>
  );
}