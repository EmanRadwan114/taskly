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
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
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
    queryClient.invalidateQueries({
      queryKey: [queryKeys.tasks.projectTasksList, projectId],
    });
    if (epicId)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.epicTasks, epicId, projectId],
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
  enabled = true,
}: {
  projectId: string;
  limit: number;
  offset: number;
  searchTerm?: string;
  enabled?: boolean;
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
    enabled: !!projectId && enabled,
  });
};

// ^ ---------------------- Fetch Mobile Tasks list Hook (infinite scroll) --------------------------
export const useFetchMobileTasksList = ({
  projectId,
  limit,
  searchTerm,
  enabled = true,
}: {
  projectId: string;
  limit: number;
  searchTerm?: string;
  enabled?: boolean;
}) => {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.tasks.projectTasksList,
      projectId,
      'mobile',
      limit,
      searchTerm,
    ],
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId && enabled,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      fetchTasksList({
        projectId,
        limit,
        offset: pageParam as number,
        searchTerm,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (acc, page) => acc + (page?.response?.data?.length || 0),
        0
      );
      const totalCount = lastPage?.response?.meta?.totalCount || 0;
      return loadedCount < totalCount ? loadedCount : undefined;
    },
  });
};

// ^ --------------------  Fetch Board Column Hook ---------------------
export const useFetchBoardColumn = ({
  projectId,
  status,
  limit = 6,
  searchTerm,
}: {
  projectId: string;
  status: TaskStatusEnum;
  limit?: number;
  searchTerm?: string;
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [
      queryKeys.tasks.projectTasksByStatus,
      projectId,
      status,
      searchTerm,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetchTasksByStatus({
        projectId,
        status,
        limit,
        offset: pageParam as number,
        searchTerm,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (acc, page) => acc + (page?.response?.data?.length || 0),
        0
      );
      const totalCount = lastPage?.response?.meta?.totalCount || 0;
      return loadedCount < totalCount ? loadedCount : undefined;
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: !!projectId && !!status && shouldFetch,
  });

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

  const tasks = data?.pages.flatMap((page) => page?.response?.data || []) || [];
  const tasksMeta = data?.pages[data.pages.length - 1]?.response?.meta;

  return {
    tasks,
    tasksMeta,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
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

      queryClient.setQueryData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>([queryKeys.tasks.taskById, projectId, task?.id], (old) => {
        if (!old) return old;
        return {
          ...old,
          response: {
            ...old.response,
            data: old.response.data.map((t) =>
              t.id === task?.id ? { ...t, ...updatedFields } : t
            ),
          },
        };
      });

      const oldTasksListCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksList,
        projectId,
      ]);

      queryClient.setQueryData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>([queryKeys.tasks.projectTasksList, projectId], (old) => {
        if (!old) return old;
        return {
          ...old,
          response: {
            ...old.response,
            data: old.response.data.map((t) =>
              t.id === task?.id ? { ...t, ...updatedFields } : t
            ),
          },
        };
      });

      // snapshot all paginated slices for old & new status columns
      const oldStatusSnapshot = queryClient.getQueriesData<ITask[]>({
        queryKey: [queryKeys.tasks.projectTasksByStatus, projectId, oldStatus],
      });
      const newStatusSnapshot = queryClient.getQueriesData<ITask[]>({
        queryKey: [
          queryKeys.tasks.projectTasksByStatus,
          projectId,
          currentStatus,
        ],
      });
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
        queryClient.setQueriesData<{
          pages: { response: { data: ITask[]; meta: IMetaFetchedData } }[];
          pageParams: unknown[];
        }>(
          {
            queryKey: [
              queryKeys.tasks.projectTasksByStatus,
              projectId,
              oldStatus,
            ],
          },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                response: {
                  ...page.response,
                  data: page.response.data.filter((t) => t.id !== task?.id),
                  meta: {
                    ...page.response.meta,
                    totalCount: Math.max(
                      0,
                      (page.response.meta?.totalCount || 0) - 1
                    ),
                  },
                },
              })),
            };
          }
        );
        queryClient.setQueriesData<{
          pages: { response: { data: ITask[]; meta: IMetaFetchedData } }[];
          pageParams: unknown[];
        }>(
          {
            queryKey: [
              queryKeys.tasks.projectTasksByStatus,
              projectId,
              currentStatus,
            ],
          },
          (old) => {
            const optimisticTask = {
              ...task,
              ...updatedFields,
              status: currentStatus,
            } as ITask;
            if (!old) {
              return {
                pages: [
                  {
                    response: {
                      data: [optimisticTask],
                      meta: {
                        totalCount: 1,
                        totalPages: 1,
                      } as IMetaFetchedData,
                    },
                  },
                ],
                pageParams: [0],
              };
            }
            return {
              ...old,
              pages: old.pages.map((page, idx) => {
                if (idx === 0) {
                  return {
                    ...page,
                    response: {
                      ...page.response,
                      data: [optimisticTask, ...page.response.data],
                      meta: {
                        ...page.response.meta,
                        totalCount: (page.response.meta?.totalCount || 0) + 1,
                      },
                    },
                  };
                }
                return page;
              }),
            };
          }
        );
      } else {
        queryClient.setQueriesData<{
          pages: { response: { data: ITask[]; meta: IMetaFetchedData } }[];
          pageParams: unknown[];
        }>(
          {
            queryKey: [
              queryKeys.tasks.projectTasksByStatus,
              projectId,
              currentStatus,
            ],
          },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                response: {
                  ...page.response,
                  data: page.response.data.map((t) =>
                    t.id === task?.id ? { ...t, ...updatedFields } : t
                  ),
                },
              })),
            };
          }
        );
      }

      if (oldEpicId !== currentEpicId) {
        if (oldEpicId) {
          queryClient.setQueryData<{
            response: { data: ITask[]; meta: IMetaFetchedData };
          }>([queryKeys.epics.epicTasks, oldEpicId, projectId], (old) => {
            if (!old) return old;
            return {
              ...old,
              response: {
                ...old.response,
                data: old.response.data.filter((t) => t.id !== task?.id),
              },
            };
          });
        }
        if (currentEpicId) {
          queryClient.setQueryData<{
            response: { data: ITask[]; meta: IMetaFetchedData };
          }>([queryKeys.epics.epicTasks, currentEpicId, projectId], (old) => {
            const optimisticTask = {
              ...task,
              ...updatedFields,
              epic_id: currentEpicId,
            } as ITask;
            if (!old) {
              return {
                response: {
                  data: [optimisticTask],
                  meta: {} as IMetaFetchedData,
                },
              };
            }
            return {
              ...old,
              response: {
                ...old.response,
                data: [...old.response.data, optimisticTask],
              },
            };
          });
        }
      } else if (currentEpicId) {
        queryClient.setQueryData<{
          response: { data: ITask[]; meta: IMetaFetchedData };
        }>([queryKeys.epics.epicTasks, currentEpicId, projectId], (old) => {
          if (!old) return old;
          return {
            ...old,
            response: {
              ...old.response,
              data: old.response.data.map((t) =>
                t.id === task?.id ? { ...t, ...updatedFields } : t
              ),
            },
          };
        });
      }

      return {
        oldStatusSnapshot,
        newStatusSnapshot,
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
            projectId,
            oldStatus,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.tasks.projectTasksByStatus,
            projectId,
            currentStatus,
          ],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.tasks.projectTasksByStatus,
            projectId,
            currentStatus,
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

      const currentEpicId = getValues('epic_id') || null;
      const oldEpicId = previousValues.current.epic_id;
      const projectId = task?.project_id;

      // restore all caches
      if (context) {
        // restore each paginated slice of old & new status columns
        context.oldStatusSnapshot?.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        context.newStatusSnapshot?.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
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
// ^ ----------------------  Update Task status Hook  --------------------------
export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      task,
      newStatus,
    }: {
      task: ITask | undefined;
      newStatus: TaskStatusEnum;
      searchTerm?: string;
    }) => {
      const updateTaskActionWithId = updateTaskAction.bind(null, task?.id);

      const formData = new FormData();
      formData.append('status', newStatus);
      const response = await updateTaskActionWithId(formData);
      if (!response.success) {
        if (response.status === 401) {
          router.replace(
            `/login?redirectTo=/project/${task?.project_id}/tasks?task_id=${task?.id}`
          );
        }
        throw new Error(response.message || 'Failed to change task status.');
      }
      return response;
    },
    onMutate: async ({
      task,
      newStatus,
      searchTerm,
    }: {
      task: ITask | undefined;
      newStatus: TaskStatusEnum;
      searchTerm?: string;
    }) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksByStatus],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.epics.epicTasks],
      });
      await queryClient.cancelQueries({
        queryKey: [queryKeys.tasks.projectTasksList],
      });

      const oldStatus = task?.status || TaskStatusEnum.TODO;
      const projectId = task?.project_id;

      // snapshot task details cache
      const oldTaskDetailsCache = queryClient.getQueryData([
        queryKeys.tasks.taskById,
        projectId,
        task?.id,
      ]);

      queryClient.setQueryData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>([queryKeys.tasks.taskById, projectId, task?.id], (old) => {
        if (!old) {
          return {
            response: {
              data: [{ ...task, status: newStatus } as ITask],
              meta: {} as IMetaFetchedData,
            },
          };
        }
        return {
          ...old,
          response: {
            ...old.response,
            data: old.response.data.map((t) =>
              t.id === task?.id ? { ...t, status: newStatus } : t
            ),
          },
        };
      });

      // snapshot & update task list cache
      const oldTasksListCache = queryClient.getQueryData([
        queryKeys.tasks.projectTasksList,
        projectId,
      ]);

      queryClient.setQueryData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>([queryKeys.tasks.projectTasksList, projectId], (old) => {
        if (!old) return old;
        return {
          ...old,
          response: {
            ...old.response,
            data: old.response.data.map((t) =>
              t.id === task?.id ? { ...t, status: newStatus } : t
            ),
          },
        };
      });

      // snapshot & update epic tasks cache
      const epicTasksSnapshot = queryClient.getQueriesData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>({
        queryKey: [queryKeys.epics.epicTasks, task?.epic?.id, projectId],
      });

      queryClient.setQueriesData<{
        response: { data: ITask[]; meta: IMetaFetchedData };
      }>(
        { queryKey: [queryKeys.epics.epicTasks, task?.epic?.id, projectId] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            response: {
              ...old.response,
              data: old.response.data.map((t) =>
                t.id === task?.id ? { ...t, status: newStatus } : t
              ),
            },
          };
        }
      );

      // snapshot all paginated board column slices for old & new status
      const oldStatusSnapshot = queryClient.getQueriesData<{
        response: { data: ITask[] };
      }>({
        queryKey: [queryKeys.tasks.projectTasksByStatus, projectId, oldStatus],
      });

      const newStatusSnapshot = queryClient.getQueriesData<{
        response: { data: ITask[] };
      }>({
        queryKey: [queryKeys.tasks.projectTasksByStatus, projectId, newStatus],
      });

      if (oldStatus !== newStatus) {
        queryClient.setQueriesData<{
          pages: { response: { data: ITask[]; meta: IMetaFetchedData } }[];
          pageParams: unknown[];
        }>(
          {
            queryKey: [
              queryKeys.tasks.projectTasksByStatus,
              projectId,
              oldStatus,
            ],
          },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                response: {
                  ...page.response,
                  data: page.response.data.filter((t) => t.id !== task?.id),
                  meta: {
                    ...page.response.meta,
                    totalCount: Math.max(
                      0,
                      (page.response.meta?.totalCount || 0) - 1
                    ),
                  },
                },
              })),
            };
          }
        );

        const optimisticTask = { ...task, status: newStatus } as ITask;
        queryClient.setQueriesData<{
          pages: { response: { data: ITask[]; meta: IMetaFetchedData } }[];
          pageParams: unknown[];
        }>(
          {
            queryKey: [
              queryKeys.tasks.projectTasksByStatus,
              projectId,
              newStatus,
            ],
          },
          (old) => {
            if (!old) {
              return {
                pages: [
                  {
                    response: {
                      data: [optimisticTask],
                      meta: {
                        totalCount: 1,
                        totalPages: 1,
                      } as IMetaFetchedData,
                    },
                  },
                ],
                pageParams: [0],
              };
            }
            return {
              ...old,
              pages: old.pages.map((page, idx) => {
                if (idx === 0) {
                  return {
                    ...page,
                    response: {
                      ...page.response,
                      data: [optimisticTask, ...page.response.data],
                      meta: {
                        ...page.response.meta,
                        totalCount: (page.response.meta?.totalCount || 0) + 1,
                      },
                    },
                  };
                }
                return page;
              }),
            };
          }
        );
      }

      return {
        oldStatusSnapshot,
        newStatusSnapshot,
        epicTasksSnapshot,
        oldTasksListCache,
        oldTaskDetailsCache,
      };
    },
    onSuccess: (response, { task, newStatus }) => {
      if (!response.success) {
        toast.error(response.message || 'Failed to update task status.');
        return;
      }

      toast.success(response.message || 'Task status updated successfully!');

      const oldStatus = task?.status || TaskStatusEnum.TODO;

      const projectId = task?.project_id;

      // invalidate task details & list view
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.taskById, projectId, task?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.tasks.projectTasksList, projectId],
      });

      // invalidate new & old status
      if (oldStatus !== newStatus) {
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
            newStatus,
            projectId,
          ],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.epics.epicTasks, task?.epic?.id, projectId],
      });
    },
    onError: (error, { task }, context) => {
      toast.error(error.message || 'Failed to update task status');

      const projectId = task?.project_id;

      // restore all caches from snapshots
      if (context) {
        context.oldStatusSnapshot?.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        context.newStatusSnapshot?.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        context.epicTasksSnapshot?.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
        queryClient.setQueryData(
          [queryKeys.tasks.projectTasksList, projectId],
          context.oldTasksListCache
        );
        queryClient.setQueryData(
          [queryKeys.tasks.taskById, projectId, task?.id],
          context.oldTaskDetailsCache
        );
      }
    },
  });

  return { handleUpdateTaskStatus: mutate, isPending };
};
