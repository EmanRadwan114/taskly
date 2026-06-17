import { useActionState, useEffect, useState, useTransition } from 'react';
import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { TProjectInput } from '../validation/project.validation';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { IProject } from '../types/project.types';
import { useGetProjectsQuery } from '@/shared/libs/store/redux-toolkit-query/projects-api';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { useSearchParams } from 'next/navigation';

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

// ^ ----------------------------- Fetch Projects Hook --------------------- //
export const useFetchProjects = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = ((currentPage || 1) - 1) * limit;

  const {
    data: projects,
    isLoading,
    isFetching,
  } = useGetProjectsQuery({
    limit,
    offset,
  });

  const incomingProjects = projects?.response?.data || [];
  const meta = projects?.response?.meta;

  const {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
  } = useHandlePagination<IProject>({
    incomingData: incomingProjects,
    meta,
    isFetching,
    setCurrentPage,
    currentPage,
  });

  return {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
    currentPage,
    meta,
    incomingProjects,
    isLoading,
    isFetching,
  };
};
