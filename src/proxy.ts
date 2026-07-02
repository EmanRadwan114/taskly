import { NextRequest, NextResponse } from 'next/server';
import { generateNewTokens } from './features/auth/services/auth.services';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import {
  ACCESS_TOKEN_KEY,
  cookieConfig,
  REFRESH_TOKEN_EXPIRES_AT_KEY,
  REFRESH_TOKEN_KEY,
} from './shared/utils/variables.utils';

const authRoutes = ['login', 'sign-up', 'forgot-password', 'reset-password'];

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // pass pathname to server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const cookies = request.cookies;

  const accessToken = cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY)?.value;
  const rememberMeExpire = cookies.get(REFRESH_TOKEN_EXPIRES_AT_KEY)?.value;

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(`/${route}`)
  );

  // auth routes and handle root route with valid tokens
  if (refreshToken && (isAuthRoute || pathname === '/'))
    return NextResponse.redirect(new URL('/project', request.nextUrl));

  if (isAuthRoute && !refreshToken)
    return NextResponse.next({ request: { headers: requestHeaders } });

  const isServerAction = request.headers.has('next-action');

  // login if both tokens expired
  if (!refreshToken || (!refreshToken && !accessToken)) {
    if (isServerAction) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    const originalUrl = encodeURIComponent(`${pathname}${search}`);

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', originalUrl);

    return NextResponse.redirect(loginUrl);
  }

  // refresh access token
  if (refreshToken && !accessToken) {
    try {
      const result = await generateNewTokens(refreshToken);

      request.cookies.set(ACCESS_TOKEN_KEY, result?.access_token);
      request.cookies.set(REFRESH_TOKEN_KEY, result?.refresh_token);

      // Rebuild headers to pick up the updated cookies + x-pathname
      const updatedHeaders = new Headers(request.headers);
      updatedHeaders.set('x-pathname', pathname);

      const response = NextResponse.next({
        request: { headers: updatedHeaders },
      });

      if (rememberMeExpire) {
        response.cookies.set({
          name: REFRESH_TOKEN_KEY,
          value: result?.refresh_token,
          ...cookieConfig,
          expires: new Date(+rememberMeExpire),
        } as RequestCookie);
      }

      response.cookies.set({
        name: ACCESS_TOKEN_KEY,
        value: result?.access_token,
        ...cookieConfig,
        maxAge: result?.expires_in,
      } as RequestCookie);

      return response;
    } catch (error) {
      // redirect to login if refresh token fails
      const errorResponse = NextResponse.redirect(
        new URL('/login', request.nextUrl)
      );
      errorResponse.cookies.delete(REFRESH_TOKEN_KEY);
      errorResponse.cookies.delete(REFRESH_TOKEN_EXPIRES_AT_KEY);
      return errorResponse;
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
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
     * - specific public assets like .svg, .png, .jpg, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)',
  ],
};
