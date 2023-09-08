'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IconShoppingCart } from '@tabler/icons-react';

function ProfileIcon() {
  const { data } = useSession();
  return (
    <div>
      {data?.user && data.user.hasCompletedSignup ? (
        <div className="flex items-center gap-2">
          {!data.user.isSeller && <Button>Sell your products</Button>}
          <Button variant="outline">
            <IconShoppingCart className="icon" />
          </Button>
          <Avatar>
            <AvatarImage src={data.user.image || ''} />
            <AvatarFallback>{data.user.name?.split('')[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}

export default ProfileIcon;
