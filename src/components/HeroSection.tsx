import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useLocation, Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="herosection">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <img 
          src={heroImage} 
          alt="Data visualization background" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            João Graciotim
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Especialista em Dados & Automações
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            Transformo dados em insights valiosos e automatizo processos complexos 
            usando as tecnologias mais modernas do mercado
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
            <a href="#contato">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Entre em Contato
              </Button>
            </a>
            <Link to="/projetos">
    <Button
      variant="outline"
      size="lg"
      className="border-primary/50 hover:bg-primary/10 flex items-center"
    >
      <Github className="mr-2 h-5 w-5" />
      Ver Projetos
    </Button>
  </Link>
          </div>
          
          <div className="flex justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800">
            <a href="https://github.com/devgraciotim" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/joaograciotim/" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:j.graciotim@outlook.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;