import { Gift, Mail, Calendar, Heart, Clock, MapPin, User, Phone } from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { InviteData, decodeInviteData, EVENT_INFO } from "@/utils/inviteUtils";
import sophia from "@/assets/sophia.png";
import CountdownTimer from "@/components/CountdownTimer";
import NotFound from "./NotFound";
import { Button } from "@/components/ui/button";


const Home = () => {
  const [searchParams] = useSearchParams();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const dataParam = searchParams.get("data");
    
    if (!dataParam) {
      setError("Link do convite inválido");
      setIsLoading(false);
      return;
    }

    const decoded = decodeInviteData(dataParam);
    
    if (!decoded) {
      setError("Não foi possível carregar os dados do convite");
      setIsLoading(false);
      return;
    }

    setInviteData(decoded);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-sky">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-lg font-fredoka text-muted-foreground">Carregando convite...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <NotFound />
    )
  }
  return (
    <div className="min-h-screen bg-gradient-sky">      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-4">
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
                  className="w-64 h-auto animate-wiggle"
                />
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-fredoka font-bold text-primary animate-bounce-soft">
                Ana Sophia
                <span className="block text-3xl md:text-5xl lg:text-6xl text-farm-green">
                  está fazendo 2 aninhos! 🎂
                </span>
                <p className="text-xl md:text-2xl text-muted-foreground font-fredoka max-w-2xl mx-auto">
                  Venha celebrar conosco na nossa festa da fazendinha rosa! 🐷💕🌻
                </p>
              </h1>
              
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-glow">
            <CountdownTimer />
          </Card>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
        {/* Guest Info */}
        <div className="space-y-4 bg-gradient-farm rounded-2xl p-6">
          <h1 className="text-4xl text-center font-bold text-foreground">
            Convidados
          </h1>
          
          <div className="space-y-3 text-left">
            {inviteData.convidados.map((name) => {
              return (
                <div key={name} className="flex justify-center items-center gap-3">
                  <h2 className="text-3xl font-semibold">{name}</h2>
              </div>
              )
            })}
            
            {inviteData.telefone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-fredoka text-sm">{inviteData.telefone}</span>
              </div>
            )}
            
            {inviteData.observacoes && (
              <div className="mt-3 p-3 bg-white/30 rounded-lg">
                <p className="font-fredoka text-sm font-semibold text-foreground mb-1">Observações:</p>
                <p className="font-fredoka text-sm text-muted-foreground">{inviteData.observacoes}</p>
              </div>
            )}
          </div>
        </div>

        </div>
        <div className="max-w-2xl space-y-2 mx-auto text-center p-4">
          <div className="text-2xl">🌟🎉🌟</div>
          <p className="text-lg font-fredoka font-semibold text-primary">
            Sua presença é o nosso presente!
          </p>
          <p className="text-sm font-fredoka text-muted-foreground">
            Venha celebrar esse momento especial conosco! 💕
          </p>
        </div>
      </div>
  

      {/* Footer */}
      <footer className="py-8 text-center bg-card/50 backdrop-blur-sm border-t border-border/30">
        <div className="container mx-auto px-4 py-4">
          <p className="text-muted-foreground font-fredoka flex items-center justify-center gap-2">
            Feito com <Heart className="w-4 h-4 text-primary animate-pulse" /> para Ana Sophia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;