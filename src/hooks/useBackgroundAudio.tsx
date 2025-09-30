import { useEffect, useRef, useState } from 'react';

interface UseBackgroundAudioProps {
  src: string;
  startTime?: number;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

export const useBackgroundAudio = ({
  src,
  startTime = 0,
  autoPlay = true,
  loop = true,
  volume = 0.3
}: UseBackgroundAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.loop = loop;
    audio.volume = volume;
    
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (autoPlay) {
        // Set start time and play
        audio.currentTime = startTime;
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log('Autoplay prevented:', error);
            // Autoplay was prevented, user needs to interact first
          });
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [src, startTime, autoPlay, loop, volume]);

  const play = () => {
    if (audioRef.current) {
      if (!isLoaded) {
        audioRef.current.currentTime = startTime;
      }
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Play failed:', error));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return {
    isPlaying,
    isLoaded,
    play,
    pause,
    toggle,
    audio: audioRef.current
  };
};