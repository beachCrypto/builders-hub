import { ImageResponse } from 'next/og';
import { NEXT_PUBLIC_URL } from '../../../../../config';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: 'white',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="600"
          height="600"
          src={`${NEXT_PUBLIC_URL}/mferMagazine/3.png`}
          style={{
            borderWidth: 10,
          }}
        />
      </div>
    ),
    {
      width: 800,
      height: 600,
    },
  );
}
