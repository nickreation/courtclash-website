import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="font-ethnocen text-2xl font-bold text-text">
        Page introuvable
      </h1>
      <p className="mt-2 text-text-secondary">Cette page n&apos;existe pas.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-black hover:opacity-90"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
