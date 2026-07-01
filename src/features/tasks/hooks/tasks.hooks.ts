import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { toast } from 'react-toastify';
import {
  createTaskAction,
  updateTaskAction,
} from '../server-actions/tasks.actions';
import { taskSchema, TTaskInput } from '../validation/tasks.validation';
import { useAppDispatch } from '@/shared/libs/store/store';
import {
  tasksApi,
  useGetProjectTasksByStatusQuery,
} from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { ITask, TaskStatusEnum } from '../types/tasks.types';
import { usePathname, useRouter } from 'next/navigation';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';

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

// ^ ----------------------  Update Task Details Hook  --------------------------
export const useUpdateTaskDetails = (task: ITask | undefined) => {
  const queryClient = useQueryClient();

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
    mutationFn: (formData: FormData) => updateTaskActionWithId(formData),
    onMutate: async (formData) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksByStatus],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.epicTasks],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksList],
      });

      const currentStatus = getValues('status') || TaskStatusEnum.TODO;
      const oldStatus = previousValues.current.status;
      const currentEpicId = getValues('epic_id') || null;
      const oldEpicId = previousValues.current.epic_id;
      const projectId = task?.project_id;

      const oldTasksListCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksList,
        projectId,
      ]);

      queryClient.setQueryData(
        [queryKeys.tasks.projectTasksList, projectId],
        (old: ITask[]) =>
          old
            ? old.map((t) =>
                t.id === task?.id
                  ? {
                      ...t,
                      ...Object.entries(formData).reduce(
                        (acc, [key, value]) => {
                          if (value !== '') {
                            acc[key] = value;
                          }
                          return acc;
                        },
                        {} as Record<string, string>
                      ),
                    }
                  : t
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
        queryKeys.tasks.epicTasks,
        oldEpicId,
        projectId,
      ]);
      const newEpicTasksCache = queryClient.getQueryData([
        queryKeys.tasks.epicTasks,
        currentEpicId,
        projectId,
      ]);

      if (oldStatus !== currentStatus) {
        // Remove item from old column cache array
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, oldStatus, projectId],
          (old: ITask[]) => (old ? old.filter((t) => t.id !== task?.id) : [])
        );
        // add item to the new column cache array
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksByStatus, currentStatus, projectId],
          (old: ITask[]) => {
            const optimisticTask = {
              ...task,
              status: currentStatus,
            };
            return old ? [...old, optimisticTask] : [optimisticTask];
          }
        );
      }

      if (oldEpicId !== currentEpicId) {
        // Remove item from old epic cache array
        queryClient.setQueryData(
          [queryKeys.tasks.epicTasks, oldEpicId, projectId],
          (old: ITask[]) => (old ? old.filter((t) => t.id !== task?.id) : [])
        );
        // add item to the new epic cache array
        queryClient.setQueryData(
          [queryKeys.tasks.epicTasks, currentEpicId, projectId],
          (old: ITask[]) => {
            const optimisticTask = {
              ...task,
              epic_id: currentEpicId,
            };
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

      // Invalidate specific task details & list view
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.taskById, task?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.projectTasksList, projectId],
      });

      // invalidate cache of old & new epic/status if epic/status change
      // or invalidate only selected epic tasks / selected status tasks if epic/status same
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
        if (oldEpicId) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.tasks.epicTasks, oldEpicId, projectId],
          });
        }
        if (currentEpicId) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.tasks.epicTasks, currentEpicId, projectId],
          });
        }
      } else if (currentEpicId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.tasks.epicTasks, currentEpicId, projectId],
        });
      }

      // update old values
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
          [queryKeys.tasks.epicTasks, oldEpicId, projectId],
          context.oldEpicTasksCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.epicTasks, currentEpicId, projectId],
          context.newEpicTasksCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksList, projectId],
          context.oldTasksListCache
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
