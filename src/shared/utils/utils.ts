import { generateNewTokens } from '@/features/auth/services/auth.services';
import {
  RequestCookie,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const requestHeaders = {
  'Content-Type': 'application/json',
  apikey: `${process.env.API_KEY}`,
};

export const cookieConfig = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} as Partial<ResponseCookie> | undefined;

//^ ------------------------ fetch for client components -------------------------
export const fetchWithAuthClient = async (
  endpoint: string,
  options?: RequestInit
) => {
  const response = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
    headers: requestHeaders,
    ...options,
    credentials: 'include',
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to fetch data');

  return result;
};

//^ ------------------------ fetch for server components -------------------------
export const fetchWithAuthServer = async (
  endpoint: string,
  options?: RequestInit
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  // 1. If tokens are missing (like after logout)
  if (!refreshToken?.value) {
    redirect('/login');
  }

  // refresh access token
  if (refreshToken?.value && !accessToken?.value) {
    try {
      const result = await generateNewTokens(refreshToken.value);
      cookieStore.set({
        name: 'access_token',
        value: result?.access_token,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      } as RequestCookie);
    } catch (error) {
      cookieStore.delete('refresh_token');
      redirect('/login');
    }
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
      headers: {
        ...requestHeaders,
        Authorization: `Bearer ${cookieStore.get('access_token')?.value}`, // Get fresh value
      },
      ...options,
    });

    // Handle empty responses safely to avoid JSON parse errors
    if (
      response.status === 204 ||
      response.headers.get('content-length') === '0'
    ) {
      return null;
    }

    const data = await response?.json();
    if (!response.ok) throw new Error(data?.msg || 'Failed to fetch data');
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('403')) {
      redirect('/login');
    }
    throw new Error('Failed to fetch data');
  }
};
