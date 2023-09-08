import { BecomeSellerDto } from '@/features/complete-setup/types';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getLoggedInUser } from '@/lib/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.hasCompletedSignup) {
    return NextResponse.json(
      { message: 'Unauthenticated', ok: false },
      {
        status: 404,
        statusText: 'Unauthenticated',
      },
    );
  }
  console.log(
    '===============================================================',
  );
  console.log('SERVER SESSION from become-seller.', session);
  try {
    const data: BecomeSellerDto = await req.json();
    if (!data) {
      return NextResponse.json(
        {
          message: 'Data not provided',
        },
        {
          status: 400,
          statusText: 'Bad Request',
        },
      );
    }

    const store = await db.store.create({
      data,
    });

    const updatedUser = await db.user.update({
      where: {
        email: session.user.email as string,
      },
      data: {
        isSeller: true,
        storeId: store.id,
      },
    });

    return NextResponse.json({
      message: 'Successfully updated',
      data: updatedUser,
      ok: true,
      status: 200,
    });
  } catch (error) {
    console.log(error, 'Error in complete-setup-route');
    return NextResponse.json(
      { message: error, ok: false },
      {
        status: 400,
        statusText: 'Bad request',
      },
    );
  }
}
