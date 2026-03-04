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
      .select('id, username, full_name, points, wins, losses, level, avatar_url')
      .eq('id', playerId)
      .single();

    if (error) return { data: null, error };
    return { data: data as PublicPlayerInfo, error: null };
  } catch (e) {
    return { data: null, error: e instanceof Error ? e : new Error(String(e)) };
  }
}
