'use client';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from '@/hooks/useForm';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();
  const { data, status } = useSession();
  const [enableSignup, setEnableSignup] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);
  const { formValues, handleChange, handleSubmit } = useForm(handleSignup, {
    email: '',
  });

  //   Check if email is valid
  useEffect(() => {
    console.log('Running useEffect..');
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formValues.email || sendingMail) {
      setEnableSignup(false);
      return;
    } else {
      setEnableSignup(emailRegex.test(formValues.email));
    }
  }, [formValues.email, sendingMail]);

  useEffect(() => {
    if (data?.user && !data.user.hasCompletedSignup)
      router.replace('/complete-setup');
  }, [status, data]);

  async function handleSignup() {
    setSendingMail(true);
    signIn('email', {
      email: formValues.email,
      // When set to true, page will be redirected to ${data.url} or ${verifyRequest} page in authOptions.
      redirect: true,
    })
      .then((data) => {
        console.log(data, 'DATA FROM SIGNIN');
        setSendingMail(false);
      })
      .catch((err) => {
        setEmailFailure(true);
      });
  }
  return (
    <>
      {status === 'loading' ? (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
          <div className="animate-pulse">
            <Logo />
          </div>
          <h3 className="scroll-m-12 text-2xl font-semibold tracking-tight">
            Verifying your account...
          </h3>
        </div>
      ) : status === 'unauthenticated' ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Logo />
            <form
              onSubmit={handleSubmit}
              className="border bg-card flex flex-col gap-4 p-4 px-8"
            >
              <div className="flex flex-col gap-2">
                <h3 className="scroll-m-12 text-2xl font-semibold tracking-tight">
                  Login to your account
                </h3>
                <p className="text-sm max-w-[20rem] px-4 py-4 bg-secondary rounded">
                  A new account will be automatically created for new users.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-normal">
                  Your email
                </Label>
                <Input
                  value={formValues.email}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email address..."
                />
              </div>
              <Button className="mt-4" disabled={!enableSignup}>
                {sendingMail ? (
                  <>
                    <IconLoader2 className="mr-4 h-4 w-4 animate-spin" />
                    Sending mail...
                  </>
                ) : (
                  <>Send login link</>
                )}
              </Button>
              {emailFailure && (
                <p className="text-sm text-destructive">
                  There was an error sending mail. Try again
                </p>
              )}
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;
