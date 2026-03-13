import { supabase } from './supabase';

export interface PublicPlayerInfo {
  id: string;
  username: string | null;
  full_name: string | null;
  points: number | null;
  wins: number | null;
  losses: number | null;
  level: string | null;
  avatar_url: string | null;
  /** Classement (ex. 42) */
  ranking: number | null;
  /** Nombre total de matchs joués */
  total_matches: number | null;
  /** Taux de victoire (0–1 ou 0–100 selon la base) */
  win_rate: number | null;
  /** Série de victoires consécutives */
  consecutive_wins: number | null;
  /** Nombre d'adversaires différents affrontés */
  unique_opponents_count: number | null;
  /** Dernière date de match (ISO) */
  last_match_date: string | null;
  /** Bio publique du joueur */
  bio: string | null;
  /** Paniers marqués (total) */
  baskets_scored: number | null;
  /** Paniers encaissés (total) */
  baskets_received: number | null;
}

/**
 * Récupère les infos publiques d'un joueur par son ID (page /player/[id]).
 * La vue user_stats_view doit autoriser la lecture publique (RLS anon).
 */
export async function getPublicPlayerById(
  playerId: string
): Promise<{ data: PublicPlayerInfo | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('user_stats_view')
      .select('id, username, full_name, points, wins, losses, level, avatar_url, ranking, total_matches, win_rate, consecutive_wins, unique_opponents_count, last_match_date, bio, baskets_scored, baskets_received')
      .eq('id', playerId)
      .single();

    if (error) {
      // En dev, afficher l'erreur dans la console pour faciliter le debug
      if (process.env.NODE_ENV === 'development') {
        console.error('[getPublicPlayerById] Supabase error:', error.message, error.code, error.details);
      }
      return { data: null, error };
    }
    return { data: data as PublicPlayerInfo, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e : new Error(String(e)) };
  }
}
