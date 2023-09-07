import { type DefaultSession } from 'next-auth';
import { type AdapterUser as AU } from 'next-auth/adapters';
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user?: {
      id: string;
      hasCompletedSignup: Boolean;
      isSeller: Boolean;
    } & DefaultSession['user'];
  }
}
// declare module 'next-auth/adapters' {
//   interface AdapterUser extends AU {
//     hasCompletedSignup: Boolean;
//   }
// }
// nextauth.d.ts
