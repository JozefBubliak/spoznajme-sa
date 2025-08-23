import { Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t border-border/30 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-primary mr-3" />
              <span className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                DeepTalks
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Pomáhame vytvárať hlbšie a zmysluplnejšie vzťahy prostredníctvom 
              skutočnej komunikácie. Bez moralizovania, s praktickými nástrojmi.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:hello@deeptalks.eu" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/JozefBubliak/spoznajme-sa" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Nástroje</h3>
            <ul className="space-y-3">
              <li>
                <a href="#kompas" className="text-muted-foreground hover:text-primary transition-colors">
                  Komunikačný kompas
                </a>
              </li>
              <li>
                <a href="#aplikacie" className="text-muted-foreground hover:text-primary transition-colors">
                  Aplikácie & Hry
                </a>
              </li>
              <li>
                <a href="#pomocky" className="text-muted-foreground hover:text-primary transition-colors">
                  Centrum nástrojov
                </a>
              </li>
              <li>
                <a href="#indexy" className="text-muted-foreground hover:text-primary transition-colors">
                  Indexy
                </a>
              </li>
            </ul>
          </div>

          {/* Relationship Types */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Pre koho</h3>
            <ul className="space-y-3">
              <li>
                <a href="#couplesync" className="text-muted-foreground hover:text-accent transition-colors">
                  Páry
                </a>
              </li>
              <li>
                <a href="#rodina" className="text-muted-foreground hover:text-connection transition-colors">
                  Rodiny
                </a>
              </li>
              <li>
                <a href="#priatelia" className="text-muted-foreground hover:text-primary transition-colors">
                  Priateľov
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 DeepTalks. Vytvorené s láskou pre skutočné ľudské spojenia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;