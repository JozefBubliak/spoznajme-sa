import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Heart, Sparkles, Users, Crown, ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

// Demo data - v skutočnosti by prišli z Supabase
const demoQuestions = [
  {
    id: "1",
    text: "Aký je tvoj najkrajší spoločný zážitok z detstva?",
    category: "rodina" as const,
    isFavorite: false
  },
  {
    id: "2", 
    text: "Čo by si chcel/a, aby sme spoločne vyskúšali v najbližšom mesiaci?",
    category: "partneri" as const,
    isFavorite: true
  },
  {
    id: "3",
    text: "Ktorý film alebo kniha ťa naposledy úplne pohltila a prečo?",
    category: "kamaráti" as const,
    isFavorite: false
  },
  {
    id: "4",
    text: "Čo ťa na mne prekvapilo, keď sme sa prvýkrát stretli?",
    category: "partneri" as const,
    isFavorite: false
  },
  {
    id: "5",
    text: "Aká je tvoja najobľúbenejšia rodinná tradícia?",
    category: "rodina" as const,
    isFavorite: true
  },
  {
    id: "6",
    text: "Keby si mal/a superschopnosť jeden deň, čo by si robil/a?",
    category: "rodič-dieťa" as const,
    isFavorite: false
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favoriteQuestions, setFavoriteQuestions] = useState<string[]>(["2", "5"]);
  const [user, setUser] = useState<any>(null); // V skutočnosti by prišlo z Supabase auth

  const filteredQuestions = selectedCategory 
    ? demoQuestions.filter(q => q.category === selectedCategory)
    : demoQuestions;

  const questionsWithFavorites = filteredQuestions.map(q => ({
    ...q,
    isFavorite: favoriteQuestions.includes(q.id)
  }));

  const handleToggleFavorite = (questionId: string) => {
    setFavoriteQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleLogin = () => {
    // V skutočnosti by sa prihlásilo cez Supabase
    setUser({
      name: "Jana Nováková",
      email: "jana@example.com",
      isPremium: false,
      isAdmin: false
    });
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-background)]">
      <Header 
        user={user}
        onLogin={handleLogin}
        onLogout={() => setUser(null)}
      />

      {/* Hero sekcia */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Ľudia v rozhovore"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Nové otázky každý deň!
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Spoznajme sa!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Objavte nové dimenzie vašich vzťahov pomocou premyslených otázok. 
            Pre páry, kamarátov, rodiny aj rodičov s deťmi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-[var(--gradient-warm)] hover:opacity-90 shadow-[var(--shadow-soft)] text-base px-8"
              onClick={handleLogin}
            >
              <Heart className="w-5 h-5 mr-2" />
              Začať konverzáciu
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/5 text-base px-8"
            >
              <Crown className="w-5 h-5 mr-2" />
              Získať Premium
            </Button>
          </div>
        </div>
      </section>

      {/* Kategórie a otázky */}
      <section id="otazky" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Otázky pre každú príležitosť
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vyberte si kategóriu a začnite objavovať nové stránky vašich vzťahov
            </p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionsWithFavorites.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onToggleFavorite={user ? handleToggleFavorite : undefined}
              />
            ))}
          </div>

          {!user && (
            <div className="text-center mt-12">
              <Card className="max-w-md mx-auto bg-gradient-to-br from-primary/5 to-accent/20 border-primary/20">
                <CardContent className="p-6">
                  <Star className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Chcete vidieť viac otázok?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prihlás sa a získaj prístup k stovkám jedinečných otázok
                  </p>
                  <Button 
                    onClick={handleLogin}
                    className="w-full bg-[var(--gradient-warm)] hover:opacity-90"
                  >
                    Prihlásiť sa zadarmo
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 mt-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © 2024 Spoznajme sa! Budujeme lepšie vzťahy, jeden rozhovor za druhým.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
