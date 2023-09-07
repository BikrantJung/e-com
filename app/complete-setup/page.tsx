import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

function ProfileSetupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Logo />
        <div className="border bg-card flex flex-col gap-4 p-4 px-8">
          <div className="flex flex-col gap-2">
            <h3 className="scroll-m-12 text-2xl font-semibold tracking-tight">
              Setup your profile
            </h3>
            <p className="text-sm max-w-[20rem] px-4 py-4 bg-secondary rounded">
              Your profile will be incomplete without this setup.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-normal">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetupPage;
