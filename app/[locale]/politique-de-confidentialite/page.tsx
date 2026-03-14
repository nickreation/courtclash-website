import Link from 'next/link';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.sections.privacyPage.title} – Court Clash`,
    description: dict.sections.privacyPage.intro,
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);
  const t = dict;
  const privacy = t.sections.privacyPage;

  return (
    <>
      <Header locale={locale as Locale} t={t} />

      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h1 className="font-ethnocen text-3xl font-bold text-hero-gradient md:text-4xl">
            {privacy.title}
          </h1>
          <p className="mt-4 text-lg text-text-secondary">{privacy.intro}</p>

          <div className="mt-10 space-y-8">
            {privacy.sections.map(
              (section: { title: string; body: string }, index: number) => (
                <section key={index}>
                  <h2 className="font-semibold text-hero-gradient">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-text-secondary">{section.body}</p>
                </section>
              ),
            )}
          </div>

          <p className="mt-10 text-text-secondary">{privacy.closing}</p>

          <p className="mt-12 text-center">
            <Link
              href={`/${locale}`}
              className="text-primary hover:underline font-medium"
            >
              ← {privacy.backToHome}
            </Link>
          </p>
        </div>

        <footer className="border-t border-border bg-surface px-4 py-12 mt-16">
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
                    href="https://www.instagram.com/courtclash.app/"
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
              <a href="#" className="text-text-secondary hover:text-text">
                {t.footer.cookies}
              </a>
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

