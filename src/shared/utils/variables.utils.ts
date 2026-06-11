import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

//^ ------------------------ PAGINATION DEFAULT VALUE ------------------------
export const LIMIT = 12;

//^ ------------------------ TIME ------------------------
export const REFRESH_TOKEN_SINGLE_SESSION = 60 * 60 * 12; //12hrs
export const REMEMBER_ME_TOKEN_MONTHLY = 30 * 24 * 60 * 60; //1 month

//^ ------------------------ COOKIE KEYS ------------------------
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const REFRESH_TOKEN_EXPIRES_AT_KEY = 'refresh_token_expires_at';

// ^ ----------------------- REGEX -----------------------
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])\S+$/;

export const passwordRegexCheck = {
  length: /^.{8,64}$/,
  uppercase: /^(?=.*[A-Z]).+$/,
  lowercase: /^(?=.*[a-z]).+$/,
  digit: /^(?=.*\d).+$/,
  'special-character': /^(?=.*[!@#$%^&*]).+$/,
  'upper-lower-case': /^(?=.*[A-Z])(?=.*[a-z]).+$/,
};

//^ ------------------------ HEADERS ------------------------
export const requestHeaders = {
  'Content-Type': 'application/json',
  apikey: `${process.env.API_KEY}`,
};

//^ ------------------------ COOKIES CONFIG ------------------------
export const cookieConfig = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} as Partial<ResponseCookie> | undefined;

//^ ------------------------ BASE URL ------------------------
export const BASE_URL = process.env.BASE_URL;
