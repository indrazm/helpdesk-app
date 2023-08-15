import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import { prisma } from '@/utils/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userid');

  try {
    if (userId) {
      const ticketByUser = await prisma.ticket.findMany({
        where: {
          userId,
        },
      });
      return NextResponse.json({ data: ticketByUser });
    }

    const data = await prisma.ticket.findMany({});
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { title, description, category, status, priority, userId } = await req.json();

  try {
    // Create ticket id
    const date = new Date();
    const currentDate = moment(date).format('YYYYMM');
    const lastTicketNumber = await prisma.ticket.findFirst({
      select: {
        id: true,
      },
      where: {
        id: {
          startsWith: `${category}-${currentDate}`,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
    const ticketNumber = lastTicketNumber
      ? (Number(lastTicketNumber?.id.slice(lastTicketNumber.id.length - 3, lastTicketNumber.id.length)) + 1)
          .toString()
          .padStart(3, '0')
      : '001';

    const ticket = await prisma.ticket.create({
      data: {
        id: `${category}-${currentDate}${ticketNumber}`,
        title,
        description,
        category,
        status,
        priority,
        userId,
      },
    });

    return NextResponse.json({ data: ticket }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
