import { Logo } from '@/components/logo';
import React from 'react';

function VerifyRequest() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <div className="border bg-card flex flex-col gap-4 p-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Check your inbox
          </h3>
          <p className="text-sm">
            Please check your email for registration link.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyRequest;
