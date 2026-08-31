import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';
import { CursorProvider } from '@/components/cursor/CursorContext';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.identity} · ${siteConfig.roleSubtitle}`,
  description: `${siteConfig.name} is a creative developer working across AI/ML, Generative AI, Intelligent Systems, and Experimental Interfaces.`,
  keywords: [
    'Bedantika Mondal',
    'Creative Developer',
    'AI Developer',
    'Machine Learning',
    'Generative AI',
    'Intelligent Systems',
    'Experimental Interfaces',
    'Next.js',
    'GSAP',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bedantikamondal.dev',
    title: `${siteConfig.name} — ${siteConfig.identity}`,
    description: 'Creative Developer specializing in AI/ML, Intelligent Systems, and Experimental Interfaces.',
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-cream text-ink selection:bg-vermilion selection:text-paper min-h-screen flex flex-col antialiased">
        <CursorProvider>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
        </CursorProvider>
      </body>
    </html>
  );
}
