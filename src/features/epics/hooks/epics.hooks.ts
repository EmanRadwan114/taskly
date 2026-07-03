import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/epics.validation';
import {
  createEpicAction,
  updateEpicAction,
} from '../server-actions/epics.actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';
import {
  fetchAllEpics,
  fetchEpicById,
  fetchEpicTasks,
  fetchPaginatedEpics,
} from '../services/epics.services';

// ^ ---------------------------- Create epic Hook -------------------------
export const useCreateEpic = (projectId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const action = createEpicAction.bind(null, projectId);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await action(formData);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(`/login?redirectTo=/project/${projectId}/epics/new`);
        }
        throw new Error(response.message || 'Failed to create epic.');
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.allEpics, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.paginatedEpics, projectId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleSubmitEpic = (data: TEpicsInput) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.assignee_id) formData.append('assignee_id', data.assignee_id);
    if (data.deadline) formData.append('deadline', data.deadline);

    mutate(formData);
  };

  return { onHandleSubmitEpic, isPending, isSuccess };
};

// ^ ---------------------------- Update epic Hook -------------------------
export const useUpdateEpic = (epicId: string, projectId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const action = updateEpicAction.bind(null, epicId);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await action(formData);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(
            `/login?redirectTo=/project/${projectId}/epics/${epicId}`
          );
        }
        throw new Error(response.message || 'Failed to update epic.');
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.allEpics, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.paginatedEpics, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.epicById, projectId, epicId],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleSubmitEpic = (data: Partial<TEpicsInput>) => {
    const formData = new FormData();

    formData.append('title', data.title || '');
    if (data.description)
      formData.append('description', data.description || '');
    formData.append('assignee_id', data.assignee_id || '');
    if (data.deadline) formData.append('deadline', data.deadline || '');

    mutate(formData);
  };

  return { onHandleSubmitEpic, isPending };
};

// ^ ---------------------------- fetch Paginated Epics Hook -------------------------
export const useFetchPaginatedEpics = ({
  projectId,
  limit,
  offset,
  searchTerm,
}: {
  projectId: string;
  limit?: number;
  offset?: number;
  searchTerm?: string;
}) => {
  return useQuery({
    queryKey: [
      queryKeys.epics.paginatedEpics,
      projectId,
      limit,
      offset,
      searchTerm,
    ],
    queryFn: () =>
      fetchPaginatedEpics({
        projectId,
        limit,
        offset,
        searchTerm,
      }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId,
  });
};

// ^ ---------------------------- fetch all Epics Hook -------------------------
export const useFetchAllEpics = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: [queryKeys.epics.allEpics, projectId],
    queryFn: () => fetchAllEpics({ projectId }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId,
  });
};

// ^ ---------------------------- fetch Epic by id Hook -------------------------
export const useFetchEpicById = ({
  projectId,
  epicId,
}: {
  projectId: string;
  epicId: string;
}) => {
  return useQuery({
    queryKey: [queryKeys.epics.epicById, projectId, epicId],
    queryFn: () => fetchEpicById({ projectId, epicId }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId && !!epicId,
  });
};

// ^ ---------------------------- fetch Epic tasks Hook -------------------------
export const useFetchEpicTasks = ({ epicId, projectId }: { epicId: string, projectId: string }) => {
  return useQuery({
    queryKey: [queryKeys.epics.epicTasks, epicId, projectId],
    queryFn: () => fetchEpicTasks({ epicId }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!epicId && !!projectId,
  });
};
