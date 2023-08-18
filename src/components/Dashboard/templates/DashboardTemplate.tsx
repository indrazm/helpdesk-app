import { BarChart2, Ticket, User2, Settings2 } from 'lucide-react';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Role } from '@/components/Auth/schema/userSchema';
import { Sidebar } from './Sidebar';

const adminMenu = [
  { label: 'Dashboard', icon: <BarChart2 size={18} />, link: '/dashboard' },
  { label: 'Tickets', icon: <Ticket size={18} />, link: '/dashboard/tickets' },
  { label: 'Users', icon: <User2 size={18} />, link: '/dashboard/users' },
  { label: 'Settings', icon: <Settings2 size={18} />, link: '/dashboard/settings' },
];

const userMenu = [
  { label: 'Dashboard', icon: <BarChart2 size={18} />, link: '/dashboard' },
  { label: 'Tickets', icon: <Ticket size={18} />, link: '/dashboard/tickets' },
];

export const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  const accessToken = cookies().get('helpdeskAccessToken')?.value!;
  const accessTokenSecret = process.env.ACCESS_SECRET_KEY!;

  const payload: any = verify(accessToken, accessTokenSecret);
  if (payload.role === Role.ADMIN) {
    return (
      <div className="flex h-screen">
        <Sidebar menu={adminMenu} />
        <main className="w-[calc(100vw-260px)] p-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar menu={userMenu} />
      <main className="w-[calc(100vw-260px)] p-6">{children}</main>
    </div>
  );
};
