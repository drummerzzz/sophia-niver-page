import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Calendar, MapPin, Clock, Phone, User, ArrowLeft, Heart } from "lucide-react";
import { InviteData, decodeInviteData, EVENT_INFO } from "@/utils/inviteUtils";
import invitationBg from "@/assets/invitation-bg.jpg";
import sophia from "@/assets/sophia.png";
import CountdownTimer from "@/components/CountdownTimer";
import NotFound from "./NotFound";

const InviteViewer = () => {
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

   if (!showInvite) {
    return (
      <div className="min-h-screen bg-gradient-sky">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <Button color="primary" onClick={()=> setShowInvite(true)}>
              Ver convite
            </Button>
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
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Invitation Card */}
          <Card className="relative overflow-hidden shadow-glow border-none bg-white">
            {/* Background Image */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${invitationBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            
            {/* Content */}
            <div className="relative p-8 md:p-12 text-center space-y-2">
              {/* Header */}
              <div className="space-y-2">
                <div className="text-4xl">🎂✨</div>
                <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-primary">
                  Você está convidado(a)!
                </h1>
                <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-primary">
                  para o aniversário da {EVENT_INFO.aniversariante}
                </h2>
                <div className="flex justify-center">
                  <img 
                    src={sophia} 
                    alt="Aniversariante" 
                    className="w-32 h-auto animate-float"
                  />
                </div>
                <p className="text-lg font-fredoka text-muted-foreground">
                  Fazendo {EVENT_INFO.idade} com muito amor! 💕
                </p>
              </div>

                <div className="container mx-auto px-4">
                  <Card className="max-w-4xl mx-auto p-6 md:p-10 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-glow">
                    <CountdownTimer />
                  </Card>
                </div>

              {/* Event Details */}
              <div className="space-y-4 bg-card/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-left">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-fredoka font-semibold text-foreground">Data</p>
                    <p className="font-fredoka text-muted-foreground">{EVENT_INFO.data}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <Clock className="w-5 h-5 text-farm-green flex-shrink-0" />
                  <div>
                    <p className="font-fredoka font-semibold text-foreground">Horário</p>
                    <p className="font-fredoka text-muted-foreground">{EVENT_INFO.horario}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <MapPin className="w-5 h-5 text-farm-yellow flex-shrink-0" />
                  <div>
                    <p className="font-fredoka font-semibold text-foreground">Local</p>
                    <p className="font-fredoka text-muted-foreground">{EVENT_INFO.local}</p>
                  </div>
                </div>
              </div>

              {/* Guest Info */}
              <div className="space-y-4 bg-gradient-farm rounded-2xl p-6">
                <h3 className="text-lg font-fredoka font-bold text-foreground">
                  👤 Informações dos Convidados
                </h3>
                
                <div className="space-y-3 text-left">
                  {inviteData.convidados.map((name) => {
                    return (
                      <div key={name} className="flex items-center gap-3">
                        <User className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-fredoka font-semibold">{name}</span>
                    </div>
                    )
                  })}
                  
                  {inviteData.nomeResponsavel && (
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-fredoka text-sm">Responsável: {inviteData.nomeResponsavel}</span>
                    </div>
                  )}
                  
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

              {/* Footer Message */}
              <div className="space-y-4">
                <div className="text-2xl">🌟🎉🌟</div>
                <p className="text-lg font-fredoka font-semibold text-primary">
                  Sua presença é o nosso presente!
                </p>
                <p className="text-sm font-fredoka text-muted-foreground">
                  Venha celebrar esse momento especial conosco! 💕
                </p>
              </div>

              {/* Action Buttons */}
              {inviteData.convidados.length > 100 && <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="birthday" size="lg" className="flex-1">
                  <Link to="/presentes">
                    Sugestões de Presente 🎁
                  </Link>
                </Button>
                <Button asChild variant="farm" size="lg" className="flex-1">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar ao Início
                  </Link>
                </Button>
              </div>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InviteViewer;