'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWithBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  overlay?: 'dark' | 'darker' | 'light';
  /** Position de l'image de fond : 'top' pour privilégier le haut, 'center' par défaut */
  objectPosition?: 'top' | 'center' | 'bottom';
}

/** Section avec image de fond et léger effet parallaxe type Apple */
export function SectionWithBackground({
  src,
  alt,
  children,
  className = '',
  overlay = 'darker',
  objectPosition = 'center',
}: SectionWithBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '8%']);
  const scale = useTransform(scrollYProgress, [0.1, 0.35], [1.02, 1]);

  const overlayClass =
    overlay === 'dark'
      ? 'bg-black/40'
      : overlay === 'darker'
        ? 'bg-black/55'
        : 'bg-black/25';

  return (
    <div ref={ref} role="region" className={`relative min-h-[50vh] overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          sizes="100vw"
          priority={false}
        />
        <div className={`absolute inset-0 ${overlayClass}`} aria-hidden />
      </motion.div>
      <div className="relative z-0">{children}</div>
    </div>
  );
}
