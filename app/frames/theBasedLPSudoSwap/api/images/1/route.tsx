import { ImageResponse } from 'next/og';
import Web3 from 'web3';

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

  const floorT = Web3.utils.fromWei(theBasedLPData.getNftPool.floorT, 'ether').slice(0, 5);

  const offerT = Web3.utils.fromWei(theBasedLPData.getNftPool.offerT, 'ether').slice(0, 6);

  return new ImageResponse(
    (
      <div tw="w-full p-10 flex">
        <div tw="w-full p-10 flex flex-col h-screen content-center">
          <div
            style={{
              display: 'flex',
              paddingLeft: '20%',
              alignItems: 'center',
              fontSize: '3rem',
            }}
          >
            <h2>THE BASED LP</h2>
          </div>
          <div
            style={{
              display: 'flex',
              paddingLeft: '25%',
              fontSize: '2rem',
            }}
          >
            Selling at: {floorT} ETH
          </div>
          <div
            style={{
              display: 'flex',
              paddingTop: '5%',
              paddingLeft: '25%',
              fontSize: '2rem',
            }}
          >
            Buying at: {offerT} ETH
          </div>
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
    },
  );
}
