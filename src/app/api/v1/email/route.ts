import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/components/Email/Lib/resend';
import { NotificationEmailTemplate } from '@/components/Email/Template/Notification';

export async function POST(req: NextRequest) {
  const { firstName, url, ticketId } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Helpdesk <hey@devscale.id>',
      to: ['esthrim@gmail.com'],
      cc: 'me@indrazm.com',
      subject: 'Your ticket has been updated',
      react: NotificationEmailTemplate({ firstName, ticketId, url }),
    });

    console.log(data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
