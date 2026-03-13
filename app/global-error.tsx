'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#000', color: '#fff', fontFamily: 'sans-serif', padding: 24, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Une erreur est survenue</h1>
        <p style={{ color: '#8E8E93', marginTop: 8 }}>Le site a rencontré un problème. Réessayez.</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{ marginTop: 24, padding: '12px 24px', background: '#37E6A4', color: '#000', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
