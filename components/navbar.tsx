import React from 'react';
import { Logo } from './logo';
import { Button } from './ui/button';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="py-4 flex items-center">
      <Logo />
      <div className="flex gap-4 text-sm ml-24 items-center">
        <p>Men</p>
        <p>Women</p>
        <p>Children</p>
      </div>
      <div className="flex ml-auto gap-4 items-center">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
