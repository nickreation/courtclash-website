'use client';

import { useRef, useEffect } from 'react';

interface VideoAutoplayInViewProps {
  src: string;
  className?: string;
  ariaLabel: string;
}

/**
 * Vidéo qui démarre à la lecture quand elle entre dans le viewport,
 * et se met en pause quand elle sort. En mute par défaut (requis par les navigateurs pour l’autoplay).
 */
export function VideoAutoplayInView({ src, className = '', ariaLabel }: VideoAutoplayInViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25, rootMargin: '0px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      controls
      playsInline
      muted
      loop
      preload="metadata"
      aria-label={ariaLabel}
    />
  );
}
