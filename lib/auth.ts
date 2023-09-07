import type { NextAuthOptions } from 'next-auth';
import Email from 'next-auth/providers/email';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { transporter } from './emails';
import { db } from './db';
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Email({
      async sendVerificationRequest(params) {
        const { identifier, url, provider } = params;
        const { host } = new URL(url);
        const result = await transporter.sendMail({
          subject: 'Register/Login Link',
          to: identifier,
          html: html({ url, host }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async session({ session, user }) {
      console.log({ session, user });

      const userData = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (session.user && userData) {
        session.user.hasCompletedSignup = userData?.hasCompletedSignup;
        session.user.isSeller = userData?.isSeller;
      }
      return session;
    },
    async signIn(data) {
      console.log({ message: 'Sign in callback', data });
      return true;
    },
  },
  events: {
    async signIn(message) {
      console.log(message, 'SIGN IN MESSAGE EVENT');
    },
  },
  pages: {
    verifyRequest: '/verify-request',
  },
};

function html(params: { url: string; host: string }) {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = '#346df1';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: '#fff',
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}
