import type { Locale } from '@/lib/i18n';

/**
 * Badges Google Play localisés (SVG), stockés en local.
 * Fichiers dans public/images/badges/ : google-play-{locale}.svg (en, fr, de, es, it, pt).
 * Source : https://github.com/steverichey/google-play-badge-svg
 */
const GOOGLE_PLAY_BADGE_BASE = '/images/badges';

/**
 * Retourne le chemin du badge Google Play pour la locale donnée.
 */
export function getGooglePlayBadgeUrl(locale: Locale): string {
  return `${GOOGLE_PLAY_BADGE_BASE}/google-play-${locale}.svg`;
}

/**
 * Badges App Store localisés (SVG officiels Apple).
 * Fichiers dans public/images/badges/ : app-store-{locale}.svg (en, fr, de, es, it, pt).
 */
const APP_STORE_BADGE_BASE = '/images/badges';

export function getAppStoreBadgePath(locale: Locale): string {
  return `${APP_STORE_BADGE_BASE}/app-store-${locale}.svg`;
}
