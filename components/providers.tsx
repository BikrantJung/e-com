'use client';
import { root } from '@/app/fonts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'sonner';

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <SessionProvider>
      <style jsx global>
        {root}
      </style>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

export default Providers;
