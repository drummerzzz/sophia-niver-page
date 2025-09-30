import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Gift, Mail, Calendar } from "lucide-react";
import pigMascot from "@/assets/pig-mascot.png";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/invites", icon: Mail, label: "Convite" },
    { path: "/presentes", icon: Gift, label: "Presentes" },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img 
              src={pigMascot} 
              alt="Mascote da fazendinha" 
              className="w-12 h-12 animate-wiggle"
            />
            <div className="text-xl font-fredoka font-bold text-primary">
              Ana Sophia 💕
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "birthday" : "ghost"}
                  size="sm"
                  asChild
                  className={isActive ? "animate-bounce-soft" : ""}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;