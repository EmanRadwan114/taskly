'use server';

import { cookies } from 'next/headers';
import { createUserAccount } from '../services/auth.services';

export const createUserAccountAction = async (
  prevState: any,
  formData: FormData
) => {
  const values = {
    data: {
      name: formData.get('name') as string,
      job_title: formData.get('job_title') as string,
    },
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const response = await createUserAccount(values);

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
      user: response?.user,
      message: 'Account created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
