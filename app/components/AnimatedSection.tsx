'use client';

import { motion, useReducedMotion } from 'framer-motion';

const defaultFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Délai avant l'animation (en secondes) */
  delay?: number;
  /** Désactiver l'animation (ex. si reduced-motion) */
  disableAnimation?: boolean;
  /** Variante: fadeUp (défaut), fade, fadeUpStagger, scaleIn (type Apple) */
  variant?: 'fadeUp' | 'fade' | 'fadeUpStagger' | 'scaleIn';
  /** Pour stagger: délai entre chaque enfant */
  staggerDelay?: number;
}

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
  disableAnimation,
  variant = 'fadeUp',
  staggerDelay = 0.08,
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();
  const noAnimation = disableAnimation ?? (reducedMotion === true);
  const sectionProps = { className, id };

  if (noAnimation) {
    return <section {...sectionProps}>{children}</section>;
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * staggerDelay, ...defaultTransition },
    }),
  };

  if (variant === 'fade') {
    return (
      <motion.section
        {...sectionProps}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeVariants}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.section>
    );
  }

  if (variant === 'fadeUpStagger') {
    return (
      <motion.section
        {...sectionProps}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.section>
    );
  }

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  if (variant === 'scaleIn') {
    return (
      <motion.section
        {...sectionProps}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px', amount: 0.2 }}
        variants={scaleInVariants}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      {...sectionProps}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: defaultFadeUp.hidden,
        visible: {
          ...defaultFadeUp.visible,
          transition: { delay, ...defaultTransition },
        },
      }}
    >
      {children}
    </motion.section>
  );
}

/** Enfant animé pour stagger (à utiliser dans une section fadeUpStagger) */
export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion === true) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: defaultTransition },
      }}
    >
      {children}
    </motion.div>
  );
}
