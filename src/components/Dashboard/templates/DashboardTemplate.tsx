'use client';

import { BarChart2, Ticket, User2, Settings2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Role } from '@/components/Auth/schema/userSchema';
import useUser from '../hooks/useUser';

const menu = [
  { label: 'Dashboard', icon: <BarChart2 size={18} />, link: '/dashboard', role: Role.USER },
  { label: 'Tickets', icon: <Ticket size={18} />, link: '/dashboard/tickets', role: Role.USER },
  { label: 'Users', icon: <User2 size={18} />, link: '/dashboard/users', role: Role.ADMIN },
  { label: 'Settings', icon: <Settings2 size={18} />, link: '/dashboard/settings', role: Role.ADMIN },
];

export const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const role = user?.role;

  return (
    <div className="flex h-screen">
      <aside className="w-[260px] bg-primary p-6 flex flex-col justify-between">
        <div>
          {menu.map(({ label, icon, link, role: linkRole }) => {
            if (linkRole === role || linkRole === Role.USER) {
              return (
                <Link href={link} key={label} className="block">
                  <Button className="w-full justify-start">
                    <div className="flex gap-4">
                      <div>{icon}</div>
                      <div>{label}</div>
                    </div>
                  </Button>
                </Link>
              );
            }
            return null;
          })}
        </div>
        <div>
          <Button className="w-full justify-start">Logout</Button>
        </div>
      </aside>
      <main className="w-[calc(100vw-3260px)] p-6">{children}</main>
    </div>
  );
};
