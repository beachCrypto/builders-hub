import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../../../config';
import { Metadata, ResolvingMetadata } from 'next';
import { useSearchParams } from 'next/navigation';

export const revalidate = 0;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const searchParams = useSearchParams();

  const stringID = searchParams.get('id');

  const id = Number(stringID) + 1;

  const body: FrameRequest = await req.json();

  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  const now = Date.now();

  const imageUrl = `${NEXT_PUBLIC_URL}/frames/membersOnly/api/images/${id}=${id}?${now}`;

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Changing text ${id}`,
        },
        {
          action: 'link',
          label: 'Buy member',
          target: 'https://mint.club/frametech/beachcrypto/member',
        },
      ],
      image: {
        src: imageUrl,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/frames/membersOnly/api/frame/${id}=${id}?${now}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
