import { useActionState, useEffect, useTransition } from 'react';
import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';
import { useAppDispatch } from '@/shared/libs/store/store';
import { projectsApi } from '@/shared/libs/store/redux-toolkit-query/projects-api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// ^ ---------------------------- Create Project Hook ------------------------- //
export const useSubmitProject = (projectId?: string) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const action = projectAction.bind(null, projectId);

  const { mutate, isPending } = useMutation({
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
      dispatch(projectsApi.util.invalidateTags(['Projects']));
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

  return { onHandleSubmitProject, isPending };
};
