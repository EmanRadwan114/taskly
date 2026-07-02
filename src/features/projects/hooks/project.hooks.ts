import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';
import { fetchPaginatedProjects } from '../services/project.services';

// ^ ---------------------------- sumbit Project Hook ------------------------- //
export const useSubmitProject = (projectId?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const action = projectAction.bind(null, projectId);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await action(formData);
      if (!res.success) {
        if (res.status === 401) {
          const routeEndpoint = projectId
            ? `/projects/${projectId}/edit`
            : `/project/new`;
          router.replace(`/login?redirectTo=${routeEndpoint}`);
        }
        throw new Error(res.message || 'Failed to create project.');
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.projects.paginatedProjects],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleSubmitProject = (data: TProjectInput) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);

    mutate(formData);
  };

  return { onHandleSubmitProject, isPending, isSuccess };
};

// ^-------------------- fetch paginated projects --------------------
export const useFetchPaginatedProjects = ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: [queryKeys.projects.paginatedProjects, limit, offset],
    queryFn: () => fetchPaginatedProjects({ limit, offset }),
    staleTime: 60 * 1000, // 1 minute
  });
};
