import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/validation.epics';
import { createEpicAction } from '../server-actions/epics.actions';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { fetchEpics } from '../services/epics.services';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { useParams } from 'next/navigation';

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
