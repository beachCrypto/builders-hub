import { ImageResponse } from 'next/og';
import { NEXT_PUBLIC_URL } from '../../../../../config';

export const runtime = 'edge';

export async function GET() {
  // width = width * 1.25;
  // height = height * 1.25;
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
          width={900}
          height={900}
          src={`${NEXT_PUBLIC_URL}/membersOnly/images/beachcryptomember.png`}
          style={{
            borderWidth: 10,
          }}
        />
      </div>
    ),
    {
      width: 900,
      height: 900,
    },
  );
}
