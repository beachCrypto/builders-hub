import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { NEXT_PUBLIC_URL } from '../../config';
import type { Metadata } from 'next';
import localFont from '@next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import 'dotenv/config';

const VT323Font = localFont({
  src: '../../../public/theBasedLP/fonts/VT323/VT323-Regular.ttf',
});

const imageUrl = `${NEXT_PUBLIC_URL}/theBasedLP/images/based-lp.gif`;
// getImageData here

const frameMetadata = getFrameMetadata({
  // generateMetadata instead of getFrameMetadata here
  buttons: [
    {
      label: 'The Based LP Sudoswap Pool prices',
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
  title: 'The Based LP and tn100x',
  description: 'The Based LP Sudoswap Pool buy and sell prices and tn100x',
  openGraph: {
    title: 'The Based LP Sudoswap Pool and tn100x',
    description: 'The Based LP Sudoswap Pool buy and sell prices and tn100x',
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
  return (
    <div className="flex items-center justify-center">
      <div className="w-fit p-10">
        <Image src={imageUrl} width={400} height={400} alt="The Base LP" />
        <div className={VT323Font.className}>
          <div className="text-3xl p-4 underline text-center">
            <Link href="https://based.thelp.xyz/">the based lp</Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="w-full p-4">
    //   <div className={VT323Font.className}>
    //     <Image src={imageUrl} width={500} height={500} alt="The Base LP" />

    //     <div>
    //       <p className="text-lg">
    //         <Link href="https://based.thelp.xyz/">the based lp</Link>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
