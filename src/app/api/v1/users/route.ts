import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: Role.ADMIN,
      },
    });
    console.log({ data });
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
