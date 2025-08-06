import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Settings, LogIn, LogOut, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    isAdmin?: boolean;
    isPremium?: boolean;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onAdminPanel?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onAdminPanel }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--gradient-warm)] rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Spoznajme sa!</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#otazky" className="text-muted-foreground hover:text-foreground transition-colors">
              Otázky
            </a>
            <a href="#kategorie" className="text-muted-foreground hover:text-foreground transition-colors">
              Kategórie
            </a>
            <a href="#o-nas" className="text-muted-foreground hover:text-foreground transition-colors">
              O nás
            </a>
          </nav>

          {/* User section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    Ahoj, {user.name}!
                  </span>
                  {user.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  {user.isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onAdminPanel}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLogout}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={onLogin}
                className="bg-[var(--gradient-warm)] hover:opacity-90 shadow-[var(--shadow-soft)]"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Prihlásiť sa
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};