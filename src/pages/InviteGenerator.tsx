import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { Mail, Copy, Share, CheckCircle, ArrowRightCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InviteData, generateInviteUrl, EVENT_INFO } from "@/utils/inviteUtils";
import pigMascot from "@/assets/pig-mascot.png";
import { Link } from "react-router-dom";

const InviteGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InviteData>>({
    nomeConvidado: "",
    nomeResponsavel: "",
    telefone: "",
    observacoes: "",
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof InviteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateInvite = async () => {
    if (!formData.nomeConvidado?.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, informe o nome do convidado",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const inviteData: InviteData = {
      convidados: formData.nomeConvidado.split(','),
      nomeConvidado: formData.nomeConvidado,
      nomeResponsavel: formData.nomeResponsavel || "",
      telefone: formData.telefone || "",
      observacoes: formData.observacoes || "",
      geradoEm: new Date().toISOString(),
    };

    const url = generateInviteUrl(inviteData);
    setGeneratedUrl(url);
    setIsLoading(false);

    toast({
      title: "Convite gerado com sucesso! 🎉",
      description: "Agora você pode compartilhar o link do convite",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      toast({
        title: "Copiado! 📋",
        description: "Link do convite copiado para a área de transferência",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    }
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Convite - Aniversário da ${EVENT_INFO.aniversariante}`,
          text: `Você está convidado(a) para a festa de ${EVENT_INFO.idade} da ${EVENT_INFO.aniversariante}! 🎂`,
          url: generatedUrl,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src={pigMascot} 
              alt="Mascote da fazenda" 
              className="w-20 h-20 mx-auto mb-4 animate-bounce-soft"
            />
            <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-primary mb-2">
              Gerar Convite 💌
            </h1>
            <p className="text-lg text-muted-foreground font-fredoka">
              Crie um convite personalizado para a festa da Ana Sophia
            </p>
          </div>

          {/* Form */}
          <Card className="p-6 md:p-8 shadow-soft bg-card/80 backdrop-blur-sm border-2 border-primary/20">
            <div className="space-y-6">
              {/* Nome do Convidado */}
              <div className="space-y-2">
                <Label htmlFor="nomeConvidado" className="text-sm font-fredoka font-semibold text-foreground">
                  Nome dos Convidados *
                </Label>
                <Input
                  id="nomeConvidado"
                  placeholder="Ex: Maria Silva, João Souza, Ana Pereira"
                  value={formData.nomeConvidado || ""}
                  onChange={(e) => handleInputChange("nomeConvidado", e.target.value)}
                  className="font-fredoka"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-sm font-fredoka font-semibold text-foreground">
                  Telefone (opcional)
                </Label>
                <Input
                  id="telefone"
                  placeholder="Ex: (11) 99999-9999"
                  value={formData.telefone || ""}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                  className="font-fredoka"
                />
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label htmlFor="observacoes" className="text-sm font-fredoka font-semibold text-foreground">
                  Observações (opcional)
                </Label>
                <Textarea
                  id="observacoes"
                  placeholder="Ex: Alergias, restrições alimentares, etc."
                  value={formData.observacoes || ""}
                  onChange={(e) => handleInputChange("observacoes", e.target.value)}
                  className="font-fredoka min-h-20"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateInvite}
                disabled={isLoading || !formData.nomeConvidado?.trim()}
                variant="birthday"
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Gerando convite...
                  </div>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Gerar Convite
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Invite */}
          {generatedUrl && (
            <Card className="mt-6 p-6 md:p-8 shadow-glow bg-gradient-farm border-none animate-bounce-soft">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-farm-green">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="text-xl font-fredoka font-bold">Convite gerado com sucesso!</h3>
                </div>
                
                <p className="text-sm font-fredoka text-muted-foreground">
                  Compartilhe este link com o convidado:
                </p>
                
                <div className="bg-white/20 rounded-lg p-3 break-all text-sm font-mono">
                  {generatedUrl}
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={copyToClipboard} variant="secondary" className="flex-1">
                    <Copy className="w-4 h-4" />
                    Copiar Link
                  </Button>
                  <Button onClick={shareInvite} variant="invite" className="flex-1">
                      Compartilhar
                      <Share className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button  variant="invite" className="flex-1">
                    <Link to={generatedUrl} target="_blank" >
                        Abrir
                        <ArrowRightCircle className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground font-fredoka">
                  💡 O convidado pode abrir este link para ver o convite personalizado
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteGenerator;