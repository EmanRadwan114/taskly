'use client';

import EpicDetails from './EpicDetails';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';
import EmptyTasks from '@/features/tasks/components/EmptyTasks';
import Badge from '@/shared/components/ui/Badge';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EpicTasks from '@/features/tasks/components/EpicTasks';
import { useGetEpicTasksQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { toast } from 'react-toastify';
import LoadingEpicDetails from './LoadingEpicDetails';
import LoadingEpicTasks from '@/features/tasks/components/LoadingEpicTasks';
import { useGetEpicByIdQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';
import TasksFetchErrorMsg from '@/features/tasks/components/TasksFetchErrorMsg';

const EpicModal = () => {
  const router = useRouter();
  const { projectId, epicId } = useParams<{
    projectId: string;
    epicId: string;
  }>();

  const {
    data: epicData,
    isLoading: isLoadingEpic,
    error: epicError,
  } = useGetEpicByIdQuery(
    { projectId, epicId },
    { skip: !projectId || !epicId }
  );
  const epic = epicData?.response?.data[0];

  const {
    data: epicsTasksData,
    isLoading: isLoadingEpicsTasks,
    error: tasksError,
    isFetching,
  } = useGetEpicTasksQuery(
    {
      epicId: epic?.id as string,
    },
    { skip: !epic?.id }
  );

  const tasks = epicsTasksData?.response?.data;

  useEffect(() => {
    console.log(isFetching);
  }, [tasks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (epicError) toast.error('Failed to fetch epic');

  return (
    <div
      className=" fixed inset-s-0 inset-e-0 top-0 bottom-0 z-999 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center"
      onClick={() => router.back()}
    >
      <div
        className="bg-white pb-6 lg:pb-8 rounded-lg sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] modal-container relative flex flex-col gap-5 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal content */}
        {isLoadingEpic ? <LoadingEpicDetails /> : <EpicDetails epic={epic} />}

        {/* tasks section */}
        <div className="flex flex-col gap-4 lg:gap-6 px-6 lg:px-8">
          {/* tasks list */}
          {isLoadingEpic || isLoadingEpicsTasks ? (
            <LoadingEpicTasks />
          ) : tasksError ? (
            <TasksFetchErrorMsg />
          ) : !tasks?.length ? (
            <EmptyTasks epic={epic} />
          ) : (
            <>
              {/* header */}
              <div className="flex justify-between items-center">
                <h2 className="text-label-sm text-secondary lg:font-semibold lg:text-slate-dark lg:text-heading-6 lg:leading-7 lg:capitalize">
                  Tasks
                </h2>
                {/* mobile badge */}
                <Badge className="py-0.5 px-2 bg-surface-md rounded-xl lg:hidden">
                  {tasks?.length} tasks
                </Badge>
                {/* desktop link */}
                <LinkButton
                  href={`/project/${projectId}/tasks/new?epic=${epic?.id}`}
                  variant="ghost"
                  className="p-0! hidden lg:flex bg-transparent! text-primary! font-semibold! leading-5!"
                >
                  <PlusIcon className="w-2.75" />
                  Add task
                </LinkButton>
              </div>
              {/* tasks list */}
              <EpicTasks tasks={tasks} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpicModal;
