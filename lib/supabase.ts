import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured =
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-key';

// L'URL doit être l'API du projet (ex. https://ftnkzalvwixidhxbuaux.supabase.co), pas le dashboard
const looksLikeApiUrl =
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co') &&
  !supabaseUrl.includes('/dashboard') &&
  !supabaseUrl.includes('app.supabase.com');

if (process.env.NODE_ENV === 'development' && !isConfigured) {
  console.warn(
    '[Supabase] Variables non configurées : créez .env.local avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY (mêmes valeurs que court-clash-v2).'
  );
}
if (process.env.NODE_ENV === 'development' && isConfigured && !looksLikeApiUrl) {
  console.warn(
    '[Supabase] NEXT_PUBLIC_SUPABASE_URL doit être l’URL de l’API du projet, pas le dashboard. Exemple : https://ftnkzalvwixidhxbuaux.supabase.co (sans slash final, sans /dashboard).'
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
