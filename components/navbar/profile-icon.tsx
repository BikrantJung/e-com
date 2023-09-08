'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function ProfileIcon() {
  const { data } = useSession();
  return (
    <div>
      {data?.user && data.user.hasCompletedSignup ? (
        <Avatar>
          <AvatarImage src={data.user.image || ''} />
          <AvatarFallback>{data.user.name?.split('')[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

export default ProfileIcon;
