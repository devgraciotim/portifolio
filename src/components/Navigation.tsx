import { Button } from "@/components/ui/button";
import { Home, FolderOpen, User, Mail } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Início", path: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Projetos", path: "/projetos", icon: <FolderOpen className="h-4 w-4" /> },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {"</>"}
          </Link>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className={location.pathname === item.path ? "bg-gradient-primary" : ""}
                >
                  {item.icon}
                  <span className="ml-2 hidden sm:inline">{item.name}</span>
                </Button>
              </Link>
            ))}
            
            <a href="#contato" className="ml-4">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Contato</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;