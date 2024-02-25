import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const fontData = await fetch(
    'https://github.com/beachCrypto/builders-hub/blob/380e00fda4740926314698b498df6a84fb682b7d/SartoshiScript-Regular.otf',
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: '"SartoshiScript"',
          paddingTop: '100px',
          paddingLeft: '50px',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 630,
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
