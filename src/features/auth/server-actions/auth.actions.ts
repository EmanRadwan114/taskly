'use server';

import { cookies } from 'next/headers';
import { userLogin } from '../services/auth.services';
import { cookieConfig } from '@/shared/utils/utils';
import { userLogout } from '../services/auth.services';
import { createUserAccount } from '../services/auth.services';

// ^ ---------------------------- Create User Account Action ----------------------------
export const createUserAccountAction = async (
  _: unknown,
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
      ...cookieConfig,
      maxAge: response?.expires_in,
    });
    cookieStore.set('refresh_token', response?.refresh_token, cookieConfig);

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

// ^ ---------------------------- Login Action ----------------------------
export const userLoginAction = async (
  rememberMe: boolean,
  _: unknown,
  formData: FormData
) => {
  const values = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    const response = await userLogin(values);

    // set token to cookies
    const cookieStore = await cookies();

    if (rememberMe) {
      cookieStore.set('refresh_token', response?.refresh_token, {
        ...cookieConfig,
        maxAge: 30 * 24 * 60 * 60, //1 month
      });
    }

    cookieStore.set('access_token', response?.access_token, {
      ...cookieConfig,
      maxAge: response?.expires_in,
    });

    cookieStore.set('refresh_token', response?.refresh_token, cookieConfig);

    return {
      success: true,
      user: response?.user,
      message: 'User logged in successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};

// ^ ---------------------------- Logout Action ----------------------------
export const userLogoutAction = async (_: unknown) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  try {
    if (accessToken) {
      await userLogout(accessToken);
    }

    // delete tokens
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    return {
      success: true,
      message: 'User logged out successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
