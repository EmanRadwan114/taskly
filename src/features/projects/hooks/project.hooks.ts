import {
  useActionState,
  useEffect,
  useTransition,
} from 'react';
import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';

// ^ ---------------------------- Create Project Hook ------------------------- //
export const useSubmitProject = (projectId?: string) => {
  const action = projectAction.bind(null, projectId);

  const [state, formAction, isPending] = useActionState(action, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
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
