import React from 'react';
import { AuthTemplate } from '@/components/Auth/templates/AuthTemplate';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthTemplate>{children}</AuthTemplate>;
}
