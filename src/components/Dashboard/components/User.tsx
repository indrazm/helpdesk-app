'use client';

import { useEffect } from 'react';
import useUser from '../hooks/useUser';

export const User = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div>User</div>;
};
