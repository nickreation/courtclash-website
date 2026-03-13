import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { LocaleSwitcher } from '../../components/LocaleSwitcher';
import { AnimatedSection } from '../../components/AnimatedSection';
import { Header } from '../../components/Header';

// Images de la librairie du projet – illustration par article
const BLOG_ARTICLE_IMAGES: Record<string, string> = {
  'basketball-urbain': '/images/court-urban.png',
  '1-contre-1-nouvelle-reference': '/images/player-dunk-action.png',
  'histoires-inspirantes': '/images/players-courtclash.png',
  'actualites-courtclash': '/images/players-jump.png',
};

const FACEBOOK_URL = 'https://www.facebook.com/courtclash';
const INSTAGRAM_URL = 'https://www.instagram.com/courtclash.app/';
const TIKTOK_URL = 'https://www.tiktok.com/@courtclash';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.blogPage.title} – Court Clash`,
    description: dict.blogPage.intro,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict;
  const blog = t.blogPage;

  return (
    <>
      <Header locale={locale as Locale} t={t} />

      <main className="min-h-screen pt-16">
        <AnimatedSection className="px-4 pt-12 pb-8 md:pt-16 md:pb-12" variant="fadeUp">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-ethnocen text-3xl font-bold text-hero-gradient md:text-4xl">
              {blog.title}
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              {blog.intro}
            </p>
            <p className="mt-4 text-text-secondary">
              {blog.intro2}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="border-y border-border bg-surface/50 px-4 py-16 md:py-20"
          variant="fadeUp"
          delay={0.1}
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="font-ethnocen mb-4 text-center text-2xl font-bold text-hero-gradient md:text-3xl">
              {blog.collectionTitle}
            </h2>
            <p className="mb-12 text-center text-text-secondary">
              {blog.collectionSubtitle}
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {blog.articles.map((article, index) => {
                const imgSrc = BLOG_ARTICLE_IMAGES[article.slug];
                return (
                  <article
                    key={index}
                    className="flex flex-col overflow-hidden rounded-2xl bg-background ring-1 ring-border transition-shadow hover:shadow-lg"
                  >
                    {imgSrc && (
                      <Link href={`/${locale}/blog/${article.slug}`} className="block aspect-[16/10] w-full overflow-hidden bg-surface">
                        <Image
                          src={imgSrc}
                          alt={article.title}
                          width={400}
                          height={250}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-ethnocen text-lg font-semibold text-hero-gradient">
                        {article.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm text-text-secondary">
                        {article.description}
                      </p>
                      <Link
                        href={`/${locale}/blog/${article.slug}`}
                        className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/90 hover:underline"
                      >
                        {blog.readArticle}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-border bg-surface px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-ethnocen font-semibold text-hero-gradient">{t.footer.follow}</p>
              <div className="mt-3 flex justify-center gap-4 md:justify-start text-hero-gradient">
                <a
                  href={FACEBOOK_URL}
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
                  href={TIKTOK_URL}
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
              <p className="font-ethnocen font-semibold text-hero-gradient">{t.footer.partner}</p>
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
            <Link href={`/${locale}/politique-de-cookies-ue`} className="text-text-secondary hover:text-text">
              {t.footer.cookies}
            </Link>
            <Link href={`/${locale}/politique-de-confidentialite`} className="text-text-secondary hover:text-text">
              {t.footer.privacy}
            </Link>
            <Link href={`/${locale}/conditions-generales-dutilisation`} className="text-text-secondary hover:text-text">
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
