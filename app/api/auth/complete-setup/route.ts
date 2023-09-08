import { CompleteSetupI } from '@/features/complete-setup/types';
import { db } from '@/lib/db';
import { getLoggedInUser } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({
      statusCode: 404,
      message: 'Unauthenticated',
      ok: false,
    });
  }
  try {
    const data: CompleteSetupI = await req.json();
    if (!data) {
      return NextResponse.json({
        statusCode: 400,
        message: 'Data not provided',
        ok: false,
      });
    }
    const updatedUser = await db.user.update({
      where: {
        email: user.email as string,
      },
      data: {
        name: data.username,
        hasCompletedSignup: true,
        image: `https://api.dicebear.com/7.x/lorelei/svg?seed=${data.username}`,
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
