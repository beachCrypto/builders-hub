import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import localFont from '@next/font/local';
import Link from 'next/link';

const imageUrl = `${NEXT_PUBLIC_URL}/api/home`;

const sartoshiFont = localFont({
  src: '../public/SartoshiScript-Regular.otf',
});

export const metadata: Metadata = {
  title: 'Farcaster Builders Hub',
  description: 'DIY hub and tools for Farcaster',
  openGraph: {
    title: 'Farcaster Builders Hub',
    description: 'DIY hub and tools for Farcaster',
    images: [imageUrl],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'http://buildershub.xyz/',
    creator: 'https://warpcast.com/beachcrypto',
    images: [imageUrl],
  },
};

export default function Page() {
  return (
    <div
      className={sartoshiFont.className}
      style={{
        display: 'flex',
        paddingLeft: '25%',
        alignItems: 'center',
        fontSize: '4rem',
      }}
    >
      <h1>
        <Link href="https://warpcast.com/buildershub">builders hub</Link>
      </h1>
    </div>
  );
}
