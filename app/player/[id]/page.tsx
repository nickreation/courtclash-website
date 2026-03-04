import { notFound } from 'next/navigation';
import { getPublicPlayerById } from '@/lib/getPublicPlayer';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/app/court-clash/idXXXXXXXXX';
const DEEP_LINK_SCHEME = 'courtclash';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;

  if (!UUID_REGEX.test(id)) {
    notFound();
  }

  const { data: player, error } = await getPublicPlayerById(id);

  if (error || !player) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <h1 className="text-2xl font-bold text-white mb-2">
          Joueur introuvable
        </h1>
        <p className="text-text-secondary">
          {error?.message ?? "Ce lien n'est pas valide."}
        </p>
      </main>
    );
  }

  const displayName =
    player.username || player.full_name || 'Joueur Court Clash';
  const deepLinkUrl = `${DEEP_LINK_SCHEME}://player/${id}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-[340px] rounded-2xl bg-surface p-7 text-center mb-8">
        <p className="text-sm font-semibold text-text-secondary tracking-wide mb-2">
          Court Clash
        </p>
        <p className="text-[15px] text-text-secondary mb-4">
          Tu as scanné le QR code de
        </p>
        {player.avatar_url ? (
          <div className="relative w-[88px] h-[88px] rounded-full mx-auto mb-3 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={player.avatar_url}
              alt=""
              width={88}
              height={88}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-[88px] h-[88px] rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h1 className="text-xl font-bold text-white truncate mb-2">
          {displayName}
        </h1>
        {player.level && (
          <div className="inline-block px-3 py-1.5 rounded-xl bg-muted mb-2">
            <span className="text-sm font-semibold text-primary">
              {player.level}
            </span>
          </div>
        )}
        {(player.points != null ||
          (player.wins != null && player.losses != null)) && (
          <p className="text-sm text-text-secondary">
            {player.points != null && `${player.points} pts`}
            {player.wins != null &&
              player.losses != null &&
              ` • ${player.wins}V - ${player.losses}D`}
          </p>
        )}
      </div>

      <p className="text-[15px] text-text-secondary text-center mb-5 px-4">
        Pour jouer contre ce joueur, ouvre l&apos;app Court Clash
      </p>

      <a
        href={deepLinkUrl}
        className="w-full max-w-[280px] block py-4 px-8 rounded-2xl bg-primary text-white font-semibold text-center hover:opacity-90 transition-opacity mb-7"
      >
        Ouvrir l&apos;app
      </a>

      <div className="text-center">
        <p className="text-sm text-text-secondary mb-3">Tu n&apos;as pas l&apos;app ?</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-muted font-semibold text-white hover:bg-primary/20 transition-colors"
          >
            Google Play
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-muted font-semibold text-white hover:bg-primary/20 transition-colors"
          >
            App Store
          </a>
        </div>
      </div>
    </main>
  );
}
