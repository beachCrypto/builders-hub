import { ImageResponse } from 'next/og';

import Web3 from 'web3';

export const runtime = 'edge';

export const revalidate = 0;

export async function GET() {
  const fontData = await fetch(
    new URL('../../../../../../public/theBasedLP/fonts/VT323/VT323-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

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
          floorT
          offerT
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

  const theBasedLPData = await getData();

  // const floorT = await Web3.utils.fromWei(theBasedLPData.getNftPool.floorT, 'ether').slice(0, 5);

  const floorT = await Web3.utils.fromWei(theBasedLPData.getNftPool.floorT, 'ether');

  const floorTNumber = parseFloat(floorT).toFixed(3);

  const offerT = await Web3.utils.fromWei(theBasedLPData.getNftPool.offerT, 'ether').slice(0, 5);

  const offerTNumber = parseFloat(offerT).toFixed(3);

  const time = new Date();

  return new ImageResponse(
    (
      <div
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          padding: 50,
          paddingTop: 120,
          lineHeight: 1.2,
          fontSize: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            paddingTop: 0,
            fontSize: '5rem',
          }}
        >
          THE BASED LP
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            fontSize: '3rem',
          }}
        >
          Selling at: {floorTNumber} ETH
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            paddingLeft: 40,
            fontSize: '3rem',
          }}
        >
          Buying at: {offerTNumber} ETH
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 30,
            fontSize: '2rem',
          }}
        >
          {time.getHours()}:{time.getMinutes()}:{time.getSeconds()} UTC
        </div>
      </div>
    ),
    {
      width: 800,
      height: 600,
      fonts: [
        {
          name: 'VT323',
          data: fontData,
          style: 'normal',
        },
      ],
      headers: {
        'Cache-Control': 'max-age=10',
      },
    },
  );
}
