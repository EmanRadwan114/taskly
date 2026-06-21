import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'react-toastify';
import { createTaskAction } from '../server-actions/tasks.actions';
import { TTaskInput } from '../validation/tasks.validation';
import { useAppDispatch } from '@/shared/libs/store/store';
import { tasksApi } from '@/shared/libs/store/redux-toolkit-query/tasks-api';

// ^ ---------------------------- Create Task Hook ------------------------- //
export const useCreateTask = (projectId: string) => {
  const dispatch = useAppDispatch();

  const action = createTaskAction.bind(null, projectId);

  const [state, formAction, isPending] = useActionState(action, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      dispatch(
        tasksApi.util.invalidateTags(['ProjectTasksByStatus', 'EpicsTasks'])
      );
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleCreateTask = (data: TTaskInput) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.status) formData.append('status', data.status);
    if (data.assignee_id) formData.append('assignee_id', data.assignee_id);
    if (data.due_date) formData.append('due_date', data.due_date);
    if (data.epic_id) formData.append('epic_id', data.epic_id);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleCreateTask, isPending, taskState: state };
};
