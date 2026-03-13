'use client';

import { useState } from 'react';
import Image from 'next/image';

const FEATURE_IMAGES = [1, 2, 3, 4, 5] as const;

type Props = {
  locale: string;
  title: string;
};

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function FeaturesCarousel({ locale, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ext = locale === 'fr' ? 'png' : 'jpg';

  const goPrev = () => setCurrentIndex((i) => (i === 0 ? FEATURE_IMAGES.length - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === FEATURE_IMAGES.length - 1 ? 0 : i + 1));

  return (
    <div className="mt-10 flex flex-nowrap items-center justify-center gap-3 md:gap-4 min-w-0">
      <button
        type="button"
        onClick={goPrev}
        className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-surface/80 text-text-tertiary hover:text-text hover:bg-surface transition-colors ring-1 ring-border"
        aria-label="Image précédente"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <div className="relative aspect-[9/19] w-full max-w-[240px] md:max-w-[280px] min-w-0 flex-shrink overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
        <Image
          key={currentIndex}
          src={`/images/features/${locale}/${FEATURE_IMAGES[currentIndex]}.${ext}`}
          alt={`${title} - ${currentIndex + 1}`}
          width={400}
          height={844}
          className="object-cover"
          sizes="(max-width: 768px) 240px, 280px"
          priority={currentIndex === 0}
        />
      </div>
      <button
        type="button"
        onClick={goNext}
        className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-surface/80 text-text-tertiary hover:text-text hover:bg-surface transition-colors ring-1 ring-border"
        aria-label="Image suivante"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}
