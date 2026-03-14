'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { LocaleSwitcher } from './LocaleSwitcher';
import { getGooglePlayBadgeUrl, getAppStoreBadgePath } from '@/lib/storeBadges';

const INSTAGRAM_URL = 'https://www.instagram.com/courtclash.app/';
const FACEBOOK_URL = 'https://www.facebook.com/courtclash';
const TIKTOK_URL = 'https://www.tiktok.com/@courtclash.app';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/us/app/court-clash/id6752360567';

interface HeaderProps {
  locale: Locale;
  t: any;
}

export function Header({ locale, t }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isBlogList = pathname === `/${locale}/blog`;
  const isFaq = pathname === `/${locale}/faq`;

  const linkBaseClasses =
    'text-sm font-ethnocen hover:opacity-90 transition-colors';

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4 md:px-6">
          <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Court Clash"
            width={140}
            height={40}
            className="h-8 w-auto object-contain block dark:hidden"
            priority
          />
          <Image
            src="/images/favicon.png"
            alt="Court Clash"
            width={48}
            height={48}
            className="h-12 w-auto object-contain hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${locale}#fonctionnalites`}
            className={`${linkBaseClasses} ${
              isHome ? 'text-hero-gradient font-medium' : 'text-hero-gradient'
            }`}
          >
            {t.nav.features}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className={`${linkBaseClasses} ${
              isBlogList ? 'text-hero-gradient font-medium' : 'text-hero-gradient'
            }`}
          >
            {t.nav.blog}
          </Link>
          <Link
            href={`/${locale}/faq`}
            className={`${linkBaseClasses} ${
              isFaq ? 'text-hero-gradient font-medium' : 'text-hero-gradient'
            }`}
          >
            {t.nav.faq}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-3"
            aria-label={t.nav.socialLabel}
          >
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-90 transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
                className="text-primary hover:opacity-90 transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-90 transition-colors"
              aria-label="TikTok"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>

          <div>
            <LocaleSwitcher currentLocale={locale} />
          </div>

          {/* Burger button on mobile */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary/50 md:hidden"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">
              {isOpen ? t.nav.closeMenu : t.nav.openMenu}
            </span>
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        </div>
      </header>

      {/* Mobile overlay : en dehors du header (sibling) pour que position:fixed soit relatif au viewport */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 min-h-[100dvh] md:hidden"
          style={{ paddingTop: '4rem', WebkitOverflowScrolling: 'touch' }}
          aria-hidden={!isOpen}
        >
          <div
            className="absolute inset-0 bg-background backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            style={{ touchAction: 'manipulation' }}
            aria-hidden
          />
          <div className="relative min-h-full overflow-y-auto overscroll-contain">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
              <nav className="flex flex-col gap-5 text-left">
                <Link
                  href={`/${locale}#fonctionnalites`}
                  className="text-lg font-ethnocen font-medium text-hero-gradient"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.features}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-lg font-ethnocen font-medium text-hero-gradient"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.blog}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className="text-lg font-ethnocen font-medium text-hero-gradient"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.faq}
                </Link>
              </nav>
              <div className="flex flex-col items-center gap-4 text-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {t.nav.googlePlay} / {t.nav.appStore}
                </span>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 overflow-hidden rounded transition-opacity hover:opacity-90"
                    style={{ width: 130, height: 44 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={getGooglePlayBadgeUrl(locale)}
                      alt={t.nav.googlePlay}
                      width={130}
                      height={44}
                      className="h-11 w-[130px] object-contain object-left"
                    />
                  </a>
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 overflow-hidden rounded transition-opacity hover:opacity-90"
                    style={{ width: 130, height: 44 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={getAppStoreBadgePath(locale)}
                      alt={t.nav.appStore}
                      width={130}
                      height={44}
                      className="h-11 w-[130px] object-contain object-left"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

