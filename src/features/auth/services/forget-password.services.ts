import { requestHeaders } from '@/shared/utils/utils';
import { TforgetPasswordInput } from '../validation/forget-password.validation';
import { IResetPassword } from '../types/auth.types';

// ^---------------------- Forget Password ------------------------^
export const forgetPassword = async ({ email }: TforgetPasswordInput) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/v1/recover`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result?.msg || 'Failed to recover password');

  return result;
};

// ^---------------------- Reset Password ------------------------^
export const resetPassword = async ({
  password,
  accessToken,
}: IResetPassword) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/v1/user`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}`, ...requestHeaders },
    body: JSON.stringify({ password }),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result?.msg || 'Failed to reset password');

  return result;
};
