import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  BarChart3, 
  Settings, 
  Code2, 
  Cloud, 
  Zap,
  Brain,
  TrendingUp 
} from "lucide-react";

const skills = [
  {
    category: "Visualização de Dados",
    icon: <BarChart3 className="h-8 w-8" />,
    description: "Criação de dashboards interativos e relatórios para tomada de decisão",
    technologies: ["Power BI", "Looker Studio", "Excel"]
  },
  {
    category: "Automação de Processos",
    icon: <Settings className="h-8 w-8" />,
    description: "Automatização de tarefas repetitivas e integração de sistemas",
    technologies: ["N8N", "Python"]
  },
  {
    category: "Análise e Processamento de Dados",
    icon: <Database className="h-8 w-8" />,
    description: "Tratamento, consultas e organização de dados",
    technologies: ["SQL", "Python", "ETL"]
  },
  {
    category: "Desenvolvimento Web",
    icon: <Code2 className="h-8 w-8" />,
    description: "Construção de aplicações e APIs simples para análise de dados",
    technologies: ["React", "JavaScript", "FastAPI"]
  },
  {
    category: "Cloud & Versionamento",
    icon: <Cloud className="h-8 w-8" />,
    description: "Uso de ambientes em nuvem e boas práticas de versionamento",
    technologies: ["GitHub", "Google Cloud", "Docker"]
  },
  {
    category: "Integração de Sistemas",
    icon: <Brain className="h-8 w-8" />,
    description: "Conexão entre ferramentas e serviços para fluxo de dados contínuo",
    technologies: ["APIs REST", "N8N", "Webhooks"]
  }
];

const SkillsSection = () => {
  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Especializações
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Domínio completo do stack moderno de dados e automações
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-card hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-primary rounded-lg mr-4 text-primary-foreground">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-secondary/60 hover:bg-secondary/80 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 px-4 py-2 rounded-full">
            <TrendingUp className="h-4 w-4" />
            Sempre aprendendo novas tecnologias
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;