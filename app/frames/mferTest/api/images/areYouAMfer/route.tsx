import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const fontData = await fetch(
    new URL('../../../../../../public/SartoshiScript-Regular.otf', import.meta.url),
  ).then((res) => res.arrayBuffer());

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
        are you a mfer?
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
