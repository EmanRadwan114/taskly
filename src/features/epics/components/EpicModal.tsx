'use client';

import EpicDetails from './EpicDetails';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';
import EmptyEpicTasks from '@/features/epics/components/EmptyEpicTasks';
import Badge from '@/shared/components/ui/Badge';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import EpicTasks from '@/features/epics/components/EpicTasks';
import { toast } from 'react-toastify';
import LoadingEpicDetails from './LoadingEpicDetails';
import LoadingEpicTasks from '@/features/epics/components/LoadingEpicTasks';
import TaskDetailsModal from '@/features/tasks/components/task-details/TaskDetailsModal';
import FetchDataErrorMsg from '@/shared/components/ui/FetchDataErrorMsg';
import { useFetchEpicById, useFetchEpicTasks } from '../hooks/epics.hooks';
import Modal from '@/shared/components/ui/Modal';
import { useHandleModalRoute } from '@/shared/hooks/shared.hooks';

const EpicModal = () => {
  const router = useRouter();
  const { projectId } = useParams<{
    projectId: string;
  }>();

  const { handleCloseModal } = useHandleModalRoute({
    queryKey: 'epic_id',
  });
  const epicId = useSearchParams().get('epic_id');
  const isOpen = !!epicId;

  const isTaskDetailsModalOpen = !!useSearchParams().get('task_id');

  const {
    data: epicData,
    isLoading: isLoadingEpic,
    error: epicError,
  } = useFetchEpicById({ projectId, epicId });
  const epic = epicData?.response?.data[0];

  const {
    data: epicsTasksData,
    isLoading: isLoadingEpicsTasks,
    error: tasksError,
  } = useFetchEpicTasks({ epicId: epic?.id as string, projectId });

  const tasks = epicsTasksData?.response?.data;

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
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:mx-auto lg:p-8!"
    >
      <div
        className="bg-white pb-6 lg:pb-8 rounded-lg overflow-y-auto max-h-[80vh] scroll relative flex flex-col gap-5 lg:gap-8"
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
            <FetchDataErrorMsg message="Failed to fetch tasks" />
          ) : !tasks?.length ? (
            <EmptyEpicTasks />
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

              {!!isTaskDetailsModalOpen && <TaskDetailsModal />}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EpicModal;
