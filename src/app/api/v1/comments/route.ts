import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get('ticketId');

  try {
    if (!ticketId) throw new Error('Ticket id is required');

    const data = await prisma.comment.findMany({
      where: {
        ticketId,
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
    const createComment = await prisma.comment.create({
      data: {
        content,
        userId,
        ticketId,
      },
    });

    return NextResponse.json({ data: createComment }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
