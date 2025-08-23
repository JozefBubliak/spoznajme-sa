import { Button } from "@/components/ui/button";
import { Compass, MessageCircle, Users, BookOpen } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      icon: Compass,
      title: "Komunikačný kompas",
      description: "Krátke frázy a mini-príručky pre každodenné situácie – podľa témy a publika.",
      link: "#kompas",
      color: "text-primary"
    },
    {
      icon: MessageCircle,
      title: "Aplikácie & Hry", 
      description: "Rýchly kvíz Fast Herd Vote a \"Spoznajme sa\" – kartové výzvy v balíčkoch.",
      link: "#aplikacie",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Centrum nástrojov",
      description: "Témy, publiká a vekové mapy na jednom mieste.",
      link: "#pomocky",
      color: "text-connection"
    },
    {
      icon: BookOpen,
      title: "Indexy: čo trápi deti",
      description: "Prehľad napísaný \"detským hlasom\" – praktické začiatky rozhovorov.",
      link: "#indexy",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Začnite s <span className="bg-gradient-connection bg-clip-text text-transparent">malými zmenami</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vyberte si tému alebo publikum a získajte frázy pripravené na použitie
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 text-center group hover:shadow-soft transition-all duration-300 hover:scale-105 border border-border/30"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-${tool.color.replace('text-', '')}/10 to-${tool.color.replace('text-', '')}/5 mb-6 group-hover:scale-110 transition-transform`}>
                <tool.icon className={`w-8 h-8 ${tool.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">
                {tool.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {tool.description}  
              </p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary/30 text-primary hover:bg-primary/10 w-full"
                asChild
              >
                <a href={tool.link}>
                  Otvoriť
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="shadow-warm">
              Otvoriť kompas
            </Button>
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              Začať "Spoznajme sa"
            </Button>
            <Button variant="outline" size="lg" className="border-connection text-connection hover:bg-connection/10">
              Spustiť CoupleSync
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;