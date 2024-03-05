import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../../config';

export const revalidate = 0;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  const imageUrl = `${NEXT_PUBLIC_URL}/frames/theBasedLPSudoSwap/api/images/${message?.button}`;

  const now = Date.now();

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Click for The Based LP Sudo Swap Pool prices',
        },
      ],
      image: {
        src: imageUrl,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/frames/theBasedLPSudoSwap/api/frame/${message?.button}?${now}`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
