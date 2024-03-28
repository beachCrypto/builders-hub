import type { Metadata } from 'next';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

// These styles apply to every route in the application
import './globals.css';

export const metadata: Metadata = {
  title: 'Farcaster Builders Hub',
  description: 'Building tools for Farcaster',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
