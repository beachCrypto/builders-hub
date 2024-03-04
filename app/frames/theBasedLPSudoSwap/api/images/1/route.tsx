import { ImageResponse } from 'next/og';
// import Web3 from 'web3';

export const runtime = 'edge';

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

  // const floorT = Web3.utils.fromWei(theBasedLPData.getNftPool.floorT, 'ether').slice(0, 6);

  const floorT = theBasedLPData.getNftPool.floorT;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 70,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: '"SartoshiScript"',
        }}
      >
        Updated
        <p>Selling at: {floorT} ETH</p>
      </div>
    ),
    {
      width: 800,
      height: 600,
      fonts: [
        {
          name: 'SartoshiScript',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
