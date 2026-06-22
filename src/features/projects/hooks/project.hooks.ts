import { useActionState, useEffect, useTransition } from 'react';
import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';
import { useAppDispatch } from '@/shared/libs/store/store';
import { projectsApi } from '@/shared/libs/store/redux-toolkit-query/projects-api';

// ^ ---------------------------- Create Project Hook ------------------------- //
export const useSubmitProject = (projectId?: string) => {
  const dispatch = useAppDispatch();

  const action = projectAction.bind(null, projectId);

  const [state, formAction, isPending] = useActionState(action, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (!state) return;

    if (state?.success) {
      toast.success(state.message);
      dispatch(projectsApi.util.invalidateTags(['Projects']));
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleSubmitProject = (data: TProjectInput) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleSubmitProject, isPending, projectState: state };
};
