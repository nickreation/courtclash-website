import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Court Clash – Application basketball 1 contre 1',
  description:
    "L'application qui transforme chaque terrain de basketball en arène de compétition 1 contre 1. Scannez le QR code de votre adversaire, lancez le défi, enregistrez vos scores.",
  openGraph: {
    title: 'Court Clash – Application basketball 1 contre 1',
    description:
      "Scannez le QR code de votre adversaire, lancez le défi et grimpez le classement.",
    url: 'https://courtclash.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
