'use client';

import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { fromZodError } from 'zod-validation-error';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import { loginState } from '../recoil/loginState';
import { loginSchema } from '../schema/loginSchema';

export const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useRecoilState(loginState);
  const { toast } = useToast();

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async () => {
    setLoading(true);

    try {
      loginSchema.parse(loginData);

      const { email, password } = loginData;

      const res = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const { data, error } = await res.json();

      if (error) {
        toast({ title: 'Error', description: error, variant: 'destructive' });
        return;
      }

      toast({ title: 'Success', description: 'You are logged in' });
      localStorage.setItem('helpdesk-userdata', JSON.stringify(data));
      router.push('/dashboard');
    } catch (error: any) {
      const validationError = fromZodError(error);
      const errorMessage = validationError.details.map((detail) => <div>- {detail.message}</div>);
      toast({ title: 'Error registering user', description: errorMessage, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
    console.log(loginData);
  };

  return (
    <main className="space-y-6">
      <h2>Login</h2>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input value={loginData.email || ''} name="email" type="email" placeholder="email@domain.com" onChange={handleEventChange} />
        </div>
        <div className="space-y-1">
          <Label>Password</Label>
          <Input value={loginData.password || ''} name="password" type="password" placeholder="password" onChange={handleEventChange} />
        </div>
        <Button disabled={loading} className="w-full" onClick={handleSubmitLogin}>
          Login
        </Button>
      </div>
      <div>
        Don&lsquo;t have an account ?{' '}
        <Link href="/register">
          <span className="link">Sign up</span>
        </Link>
      </div>
    </main>
  );
};
