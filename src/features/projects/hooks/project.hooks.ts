import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';
import { fetchPaginatedProjects } from '../services/project.services';
import { useAppSelector } from '@/shared/libs/store/store';

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

// ^-------------------- fetch paginated projects (desktop) --------------------
export const useFetchPaginatedProjects = ({
  limit,
  offset,
  enabled = true,
}: {
  limit?: number;
  offset?: number;
  enabled?: boolean;
}) => {
  const userId = useAppSelector((state) => state.auth.user?.sub);
  return useQuery({
    queryKey: [queryKeys.projects.paginatedProjects, limit, offset, userId],
    queryFn: () => fetchPaginatedProjects({ limit, offset }),
    staleTime: 60 * 1000, // 1 minute
    enabled,
  });
};

// ^-------------------- fetch paginated projects (mobile infinite scroll) --------------------
export const useFetchMobilePaginatedProjects = ({
  limit,
  enabled = true,
}: {
  limit?: number;
  enabled?: boolean;
}) => {
  const userId = useAppSelector((state) => state.auth.user?.sub);
  return useInfiniteQuery({
    queryKey: [
      queryKeys.projects.paginatedProjects,
      'mobile',
      limit,
      userId,
    ],
    staleTime: 60 * 1000, // 1 minute
    enabled,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchPaginatedProjects({ limit, offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (acc, page) => acc + (page?.response?.data?.length || 0),
        0
      );
      const totalCount = lastPage?.response?.meta?.totalCount || 0;
      return loadedCount < totalCount ? loadedCount : undefined;
    },
  });
};
