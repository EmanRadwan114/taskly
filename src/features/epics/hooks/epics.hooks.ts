import { projectAction } from '@/features/projects/server-actions/project.actions';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/validation.epics';

// ^ ---------------------------- Create epic Hook ------------------------- //
export const useCreateEpic = (projectId?: string) => {
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
  const onHandleSubmitEpic = (data: TEpicsInput & { project_id: string }) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.project_id) formData.append('project_id', data.project_id);
    if (data.assignee_id) formData.append('assignee_id', data.assignee_id);
    if (data.deadline) formData.append('deadline', data.deadline);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleSubmitEpic, isPending, epicState: state };
};
