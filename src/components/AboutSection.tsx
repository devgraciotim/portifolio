import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Lightbulb } from "lucide-react";

const achievements = [
  "Criação de relatórios e dashboards que facilitaram a tomada de decisão em rotinas operacionais",
  "Desenvolvimento de dashboards que aumentaram a eficiência operacional",
  "Desenvolvimento de automações que reduziram tarefas repetitivas e economizaram tempo da equipe",
  "Apoio em processos de análise de dados que melhoraram a identificação de tendências e gargalos"
];

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Orientado a Resultados",
    description: "Foco em soluções que geram impacto mensurável"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Colaborativo",
    description: "Trabalho em equipe para alcançar objetivos comuns"
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Inovador",
    description: "Sempre buscando novas tecnologias e metodologias"
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* About Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Sou um profissional com experiência em análise e manipulação de dados, além 
                de interesse crescente em desenvolvimento de software. Gosto de transformar 
                informações em algo útil e de buscar maneiras de simplificar processos por meio de 
                automações e boas práticas de programação.
              </p>
              <p className="text-lg leading-relaxed">
                Minha vivência combina a parte técnica com a visão prática do negócio, o que me 
                ajuda a propor soluções que realmente fazem diferença no dia a dia. Valorizo muito 
                aprender continuamente e aplicar esse aprendizado em projetos que tragam eficiência e 
                clareza para as organizações.
              </p>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Principais Conquistas</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Values Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-8">Meus Valores</h3>
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 rounded-lg text-white bg-gradient-primary">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-semibold">{value.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* CTA Card */}
            <Card className="bg-gradient-primary text-primary-foreground mt-8">
              <CardContent className="p-6 text-center">
                <h4 className="text-xl font-semibold mb-2">Vamos Trabalhar Juntos?</h4>
                <p className="text-primary-foreground/80 mb-4">
                  Pronto para transformar seus dados em vantagem competitiva
                </p>
                <div className="text-sm opacity-90">
                  Entre em contato para discutir seu projeto
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;