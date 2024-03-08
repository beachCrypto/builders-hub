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
          width={1000}
          height={1000}
          src={`${NEXT_PUBLIC_URL}/membersOnly/images/beachcryptomember.png`}
          style={{
            borderWidth: 10,
          }}
        />
      </div>
    ),
    {
      width: 1000,
      height: 1000,
    },
  );
}
