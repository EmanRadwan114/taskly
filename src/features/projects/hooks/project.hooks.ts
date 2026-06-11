import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { projectAction } from '../server-actions/project.actions';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import {
  fetchPaginatedProjects,
  resetProjects,
  setCurrentPage,
} from '@/shared/libs/store/slices/project.slice';
import { useMobile } from '@/shared/hooks/shared.hooks';
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

// ^ ------------------------ Use Handle Pagination Hook ------------------------- //
export const useHandlePagination = () => {
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const { isMobile } = useMobile(768);

  const dispatch = useAppDispatch();

  const {
    projects,
    limit,
    currentPage,
    loading,
    totalPages,
    totalCount,
    error,
  } = useAppSelector((state) => state.project);

  const offset = (currentPage - 1) * limit;

  // reset on unmount
  useEffect(() => {
    return () => {
      dispatch(resetProjects());
    };
  }, [dispatch]);

  // fetch paginated data
  useEffect(() => {
    dispatch(fetchPaginatedProjects({ limit, offset, append: isMobile }));
  }, [currentPage, isMobile, limit, offset, dispatch]);

  // handle hasMore state
  useEffect(() => {
    if (
      (projects?.length === 0 && loading === 'success') ||
      (totalPages !== undefined && currentPage >= totalPages)
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [projects, currentPage, loading, totalPages]);

  // observer for infinite scroll on mobile
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && loading === 'success') {
          dispatch(setCurrentPage(currentPage + 1));
        }
      },
      { threshold: 0, root: null, rootMargin: '0px' }
    );
    // watching target element
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading, currentPage, dispatch]);

  return {
    projects,
    totalCount,
    loading,
    error,
    isMobile,
    hasMore,
    observerTarget,
  };
};
