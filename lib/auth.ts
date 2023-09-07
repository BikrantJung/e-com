import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from './db';
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async session({ session, user }) {
      //   if (user && session) {
      //     session.user.id = user.id;
      //     session.user.name = user.name;
      //     session.user.email = user.email;
      //     session.user.image = user.image;
      //   }

      return session;
    },
    async signIn(data) {
      console.log({ message: 'Sign in callback', data });
      return true;
    },
  },
  events: {
    // async signIn(message) {
    //   if (message.isNewUser === true && message.account?.provider === 'email') {
    //     const initialUsername = message.user.email?.split('@')[0];
    //     await db.user.update({
    //       where: {
    //         id: message.user.id,
    //       },
    //       data: {
    //         name: initialUsername,
    //       },
    //     });
    //   }
    // },
  },
};
