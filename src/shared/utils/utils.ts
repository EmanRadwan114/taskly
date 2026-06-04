import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

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
