'use server';

import { cookies } from 'next/headers';
import { resetPassword } from '../services/forget-password.services';

export const resetPasswordAction = async (
  accessToken: string,
  prevState: any,
  formData: FormData
) => {
  const values = {
    password: formData.get('password') as string,
    accessToken,
  };

  try {
    await resetPassword(values);

    return {
      success: true,
      message: 'Password reset successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
