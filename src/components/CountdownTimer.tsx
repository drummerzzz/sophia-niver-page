import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { EVENT_INFO } from "@/utils/inviteUtils";
import { MapPin } from "lucide-react";

// Data do aniversário: 10/11/2025
const BIRTHDAY_DATE = new Date("2025-11-10T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = BIRTHDAY_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    setIsLoaded(true);

    return () => clearInterval(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-2xl font-fredoka">⏰ Carregando...</div>
      </div>
    );
  }

  const timeUnits = [
    { label: "Dias", value: timeLeft.days, color: "bg-primary" },
    { label: "Horas", value: timeLeft.hours, color: "bg-farm-green" },
    { label: "Minutos", value: timeLeft.minutes, color: "bg-farm-yellow" },
    { label: "Segundos", value: timeLeft.seconds, color: "bg-accent" },
  ];

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-primary animate-bounce-soft">
          <p className="font-fredoka text-muted-foreground text-primary pb-2">{EVENT_INFO.data} {EVENT_INFO.horario !== null && <span>
            ás {EVENT_INFO.horario}
            </span>}
          </p>
          ⏰ Faltam apenas...
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {timeUnits.map((unit, index) => (
          <Card 
            key={unit.label} 
            className={`p-4 text-center shadow-soft hover:shadow-glow transition-all duration-300 animate-float ${unit.color} text-white border-none`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className="text-2xl md:text-3xl font-fredoka font-bold animate-pulse">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm font-fredoka font-medium opacity-90">
              {unit.label}
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center gap-3 text-left">
        <MapPin className="w-8 h-8 text-farm-yellow flex-shrink-0" />
        <div>
          <p className="font-fredoka font-semibold text-foreground">Local</p>
          <p className="font-fredoka text-muted-foreground text-1xl">{EVENT_INFO.local}</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
