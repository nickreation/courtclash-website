'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import type { Locale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';

/** Drapeaux des pays pour chaque locale (pt = Brésil, en = USA) */
const flags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇺🇸',
  it: '🇮🇹',
  de: '🇩🇪',
  es: '🇪🇸',
  pt: '🇧🇷',
};

const ariaLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Português',
};

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function switchTo(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] && locales.includes(segments[0] as Locale)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    router.push('/' + segments.join('/'));
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={`Langue actuelle : ${ariaLabels[currentLocale]}. Changer de langue`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="locale-switcher-trigger"
      >
        <span className="text-xl leading-none" role="img" aria-hidden>{flags[currentLocale]}</span>
        <svg
          className={`h-4 w-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby="locale-switcher-trigger"
          className="absolute right-0 top-full z-50 mt-1 w-fit min-w-0 rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === currentLocale}>
              <button
                type="button"
                onClick={() => loc !== currentLocale && switchTo(loc)}
                className={`flex w-full items-center justify-center px-2.5 py-1.5 text-left text-sm font-medium transition-colors ${
                  loc === currentLocale
                    ? 'bg-primary/15 text-primary'
                    : 'text-text-secondary hover:bg-surface/80 hover:text-text'
                }`}
                aria-label={ariaLabels[loc]}
              >
                <span className="text-xl leading-none" role="img" aria-hidden>{flags[loc]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
