import { sign, verify } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();
  const accessSecretKey = process.env.ACCESS_SECRET_KEY!;
  const refreshSecretKey = process.env.REFRESH_SECRET_KEY!;

  try {
    const user: any = verify(refreshToken, refreshSecretKey);

    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const accessToken = sign(payload, accessSecretKey, { expiresIn: '1m' });
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
