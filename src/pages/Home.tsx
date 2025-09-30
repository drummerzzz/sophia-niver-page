import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CountdownTimer from "@/components/CountdownTimer";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Gift, Mail, Calendar, Heart } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import sophia from "@/assets/sophia.png";
import HiddenYouTubePlayer from "@/components/HiddenYouTubePlayer";


const Home = () => {
  const showButtons = false
  return (
    <div className="min-h-screen bg-gradient-sky">
      
      {/* Hero Section */}
      <HiddenYouTubePlayer videoId="cjONzZPJONc" startTime={7} />
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="relative mx-auto max-w-4xl">
              <img 
                src={farmHero} 
                alt="Fazendinha da Ana Sophia" 
                className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-farm animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl">
                <img 
                  src={sophia} 
                  alt="aniversariante" 
                  className="w-auto h-64 md:h-96 animate-wiggle"
                  style={{
                    marginLeft: '-1rem'
                  }}
                />
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-fredoka font-bold text-primary animate-bounce-soft">
                Ana Sophia
                <span className="block text-3xl md:text-5xl lg:text-6xl text-farm-green">
                  está fazendo 2 aninhos! 🎂
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-fredoka max-w-2xl mx-auto">
                Venha celebrar conosco na nossa festa da fazendinha rosa! 🐷💕🌻
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-glow">
            <CountdownTimer />
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      {showButtons && <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-primary mb-4">
              🎉 Prepare-se para a festa!
            </h2>
            <p className="text-lg text-muted-foreground font-fredoka">
              Tudo que você precisa para participar da nossa celebração
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center space-y-4 hover:scale-105 transition-transform shadow-soft hover:shadow-glow bg-gradient-farm border-none">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary animate-bounce-soft" />
              </div>
              <h3 className="text-xl font-fredoka font-bold text-foreground">
                Criar Convite
              </h3>
              <p className="text-muted-foreground font-fredoka">
                Gere seu convite personalizado para a festa da Ana Sophia
              </p>
              <Button asChild variant="birthday" size="lg" className="w-full">
                <Link to="/convite">
                  <Mail className="w-5 h-5" />
                  Fazer Convite
                </Link>
              </Button>
            </Card>

            <Card className="p-6 text-center space-y-4 hover:scale-105 transition-transform shadow-soft hover:shadow-glow bg-gradient-field border-none">
              <div className="w-16 h-16 bg-farm-green/20 rounded-full flex items-center justify-center mx-auto">
                <Gift className="w-8 h-8 text-farm-green animate-wiggle" />
              </div>
              <h3 className="text-xl font-fredoka font-bold text-foreground">
                Sugestões de Presente
              </h3>
              <p className="text-muted-foreground font-fredoka">
                Veja ideias de presentes que a Ana Sophia vai adorar
              </p>
              <Button asChild variant="invite" size="lg" className="w-full">
                <Link to="/presentes">
                  <Gift className="w-5 h-5" />
                  Ver Presentes
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>}

      {/* Footer */}
      <footer className="py-8 text-center bg-card/50 backdrop-blur-sm border-t border-border/30">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground font-fredoka flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-primary animate-pulse" /> para Ana Sophia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;