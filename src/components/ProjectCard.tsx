import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({ title, description, image, technologies, category, githubUrl, liveUrl }: ProjectCardProps) => {
  return (
    <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-card hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {githubUrl && (
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <Github className="h-4 w-4" />
              </Button>
            )}
            {liveUrl && (
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
          {category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs border-border/50 hover:border-primary/50 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;