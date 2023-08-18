import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { prisma } from '@/utils/prisma';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const helpdeskAccessToken = sign(payload, process.env.ACCESS_SECRET_KEY!, { expiresIn: '1d' });
    const helpdeskRefreshToken = sign(payload, process.env.REFRESH_SECRET_KEY!, { expiresIn: '30d' });

    cookies().set('helpdeskAccessToken', helpdeskAccessToken);
    cookies().set('helpdeskRefreshToken', helpdeskRefreshToken, { httpOnly: true });

    return NextResponse.json({ data: payload });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
