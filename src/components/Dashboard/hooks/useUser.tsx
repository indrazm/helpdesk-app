'use client';

import { useState, useEffect } from 'react';

import { TUser } from '@/components/Auth/schema/userSchema';

export default function useUser() {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('helpdesk-userdata');
    setUser(userData ? JSON.parse(userData) : null);
  }, []);

  return { user };
}
