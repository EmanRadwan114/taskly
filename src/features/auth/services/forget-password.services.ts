import { requestHeaders } from '@/shared/utils/utils';
import { TforgetPasswordInput } from '../validation/forget-password.validation';

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
