'use client';

import { RecoilRoot } from 'recoil';
import { Toaster } from '../ui/toaster';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RecoilRoot>{children}</RecoilRoot>
      <Toaster />
    </>
  );
};
