export const locales = ['fr', 'en', 'it', 'de', 'es', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

/** Langues préférées par pays (code ISO) pour la détection géo */
export const countryToLocale: Record<string, Locale> = {
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',
  GB: 'en',
  US: 'en',
  AU: 'en',
  CA: 'en',
  IE: 'en',
  NZ: 'en',
  ZA: 'en',
  IT: 'it',
  SM: 'it',
  VA: 'it',
  DE: 'de',
  AT: 'de',
  LI: 'de',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  PT: 'pt',
  BR: 'pt',
  AO: 'pt',
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const parts = acceptLanguage.split(',').map((s) => s.trim().split(';')[0].toLowerCase());
  for (const part of parts) {
    const lang = part.slice(0, 2);
    if (lang === 'fr') return 'fr';
    if (lang === 'en') return 'en';
    if (lang === 'it') return 'it';
    if (lang === 'de') return 'de';
    if (lang === 'es') return 'es';
    if (lang === 'pt') return 'pt';
  }
  return defaultLocale;
}

export function getLocaleFromCountry(country: string | undefined): Locale | null {
  if (!country) return null;
  return countryToLocale[country.toUpperCase()] ?? null;
}

export type Messages = typeof import('@/messages/fr.json');

export async function getDictionary(locale: Locale): Promise<Messages> {
  const dict = await import(`@/messages/${locale}.json`);
  return dict.default as Messages;
}
