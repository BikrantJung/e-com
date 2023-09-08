'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useCompleteSetup } from './hooks/use-complete-setup';
import { useForm } from '@/hooks/useForm';
import { CompleteSetupI } from './types';
import { IconLoader2 } from '@tabler/icons-react';

function CompleteSetupForm() {
  const { update } = useSession();
  const { formValues, handleChange, handleSubmit } = useForm<CompleteSetupI>(
    handleCompleteSetup,
    {
      username: '',
    },
  );
  const { isLoading, mutate } = useCompleteSetup({
    ...formValues,
  });
  function handleCompleteSetup() {
    mutate();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username" className="text-sm font-normal">
          Username <span className="text-red-500">*</span>
        </Label>
        <Input
          id="username"
          value={formValues.username}
          onChange={handleChange}
          name="username"
          placeholder="Enter your username..."
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          disabled={isLoading || formValues.username.length < 4}
        >
          {isLoading && <IconLoader2 className="h-4 w-4 animate-spin mr-2" />}
          Complete setup
        </Button>
      </div>
    </form>
  );
}

export default CompleteSetupForm;
