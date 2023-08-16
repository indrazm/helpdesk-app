import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { notificationId: string } }) {
  const { notificationId } = params;

  try {
    const updateNotification = await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ data: updateNotification });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
