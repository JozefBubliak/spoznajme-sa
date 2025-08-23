import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string | StaticImageData;
  imageAlt: string;
  ctaText: string;
  href: string;
  variant?: "default" | "accent" | "connection";
}

const FeatureCard = ({ 
  title, 
  description, 
  image, 
  imageAlt, 
  ctaText, 
  href,
  variant = "default" 
}: FeatureCardProps) => {
  const variantClasses = {
    default: "bg-card hover:shadow-soft",
    accent: "bg-gradient-to-br from-accent/10 to-accent/5 hover:shadow-warm",
    connection: "bg-gradient-to-br from-connection/10 to-connection/5 hover:shadow-glow"
  };

  return (
    <div className={`
      ${variantClasses[variant]}
      rounded-2xl p-8 transition-all duration-300 group cursor-pointer
      hover:scale-105 hover:-translate-y-2 border border-border/30
    `}>
      <div className="aspect-square w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-soft">
        <Image
          src={image}
          alt={imageAlt}
          width={96}
          height={96}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-center mb-8 leading-relaxed">
        {description}
      </p>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          className="group/btn border-primary/30 text-primary hover:bg-primary/10"
          asChild
        >
          <a href={href}>
            {ctaText}
            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;