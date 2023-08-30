'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/config/apiUrl';
import useUser from '@/components/Dashboard/hooks/useUser';
import { useToast } from '@/components/ui/use-toast';
import { APP_URL } from '@/config/appUrl';

interface ISendEmail {
  firstName: string;
  email: string;
  ticketId: string;
  url: string;
}

export const CreateMessage = ({ data }: { data: any }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const { toast } = useToast();

  const sendEmail = async ({ firstName, email, ticketId, url }: ISendEmail) => {
    await fetch(`${API_URL}/email`, {
      method: 'POST',
      body: JSON.stringify({ firstName, email, ticketId, url }),
    });
  };

  const handleCreateMessage = async () => {
    const res = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        content: message,
        userId: user?.id,
        ticketId: data.id,
      }),
    });
    const { error } = await res.json();

    if (error) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
      return;
    }

    await sendEmail({ firstName: user?.firstName!, email: data.user?.email, ticketId: data.id, url: `${APP_URL}${pathname}` });
    toast({ title: 'Success', description: 'Message created' });
    setMessage('');
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <Textarea value={message || ''} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={handleCreateMessage}>Send</Button>
    </div>
  );
};
