import './globals.css';
import { LocaleLangScript } from './LocaleLangScript';

export const metadata = {
  title: "Court Clash : L'application BASKET du 1 contre 1",
  description: 'L\'app du 1 contre 1. Défie, progresse, domine.',
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <LocaleLangScript />
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="any" />
      </head>
      <body className="antialiased min-h-screen font-montserrat">{children}</body>
    </html>
  );
}
