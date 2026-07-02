import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { IInviteMemberRequest, IMember } from '../types/members.types';

// ^--------------------- fetch members ---------------------
export const fetchMembers = async (
  projectId: string
): Promise<{
  response: { data: IMember[] };
}> => {
  try {
    const response = await fetch(`/api/fetch-members?project_id=${projectId}`);

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch members');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch members';
    throw new Error(errMsg);
  }
};

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

// ^-------------------------Accept invitation -------------------------//
export const acceptMemberInvitation = async ({
  accessToken,
  invitationToken,
}: {
  accessToken: string;
  invitationToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/rpc/accept_invitation`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ p_token: invitationToken }),
    });

    if (response.status === 401) {
      throw new Error('Session expired, please login again');
    } else if (response.status === 403) {
      throw new Error('You do not have permission to accept invitation');
    } else if (response.status === 400) {
      throw new Error('Invalid invitation token');
    } else if (response.status !== 204) {
      throw new Error('Failed to accept invitation');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to accept invitation';
    throw new Error(errMsg);
  }
};
