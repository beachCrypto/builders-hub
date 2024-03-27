import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../../config';

import localFont from '@next/font/local';
import Link from 'next/link';
import 'dotenv/config';
import Image from 'next/image';

export const revalidate = 0;

const now = Date.now();

const quicksandFont = localFont({
  src: '../../../public/membersOnly/font/Quicksand/static/Quicksand-Light.ttf',
});

const imageUrl = `${NEXT_PUBLIC_URL}/frames/membersOnly/api/image/0?${now}`;
// getImageData here

const frameMetadata = getFrameMetadata({
  // generateMetadata instead of getFrameMetadata here
  buttons: [
    {
      label: 'enlarge member',
    },
    {
      action: 'link',
      label: 'mint member',
      target: 'https://mint.club/frametech/beachcrypto/member',
    },
  ],
  // This image will return from an endpoint with satori
  image: {
    src: imageUrl,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/frames/membersOnly/api/frame/1?${now}`,
});

export const metadata: Metadata = {
  title: 'Members Only Button',
  description: 'Members Only Button',
  openGraph: {
    title: 'Members Only Button',
    description: 'Members Only Button',
    images: [imageUrl],
  },
  other: {
    ...frameMetadata,
  },
};

// async function getData() {
//   try {
//     const headers = {
//       'content-type': 'application/json',
//       Authorization: process.env.DEFINED_API_KEY || '',
//     };
//     const requestBody = {
//       query: `{
//         getNftPool(
//           address: "0x6f3714d92e5ac5fb6c9611ea5e860920075b1a77"
//           networkId: 8453
//         ) {
//           collectionAddress
//           exchangeAddress
//         }
//       }`,
//     };
//     const options = {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(requestBody),
//     };
//     const res = await (await fetch('https://graph.defined.fi/graphql', options)).json();
//     console.log('RESPONSE FROM FETCH REQUEST', res?.data);
//     return res?.data;
//   } catch (err) {
//     console.log('ERROR DURING FETCH REQUEST', err);
//   }
// }

export default async function Page() {
  // const data = await getData();

  return (
    <div className="w-full p-4">
      <div
        className={quicksandFont.className}
        style={{
          // float: 'left',
          paddingLeft: '33%',
          alignItems: 'center',
          fontSize: '3rem',
        }}
      >
        <Image src={imageUrl} width={600} height={600} alt="Beach Crypto Members Only" />

        <h2>
          <Link
            style={{
              fontSize: '3rem',
            }}
            href="https://mint.club/frametech/beachcrypto/member"
          >
            beachcrypto's members only
          </Link>
        </h2>
      </div>
      {/* <div
        className={sartoshiFont.className}
        style={{
          paddingLeft: '33%',
          alignItems: 'center',
          fontSize: '2rem',
        }}
      >
        <p>{theBasedLPData.getNftPool.collectionAddress}</p>
      </div> */}
    </div>
  );
}
