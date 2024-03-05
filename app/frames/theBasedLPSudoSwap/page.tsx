import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';
// import { DEFINED_API_KEY } from '../../config';

import localFont from '@next/font/local';
import Link from 'next/link';
import 'dotenv/config';
import Image from 'next/image';

const sartoshiFont = localFont({
  src: '../../../public/theBasedLP/fonts/VT323/VT323-Regular.ttf',
});

const imageUrl = `${NEXT_PUBLIC_URL}/theBasedLP/images/based-lp.gif`;
// getImageData here

const frameMetadata = getFrameMetadata({
  // generateMetadata instead of getFrameMetadata here
  buttons: [
    {
      label: 'Get Sudoswap Pool prices for The Based LP',
    },
  ],
  // This image will return from an endpoint with satori
  image: {
    src: imageUrl,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/frames/theBasedLPSudoswap/api/frame`,
});

export const metadata: Metadata = {
  title: 'The Based LP Sudoswap Pool',
  description: 'The Based LP Sudoswap Pool buy and sell prices',
  openGraph: {
    title: 'The Based LP Sudoswap Pool',
    description: 'The Based LP Sudoswap Pool buy and sell prices',
    images: [imageUrl],
  },
  other: {
    ...frameMetadata,
  },
};

async function getData() {
  try {
    const headers = {
      'content-type': 'application/json',
      Authorization: process.env.DEFINED_API_KEY || '',
    };
    const requestBody = {
      query: `{
        getNftPool(
          address: "0x6f3714d92e5ac5fb6c9611ea5e860920075b1a77"
          networkId: 8453
        ) {
          collectionAddress
          exchangeAddress
        }
      }`,
    };
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };
    const res = await (await fetch('https://graph.defined.fi/graphql', options)).json();
    console.log('RESPONSE FROM FETCH REQUEST', res?.data);
    return res?.data;
  } catch (err) {
    console.log('ERROR DURING FETCH REQUEST', err);
  }
}

export default async function Page() {
  const theBasedLPData = await getData();

  console.log('theBasedLPData', theBasedLPData);

  return (
    <div className="w-full p-4">
      <div
        className={sartoshiFont.className}
        style={{
          // float: 'left',
          paddingLeft: '33%',
          alignItems: 'center',
          fontSize: '3rem',
        }}
      >
        <Image src={imageUrl} width={500} height={500} alt="The Base LP" />

        <h2>
          <Link
            style={{
              paddingLeft: '15%',
              fontSize: '3rem',
            }}
            href="https://based.thelp.xyz/"
          >
            the based lp
          </Link>
        </h2>
      </div>
      <div
        className={sartoshiFont.className}
        style={{
          paddingLeft: '33%',
          alignItems: 'center',
          fontSize: '2rem',
        }}
      >
        <p>{theBasedLPData.getNftPool.collectionAddress}</p>
      </div>
    </div>
  );
}
