import { CompleteSetupI } from '@/features/complete-setup/types';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getLoggedInUser } from '@/lib/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthenticated', ok: false },
      {
        status: 404,
      },
    );
  }
  try {
    const data: CompleteSetupI = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: 'Data not provided', ok: false },
        {
          status: 400,
        },
      );
    }
    const updatedUser = await db.user.update({
      where: {
        email: session.user.email as string,
      },
      data: {
        name: data.username,
        hasCompletedSignup: true,
        image: `https://api.dicebear.com/7.x/lorelei/svg?seed=${data.username}`,
      },
    });
    return NextResponse.json(
      { message: 'Successfully updated', data: updatedUser, ok: true },
      {
        status: 200,
      },
    );
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
