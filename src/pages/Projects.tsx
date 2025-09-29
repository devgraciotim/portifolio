import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

// Import project images
import projectPowerBI from "@/assets/project-powerbi.jpg";
import projectETL from "@/assets/project-etl.jpg";
import projectDocker from "@/assets/project-docker.jpg";
import projectLooker from "@/assets/project-looker.jpg";
import projectML from "@/assets/project-ml.jpg";
import projectCloud from "@/assets/project-cloud.jpg";

const projects = [
  {
    id: 1,
    title: "Dashboard Executivo - Power BI",
    description: "Dashboard interativo para análise de vendas e performance, com KPIs em tempo real e visualizações avançadas. Integração com múltiplas fontes de dados.",
    image: projectPowerBI,
    technologies: ["Power BI", "DAX", "Power Query", "PostgreSQL"],
    category: "Visualização"
  },
  {
    id: 2,
    title: "Pipeline ETL Automatizado",
    description: "Sistema completo de extração, transformação e carga de dados com Python. Processa milhares de registros diariamente com monitoramento e alertas.",
    image: projectETL,
    technologies: ["Python", "Pandas", "N8N", "PostgreSQL"],
    category: "Automação"
  },
  {
    id: 3,
    title: "Infraestrutura DevOps",
    description: "Configuração de uma infraestrutura conteinerizada utilizando Docker em servidores Linux, garantindo ambientes isolados e consistentes para aplicações de dados.",
    image: projectDocker,
    technologies: ["Docker", "Linux"],
    category: "DevOps"
  },
  // {
  //   id: 4,
  //   title: "Analytics Web - Looker Studio",
  //   description: "Painel de analytics para e-commerce com métricas de conversão, comportamento do usuário e análise geográfica. Atualização automática via API.",
  //   image: projectLooker,
  //   technologies: ["Looker Studio", "Google Analytics", "BigQuery", "Data Studio"],
  //   category: "Visualização"
  // },
  // {
  //   id: 5,
  //   title: "Modelo Preditivo de Vendas",
  //   description: "Machine Learning para previsão de demanda com 95% de precisão. Implementação em produção com monitoramento de drift de dados.",
  //   image: projectML,
  //   technologies: ["Python", "Scikit-learn", "MLflow", "FastAPI"],
  //   category: "Machine Learning"
  // },
  // {
  //   id: 6,
  //   title: "Arquitetura Cloud Escalável",
  //   description: "Data Lake na AWS com processamento serverless. Arquitetura que escala automaticamente baseada na demanda de dados.",
  //   image: projectCloud,
  //   technologies: ["AWS", "Lambda", "S3", "Glue", "Redshift"],
  //   category: "Cloud"
  // }
];

const categories = ["Todos", "Visualização", "Automação", "DevOps", "Machine Learning", "Cloud"];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const filteredProjects = selectedCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/portifolio">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Meus Projetos
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Uma seleção dos meus principais trabalhos em análise de dados, 
              automações e infraestrutura moderna
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtrar por:</span>
              </div>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCategory === category 
                      ? "bg-gradient-primary text-primary-foreground" 
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground">
              Mostrando {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${project.id * 0.1}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum projeto encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Gostou dos Projetos?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cada projeto representa uma solução única para desafios reais de negócio. 
            Vamos conversar sobre como posso ajudar seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <HashLink smooth to="/portifolio#contato">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Iniciar Conversa
              </Button>
            </HashLink>

            
            <Link to="/portifolio" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" size="lg" className="hover:bg-gradient-primary">
                Conhecer Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;