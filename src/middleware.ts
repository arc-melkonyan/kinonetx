import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      const cookies = cookieHeader.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'refreshToken') {
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    }
  }
}
