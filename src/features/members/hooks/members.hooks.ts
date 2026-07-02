import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  acceptInvitationAction,
  inviteMemberAction,
} from '../server-actions/members.actions';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { TInviteMemberInput } from '../validation/members.validation';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';

// ^ ------------------------- Handle Invite Member ------------------------- //
export const useHandleInviteMember = () => {
  const router = useRouter();

  const { projectId } = useParams<{ projectId: string }>();

  const actionWithProjectId = inviteMemberAction.bind(null, projectId);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await actionWithProjectId(formData);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(
            `/login?redirectTo=/project/${projectId}/members?invite-member=true`
          );
        }
        throw new Error(response.message || 'Failed to invite member.');
      }
      return response;
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to invite member.');
        return;
      }

      toast.success(response.message || 'Member invited successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to invite member');
    },
  });

  // Handlers
  const handleInviteMember = (data: TInviteMemberInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    mutate(formData);
  };

  return {
    handleInviteMember,
    isPending,
    isSuccess,
  };
};

// ^ ------------------------- Handle Accept Invitation ------------------------- //
export const useHandleAcceptInvitation = () => {
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const invitationToken = useSearchParams().get('token');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!invitationToken) {
        throw new Error('Invitation token is required!');
      }
      const response = await acceptInvitationAction(invitationToken);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(`/login?redirectTo=/invite?token=${invitationToken}`);
        }
        throw new Error(response.message || 'Failed to accept invitation.');
      }
      return response;
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to accept invitation.');
        return;
      }

      queryClient.invalidateQueries({
        queryKey: [queryKeys.members.inviteMember, projectId],
      });

      toast.success(
        response.message || 'Member accepted invitation successfully!'
      );

      router.replace(`/project`);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to accept invitation');
    },
  });

  // Handlers
  const handleAcceptInvitation = () => {
    if (!invitationToken) {
      toast.error('Invitation token is required!');
      return;
    }
    mutate();
  };

  return {
    handleAcceptInvitation,
    isPending,
  };
};
