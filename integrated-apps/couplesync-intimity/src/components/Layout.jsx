import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link to="/topics">
              <Button variant="ghost" size="sm">Témy</Button>
            </Link>
            <Link to="/results">
              <Button variant="ghost" size="sm">Výsledky</Button>
            </Link>
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
            <Link to="/topics" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">Témy</Button>
            </Link>
            <Link to="/results" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full justify-start">Výsledky</Button>
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
