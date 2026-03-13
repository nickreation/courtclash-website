import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';
import { LocaleSwitcher } from '../../../components/LocaleSwitcher';
import { AnimatedSection } from '../../../components/AnimatedSection';
import { Header } from '../../../components/Header';

const BLOG_SLUGS = [
  'basketball-urbain',
  '1-contre-1-nouvelle-reference',
  'histoires-inspirantes',
  'actualites-courtclash',
] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => ({ locale, slug }))
  );
}

// Mêmes images que la liste du blog (librairie du projet)
const BLOG_ARTICLE_IMAGES: Record<string, string> = {
  'basketball-urbain': '/images/court-urban.png',
  '1-contre-1-nouvelle-reference': '/images/player-dunk-action.png',
  'histoires-inspirantes': '/images/players-courtclash.png',
  'actualites-courtclash': '/images/players-jump.png',
};

const FACEBOOK_URL = 'https://www.facebook.com/courtclash';
const INSTAGRAM_URL = 'https://www.instagram.com/courtclash.app/';
const TIKTOK_URL = 'https://www.tiktok.com/@courtclash';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const blog = dict.blogPage;
  const article = blog.articles.find((a) => 'slug' in a && a.slug === slug);
  if (!article) return { title: 'Court Clash' };
  return {
    title: `${article.title} – Court Clash`,
    description: article.description,
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict;
  const blog = t.blogPage;

  const article = blog.articles.find((a) => 'slug' in a && a.slug === slug);
  const content = article
    ? (blog as { articlesContent?: Record<string, { body: string[] }> }).articlesContent?.[slug]
    : null;

  if (!article || !content?.body?.length) {
    notFound();
  }

  return (
    <>
      <Header locale={locale as Locale} t={t} />

      <main className="min-h-screen pt-16">
        {BLOG_ARTICLE_IMAGES[slug] && (
          <div className="relative h-56 w-full md:h-72">
            <Image
              src={BLOG_ARTICLE_IMAGES[slug]}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          </div>
        )}
        <AnimatedSection className="px-4 pt-8 pb-8 md:pt-12 md:pb-12" variant="fadeUp">
          <div className="mx-auto max-w-3xl">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center text-sm text-primary hover:text-primary/90 hover:underline"
            >
              ← {blog.backToBlog}
            </Link>
            <h1 className="font-ethnocen mt-6 text-3xl font-bold text-hero-gradient md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              {article.description}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection
          className="border-y border-border bg-surface/50 px-4 py-12 md:py-16"
          variant="fadeUp"
          delay={0.1}
        >
          <div className="mx-auto max-w-3xl prose prose-invert">
            <div className="space-y-6 text-text-secondary">
              {content.body.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
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
