import { NextRequest, NextResponse } from 'next/server';
import { generateNewTokens } from './features/auth/services/auth.services';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const authRoutes = ['login', 'sign-up', 'forget-password'];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  const accessToken = cookies.get('access_token')?.value;
  const refreshToken = cookies.get('refresh_token')?.value;

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(`/${route}`)
  );

  // exclude auth routes form tokens check
  if (isAuthRoute) return NextResponse.next();

  // login if both tokens expired
  if (!refreshToken || (!refreshToken && !accessToken)) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // refresh access token
  if (refreshToken && !accessToken) {
    try {
      const result = await generateNewTokens(refreshToken);
      console.log(result);

      const response = NextResponse.next();

      response.cookies.set({
        name: 'access_token',
        value: result?.access_token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      } as RequestCookie);

      return response;
    } catch (error) {
      // redirect to login if refresh token fails
      const errorResponse = NextResponse.redirect(
        new URL('/login', request.nextUrl)
      );
      errorResponse.cookies.delete('refresh_token');
      return errorResponse;
    }
  }

  return NextResponse.next();
}

// Config object controls where the Proxy executes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
