'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { getGooglePlayBadgeUrl, getAppStoreBadgePath } from '@/lib/storeBadges';
import type { Locale } from '@/lib/i18n';
import type { PublicPlayerInfo } from '@/lib/getPublicPlayer';

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2';
const APP_STORE_URL = 'https://apps.apple.com/us/app/court-clash/id6752360567';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type PlayerTranslations = {
  notFound: string;
  invalidLink: string;
  defaultName: string;
  scanned: string;
  openApp: string;
  openAppButton: string;
  noApp: string;
  googlePlayAlt: string;
  appStoreAlt: string;
  ranking: string;
  totalMatches: string;
  winRate: string;
  streak: string;
  opponents: string;
  lastMatch: string;
  basketsScored: string;
  basketsReceived: string;
};

interface PlayerPageContentProps {
  player: PublicPlayerInfo;
  t: PlayerTranslations;
  locale: string;
  deepLinkUrl: string;
}

export function PlayerPageContent({ player, t, locale, deepLinkUrl }: PlayerPageContentProps) {
  const reducedMotion = useReducedMotion();
  const animate = reducedMotion !== true;

  const displayName =
    player.username || player.full_name || t.defaultName;

  const hasStats =
    player.ranking != null ||
    player.total_matches != null ||
    (player.win_rate != null && player.total_matches != null && player.total_matches > 0) ||
    (player.consecutive_wins != null && player.consecutive_wins > 0) ||
    player.unique_opponents_count != null ||
    player.last_match_date ||
    (player.baskets_scored != null && player.baskets_received != null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
      {/* Fond discret type ambiance app */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,var(--primary-glow),transparent_50%)] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(191,56,229,0.06),transparent_40%)] pointer-events-none" aria-hidden />
      {/* Carte joueur */}
      <div className="relative z-10 w-full flex flex-col items-center">
      <motion.div
        className="w-full max-w-[340px] rounded-2xl bg-surface p-7 text-center mb-8 ring-1 ring-border shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/5"
        initial={animate ? { opacity: 0, y: 24, scale: 0.98 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className="flex justify-center mb-2">
          {/* Logo en mode clair */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Court Clash"
            width={140}
            height={28}
            className="h-7 w-auto object-contain opacity-90 block dark:hidden"
          />
          {/* Favicon (logo graphique) en mode sombre */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/favicon.png"
            alt="Court Clash"
            width={40}
            height={40}
            className="h-10 w-auto object-contain opacity-90 hidden dark:block"
          />
        </div>
        <p className="text-[15px] text-text-secondary mb-4">
          {t.scanned}
        </p>

        {player.avatar_url ? (
          <div className="relative w-[88px] h-[88px] rounded-full mx-auto mb-3 overflow-hidden ring-2 ring-primary/30 shadow-lg">
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
          <div className="w-[88px] h-[88px] rounded-full bg-muted mx-auto mb-3 flex items-center justify-center ring-2 ring-border">
            <span className="text-4xl font-bold text-primary">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <h1 className="font-ethnocen text-xl font-bold text-text truncate mb-2">
          {displayName}
        </h1>

        {player.level && (
          <div className="inline-block px-3 py-1.5 rounded-xl bg-primary/15 ring-1 ring-primary/30 mb-2">
            <span className="text-sm font-semibold text-primary">{player.level}</span>
          </div>
        )}

        {(player.points != null || (player.wins != null && player.losses != null)) && (
          <p className="text-sm text-text-secondary mb-3">
            {player.points != null && `${player.points} pts`}
            {player.wins != null &&
              player.losses != null &&
              ` • ${player.wins}V - ${player.losses}D`}
          </p>
        )}

        {player.bio?.trim() && (
          <p className="text-sm text-text-secondary text-left mb-4 px-1">
            {player.bio.trim()}
          </p>
        )}

        {hasStats && (
          <div className="mt-4 pt-4 border-t border-border rounded-lg">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left text-sm">
              {player.ranking != null && (
                <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                  <span className="text-text-tertiary text-xs block">{t.ranking}</span>
                  <p className="font-semibold text-text">#{player.ranking}</p>
                </div>
              )}
              {player.total_matches != null && (
                <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                  <span className="text-text-tertiary text-xs block">{t.totalMatches}</span>
                  <p className="font-semibold text-text">{player.total_matches}</p>
                </div>
              )}
              {player.win_rate != null &&
                player.total_matches != null &&
                player.total_matches > 0 && (
                  <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                    <span className="text-text-tertiary text-xs block">{t.winRate}</span>
                    <p className="font-semibold text-text">
                      {Math.round(
                        player.win_rate <= 1 ? player.win_rate * 100 : player.win_rate
                      )}{' '}
                      %
                    </p>
                  </div>
                )}
              {player.consecutive_wins != null && player.consecutive_wins > 0 && (
                <div className="rounded-lg bg-primary/10 px-3 py-2 ring-1 ring-primary/20">
                  <span className="text-text-tertiary text-xs block">{t.streak}</span>
                  <p className="font-semibold text-primary">
                    {player.consecutive_wins} 🔥
                  </p>
                </div>
              )}
              {player.unique_opponents_count != null && (
                <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                  <span className="text-text-tertiary text-xs block">{t.opponents}</span>
                  <p className="font-semibold text-text">{player.unique_opponents_count}</p>
                </div>
              )}
              {player.last_match_date && (
                <div className="col-span-2 rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                  <span className="text-text-tertiary text-xs block">{t.lastMatch}</span>
                  <p className="font-semibold text-text">
                    {new Date(player.last_match_date).toLocaleDateString(locale, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}
              {player.baskets_scored != null && player.baskets_received != null && (
                <>
                  <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                    <span className="text-text-tertiary text-xs block">
                      {t.basketsScored}
                    </span>
                    <p className="font-semibold text-text">{player.baskets_scored}</p>
                  </div>
                  <div className="rounded-lg bg-background/50 px-3 py-2 ring-1 ring-border/50">
                    <span className="text-text-tertiary text-xs block">
                      {t.basketsReceived}
                    </span>
                    <p className="font-semibold text-text">{player.baskets_received}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>

      <motion.p
        className="text-[15px] text-text-secondary text-center mb-5 px-4"
        initial={animate ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animate ? 0.35 : 0, ease }}
      >
        {t.openApp}
      </motion.p>

      <motion.a
        href={deepLinkUrl}
        className="w-full max-w-[280px] block py-4 px-8 rounded-2xl bg-primary text-white font-semibold text-center mb-7 transition-all duration-200 hover:opacity-95 hover:scale-[1.02] hover:shadow-glow-primary active:scale-[0.99]"
        initial={animate ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: animate ? 0.4 : 0, ease }}
        whileHover={animate ? { scale: 1.02 } : undefined}
        whileTap={animate ? { scale: 0.99 } : undefined}
      >
        {t.openAppButton}
      </motion.a>

      <motion.div
        className="text-center"
        initial={animate ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: animate ? 0.5 : 0, ease }}
      >
        <p className="text-sm text-text-secondary mb-3">{t.noApp}</p>
        <div className="flex gap-3 justify-center items-center flex-wrap">
          <motion.a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-200 hover:scale-105 hover:opacity-90"
            style={{ width: 110, height: 36 }}
            whileHover={animate ? { scale: 1.05 } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getGooglePlayBadgeUrl(locale as Locale)}
              alt={t.googlePlayAlt}
              width={110}
              height={36}
              style={{ width: 110, height: 36, objectFit: 'contain' }}
            />
          </motion.a>
          <motion.a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-200 hover:scale-105 hover:opacity-90"
            style={{ width: 110, height: 36 }}
            whileHover={animate ? { scale: 1.05 } : undefined}
            whileTap={animate ? { scale: 0.98 } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAppStoreBadgePath(locale as Locale)}
              alt={t.appStoreAlt}
              width={110}
              height={36}
              style={{ width: 110, height: 36, objectFit: 'contain' }}
            />
          </motion.a>
        </div>
      </motion.div>
      </div>
    </main>
  );
}
