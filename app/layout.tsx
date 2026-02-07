import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import '../styles/animations.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://connect-four-xps4.vercel.app';

const FC_EMBED = {
  version: '1',
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Neon Gravity',
    action: {
      type: 'launch_frame',
      name: 'Connect Four: Neon Gravity',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
};

export const metadata: Metadata = {
  title: 'Connect Four: Neon Gravity',
  description: 'Futuristic Connect Four game with stunning cyberpunk neon visuals. Play strategic board game in the Base app.',
  openGraph: {
    title: 'Connect Four: Neon Gravity',
    description: 'Strategic board game with stunning cyberpunk visuals',
    images: [
      {
        url: `${APP_URL}/hero-image.png`,
        width: 1200,
        height: 630,
        alt: 'Connect Four: Neon Gravity',
      },
    ],
  },
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    'theme-color': '#00D4FF',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
