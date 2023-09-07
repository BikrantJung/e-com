import Providers from '@/components/providers';
import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

const inter = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="px-8 bg-[#fbfbf6]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
