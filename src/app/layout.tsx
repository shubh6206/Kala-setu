import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'KalaSetu: Bridging Artisans to the World',
  description:
    "An AI-powered digital ecosystem to preserve, promote, and monetize India's vast artisanal heritage.",
  keywords: 'Indian handicrafts, artisans, AI identification, traditional crafts, handmade, cultural heritage',
  authors: [{ name: 'KalaSetu Team' }],
  creator: 'KalaSetu',
  publisher: 'KalaSetu',
  openGraph: {
    title: 'KalaSetu: Bridging Artisans to the World',
    description: "Discover and support India's traditional artisans through our AI-powered platform",
    type: 'website',
    locale: 'en_US',
    siteName: 'KalaSetu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KalaSetu: Bridging Artisans to the World',
    description: "Discover and support India's traditional artisans through our AI-powered platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased flex flex-col')}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
