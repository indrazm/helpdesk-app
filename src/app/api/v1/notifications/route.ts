import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    if (!userId) throw new Error('User id is required');

    const data = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const { content, userId, ticketId } = await req.json();

  try {
    const createNotification = await prisma.notification.create({
      data: {
        content,
        userId,
        ticketId,
      },
    });

    return NextResponse.json({ data: createNotification }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
