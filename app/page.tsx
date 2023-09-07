'use client';
import Navbar from '@/components/navbar';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  // const { data } = useSession();
  const [email, setEmail] = useState('');
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <button
          onClick={() => {
            signIn('email', {
              email: email,
              username: 'Bikrant Jung 2',
              redirect: false,
            });
          }}
        >
          Send link
        </button>
      </div>
    </main>
  );
}
