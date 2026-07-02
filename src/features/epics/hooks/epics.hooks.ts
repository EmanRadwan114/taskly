import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/epics.validation';
import {
  createEpicAction,
  updateEpicAction,
} from '../server-actions/epics.actions';
import { useAppDispatch } from '@/shared/libs/store/store';
import { epicsApi } from '@/shared/libs/store/redux-toolkit-query/epics-api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// ^ ---------------------------- Create epic Hook -------------------------
export const useCreateEpic = (projectId: string) => {
  const dispatch = useAppDispatch();
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
      dispatch(epicsApi.util.invalidateTags(['PaginatedEpics', 'AllEpics']));
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
  const dispatch = useAppDispatch();
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
      dispatch(
        epicsApi.util.invalidateTags(['PaginatedEpics', 'EpicBYID', 'AllEpics'])
      );
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
