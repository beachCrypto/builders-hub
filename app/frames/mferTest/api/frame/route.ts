import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  const imageUrl1 = `${NEXT_PUBLIC_URL}/frames/mferTest/api/images/alwaysHaveBeen`;
  const imageUrl2 = `${NEXT_PUBLIC_URL}/frames/mferTest/api/images/everyoneIsAMfer`;
  const imageUrl3 = `${NEXT_PUBLIC_URL}/frames/mferTest/api/images/justGettingStarted`;
  const imageUrl4 = `${NEXT_PUBLIC_URL}/frames/mferTest/api/images/gmfer`;

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }

  if (message?.button === 1) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
        ],
        image: {
          src: imageUrl1,
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  }

  if (message?.button === 2) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
        ],
        image: {
          src: imageUrl2,
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  }

  if (message?.button === 3) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
        ],
        image: {
          src: imageUrl3,
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  }

  if (message?.button === 4) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
          {
            label: 'Yes',
          },
        ],
        image: {
          src: imageUrl4,
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      }),
    );
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Yes',
        },
        {
          label: 'Yes',
        },
        {
          label: 'Yes',
        },
        {
          label: 'Yes',
        },
      ],
      image: {
        src: imageUrl1,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
