import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { API_URL } from './config/apiUrl';

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('helpdeskAccessToken')?.value;
  const refreshToken = req.cookies.get('helpdeskRefreshToken')?.value;
  const accessSecretKey = process.env.ACCESS_SECRET_KEY;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  try {
    const UintAccessToken = new TextEncoder().encode(accessSecretKey);
    await jose.jwtVerify(accessToken, UintAccessToken);
  } catch (error: any) {
    if (error.name === 'JWTExpired') {
      const res = await fetch(`${API_URL}/auth/refreshtoken`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      const { accessToken: newAccessToken } = await res.json();

      const response = NextResponse.next();
      response.cookies.set('helpdeskAccessToken', newAccessToken);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
