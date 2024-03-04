import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const fontData = await fetch(
    new URL('../../../../../../public/theBasedLP/fonts/VT323/VT323-Regular.ttf', import.meta.url),
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
        This is a test
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
