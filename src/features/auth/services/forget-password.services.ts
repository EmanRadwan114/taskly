import { TforgetPasswordInput } from '../validation/forget-password.validation';
import { IResetPassword } from '../types/forget-password.types';
import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';

// ^---------------------- Forget Password ------------------------^
export const forgetPassword = async ({ email }: TforgetPasswordInput) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/recover`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.msg || 'Failed to recover password');

    return result;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

// ^---------------------- Reset Password ------------------------^
export const resetPassword = async ({
  password,
  accessToken,
}: IResetPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/v1/user`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}`, ...requestHeaders },
      body: JSON.stringify({ password }),
    });

    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.msg || 'Failed to reset password');

    return result;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
