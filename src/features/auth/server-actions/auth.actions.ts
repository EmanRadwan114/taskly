'use server';

import { cookies } from 'next/headers';
import { userLogin } from '../services/auth.services';
import { userLogout } from '../services/auth.services';
import { createUserAccount } from '../services/auth.services';
import {
  ACCESS_TOKEN_KEY,
  cookieConfig,
  REFRESH_TOKEN_EXPIRES_AT_KEY,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_SINGLE_SESSION,
  REMEMBER_ME_TOKEN_MONTHLY,
} from '@/shared/utils/variables.utils';
import { getExpireDateInMs } from '@/shared/utils/functions.server.utils';

// ^ ---------------------------- Create User Account Action ----------------------------
export const createUserAccountAction = async (formData: FormData) => {
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

    cookieStore.set(ACCESS_TOKEN_KEY, response?.access_token, {
      ...cookieConfig,
      maxAge: response?.expires_in,
    });
    cookieStore.set(REFRESH_TOKEN_KEY, response?.refresh_token, {
      ...cookieConfig,
      maxAge: REFRESH_TOKEN_SINGLE_SESSION,
    });

    /*
    store 12 hr date to update the newly generated refresh token expire date
    when generating a new access token
    */
    let refreshTokenExpireDateCookie = getExpireDateInMs(
      REFRESH_TOKEN_SINGLE_SESSION
    );

    cookieStore.set(
      REFRESH_TOKEN_EXPIRES_AT_KEY,
      refreshTokenExpireDateCookie,
      {
        ...cookieConfig,
        maxAge: REFRESH_TOKEN_SINGLE_SESSION,
      }
    );

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

    // default value 12 hr
    let refreshTokenMaxAge: number = REFRESH_TOKEN_SINGLE_SESSION; //12hrs by default

    /*
    store 12 hr date to update the newly generated refresh token expire date
    when generating a new access token
    */
    //  default value 12 hr
    let refreshTokenExpireDateCookie = getExpireDateInMs(
      REFRESH_TOKEN_SINGLE_SESSION
    );

    if (rememberMe) {
      refreshTokenMaxAge = REMEMBER_ME_TOKEN_MONTHLY; //1month
      refreshTokenExpireDateCookie = getExpireDateInMs(
        REMEMBER_ME_TOKEN_MONTHLY
      ); //1month
    }

    cookieStore.set(ACCESS_TOKEN_KEY, response?.access_token, {
      ...cookieConfig,
      maxAge: response?.expires_in,
    });

    cookieStore.set(REFRESH_TOKEN_KEY, response?.refresh_token, {
      ...cookieConfig,
      maxAge: refreshTokenMaxAge,
    });

    cookieStore.set(
      REFRESH_TOKEN_EXPIRES_AT_KEY,
      refreshTokenExpireDateCookie,
      {
        ...cookieConfig,
        maxAge: refreshTokenMaxAge,
      }
    );

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
export const userLogoutAction = async () => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  try {
    if (accessToken) {
      await userLogout(accessToken);
    }

    // delete tokens
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_EXPIRES_AT_KEY);

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
