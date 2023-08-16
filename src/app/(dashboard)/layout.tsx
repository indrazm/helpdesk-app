import React from 'react';
import { DashboardTemplate } from '@/components/Dashboard/templates/DashboardTemplate';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
