import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const REFRESH_TOKEN_SINGLE_SESSION = 60 * 60 * 12; //12hrs
export const REMEMBER_ME_TOKEN_MONTHLY = 30 * 24 * 60 * 60; //1 month

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const REFRESH_TOKEN_EXPIRES_AT_KEY = 'refresh_token_expires_at';

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

export const BASE_URL = process.env.BASE_URL;
