import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Home, Baby } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: {
    id: string;
    text: string;
    category: 'partneri' | 'kamaráti' | 'rodina' | 'rodič-dieťa';
    isFavorite?: boolean;
  };
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

const categoryConfig = {
  'partneri': { 
    icon: Heart, 
    label: 'Partneri', 
    color: 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700' 
  },
  'kamaráti': { 
    icon: Users, 
    label: 'Kamaráti', 
    color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' 
  },
  'rodina': { 
    icon: Home, 
    label: 'Rodina', 
    color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' 
  },
  'rodič-dieťa': { 
    icon: Baby, 
    label: 'Rodič & Dieťa', 
    color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700' 
  }
};

export const QuestionCard = ({ question, onToggleFavorite, className }: QuestionCardProps) => {
  const config = categoryConfig[question.category];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 cursor-pointer",
      "border-border/50 bg-card/80 backdrop-blur-sm",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Badge className={cn("text-xs font-medium", config.color)}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
          
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(question.id);
              }}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Heart 
                className={cn(
                  "w-4 h-4 transition-colors",
                  question.isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
          )}
        </div>
        
        <p className="text-foreground leading-relaxed text-base">
          {question.text}
        </p>
      </CardContent>
    </Card>
  );
};