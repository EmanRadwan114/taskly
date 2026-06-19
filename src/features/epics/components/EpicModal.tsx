'use client';

import EpicDetails from './EpicDetails';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';
import EmptyTasks from '@/features/tasks/components/EmptyTasks';
import Badge from '@/shared/components/ui/Badge';
import { IEpics } from '../types/epics.types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EpicTasks from '@/features/tasks/components/EpicTasks';
import { useGetEpicsTasksQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { toast } from 'react-toastify';
import LoadingEpicTasks from '@/features/tasks/components/LoadingEpicTasks';

interface IProps {
  epic: IEpics;
}

const EpicModal: React.FC<IProps> = ({ epic }) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();

  const {
    data: epicsTasksData,
    isLoading: isLoadingEpicsTasks,
    error,
  } = useGetEpicsTasksQuery({
    epicId: epic?.id!,
  });

  const tasks = epicsTasksData?.response?.data;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (error) toast.error('Failed to fetch tasks');

  return (
    <div
      className=" fixed inset-s-0 inset-e-0 top-0 bottom-0 z-999 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center"
      onClick={() => router.back()}
    >
      <div
        className="bg-white pb-6 lg:pb-8 rounded-lg sm:w-3/4 lg:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] modal-container relative flex flex-col gap-5 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal content */}
        <EpicDetails epic={epic} />

        {/* tasks section */}
        <div className="flex flex-col gap-4 lg:gap-6 px-6 lg:px-8">
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
              href={`/project/${projectId}/tasks/new`}
              variant="ghost"
              btnClassName="hidden lg:flex bg-transparent! text-primary! font-semibold! leading-5!"
              className="p-0!"
            >
              <PlusIcon className="w-2.75" />
              Add task
            </LinkButton>
          </div>
          {/* tasks list */}
          {isLoadingEpicsTasks ? (
            <LoadingEpicTasks />
          ) : tasks?.length ? (
            <EpicTasks tasks={tasks} />
          ) : (
            <EmptyTasks epic={epic} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EpicModal;
