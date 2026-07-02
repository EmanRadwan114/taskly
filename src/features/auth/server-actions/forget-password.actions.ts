'use server';

import { forgetPassword } from '../services/forget-password.services';
import { resetPassword } from '../services/forget-password.services';

// ^ ---------------------------- Forget Password Action ----------------------------
export const forgetPasswordAction = async (formData: FormData) => {
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
      message: 'Something went wrong',
    };
  }
};

// ^ ---------------------------- Reset Password Action ----------------------------
export const resetPasswordAction = async (
  accessToken: string,
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
