import { requestHeaders } from '@/shared/utils/utils';
import { ISignUp } from '../types/auth.types';
import { TLoginInput } from '../validation/login.validation';

// ^------------------------ SignUp -------------------------
export const createUserAccount = async (data: ISignUp) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to create account');

  return result;
};

// ^------------------------ Login -------------------------
export const userLogin = async (data: TLoginInput) => {
  const response = await fetch(
    `${process.env.BASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to login');

  return result;
};

// ^------------------------ Refresh Token -------------------------
export const generateNewTokens = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.BASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to refresh token');

  return result;
};

// ^------------------------ Logout -------------------------
export const userLogout = async (accessToken: string) => {
  console.log(accessToken);

  const response = await fetch(`${process.env.BASE_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error('Failed to logout');

  return true;
};
