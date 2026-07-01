import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { toast } from 'react-toastify';
import { createTaskAction } from '../server-actions/tasks.actions';
import { TTaskInput } from '../validation/tasks.validation';
import { useAppDispatch } from '@/shared/libs/store/store';
import {
  tasksApi,
  useGetProjectTasksByStatusQuery,
} from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { ITask, TaskStatusEnum } from '../types/tasks.types';
import { usePathname, useRouter } from 'next/navigation';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { IMetaFetchedData } from '@/shared/types/shared.types';

// ^ ---------------------------- Create Task Hook -------------------------
export const useCreateTask = ({
  projectId,
  status,
  epicId,
}: {
  projectId: string;
  status: TaskStatusEnum;
  epicId: string;
}) => {
  const dispatch = useAppDispatch();

  const action = createTaskAction.bind(null, projectId);

  const [state, formAction, isPending] = useActionState(action, null);
  const [_, startTransition] = useTransition();

  const inValidateTasksQueries = () => {
    console.log(epicId, status);

    if (status)
      dispatch(
        tasksApi.util.invalidateTags([
          { type: 'ProjectTasksByStatus', id: status },
        ])
      );
    if (epicId)
      dispatch(
        tasksApi.util.invalidateTags([{ type: 'EpicTasks', id: epicId }])
      );
  };

  // effects
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      inValidateTasksQueries();
    } else {
      toast.error(state.message);
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

// ^ ---------------------------- Handle Board Pagination Hook -------------------------
export const useHandleBoardPagination = (params: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  tasks?: ITask[];
  isFetching?: boolean;
  meta?: IMetaFetchedData;
}) => {
  const { currentPage, setCurrentPage, tasks, isFetching, meta } = params;

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const hasMore = meta?.totalPages ? currentPage < meta.totalPages : false;

  const [accumulatedTasks, setAccumulatedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setAccumulatedTasks([]);
      return;
    }

    // reset after search
    if (currentPage === 1) {
      setAccumulatedTasks(tasks);
      return;
    }

    setAccumulatedTasks((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));

      const newItemsOnly = tasks.filter((item) => !existingIds.has(item.id));

      if (newItemsOnly.length === 0) return prev;
      return [...prev, ...newItemsOnly];
    });
  }, [tasks]);

  // Infinite Scroll Observer Configuration
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entires) => {
        const entry = entires[0];
        if (entry.isIntersecting && !isFetching) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore]);

  return {
    hasMore,
    observerTarget,
    accumulatedTasks,
  };
};

// ^ --------------------  Fetch Board Column Hook ---------------------
export const useFetchBoardColumn = ({
  projectId,
  status,
  limit,
  offset,
  searchTerm,
}: {
  projectId: string;
  status: TaskStatusEnum;
  limit: number;
  offset: number;
  searchTerm?: string;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [shouldFetched, setShouldFetched] = useState(false);

  const { data, isFetching, isLoading, error } =
    useGetProjectTasksByStatusQuery(
      { status, projectId, limit, offset, searchTerm },
      { skip: !projectId || !status || !shouldFetched }
    );

  const tasks = data?.response?.data || [];
  const tasksMeta = data?.response?.meta;

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !projectId || !status) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !shouldFetched) {
          setShouldFetched(true);
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [projectId, status, shouldFetched]);

  return {
    tasks,
    tasksMeta,
    isLoading,
    isFetching,
    error,
    observerTarget,
  };
};
