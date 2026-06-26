// Dependencies.
import { NextResponse } from 'next/server';

// Override next proxy.
export function proxy() {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse(null, { status: 404 });
  }
}

// Confine '/components' route to dev.
export const config = {
  matcher: '/components/:path*',
};
