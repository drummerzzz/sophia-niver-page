import { useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string; // caminho do arquivo de áudio dentro de public/assets
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => {
        console.warn("Autoplay bloqueado, precisa de interação do usuário:", err);
      });
    }
  }, [src]);

  return <audio ref={audioRef} src={src} autoPlay loop />;
};

export default AudioPlayer;
