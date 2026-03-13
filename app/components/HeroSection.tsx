'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type HeroMessages = {
  title1: string;
  title2: string;
  intro: string;
  cta: string;
  imageAlt: string;
};

const easeApple = [0.22, 0.61, 0.36, 1];

export function HeroSection({ messages }: { messages: HeroMessages }) {
  const reducedMotion = useReducedMotion();
  const animate = reducedMotion !== true;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0.3, 0.6], [0, 8]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pt-12 pb-20 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 min-h-[85vh] flex flex-col justify-center"
    >
      <div className="mx-auto max-w-6xl w-full flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-20">
          {/* Texte */}
          <div className="flex flex-col text-center md:text-left md:max-w-[52%] md:min-w-0 order-2 md:order-1">
            <motion.h1
              className="font-ethnocen text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
              initial={animate ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeApple }}
            >
              <span className="text-hero-gradient">{messages.title1}</span>
              <br />
              <span className="text-text">{messages.title2}</span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:mt-5 sm:text-lg md:mx-0 md:text-xl"
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: animate ? 0.12 : 0, ease: easeApple }}
            >
              {messages.intro.split('Court Clash').length > 1 ? (
                <>
                  {messages.intro.split('Court Clash')[0]}
                  <strong className="text-hero-gradient">Court Clash</strong>
                  {messages.intro.split('Court Clash')[1]}
                </>
              ) : (
                messages.intro
              )}
            </motion.p>
            <motion.p
              className="mx-auto mt-3 max-w-xl text-sm text-text-secondary sm:mt-4 sm:text-base md:mx-0 md:text-lg"
              initial={animate ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: animate ? 0.22 : 0, ease: easeApple }}
            >
              {messages.cta}
            </motion.p>
          </div>

          {/* Image – cadre proportionné au sujet (rempli, pas de vide) */}
          <motion.div
            className="relative flex-shrink-0 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px] aspect-[2/3] overflow-hidden rounded-2xl bg-surface/30 shadow-glow-primary ring-1 ring-border/50 order-1 md:order-2 md:animate-float"
            initial={
              animate
                ? { opacity: 0, scale: 0.92, y: 16 }
                : false
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: animate ? 0.18 : 0,
              ease: easeApple,
            }}
          >
            <Image
              src="/images/player-dunk.png"
              alt={messages.imageAlt}
              fill
              className="object-cover object-[50%_72%] select-none"
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 320px"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll – disparaît en scrollant */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary"
        style={{
          opacity: scrollIndicatorOpacity,
          y: scrollIndicatorY,
        }}
        aria-hidden
      >
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest">
          Découvrir
        </span>
        <motion.div
          className="flex flex-col items-center"
          animate={animate ? { y: [0, 6, 0] } : {}}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
