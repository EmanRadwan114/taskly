import { useActionState, useEffect, useTransition } from 'react';
import { createProjectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TAddProjectInput } from '../validation/project.validation';

// ^ ---------------------------- Create Project Hook ------------------------- //
export const useCreateProject = () => {
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    null
  );
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
  const onHandleCreateProject = (data: TAddProjectInput) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleCreateProject, isPending, addProjectState: state };
};
