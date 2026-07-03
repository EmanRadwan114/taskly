import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  createTaskAction,
  updateTaskAction,
} from '../server-actions/tasks.actions';
import { taskSchema, TTaskInput } from '../validation/tasks.validation';
import { ITask, TaskStatusEnum } from '../types/tasks.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';
import {
  fetchTaskById,
  fetchTasksByStatus,
  fetchTasksList,
} from '../services/tasks.services';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const queryClient = useQueryClient();

  const action = createTaskAction.bind(null, projectId);

  const inValidateTasksQueries = () => {
    if (status)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.projectTasksByStatus, projectId, status],
      });
    if (epicId)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.epicTasks, epicId],
      });
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await action(formData);
      if (!res.success) {
        if (res.status === 401) {
          router.replace(`/login?redirectTo=/project/${projectId}/tasks/new`);
        }
        throw new Error(res.message);
      }
      return res;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      inValidateTasksQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handlers
  const onHandleCreateTask = (data: TTaskInput) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.status) formData.append('status', data.status);
    if (data.assignee_id) formData.append('assignee_id', data.assignee_id);
    if (data.due_date) formData.append('due_date', data.due_date);
    if (data.epic_id) formData.append('epic_id', data.epic_id);

    mutate(formData);
  };

  return { onHandleCreateTask, isPending, isSuccess };
};

// ^ ---------------------- Fetch Task Details Hook --------------------------
export const useFetchTaskDetails = ({
  projectId,
  taskId,
}: {
  projectId: string;
  taskId: string;
}) => {
  return useQuery({
    queryKey: [queryKeys.tasks.taskById, projectId, taskId],
    queryFn: () => fetchTaskById({ projectId, taskId }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId && !!taskId,
  });
};

// ^ ---------------------- Fetch Tasks by Status Hook --------------------------
export const useFetchTasksByStatus = ({
  projectId,
  status,
  limit,
  offset,
  searchTerm,
  shouldFetch = false,
}: {
  projectId: string;
  status: string;
  limit: number;
  offset: number;
  searchTerm?: string;
  shouldFetch: boolean;
}) => {
  return useQuery({
    queryKey: [
      queryKeys.tasks.projectTasksByStatus,
      projectId,
      status,
      limit,
      offset,
      searchTerm,
    ],
    queryFn: () =>
      fetchTasksByStatus({ projectId, status, limit, offset, searchTerm }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId && !!status && shouldFetch,
  });
};

// ^ ---------------------- Fetch Tasks list Hook --------------------------
export const useFetchTasksList = ({
  projectId,
  limit,
  offset,
  searchTerm,
}: {
  projectId: string;
  limit: number;
  offset: number;
  searchTerm?: string;
}) => {
  return useQuery({
    queryKey: [
      queryKeys.tasks.projectTasksList,
      projectId,
      limit,
      offset,
      searchTerm,
    ],
    queryFn: () => fetchTasksList({ projectId, limit, offset, searchTerm }),
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId,
  });
};

// ^ ---------------------------- Handle Board Pagination Hook -------------------------
export const useHandleBoardPagination = (params: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  tasks?: ITask[];
  isFetching?: boolean;
  meta?: IMetaFetchedData;
  scrollRoot?: React.RefObject<HTMLDivElement | null>;
}) => {
  const { currentPage, setCurrentPage, tasks, isFetching, meta, scrollRoot } =
    params;

  const observerTarget = useRef<HTMLDivElement | null>(null);

  const hasMore = meta?.totalPages ? currentPage < meta.totalPages : false;

  const [accumulatedTasks, setAccumulatedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (!tasks) return;

    //reset after search
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
  }, [tasks, currentPage]);

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
      {
        threshold: 0,
        rootMargin: '100px',
        root: scrollRoot?.current ?? null,
      }
    );
    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [hasMore, isFetching, setCurrentPage, scrollRoot, accumulatedTasks]);

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
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching, isLoading, error } = useFetchTasksByStatus({
    status,
    projectId,
    limit,
    offset,
    searchTerm,
    shouldFetch,
  });

  const tasks = data?.response?.data || [];
  const tasksMeta = data?.response?.meta;

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !projectId || !status) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !shouldFetch) {
          setShouldFetch(true);
        }
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [projectId, status, shouldFetch]);

  return {
    tasks,
    tasksMeta,
    isLoading,
    isFetching,
    error,
    observerTarget,
  };
};

