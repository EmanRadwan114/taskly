import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/validation.epics';
import {
  createEpicAction,
  updateEpicAction,
} from '../server-actions/epics.actions';
import { useAppDispatch } from '@/shared/libs/store/store';
import { epicsApi } from '@/shared/libs/store/redux-toolkit-query/epics-api';

// ^ ---------------------------- Create epic Hook -------------------------
export const useCreateEpic = (projectId: string) => {
  const action = createEpicAction.bind(null, projectId);

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
  const onHandleSubmitEpic = (data: TEpicsInput) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.assignee_id) formData.append('assignee_id', data.assignee_id);
    if (data.deadline) formData.append('deadline', data.deadline);

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleSubmitEpic, isPending, epicState: state };
};

// ^ ---------------------------- Update epic Hook -------------------------
export const useUpdateEpic = (projectId: string, epicId: string) => {
  const dispatch = useAppDispatch();

  const action = updateEpicAction.bind(null, projectId, epicId);

  const [state, formAction, isPending] = useActionState(action, null);
  const [_, startTransition] = useTransition();

  // effects
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      dispatch(epicsApi.util.invalidateTags(['Epics']));
    } else {
      toast.error(state?.message);
    }
  }, [state]);

  // handlers
  const onHandleSubmitEpic = (data: Partial<TEpicsInput>) => {
    const formData = new FormData();

    formData.append('title', data.title || '');
    if (data.description)
      formData.append('description', data.description || '');
    formData.append('assignee_id', data.assignee_id || '');
    if (data.deadline) formData.append('deadline', data.deadline || '');

    startTransition(() => {
      formAction(formData);
    });
  };

  return { onHandleSubmitEpic, isPending, epicState: state };
};
