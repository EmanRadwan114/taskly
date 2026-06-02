'use server';

import { cookies } from 'next/headers';
import { userLogin } from '../services/auth.services';

export const userLoginAction = async (prevState: any, formData: FormData) => {
  const values = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const response = await userLogin(values);

    // set token to cookies
    const cookieStore = await cookies();

    cookieStore.set('access_token', response?.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    cookieStore.set('refresh_token', response?.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return {
      success: true,
      data: response,
      message: 'User logged in successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
