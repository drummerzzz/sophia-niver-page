import { useEffect, useRef } from 'react';

interface HiddenYouTubePlayerProps {
  videoId: string;
  startTime?: number;
}

const HiddenYouTubePlayer = ({ videoId, startTime = 7 }: HiddenYouTubePlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Force autoplay immediately
    if (iframeRef.current) {
      const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&autohide=1&mute=0&volume=50`;
      iframeRef.current.src = src;
    }
  }, [videoId, startTime]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&disablekb=1&autohide=1&mute=0&volume=50`}
      style={{
        position: 'fixed',
        top: '-1000px',
        left: '-1000px',
        width: '560px',
        height: '315px',
        zIndex: -999,
        opacity: 0,
        pointerEvents: 'none'
      }}
      allow="autoplay; encrypted-media"
      title="Background audio"
    />
  );
};

export default HiddenYouTubePlayer;