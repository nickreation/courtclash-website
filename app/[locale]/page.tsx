import Link from 'next/link';
import Image from 'next/image';
import { NewsletterForm } from '../components/NewsletterForm';
import { HeroSection } from '../components/HeroSection';
import { AnimatedSection, AnimatedItem } from '../components/AnimatedSection';
import { SectionWithBackground } from '../components/SectionWithBackground';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { getGooglePlayBadgeUrl, getAppStoreBadgePath } from '@/lib/storeBadges';
import { Header } from '../components/Header';
import { FeaturesCarousel } from '../components/FeaturesCarousel';
import { VideoAutoplayInView } from '../components/VideoAutoplayInView';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/us/app/court-clash/id6752360567';
const INSTAGRAM_URL = 'https://www.instagram.com/courtclash.app/';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const t = dict;

  return (
    <>
      <Header locale={locale as Locale} t={t} />

      <main className="min-h-screen pt-16">
        <HeroSection messages={t.hero} />

        {/* CTA + Stores */}
        <AnimatedSection className="border-y border-border bg-surface/50 px-4 py-12" variant="scaleIn">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
              {t.sections.appAvailable}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity shrink-0" style={{ width: 130, height: 44 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getGooglePlayBadgeUrl(locale as Locale)} alt={t.nav.googlePlay} width={130} height={44} style={{ width: 130, height: 44, objectFit: 'contain' }} />
              </a>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity shrink-0" style={{ width: 130, height: 44 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getAppStoreBadgePath(locale as Locale)} alt={t.nav.appStore} width={130} height={44} style={{ width: 130, height: 44, objectFit: 'contain' }} />
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Vidéo gameplay */}
        <AnimatedSection className="px-4 py-16 md:py-24" variant="scaleIn" delay={0.05}>
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/20 ring-1 ring-border shadow-xl">
              <VideoAutoplayInView
                src="/videos/1v1.mov"
                className="h-full w-full object-cover"
                ariaLabel="Gameplay Court Clash 1v1"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Devenez le roi – image communauté Court Clash */}
        <AnimatedSection className="px-4 py-16 md:py-24" variant="fadeUp" delay={0.1}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl md:order-1 ring-1 ring-border shadow-2xl">
              <Image
                src="/images/players-courtclash.png"
                alt={t.sections.king.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 text-center md:order-2 md:text-left">
              <h2 className="font-ethnocen text-3xl font-bold text-hero-gradient md:text-4xl">
                {t.sections.king.title}
              </h2>
              <p className="mt-6 text-lg text-text-secondary">
                {t.sections.king.body}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Témoignages – un seul bloc */}
        <AnimatedSection className="border-y border-border bg-surface/50 px-4 py-16 md:py-20" variant="fadeUpStagger" staggerDelay={0.1}>
          <div className="mx-auto max-w-5xl">
            <AnimatedItem>
              <h2 className="font-ethnocen mb-12 text-center text-2xl font-bold text-hero-gradient md:text-3xl">
                {t.sections.testimonials.title}
              </h2>
            </AnimatedItem>
            <div className="grid gap-8 md:grid-cols-3">
              <AnimatedItem>
                <blockquote className="rounded-2xl bg-background p-6 text-center ring-1 ring-border h-full flex flex-col justify-center">
                  <p className="text-text-secondary">&laquo; {t.sections.testimonials.yohan} &raquo;</p>
                  <cite className="mt-4 block font-semibold text-hero-gradient not-italic">Yohan</cite>
                </blockquote>
              </AnimatedItem>
              <AnimatedItem>
                <blockquote className="rounded-2xl bg-background p-6 text-center ring-1 ring-border h-full flex flex-col justify-center">
                  <p className="text-text-secondary">&laquo; {t.sections.testimonials.clara} &raquo;</p>
                  <cite className="mt-4 block font-semibold text-hero-gradient not-italic">Clara</cite>
                </blockquote>
              </AnimatedItem>
              <AnimatedItem>
                <blockquote className="rounded-2xl bg-background p-6 text-center ring-1 ring-border h-full flex flex-col justify-center">
                  <p className="text-text-secondary">&laquo; {t.sections.testimonials.omar} &raquo;</p>
                  <cite className="mt-4 block font-semibold text-hero-gradient not-italic">Omar</cite>
                </blockquote>
              </AnimatedItem>
            </div>
          </div>
        </AnimatedSection>

        {/* Classement – fond parallaxe (haut de l'image visible) */}
        <SectionWithBackground
          src="/images/court-ocean.png"
          alt="Terrain basket vue océan"
          overlay="darker"
          objectPosition="top"
          className="px-4 py-20 md:py-28"
        >
          <AnimatedSection variant="fadeUp" className="mx-auto max-w-3xl text-center">
            <h2 className="font-ethnocen text-3xl font-bold text-white drop-shadow-md md:text-4xl">
              {t.sections.ranking.title}
            </h2>
            <p className="mt-6 text-lg text-white/90 drop-shadow">
              {t.sections.ranking.body}
            </p>
          </AnimatedSection>
        </SectionWithBackground>

        {/* Galerie action – les deux photos à un autre endroit */}
        <AnimatedSection className="px-4 py-16 md:py-20 border-y border-border bg-surface/30" variant="scaleIn" delay={0.05}>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border shadow-xl">
                <Image
                  src="/images/player-dunk-action.png"
                  alt="Action au panier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border shadow-xl">
                <Image
                  src="/images/players-jump.png"
                  alt="Match 1v1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Fonctionnalités */}
        <AnimatedSection id="fonctionnalites" className="border-y border-border bg-surface/50 px-4 py-16 md:py-20" variant="scaleIn">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
              {t.sections.features.title}
            </h2>
            <p className="mt-4 text-text-secondary">
              {t.sections.features.body}
            </p>
            <FeaturesCarousel locale={locale} title={t.sections.features.title} />
          </div>
        </AnimatedSection>

        {/* Duel – vidéo drone uniquement */}
        <AnimatedSection className="px-4 py-16 md:py-24" variant="scaleIn">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
              {t.sections.duel.title}
            </h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              {t.sections.duel.subtitle}
            </p>
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/20 ring-1 ring-border shadow-xl">
                <VideoAutoplayInView
                  src="/videos/1v1drone.mov"
                  className="h-full w-full object-cover"
                  ariaLabel="Vue drone 1v1 Court Clash"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Invitez vos amis – fond court-urban */}
        <SectionWithBackground
          src="/images/court-urban.png"
          alt="Terrain basket urbain"
          overlay="darker"
          className="px-4 py-20 md:py-24"
        >
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <div className="mx-auto max-w-3xl text-center">
              <AnimatedSection variant="fadeUp">
                <h2 className="font-ethnocen text-2xl font-bold text-white drop-shadow md:text-3xl">
                  {t.sections.invite.title}
                </h2>
                <p className="mt-4 text-white/90 max-w-xl mx-auto">
                  {t.sections.invite.body}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </SectionWithBackground>

        {/* FAQ + Blog – liens courts */}
        <AnimatedSection id="faq" className="px-4 py-12 border-y border-border" variant="fade">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-center">
            <div>
              <h2 className="font-ethnocen text-xl font-bold text-hero-gradient">{t.sections.faq.title}</h2>
              <Link href={`/${locale}/faq`} className="mt-2 inline-block text-primary font-medium hover:underline text-sm">
                {t.sections.faq.seeFull} →
              </Link>
            </div>
            <div id="blog">
              <h2 className="font-ethnocen text-xl font-bold text-hero-gradient">{t.sections.blog.title}</h2>
              <Link href={`/${locale}/blog`} className="mt-2 inline-block text-primary font-medium hover:underline text-sm">
                {t.sections.blog.seeFull} →
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Newsletter */}
        <AnimatedSection className="px-4 py-16 md:py-24" variant="scaleIn">
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-ethnocen text-2xl font-bold text-hero-gradient md:text-3xl">
              {t.sections.community.title}
            </h2>
            <p className="mt-4 text-text-secondary">
              {t.sections.community.subtitle}
            </p>
            <NewsletterForm messages={t.newsletter} />
          </div>
        </AnimatedSection>

        <footer className="border-t border-border bg-surface px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
              <div className="text-center md:text-left">
                <p className="font-ethnocen font-semibold text-hero-gradient">{t.footer.follow}</p>
                <div className="mt-3 flex justify-center gap-4 md:justify-start text-hero-gradient">
                  <a href="https://www.facebook.com/courtclash" target="_blank" rel="noopener noreferrer" className="hover:opacity-90" aria-label="Facebook">Facebook</a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-90" aria-label="Instagram">Instagram</a>
                  <a href="https://www.tiktok.com/@courtclash.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-90" aria-label="TikTok">TikTok</a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="font-ethnocen font-semibold text-hero-gradient">{t.footer.partner}</p>
                <a href="mailto:partenaire@courtclash.app" className="mt-2 block text-primary hover:text-primary/90 hover:underline">
                  partenaire@courtclash.app
                </a>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-text-secondary">{t.footer.copyright}</p>
            <nav className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link href={`/${locale}/politique-de-cookies-ue`} className="text-text-secondary hover:text-text">{t.footer.cookies}</Link>
              <Link href={`/${locale}/politique-de-confidentialite`} className="text-text-secondary hover:text-text">{t.footer.privacy}</Link>
              <Link href={`/${locale}/conditions-generales-dutilisation`} className="text-text-secondary hover:text-text">{t.footer.terms}</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
