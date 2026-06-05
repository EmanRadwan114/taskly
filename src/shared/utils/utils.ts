import { generateNewTokens } from '@/features/auth/services/auth.services';
import {
  RequestCookie,
  ResponseCookie,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

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

  // check token
  if (!refreshToken?.value || (!refreshToken?.value && !accessToken?.value)) {
    console.log('unauthorized');
    throw new Error('Unauthorized');
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
      // redirect to login if refresh token fails
      cookieStore.delete('refresh_token');
      console.log('unauthorized');
      throw new Error('Unauthorized');
    }
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
      headers: {
        ...requestHeaders,
        Authorization: `Bearer ${accessToken?.value}`,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data?.msg || 'Failed to fetch data');
    return data;
  } catch (error) {
    // throw new Error('Failed to fetch data');
  }
};
