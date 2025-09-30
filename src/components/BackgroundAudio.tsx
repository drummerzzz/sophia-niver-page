import { useBackgroundAudio } from "@/hooks/useBackgroundAudio";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

interface BackgroundAudioProps {
  youtubeId: string;
  startTime?: number;
}

const BackgroundAudio = ({ youtubeId, startTime = 7 }: BackgroundAudioProps) => {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Use a YouTube to MP3 converter API or service
  // For demo purposes, we'll use a placeholder that would be replaced with actual audio
  const audioUrl = `https://cors-anywhere.herokuapp.com/https://www.youtube.com/embed/${youtubeId}`;
  
  const { isPlaying, isLoaded, play, pause, toggle } = useBackgroundAudio({
    src: "/audio/farm-song.mp3",
    startTime,
    autoPlay: false, // Start with false due to browser autoplay policies
    loop: true,
    volume: 0.2
  });

  // Handle user interaction to enable autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        play();
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [userInteracted, play]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggle}
        variant="outline"
        size="sm"
        className="bg-white/80 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary/10 shadow-lg"
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </Button>
      
      {!userInteracted && (
        <div className="absolute -top-12 right-0 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-fredoka whitespace-nowrap shadow-lg animate-bounce-soft">
          🎵 Clique para ouvir música!
        </div>
      )}
    </div>
  );
};

export default BackgroundAudio;