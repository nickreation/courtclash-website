'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { getGooglePlayBadgeUrl, getAppStoreBadgePath } from '@/lib/storeBadges';
import type { Locale } from '@/lib/i18n';
import type { PublicPlayerInfo } from '@/lib/getPublicPlayer';
import { LocaleSwitcher } from '@/app/components/LocaleSwitcher';

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
  statistics: string;
  points: string;
  wins: string;
  losses: string;
  avgPtsScored: string;
  avgPtsReceived: string;
  lastGames: string;
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
      {/* Choix de la langue en haut à droite */}
      <div className="absolute top-4 right-4 z-20">
        <LocaleSwitcher currentLocale={locale as Locale} />
      </div>
      {/* Fond discret type ambiance app */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,var(--primary-glow),transparent_50%)] pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(191,56,229,0.06),transparent_40%)] pointer-events-none" aria-hidden />
      {/* Carte joueur */}
      <div className="relative z-10 w-full flex flex-col items-center">
      <motion.div
        className="w-full max-w-[340px] rounded-2xl bg-surface p-5 mb-8 border-2 border-primary shadow-xl shadow-black/20 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10"
        initial={animate ? { opacity: 0, y: 24, scale: 0.98 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className="flex justify-center mb-3">
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
        <p className="text-[15px] text-text-secondary text-center mb-4">
          {t.scanned}
        </p>

        {/* Bloc photo à gauche + infos à droite (style app) */}
        <div className="flex gap-4 items-stretch">
          {/* Photo / initiale */}
          {player.avatar_url ? (
            <div className="relative w-[88px] h-[88px] rounded-full shrink-0 overflow-hidden ring-2 ring-primary/40 shadow-lg">
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
            <div className="w-[88px] h-[88px] rounded-full bg-muted shrink-0 flex items-center justify-center ring-2 ring-primary/40">
              <span className="text-3xl font-bold text-primary">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Nom + bio + niveau */}
          <div className="flex-1 min-w-0 flex flex-col text-left">
            <h1 className="font-ethnocen text-xl font-bold text-text truncate uppercase tracking-wide">
              {displayName}
            </h1>
            {player.bio?.trim() && (
              <p className="text-sm text-text-secondary mt-1.5 line-clamp-3">
                {player.bio.trim()}
              </p>
            )}
            {player.level && (
              <div className="mt-auto pt-3">
                <span className="inline-block rounded-lg bg-primary/15 ring-1 ring-primary/30 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary">
                  {player.level}
                </span>
              </div>
            )}
          </div>
        </div>

        {hasStats && (
          <div className="mt-6 pt-5 border-t border-border">
            {/* Titre section STATISTIQUES + icône graphique */}
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-4 w-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="12" width="4" height="8" />
                <rect x="10" y="8" width="4" height="12" />
                <rect x="17" y="4" width="4" height="16" />
              </svg>
              <h2 className="font-ethnocen text-sm font-bold uppercase tracking-wide text-text">
                {t.statistics}
              </h2>
            </div>

            {/* Ligne 1 : Points + Win Rate (grandes cartes bordure verte) */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {player.points != null && (
                <div className="rounded-xl border-2 border-emerald-500/70 bg-emerald-500/5 px-4 py-3 text-center">
                  <p className="font-ethnocen text-2xl font-bold text-text">{player.points}</p>
                  <p className="text-xs font-medium text-text-secondary mt-0.5">{t.points}</p>
                </div>
              )}
              {player.win_rate != null &&
                player.total_matches != null &&
                player.total_matches > 0 && (
                  <div className="rounded-xl border-2 border-emerald-500/70 bg-emerald-500/5 px-4 py-3 text-center">
                    <p className="font-ethnocen text-2xl font-bold text-text">
                      {Math.round(
                        player.win_rate <= 1 ? player.win_rate * 100 : player.win_rate
                      )}
                      %
                    </p>
                    <p className="text-xs font-medium text-text-secondary mt-0.5">{t.winRate}</p>
                  </div>
                )}
            </div>

            {/* Ligne 2 : Victoires (✓ vert) + Défaites (✗ violet) */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {player.wins != null && (
                <div className="rounded-xl bg-background/60 px-4 py-2.5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <div>
                    <p className="font-ethnocen text-lg font-bold text-text">{player.wins}</p>
                    <p className="text-xs text-text-secondary">{t.wins}</p>
                  </div>
                </div>
              )}
              {player.losses != null && (
                <div className="rounded-xl bg-background/60 px-4 py-2.5 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </span>
                  <div>
                    <p className="font-ethnocen text-lg font-bold text-text">{player.losses}</p>
                    <p className="text-xs text-text-secondary">{t.losses}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ligne 3 : Moyenne pts marqués + Moyenne pts encaissés (icônes ballon / bouclier) */}
            {player.total_matches != null &&
              player.total_matches > 0 &&
              player.baskets_scored != null &&
              player.baskets_received != null && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-background/60 px-4 py-2.5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 9 9" /><path d="M12 21a9 9 0 0 0 9-9" /></svg>
                    </span>
                    <div>
                      <p className="font-ethnocen text-lg font-bold text-text">
                        {(player.baskets_scored / player.total_matches).toFixed(1)}
                      </p>
                      <p className="text-xs text-text-secondary">{t.avgPtsScored}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-background/60 px-4 py-2.5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </span>
                    <div>
                      <p className="font-ethnocen text-lg font-bold text-text">
                        {(player.baskets_received / player.total_matches).toFixed(1)}
                      </p>
                      <p className="text-xs text-text-secondary">{t.avgPtsReceived}</p>
                    </div>
                  </div>
                </div>
              )}

            {/* Derniers matchs : texte à gauche, badge XW / YL à droite */}
            {(player.wins != null || player.losses != null) && (
              <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-2.5 ring-1 ring-primary/20">
                <span className="text-sm font-medium text-text-secondary">{t.lastGames}</span>
                <span className="rounded-lg bg-primary/15 ring-1 ring-primary/30 px-3 py-1 font-ethnocen text-sm font-bold text-primary">
                  {player.wins ?? 0}W / {player.losses ?? 0}L
                </span>
              </div>
            )}
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
