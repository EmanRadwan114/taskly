import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { TEpicsInput } from '../validation/validation.epics';
import { createEpicAction } from '../server-actions/epics.actions';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { fetchEpics } from '../services/epics.services';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetEpicsQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';

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

// ^ ---------------------------- Feth Epics Hook -------------------------
export const useFetchEpics = (projectId: string) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = ((currentPage || 1) - 1) * limit;

  const {
    data: epics,
    isLoading,
    isFetching,
  } = useGetEpicsQuery({
    limit,
    offset,
    projectId: projectId as string,
  });

  const incomingEpics = epics?.response?.data || [];
  const meta = epics?.response?.meta;

  const {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
  } = useHandlePagination<IEpics>({
    incomingData: incomingEpics,
    meta,
    isFetching,
    setCurrentPage,
    currentPage,
  });

  useEffect(() => {
    if (projectId) {
      setCurrentPage(1);
    }
  }, [projectId]);

  return {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
    currentPage,
    meta,
    incomingEpics,
    isLoading,
    isFetching,
  };
};
