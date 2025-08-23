import FeatureCard from "@/components/FeatureCard";
import couplesIcon from "@/assets/couples-icon.png";
import familyIcon from "@/assets/family-icon.png";
import friendsIcon from "@/assets/friends-icon.png";

const Features = () => {
  const features = [
    {
      title: "Pre páry",
      description: "Kvízy na objavovanie vzájomných preferencií, komunikačné nástroje pre rôzne životné situácie a rozhovory, ktoré posilnia váš vzťah.",
      image: couplesIcon,
      imageAlt: "Illustration of couple having meaningful conversation",
      ctaText: "CoupleSync kvíz",
      href: "#couplesync",
      variant: "accent" as const
    },
    {
      title: "Pre rodiny",
      description: "Pomôcky pre rodičov a deti na vzájomnú komunikáciu a pochopenie sa. Nástroje, ktoré spájajú generácie.",
      image: familyIcon,
      imageAlt: "Parent and child connecting through conversation",
      ctaText: "Rodinné rozhovory",
      href: "#rodina",
      variant: "connection" as const
    },
    {
      title: "Pre priateľov",
      description: "Konverzačné kartičky a party hry, ktoré pomôžu lepšiemu spoznaniu sa ľudí a vytvoreniu hlbších priateľstiev.",
      image: friendsIcon,
      imageAlt: "Friends connecting in meaningful conversation",
      ctaText: "Spoznajme sa",
      href: "#priatelia",
      variant: "default" as const
    }
  ];

  return (
    <section className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Na čom chcete <span className="bg-gradient-sunset bg-clip-text text-transparent">pracovať</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vyberte si typ vzťahu a získajte nástroje šité na mieru pre skutočnú komunikáciu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              ctaText={feature.ctaText}
              href={feature.href}
              variant={feature.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;