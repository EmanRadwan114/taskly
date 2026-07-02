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

    if (response.status !== 204) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to invite member');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to invite member';
    throw new Error(errMsg);
  }
};
