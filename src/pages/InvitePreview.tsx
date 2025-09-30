import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const InvitePreview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const data = searchParams.get("data");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-3xl text-muted-foreground mb-4">Convite não encontrado</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-20 left-20 text-pink-300 w-8 h-8 animate-pulse" />
        <Sparkles className="absolute top-40 right-32 text-rose-300 w-6 h-6 animate-pulse delay-300" />
        <Sparkles className="absolute bottom-32 left-40 text-pink-400 w-7 h-7 animate-pulse delay-500" />
        <Sparkles className="absolute bottom-20 right-20 text-rose-200 w-5 h-5 animate-pulse delay-700" />
      </div>

      <div 
        className={`relative z-10 transition-all duration-1000 transform ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary animate-fade-in mb-3" style={{ fontFamily: 'Fredoka' }}>
            Você foi convidado! 🎉
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Toque no envelope para abrir
          </p>
        </div>

        {/* Envelope container */}
        <div className="relative w-[500px] h-[340px] animate-wiggle">
          {/* Envelope back/body */}
          <div 
            className="absolute inset-0 rounded-lg overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
              boxShadow: '0 20px 60px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            {/* Diagonal fold lines for depth */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  linear-gradient(135deg, transparent 48%, rgba(0,0,0,0.1) 48%, rgba(0,0,0,0.1) 52%, transparent 52%),
                  linear-gradient(225deg, transparent 48%, rgba(0,0,0,0.1) 48%, rgba(0,0,0,0.1) 52%, transparent 52%)
                `
              }}
            />
          </div>

          {/* Envelope flap - realistic triangular top */}
          <div 
            className="absolute -top-1 left-0 right-0 h-[170px] overflow-visible px-3"
            style={{ 
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformOrigin: 'top center'
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: '#f472b6',
                filter: 'brightness(1.05)',
                marginTop: '0.34rem'
              }}
            >
              {/* Center fold shadow */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)'
                }}
              />
              
              {/* Left fold shadow */}
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%)'
                }}
              />
              
              {/* Right fold shadow */}
              <div 
                className="absolute top-0 right-0 w-full h-full"
                style={{
                  background: 'linear-gradient(225deg, rgba(0,0,0,0.1) 0%, transparent 50%)'
                }}
              />
            </div>
          </div>

          {/* Button centered in envelope */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to={`/invites?data=${data}`}>
              <Button
                variant="farm"
                size="lg"
                className="text-2xl px-12 py-8 rounded-full shadow-2xl hover:shadow-pink-400/50 transform hover:scale-110 transition-all duration-300 animate-pulse-glow z-20 bg-white text-primary hover:bg-white/90 font-bold"
                >
                <Gift className="w-16 h-16 mr-3" />
                Abrir Convite
              </Button>
            </Link>
          </div>

          {/* Floating sparkles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Sparkles className="absolute -top-24 -left-24 w-6 h-6 text-yellow-200 animate-pulse" />
            <Sparkles className="absolute -top-24 -right-24 w-6 h-6 text-yellow-200 animate-pulse delay-200" />
            <Sparkles className="absolute -bottom-24 -left-24 w-6 h-6 text-yellow-200 animate-pulse delay-300" />
            <Sparkles className="absolute -bottom-24 -right-24 w-6 h-6 text-yellow-200 animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePreview;