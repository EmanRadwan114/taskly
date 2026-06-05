'use server';

import { cookies } from 'next/headers';
import { userLogout } from '../services/auth.services';
import { redirect } from 'next/navigation';

export const userLogoutAction = async (prevState: any) => {
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
