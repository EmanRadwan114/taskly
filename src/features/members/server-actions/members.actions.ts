'use server';

import { ACCESS_TOKEN_KEY, BASE_URL } from '@/shared/utils/variables.utils';
import { cookies } from 'next/headers';
import { inviteMember } from '../services/members.services';
import { IInviteMemberRequest } from '../types/members.types';

// ^ ------------------------- Invite Member Action ------------------------- //
export const inviteMemberAction = async (
  projectId: string,
  formData: FormData
) => {
  if (!projectId) {
    return {
      success: false,
      message: 'Project ID is required!',
    };
  }

  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const email = formData.get('email') as string;

  if (!email) {
    return {
      success: false,
      message: 'Email is required!',
    };
  }

  const values: Partial<IInviteMemberRequest> = {
    p_app_url: process.env.APP_URL,
    p_base_url: BASE_URL,
  };

  if (email) {
    values.p_email = email;
  }

  if (projectId) {
    values.p_project_id = projectId;
  }

  try {
    if (!accessToken) {
      return {
        success: false,
        message: 'Session expired, please login again.',
      };
    }

    await inviteMember({ data: values as IInviteMemberRequest, accessToken });

    return {
      success: true,
      message: 'Member invited successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
