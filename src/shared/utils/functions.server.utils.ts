import { generateNewTokens } from '@/features/auth/services/auth.services';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ACCESS_TOKEN_KEY,
  BASE_URL,
  cookieConfig,
  LIMIT,
  REFRESH_TOKEN_EXPIRES_AT_KEY,
  REFRESH_TOKEN_KEY,
  requestHeaders,
} from './variables.utils';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { toast } from 'react-toastify';
import { IMetaFetchedData } from '../types/shared.types';

//^ ------------------------ fetch for server components -------------------------
export const fetchWithAuthServer = async (
  endpoint: string,
  isPaginated?: boolean,
  options?: RequestInit
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  const rememberMeExpire = cookieStore.get(REFRESH_TOKEN_EXPIRES_AT_KEY)?.value;

  // 1. If tokens are missing (like after logout)
  if (!refreshToken) {
    redirect('/login');
  }

  // refresh access token
  if (refreshToken && !accessToken) {
    try {
      const result = await generateNewTokens(refreshToken);

      if (rememberMeExpire) {
        cookieStore.set({
          name: REFRESH_TOKEN_KEY,
          value: result?.refresh_token,
          ...cookieConfig,
          expires: new Date(+rememberMeExpire),
        } as RequestCookie);
      }

      cookieStore.set({
        name: ACCESS_TOKEN_KEY,
        value: result?.access_token,
        ...cookieConfig,
        maxAge: result?.expires_in,
      } as RequestCookie);
    } catch (error) {
      // redirect to login if refresh token fails
      cookieStore.delete(REFRESH_TOKEN_EXPIRES_AT_KEY);
      cookieStore.delete(REFRESH_TOKEN_KEY);
      redirect('/login');
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        ...requestHeaders,
        Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN_KEY)?.value}`,
        Prefer: isPaginated ? 'count=exact' : 'none',
        prefer: isPaginated ? 'count=exact' : 'none',
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
    if (!response.ok)
      throw new Error(`${response.status}: ${data?.msg || 'Failed to fetch data'}`);

    //^ return pagination metadata
    const result: IMetaFetchedData = { totalCount: 0, totalPages: 0 };

    const contentRange = response.headers.get('content-range');

    if (isPaginated && contentRange) {
      const totalCount = contentRange?.split('/')[1];

      result.totalCount = Number(totalCount);
      result.totalPages = Math.ceil(Number(totalCount) / LIMIT);
    }

    return { data, meta: result };
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes('401') || error.message.includes('403'))
    ) {
      redirect('/login');
    }
    throw new Error('Failed to fetch data');
  }
};

// ^ ------------------------ Get expire date in milliseconds ------------------------
export const getExpireDateInMs = (seconds: number) => {
  return (new Date().getTime() + seconds * 1000).toString();
};

// ^ ------------------------ Handle Network Error ------------------------
export const handleNetworkError = () => {
  if (typeof window !== 'undefined' && !navigator.onLine) {
    toast.error('Network Error');
    return;
  }
};

// ^ ------------------------ Get cookie value ------------------------
export const getCookieValue = async (cookieName: string) => {
  const cookie = await cookies();
  const cookieValue = cookie.get(cookieName)?.value;
  return cookieValue ?? '';
};
