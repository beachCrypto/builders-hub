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
          fontSize: 60,
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
        everyday, I always have been
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
