'use client';

import Link from 'next/link';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useState } from 'react';
import { fromZodError } from 'zod-validation-error';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { userSchema } from '../schema/userSchema';
import { registerState } from '../recoil/registerState';

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useRecoilState(registerState);
  const { toast } = useToast();
  const resetRegisterData = useResetRecoilState(registerState);

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegister = async () => {
    setLoading(true);
    // console.log(registerData);

    try {
      userSchema.parse(registerData);

      const { firstName, lastName, email, password } = registerData;
      const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const { error } = await res.json();

      if (error) {
        toast({ title: 'Error registering user', description: error, variant: 'destructive' });
      }

      toast({ title: 'User registered', description: 'User registered successfully' });
      resetRegisterData();
    } catch (error: any) {
      const validationError = fromZodError(error);
      const errorMessage = validationError.details.map((detail) => <div>- {detail.message}</div>);
      toast({ title: 'Error registering user', description: errorMessage, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-6">
      <h2>Register</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1">
            <Label>First name</Label>
            <Input value={registerData.firstName || ''} onChange={handleEventChange} name="firstName" placeholder="John" />
          </div>
          <div className="space-y-1">
            <Label>Last name</Label>
            <Input value={registerData.lastName || ''} onChange={handleEventChange} name="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input value={registerData.email || ''} onChange={handleEventChange} name="email" type="email" placeholder="email@domain.com" />
        </div>
        <div className="space-y-1">
          <Label>Password</Label>
          <Input value={registerData.password || ''} onChange={handleEventChange} name="password" type="password" placeholder="password" />
        </div>
        <Button disabled={loading} className="w-full" onClick={handleSubmitRegister}>
          Register
        </Button>
      </div>
      <div>
        Have an account ?{' '}
        <Link href="/login">
          <span className="link">Login</span>
        </Link>
      </div>
    </main>
  );
};
