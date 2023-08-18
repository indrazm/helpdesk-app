import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Sidebar = ({ menu }: { menu: any[] }) => {
  return (
    <aside className="w-[260px] bg-primary p-6 flex flex-col justify-between">
      <div>
        {menu.map(({ label, icon, link }) => {
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
        })}
      </div>
      <div>
        <Button className="w-full justify-start">Logout</Button>
      </div>
    </aside>
  );
};
