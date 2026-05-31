import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, X, Zap, MessageSquare, ListChecks, Lock, BarChart3, HeartHandshake, Shuffle, HelpCircle, Compass, BookMarked, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/app" className="flex items-center gap-2 text-primary font-semibold text-lg">
            <Heart className="w-5 h-5 fill-primary" />
            <span>Intímne Preferencie</span>
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/pulse">
              <Button variant="ghost" size="sm" className="gap-1.5"><Zap className="w-3.5 h-3.5" />Impulz</Button>
            </Link>
            <Link to="/topics">
              <Button variant="ghost" size="sm">Témy</Button>
            </Link>
            <Link to="/karty">
              <Button variant="ghost" size="sm" className="gap-1.5"><MessageSquare className="w-3.5 h-3.5" />Karty</Button>
            </Link>
            <Link to="/zoznam">
              <Button variant="ghost" size="sm" className="gap-1.5"><ListChecks className="w-3.5 h-3.5" />Zoznam</Button>
            </Link>
            <Link to="/tajny-odkaz">
              <Button variant="ghost" size="sm" className="gap-1.5"><Lock className="w-3.5 h-3.5" />Odkaz</Button>
            </Link>
            <Link to="/results">
              <Button variant="ghost" size="sm">Výsledky</Button>
            </Link>
            <div className="relative">
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => setToolsOpen(!toolsOpen)}>
                Nástroje <ChevronDown className="w-3 h-3" />
              </Button>
              {toolsOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-border bg-background shadow-lg z-50 p-1.5 space-y-0.5">
                  {[
                    { to: "/nezabudni", icon: HeartHandshake, label: "Nezabudni na ňu" },
                    { to: "/kompas", icon: Compass, label: "Vzťahový kompas" },
                    { to: "/dennik", icon: BookMarked, label: "Párový denník" },
                    { to: "/zhody", icon: Shuffle, label: "Zhody bez odmietnutia" },
                    { to: "/36-otazok", icon: HelpCircle, label: "36 Otázok" },
                  ].map(({ to, icon: Icon, label }) => (
                    <Link key={to} to={to} onClick={() => setToolsOpen(false)}>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                        <Icon className="w-4 h-4 text-muted-foreground" />{label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {user && (
              <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="sm:hidden border-t border-border/50 bg-background px-4 py-3 space-y-2">
            <Link to="/pulse" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><Zap className="w-4 h-4" />Denný impulz</Button>
            </Link>
            <Link to="/topics" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">Témy</Button>
            </Link>
            <Link to="/karty" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><MessageSquare className="w-4 h-4" />Karty rozhovoru</Button>
            </Link>
            <Link to="/zoznam" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><ListChecks className="w-4 h-4" />Spoločný zoznam</Button>
            </Link>
            <Link to="/tajny-odkaz" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><Lock className="w-4 h-4" />Tajný odkaz</Button>
            </Link>
            <Link to="/results" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><BarChart3 className="w-4 h-4" />Výsledky</Button>
            </Link>
            <Link to="/nezabudni" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><HeartHandshake className="w-4 h-4" />Nezabudni na ňu</Button>
            </Link>
            <Link to="/kompas" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><Compass className="w-4 h-4" />Vzťahový kompas</Button>
            </Link>
            <Link to="/dennik" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><BookMarked className="w-4 h-4" />Párový denník</Button>
            </Link>
            <Link to="/zhody" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><Shuffle className="w-4 h-4" />Zhody bez odmietnutia</Button>
            </Link>
            <Link to="/36-otazok" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2"><HelpCircle className="w-4 h-4" />36 Otázok</Button>
            </Link>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Odhlásiť sa
            </Button>
          </div>
        )}
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
