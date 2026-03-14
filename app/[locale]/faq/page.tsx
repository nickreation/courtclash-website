import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { getGooglePlayBadgeUrl, getAppStoreBadgePath } from '@/lib/storeBadges';
import { Header } from '../../components/Header';
import { AnimatedSection } from '../../components/AnimatedSection';

const INSTAGRAM_URL = 'https://www.instagram.com/courtclash.app/';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/us/app/court-clash/id6752360567';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.sections.faqPage.title} – Court Clash`,
    description: dict.sections.faqPage.intro,
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const t = dict;
  const faq = t.sections.faqPage;
  const steps = 'steps' in faq ? faq.steps : [];
  const hasCta = 'ctaTitle' in faq && faq.ctaTitle;

  return (
    <>
      <Header locale={locale as Locale} t={t} />

      <main className="min-h-screen pt-16">
        <AnimatedSection className="px-4 py-12 md:py-16" variant="fadeUp">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-ethnocen text-3xl font-bold text-hero-gradient md:text-4xl">
              {faq.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">{faq.intro}</p>
          </div>
        </AnimatedSection>

        {steps.length > 0 && (
          <AnimatedSection className="border-y border-border bg-surface/50 px-4 py-12 md:py-16" variant="fadeUp">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-ethnocen text-center text-2xl font-bold text-hero-gradient md:text-3xl">
                {'howItWorksTitle' in faq ? faq.howItWorksTitle : ''}
              </h2>
              <p className="mt-3 text-center text-text-secondary">
                {'howItWorksSubtitle' in faq ? faq.howItWorksSubtitle : ''}
              </p>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {steps.map((step: { number: string; title: string; body: string }, index: number) => (
                  <div key={index} className="rounded-2xl bg-background p-6 text-center ring-1 ring-border">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-ethnocen text-lg font-bold text-primary">
                      {step.number}
                    </span>
                    <h3 className="mt-4 font-ethnocen text-xl font-semibold text-hero-gradient">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-text-secondary">{step.body}</p>
                  </div>
                ))}
              </div>
              {'learnMore' in faq && (
                <p className="mt-8 text-center">
                  <Link href={`/${locale}#fonctionnalites`} className="text-primary font-medium hover:underline">
                    {faq.learnMore} →
                  </Link>
                </p>
              )}
            </div>
          </AnimatedSection>
        )}

        {'testimonialQuote' in faq && faq.testimonialQuote && (
          <AnimatedSection className="px-4 py-12 md:py-16" variant="fadeUp">
            <div className="mx-auto max-w-2xl">
              <blockquote className="rounded-2xl bg-surface/50 p-8 text-center ring-1 ring-border">
                <p className="text-lg text-text-secondary">&laquo; {faq.testimonialQuote} &raquo;</p>
                <cite className="mt-4 block font-semibold text-hero-gradient not-italic">
                  {'testimonialAuthor' in faq ? faq.testimonialAuthor : ''}
                </cite>
                <span className="mt-1 block text-sm text-text-secondary">
                  {'testimonialRole' in faq ? faq.testimonialRole : ''}
                </span>
              </blockquote>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="px-4 py-12 md:py-16" variant="fadeUp">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
              {faq.title}
            </h2>
            <dl className="mt-10 space-y-8">
              {faq.items.map((item, index) => (
                <div key={index} className="rounded-xl bg-surface/30 p-5">
                  <dt className="font-semibold text-hero-gradient">{item.question}</dt>
                  <dd className="mt-2 text-text-secondary">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedSection>

        {hasCta && (
          <AnimatedSection className="border-y border-border bg-surface/50 px-4 py-16 md:py-20" variant="fadeUp">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
                {'ctaTitle' in faq ? faq.ctaTitle : ''}
              </h2>
              <p className="mt-4 text-text-secondary">
                {'ctaSubtitle' in faq ? faq.ctaSubtitle : ''}
              </p>
              {'ctaBullets' in faq && Array.isArray(faq.ctaBullets) && (
                <ul className="mt-8 flex flex-wrap justify-center gap-4 text-text-secondary">
                  {faq.ctaBullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity shrink-0"
                  style={{ width: 130, height: 44 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getGooglePlayBadgeUrl(locale as Locale)}
                    alt={t.nav.googlePlay}
                    width={130}
                    height={44}
                    style={{ width: 130, height: 44, objectFit: 'contain' }}
                  />
                </a>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity shrink-0"
                  style={{ width: 130, height: 44 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAppStoreBadgePath(locale as Locale)}
                    alt={t.nav.appStore}
                    width={130}
                    height={44}
                    style={{ width: 130, height: 44, objectFit: 'contain' }}
                  />
                </a>
              </div>
            </div>
          </AnimatedSection>
        )}

        <div className="mx-auto max-w-3xl px-4 pb-12 text-center">
          <Link
            href={`/${locale}`}
            className="text-primary font-medium hover:underline"
          >
            ← {faq.backToHome}
          </Link>
        </div>

        <footer className="border-t border-border bg-surface px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <p className="font-ethnocen font-semibold text-hero-gradient">
                  {t.footer.follow}
                </p>
                <div className="mt-3 flex justify-center gap-4 md:justify-start text-hero-gradient">
                  <a
                    href="https://www.facebook.com/courtclash"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.tiktok.com/@courtclash.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-90"
                    aria-label="TikTok"
                  >
                    TikTok
                  </a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="font-ethnocen font-semibold text-hero-gradient">
                  {t.footer.partner}
                </p>
                <a
                  href="mailto:partenaire@courtclash.app"
                  className="mt-2 block text-primary hover:text-primary/90 hover:underline"
                >
                  partenaire@courtclash.app
                </a>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-text-secondary">
              {t.footer.copyright}
            </p>
            <nav className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href={`/${locale}/politique-de-cookies-ue`}
                className="text-text-secondary hover:text-text"
              >
                {t.footer.cookies}
              </Link>
              <Link
                href={`/${locale}/politique-de-confidentialite`}
                className="text-text-secondary hover:text-text"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/conditions-generales-dutilisation`}
                className="text-text-secondary hover:text-text"
              >
                {t.footer.terms}
              </Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
