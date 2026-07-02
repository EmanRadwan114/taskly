import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { IInviteMemberRequest } from '../types/members.types';

// ^-------------------------Invite new member -------------------------//
export const inviteMember = async ({
  data,
  accessToken,
}: {
  data: IInviteMemberRequest;
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/rpc/invite_member`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new Error('Session expired, please login again');
    }
    if (response.status === 403) {
      throw new Error('You do not have permission to invite members');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to invite member';
    throw new Error(errMsg);
  }
};
