import { useState } from "react";
import { MessageSquare, ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    id: "lahke", label: "Ľahké", emoji: "☀️", color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    active: "bg-yellow-500 text-white border-yellow-500",
    cards: [
      "Čo ťa naposledy rozosmialo do slz?",
      "Aká je tvoja tajná guiltless pleasure?",
      "Keby si si mohol/la vybrať superschopnosť, čo by to bolo?",
      "Čo je prvá vec, ktorú robíš ráno — a mala by to byť iná?",
      "Akú pesničku teraz máš stále v hlave?",
      "Aký bol tvoj najobľúbenejší film ako dieťa?",
      "Čo by si si objednal/a, keby si mohol/la jesť čokoľvek dnes večer?",
      "Čo je niečo, čo ľudia vždy podceňujú u teba?",
    ]
  },
  {
    id: "vztah", label: "Vzťah", emoji: "💛", color: "bg-rose-50 border-rose-200 text-rose-800",
    active: "bg-rose-500 text-white border-rose-500",
    cards: [
      "Čo si si myslel/a, keď si ma prvýkrát uvidel/a?",
      "Čo ti na mne robí najviac radosť?",
      "Kedy si naposledy cítil/a, že sme si naozaj blízko?",
      "Je niečo, čo by si chcel/a zmeniť v tom, ako spolu trávime čas?",
      "Čo robím, čo ťa nevdojak rozosmieje?",
      "Aký moment z nášho vzťahu by si nikdy nechcel/a zabudnúť?",
      "Kedy sa pri mne cítiš najvíac v bezpečí?",
      "Čo by si chcel/a, aby som o tebe vedel/a lepšie?",
    ]
  },
  {
    id: "intimita", label: "Intimita", emoji: "🌹", color: "bg-purple-50 border-purple-200 text-purple-800",
    active: "bg-purple-600 text-white border-purple-600",
    cards: [
      "Čo ťa pri mne priťahuje fyzicky — čo si mi nikdy nepovedal/a?",
      "Kedy si naposledy cítil/a silnú túžbu po fyzickej blízkosti?",
      "Je niečo intímne, o čom by si chcel/a porozprávať, ale nevedel/a si ako začať?",
      "Čo by náš intímny čas spolu zlepšilo najviac?",
      "Aká je tvoja najobľúbenejšia forma blízkosti — nie nutne sexuálna?",
      "Kedy sa pri mne cítiš najviac žiadaný/á?",
      "Čo ťa na intímnej sfére nášho vzťahu teší a čo by si chcel/a viac?",
      "Máš nejakú fantáziu, o ktorej sme ešte nehovorili?",
    ]
  },
  {
    id: "sny", label: "Sny & budúcnosť", emoji: "🔮", color: "bg-blue-50 border-blue-200 text-blue-800",
    active: "bg-blue-600 text-white border-blue-600",
    cards: [
      "Kde si sa videl/a o 10 rokov, keď si mal/a 18? Zmenilo sa to?",
      "Aký je tvoj najväčší sen, o ktorom ešte nevieš, či je reálny?",
      "Keby sme mohli zajtra odísť niekam na mesiac — kam by to bolo?",
      "Čo chceš zažiť spolu, kým budeme starí?",
      "Aký by bol tvoj ideálny bežný deň o 5 rokov?",
      "Je niečo, o čom snívaš, ale bojíš sa to povedať nahlas?",
      "Čo chceš, aby ľudia povedali o tebe na tvojej 80-ke?",
      "Aká je jedna vec, ktorú chceš dosiahnuť pred koncom tohto roka?",
    ]
  },
  {
    id: "odvaha", label: "Odvaha", emoji: "🔥", color: "bg-orange-50 border-orange-200 text-orange-800",
    active: "bg-orange-500 text-white border-orange-500",
    cards: [
      "Čo je niečo, za čo sa hanbíš, ale keby si to povedal/a, uľavilo by sa ti?",
      "Čo si na mne ešte nikdy nepochválil/a, hoci si to cítil/a?",
      "Aká je jedna vec, ktorú by si mal/a riešiť v našom vzťahu — ale stále odkladáš?",
      "Čo ti o mne ľudia hovoria, keď nie som pri tebe?",
      "Keby si vedel/a, že sa nehnevám — čo by si mi povedal/a?",
      "Aká je tvoja najväčšia skrytá obava z nášho vzťahu?",
      "Čo je niečo, čo od teba nikdy nečakáš, ale chcel/a by si, aby som to urobil/a?",
      "Kedy si bol/a naposledy naozaj nahnevaný/á na mňa — a nepovedal/a si mi to?",
    ]
  },
];

export default function ConversationCards() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const category = CATEGORIES.find((c) => c.id === activeCategory);
  const cards = category?.cards || [];
  const card = cards[cardIndex];

  const handleNext = () => {
    setCardIndex((i) => (i + 1) % cards.length);
    setFlipped(false);
  };
  const handlePrev = () => {
    setCardIndex((i) => (i - 1 + cards.length) % cards.length);
    setFlipped(false);
  };
  const handleShuffle = () => {
    setCardIndex(Math.floor(Math.random() * cards.length));
    setFlipped(false);
  };
  const handleCategory = (id) => {
    setActiveCategory(id);
    setCardIndex(0);
    setFlipped(false);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Karty rozhovoru</h1>
          <p className="text-xs text-muted-foreground">Otázky, ktoré otvárajú nové dvere</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium shrink-0 transition-all",
              activeCategory === cat.id ? cat.active : "border-border text-muted-foreground hover:border-primary/30 bg-card"
            )}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <button
        onClick={() => setFlipped(true)}
        className={cn(
          "w-full rounded-3xl border-2 p-8 min-h-[220px] flex items-center justify-center transition-all duration-300 cursor-pointer",
          flipped
            ? "bg-card border-primary/20 shadow-lg"
            : "bg-gradient-to-br from-primary/5 to-accent/10 border-dashed border-primary/20 hover:border-primary/40"
        )}
      >
        {flipped ? (
          <p className="text-lg font-semibold text-center leading-relaxed">{card}</p>
        ) : (
          <div className="text-center space-y-2">
            <div className="text-4xl">{category?.emoji}</div>
            <p className="text-sm text-muted-foreground">Klikni pre odhalenie karty</p>
          </div>
        )}
      </button>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{cardIndex + 1} / {cards.length}</span>
          <Button variant="outline" size="sm" onClick={handleShuffle} className="gap-1.5">
            <Shuffle className="w-3.5 h-3.5" /> Náhodne
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Otázka slúži ako odrazový mostík — žiadna odpoveď nie je zlá.
      </p>
    </div>
  );
}