import { Button } from "@/components/ui/button";
import { Heart, Users, Home, Baby, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categories = [
  { id: null, label: 'Všetky', icon: Grid3X3 },
  { id: 'partneri', label: 'Partneri', icon: Heart },
  { id: 'kamaráti', label: 'Kamaráti', icon: Users },
  { id: 'rodina', label: 'Rodina', icon: Home },
  { id: 'rodič-dieťa', label: 'Rodič & Dieťa', icon: Baby }
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id || 'all'}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "transition-all duration-200",
              isSelected 
                ? "bg-[var(--gradient-warm)] shadow-[var(--shadow-soft)]" 
                : "hover:bg-accent/50"
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};