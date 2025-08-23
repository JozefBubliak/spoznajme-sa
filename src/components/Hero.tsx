import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import heroImage from "@/assets/hero-connection.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-warm">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="People connecting through meaningful conversations"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-sunset opacity-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-6">
          <Heart className="w-8 h-8 text-primary mr-3 animate-pulse" />
          <span className="text-primary font-semibold text-lg tracking-wide">DeepTalks</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-sunset bg-clip-text text-transparent">
            Lepšie rozhovory,
          </span>
          <br />
          <span className="text-foreground">
            bližšie vzťahy
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Praktické frázy, mini-príručky a hry pre rodiny a páry. 
          Jasné, použiteľné a prízemné riešenia pre skutočnú komunikáciu.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="hero" size="lg" className="group shadow-warm hover:shadow-glow transition-all duration-300">
            Začať rozhovor
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5">
            Preskúmať nástroje
          </Button>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 opacity-30 animate-bounce">
          <div className="w-16 h-16 bg-gradient-connection rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-32 left-16 opacity-20 animate-pulse">
          <div className="w-12 h-12 bg-gradient-sunset rounded-full blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
