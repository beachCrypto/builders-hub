import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import { join } from 'path';
import * as fs from 'fs';

const imageUrl = `${NEXT_PUBLIC_URL}/api/home`;

const fontPath = join(process.cwd(), 'SartoshiScript-Regular.otf');
let fontData = fs.readFileSync(fontPath);

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  // This image will return from an endpoint with satori

  image: {
    src: imageUrl,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a boat story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'are you a mfer',
  description: 'we are all mfers',
  openGraph: {
    title: 'are you a mfer',
    description: 'we are all mfers',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>we are all mfers</h1>
    </>
  );
}
