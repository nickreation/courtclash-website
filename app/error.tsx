'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="font-ethnocen text-2xl font-bold text-text">
        Une erreur est survenue
      </h1>
      <p className="mt-2 text-center text-text-secondary">
        Le chargement de la page a échoué. Vous pouvez réessayer.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-black hover:opacity-90"
      >
        Réessayer
      </button>
    </div>
  );
}
