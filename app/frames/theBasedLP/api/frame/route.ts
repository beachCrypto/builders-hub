import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../../config';

export const revalidate = 0;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  const now = Date.now();

  const imageUrl = `${NEXT_PUBLIC_URL}/frames/theBasedLPSudoswap/api/images/${message?.button}?${now}`;

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'link',
          label: 'Sudoswap Pool',
          target: 'https://sudoswap.xyz/#/manage/base/0x6f3714d92e5ac5fb6c9611ea5e860920075b1a77',
        },
      ],
      image: {
        src: imageUrl,
        aspectRatio: '1:1',
      },
      // postUrl: `${NEXT_PUBLIC_URL}/frames/theBasedLPSudoswap/api/frame/${message?.button}?${now}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
