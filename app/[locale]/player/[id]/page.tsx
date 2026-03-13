import { notFound } from 'next/navigation';
import { getPublicPlayerById } from '@/lib/getPublicPlayer';
import { getDictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { isValidLocale } from '@/lib/i18n';
import { PlayerPageContent } from './PlayerPageContent';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/us/app/court-clash/id6752360567';
const DEEP_LINK_SCHEME = 'courtclash';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { locale, id } = await params;

  if (!isValidLocale(locale)) notFound();
  if (!UUID_REGEX.test(id)) notFound();

  const [dict, { data: player, error }] = await Promise.all([
    getDictionary(locale as Locale),
    getPublicPlayerById(id),
  ]);

  const t = dict.player;

  if (error || !player) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <h1 className="text-2xl font-bold text-text mb-2">
          {t.notFound}
        </h1>
        <p className="text-text-secondary">
          {error?.message ?? t.invalidLink}
        </p>
      </main>
    );
  }

  const deepLinkUrl = `${DEEP_LINK_SCHEME}://player/${id}`;

  return (
    <PlayerPageContent
      player={player}
      t={t}
      locale={locale}
      deepLinkUrl={deepLinkUrl}
    />
  );
}
