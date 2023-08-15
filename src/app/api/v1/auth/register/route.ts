import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/utils/prisma';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 13);

    const userData = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ data: userData });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
