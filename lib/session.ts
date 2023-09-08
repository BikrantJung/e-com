import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

// Cannot use this function in client components
// Pass session as props instead.
export async function getSession() {
  const session = await getServerSession(authOptions);

  return session;
}
export async function getLoggedInUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
