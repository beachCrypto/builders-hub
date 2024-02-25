import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';
import localFont from '@next/font/local';

const sartoshiFont = localFont({
  src: '../../../public/SartoshiScript-Regular.otf',
});

const imageUrl = `${NEXT_PUBLIC_URL}/frames/mferTest/api/home`;

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Yes',
    },
    {
      label: 'Yes',
    },
    {
      label: 'Yes',
    },
    {
      label: 'Yes',
    },
  ],
  // This image will return from an endpoint with satori

  image: {
    src: imageUrl,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/frames/mferTestapi/home`,
});

export const metadata: Metadata = {
  title: 'are you a mfer',
  description: 'we are all mfers',
  openGraph: {
    title: 'are you a mfer',
    description: 'we are all mfers',
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '5rem',
      }}
    >
      <h1>we are all mfers</h1>
    </div>
  );
}