// ^ ----------------------  Update Task Details Hook  --------------------------
export const useUpdateTaskDetails = (task: ITask | undefined) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const previousValues = useRef({
    title: task?.title || '',
    status: task?.status || TaskStatusEnum.TODO,
    description: task?.description || '',
    assignee_id: task?.assignee?.id || null,
    epic_id: task?.epic?.id || null,
    due_date: task?.due_date || '',
  });

  const {
    control,
    getValues,
    watch,
    trigger,
    getFieldState,
    reset,
    formState: { errors },
  } = useForm<TTaskInput>({
    resolver: zodResolver(taskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: task?.title || '',
      status: task?.status || TaskStatusEnum.TODO,
      description: task?.description || '',
      assignee_id: task?.assignee?.id || '',
      epic_id: task?.epic?.id || '',
      due_date: task?.due_date || '',
    },
  });

  const taskStatus = watch('status');

  const updateTaskActionWithId = updateTaskAction.bind(null, task?.id);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await updateTaskActionWithId(formData);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(
            `/login?redirectTo=/project/${task?.project_id}/tasks?task_id=${task?.id}`
          );
        }
        throw new Error(response.message || 'Failed to update task.');
      }
      return response;
    },
    onMutate: async (formData) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksByStatus],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.epics.epicTasks],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksList],
      });

      const currentStatus = getValues('status') || TaskStatusEnum.TODO;
      const oldStatus = previousValues.current.status;
      const currentEpicId = getValues('epic_id') || null;
      const oldEpicId = previousValues.current.epic_id;
      const projectId = task?.project_id;

      const updatedFields: Record<string, unknown> = {};
      formData.forEach((value, key) => {
        if (value !== '') {
          updatedFields[key] = value;
        }
      });

      // update task details & task list cache
      const oldTaskDetailsCache = queryClient.getQueryData([
        queryKeys.tasks.taskById,
        projectId,
        task?.id,
      ]);

      queryClient.setQueryData(
        [queryKeys.tasks.taskById, projectId, task?.id],
        (old: ITask) => (old ? { ...old, ...updatedFields } : old)
      );

      const oldTasksListCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksList,
        projectId,
      ]);

      queryClient.setQueryData(
        [queryKeys.tasks.projectTasksList, projectId],
        (old: ITask[] | undefined) =>
          old
            ? old.map((t) =>
                t.id === task?.id ? { ...t, ...updatedFields } : t
              )
            : []
      );

      const oldStatusCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksByStatus,
        oldStatus,
        projectId,
      ]);
      const newStatusCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksByStatus,
        currentStatus,
        projectId,
      ]);
      const oldEpicTasksCache = queryClient.getQueryData([
        queryKeys.epics.epicTasks,
        oldEpicId,
        projectId,
      ]);
      const newEpicTasksCache = queryClient.getQueryData([
        queryKeys.epics.epicTasks,
        currentEpicId,
        projectId,
      ]);

      // update old & new status/epic cache
      if (oldStatus !== currentStatus) {
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, oldStatus, projectId],
          (old: ITask[]) => (old ? old.filter((t) => t.id !== task?.id) : [])
        );
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, currentStatus, projectId],
          (old: ITask[]) => {
            const optimisticTask = {
              ...task,
              ...updatedFields,
              status: currentStatus,
            } as ITask;
            return old ? [...old, optimisticTask] : [optimisticTask];
          }
        );
      }

      if (oldEpicId !== currentEpicId) {
        queryClient.setQueryData(
          [queryKeys.epics.epicTasks, oldEpicId, projectId],
          (old: ITask[]) => (old ? old.filter((t) => t.id !== task?.id) : [])
        );
        queryClient.setQueryData(
          [queryKeys.epics.epicTasks, currentEpicId, projectId],
          (old: ITask[]) => {
            const optimisticTask = {
              ...task,
              ...updatedFields,
              epic_id: currentEpicId,
            } as ITask;
            return old ? [...old, optimisticTask] : [optimisticTask];
          }
        );
      }

      return {
        oldStatusCache,
        newStatusCache,
        oldEpicTasksCache,
        newEpicTasksCache,
        oldTasksListCache,
        oldTaskDetailsCache,
      };
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to update task.');
        reset(previousValues.current);
        return;
      }

      toast.success(response.message || 'Task updated successfully!');

      const currentStatus = getValues('status') || TaskStatusEnum.TODO;
      const oldStatus = previousValues.current.status;
      const currentEpicId = getValues('epic_id') || null;
      const oldEpicId = previousValues.current.epic_id;
      const projectId = task?.project_id;

      // invalidate task details & list view
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.taskById, projectId, task?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.projectTasksList, projectId],
      });

      // invalidate new & old epic/status if changes
      //or invalidate only current status/epic if remain the same
      if (oldStatus !== currentStatus) {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.tasks.projectTasksByStatus,
            oldStatus,
            projectId,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.tasks.projectTasksByStatus,
            currentStatus,
            projectId,
          ],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.tasks.projectTasksByStatus,
            currentStatus,
            projectId,
          ],
        });
      }

      if (oldEpicId !== currentEpicId) {
        if (oldEpicId)
          queryClient.invalidateQueries({
            queryKey: [queryKeys.epics.epicTasks, oldEpicId, projectId],
          });
        if (currentEpicId)
          queryClient.invalidateQueries({
            queryKey: [queryKeys.epics.epicTasks, currentEpicId, projectId],
          });
      } else if (currentEpicId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.epics.epicTasks, currentEpicId, projectId],
        });
      }

      previousValues.current = {
        title: getValues('title') || '',
        status: currentStatus,
        description: getValues('description') || '',
        assignee_id: getValues('assignee_id') || null,
        epic_id: currentEpicId,
        due_date: getValues('due_date') || '',
      };
    },
    onError: (error, _, context) => {
      toast.error(error.message || 'Failed to update task');

      const currentStatus = getValues('status') || TaskStatusEnum.TODO;
      const oldStatus = previousValues.current.status;
      const currentEpicId = getValues('epic_id') || null;
      const oldEpicId = previousValues.current.epic_id;
      const projectId = task?.project_id;

      // restore all caches
      if (context) {
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, oldStatus, projectId],
          context.oldStatusCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, currentStatus, projectId],
          context.newStatusCache
        );
        queryClient.setQueryData(
          [queryKeys.epics.epicTasks, oldEpicId, projectId],
          context.oldEpicTasksCache
        );
        queryClient.setQueryData(
          [queryKeys.epics.epicTasks, currentEpicId, projectId],
          context.newEpicTasksCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksList, projectId],
          context.oldTasksListCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.taskById, projectId, task?.id],
          context.oldTaskDetailsCache
        );
      }

      reset(previousValues.current);
    },
  });

  // Handlers
  const handleUpdateAction = (fieldName: keyof TTaskInput) => {
    const formData = new FormData();
    formData.append(fieldName, getValues(fieldName) || '');
    mutate(formData);
  };

  const handleUpdateTaskDetails = async (fieldName: keyof TTaskInput) => {
    const isFieldValid = await trigger(fieldName);
    const { isDirty: isFieldDirty } = getFieldState(fieldName);

    const isValueChanged =
      getValues(fieldName) !== previousValues.current[fieldName];

    if (isFieldValid && (isFieldDirty || isValueChanged)) {
      handleUpdateAction(fieldName);
    }
  };

  return {
    handleUpdateTaskDetails,
    control,
    errors,
    taskStatusWatcher: taskStatus,
    isPending,
  };
};
