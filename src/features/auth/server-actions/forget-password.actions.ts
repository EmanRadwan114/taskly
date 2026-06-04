'use server';

import { cookies } from 'next/headers';
import { forgetPassword } from '../services/forget-password.services';

export const forgetPasswordAction = async (
  prevState: any,
  formData: FormData
) => {
  const values = {
    email: formData.get('email') as string,
  };

  try {
    await forgetPassword(values);

    return {
      success: true,
      message: 'Recovery email sent successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
