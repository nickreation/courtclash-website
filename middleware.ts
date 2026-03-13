import { NextRequest, NextResponse } from 'next/server';
import {
  defaultLocale,
  isValidLocale,
  getLocaleFromAcceptLanguage,
  getLocaleFromCountry,
} from '@/lib/i18n';

const LOCALE_COOKIE = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fichiers statiques et _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Déjà une locale valide en premier segment (ex: /fr, /en, /fr/player/xxx)
  const segment = pathname.slice(1).split('/')[0];
  if (segment && isValidLocale(segment)) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, segment, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // 1) Préférence utilisateur (cookie) si définie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${cookieLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  // 2) Langue du navigateur (Accept-Language)
  const acceptLanguage = request.headers.get('accept-language');
  let locale = getLocaleFromAcceptLanguage(acceptLanguage);

  // 3) Optionnel : pays (geo) – disponible sur Vercel et certaines plateformes
  const geo = (request as NextRequest & { geo?: { country?: string } }).geo;
  const country = geo?.country;
  const geoLocale = getLocaleFromCountry(country);
  if (geoLocale) {
    // Si la langue du pays est supportée, on peut l'utiliser (ou garder Accept-Language)
    locale = geoLocale;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api).*)'],
};
