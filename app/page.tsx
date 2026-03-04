export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Court Clash
      </h1>
      <p className="text-lg text-text-secondary max-w-md mb-8">
        L&apos;application basketball n°1 pour le un contre un. Scannez le QR code de votre adversaire sur le terrain, lancez le défi et enregistrez vos scores.
      </p>
      <div className="flex gap-4">
        <a
          href="https://play.google.com/store/apps/details?id=com.nickreation.courtclash.v2"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-muted rounded-xl font-semibold text-white hover:bg-primary transition-colors"
        >
          Google Play
        </a>
        <a
          href="https://apps.apple.com/app/court-clash/idXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-primary rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
        >
          App Store
        </a>
      </div>
    </main>
  );
}
