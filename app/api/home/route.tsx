import { ImageResponse } from 'next/og';
import { join } from 'path';
import * as fs from 'fs';

const fontPath = join(process.cwd(), 'SartoshiScript-Regular.otf');
let fontData = fs.readFileSync(fontPath);

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        👋 Hello
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          data: fontData,
          name: 'SartoshiScript',
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
