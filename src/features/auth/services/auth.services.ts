import { ISignUp } from '../types/auth.types';
import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TLoginInput } from '../validation/auth.validation';

// ^------------------------ SignUp -------------------------
export const createUserAccount = async (data: ISignUp) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.msg || 'Failed to create account');

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to Sign Up';
    throw new Error(errMsg);
  }
};

// ^------------------------ Login -------------------------
export const userLogin = async (data: TLoginInput) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) throw new Error(result?.msg || 'Failed to login');

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to login';
    throw new Error(errMsg);
  }
};

// ^------------------------ Refresh Token -------------------------
export const generateNewTokens = async (refreshToken: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    const result = await response.json();

    if (!response.ok) throw new Error(result?.msg || 'Failed to refresh token');

    return result;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to refresh';
    throw new Error(errMsg);
  }
};

// ^------------------------ Logout -------------------------
export const userLogout = async (accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error('Failed to logout');

    return true;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Failed to logout';
    throw new Error(errMsg);
  }
};
