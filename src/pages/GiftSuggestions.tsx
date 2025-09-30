import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Gift, Heart, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import pigMascot from "@/assets/pig-mascot.png";

interface GiftSuggestion {
  categoria: string;
  icon: string;
  cor: string;
  itens: {
    nome: string;
    descricao: string;
    emoji: string;
  }[];
}

const giftSuggestions: GiftSuggestion[] = [
  {
    categoria: "Roupas e Conforto",
    icon: "👗",
    cor: "bg-yellow-soft",
    itens: [
      {
        nome: "Vestidinhos",
        descricao: "Coloridos, leves e confortáveis para brincar",
        emoji: "🌸"
      },
      {
        nome: "Pijaminhas Divertidos",
        descricao: "Macios e com estampas fofas",
        emoji: "🌙"
      },
      {
        nome: "Tênis e Sandalinhas",
        descricao: "Leves, seguros e antiderrapantes",
        emoji: "👟"
      }
    ]
  },  
  {
    categoria: "Brincadeiras de Faz de Conta",
    icon: "🎭",
    cor: "bg-pink-soft",
    itens: [
      {
        nome: "Cozinha de Brinquedo",
        descricao: "Mini panelinhas e comidinhas",
        emoji: "🍳"
      },
      {
        nome: "Boneca de Pano",
        descricao: "Leve, macia e segura para abraçar",
        emoji: "🧵"
      },
      {
        nome: "Kit Veterinária ou Médica",
        descricao: "Para brincar de cuidar dos bichinhos ou bonecas",
        emoji: "🩺"
      }
    ]
  },
  {
    categoria: "Criatividade e Arte",
    icon: "🎨",
    cor: "bg-accent",
    itens: [
      {
        nome: "Painel de Desenho",
        descricao: "Lousa mágica ou quadro branco infantil",
        emoji: "🖼️"
      }
    ]
  }
];

const GiftSuggestions = () => {
  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src={pigMascot} 
            alt="Mascote da fazenda" 
            className="w-20 h-20 mx-auto mb-4 animate-bounce-soft"
          />
          <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-primary mb-4">
            🎁 Sugestões de Presente
          </h1>
          <p className="text-lg text-muted-foreground font-fredoka max-w-2xl mx-auto">
            Ideias especiais para tornar o aniversário da Ana Sophia ainda mais mágico! 
            Lembre-se: ela tem apenas 2 aninhos 💕
          </p>
        </div>

        {/* Gift Categories */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {giftSuggestions.map((categoria, index) => (
            <Card 
              key={categoria.categoria} 
              className={`p-6 md:p-8 shadow-soft hover:shadow-glow transition-all duration-300 border-2 border-primary/20 ${categoria.cor}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{categoria.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-foreground">
                    {categoria.categoria}
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoria.itens.map((item, itemIndex) => (
                  <Card 
                    key={item.nome} 
                    className="p-4 bg-white/60 hover:bg-white/80 transition-colors border border-white/50 hover:scale-105 transform duration-200"
                  >
                    <div className="text-center space-y-2">
                      <div className="text-3xl mb-2">{item.emoji}</div>
                      <h3 className="font-fredoka font-bold text-foreground text-lg">
                        {item.nome}
                      </h3>
                      <p className="font-fredoka text-sm text-muted-foreground">
                        {item.descricao}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 p-6 md:p-8 text-center bg-gradient-farm border-none shadow-glow max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-foreground">
                Dicas Importantes
              </h3>
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-farm-green" />
                  <span className="font-fredoka font-semibold text-sm">Idade apropriada</span>
                </div>
                <p className="font-fredoka text-sm text-muted-foreground">
                  Verifique se o brinquedo é adequado para 2 anos
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-farm-green" />
                  <span className="font-fredoka font-semibold text-sm">Segurança</span>
                </div>
                <p className="font-fredoka text-sm text-muted-foreground">
                  Evite peças pequenas que possam ser engolidas
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-farm-green" />
                  <span className="font-fredoka font-semibold text-sm">Tema</span>
                </div>
                <p className="font-fredoka text-sm text-muted-foreground">
                  Cores rosa e tema fazendinha são sempre bem-vindos
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-farm-green" />
                  <span className="font-fredoka font-semibold text-sm">Carinho</span>
                </div>
                <p className="font-fredoka text-sm text-muted-foreground">
                  O que importa é o amor e a intenção! 💕
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg font-fredoka font-semibold text-primary mb-6">
            Sua presença já é o melhor presente! 🎉
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="birthday" size="lg">
              <Link to="/convite">
                <Gift className="w-5 h-5" />
                Gerar Convite
              </Link>
            </Button>
            <Button asChild variant="farm" size="lg">
              <Link to="/">
                <Heart className="w-5 h-5" />
                Voltar ao Início
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftSuggestions;