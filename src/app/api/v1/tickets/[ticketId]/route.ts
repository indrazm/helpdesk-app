import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
  const { ticketId } = params;

  try {
    const data = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { ticketId: string } }) {
  const { ticketId } = params;
  const { status, priority, assigneeId } = await req.json();

  try {
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
        priority,
        assigneeId,
      },
    });

    return NextResponse.json({ data: updatedTicket });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
