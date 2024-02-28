import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';
import localFont from '@next/font/local';
import Link from 'next/link';

const sartoshiFont = localFont({
  src: '../../../public/SartoshiScript-Regular.otf',
});

const imageUrl = `${NEXT_PUBLIC_URL}/mferMagazine/1.png`;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: '@mleejr',
    },
    {
      label: '@sartocrates',
    },
    {
      label: '@animated',
    },
    {
      label: '@sartoshi',
    },
  ],
  // This image will return from an endpoint with satori

  image: {
    src: imageUrl,
    aspectRatio: '1.91:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/frames/mferMagazine/api/frame`,
});

export const metadata: Metadata = {
  title: 'mfer magazine',
  description: 'famous mfers',
  openGraph: {
    title: 'mfer magazine',
    description: 'famous mfers',
    images: [imageUrl],
  },
  other: {
    ...frameMetadata,
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
        fontSize: '3rem',
      }}
    >
      <h1>
        <Link href="https://warpcast.com/buildershub">join builders hub</Link>
      </h1>
    </div>
  );
}
