import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { inviteMemberAction } from '../server-actions/members.actions';
import { useParams, useRouter } from 'next/navigation';
import { TInviteMemberInput } from '../validation/members.validation';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';

export const useHandleInviteMember = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { projectId } = useParams<{ projectId: string }>();

  const actionWithProjectId = inviteMemberAction.bind(null, projectId);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await actionWithProjectId(formData);
      if (!response.success) {
        router.push(
          `/login?redirectTo=/project/${projectId}/members?invite-member=true`
        );
        throw new Error(response.message || 'Failed to invite member.');
      }
      return response;
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to invite member.');
        return;
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.members.inviteMember, projectId],
      });

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
