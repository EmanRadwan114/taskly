'use client';

import Modal from '@/shared/components/ui/Modal';
import { useParams, useSearchParams } from 'next/navigation';
import { taskStatusOptions } from '../../data/tasks.data';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { getNameInitials } from '@/shared/utils/functions.client.utils';
import {
  useFetchMembers,
  useHandleModalRoute,
  useMobile,
} from '@/shared/hooks/shared.hooks';
import UnassignIcon from '@/assets/icons/unassigned.svg';
import TaskDetailsDesktop from './TaskDetailsDesktop';
import TaskDetailsMobile from './TaskDetailsMobile';
import LoadingTaskDetails from './LoadingTaskDetails';
import { useFetchTaskDetails } from '../../hooks/tasks.hooks';
import { useFetchAllEpics } from '@/features/epics/hooks/epics.hooks';

const TaskDetailsModal: React.FC = ({}) => {
  const { projectId } = useParams();
  const searchParams = useSearchParams();
  const { isMobile } = useMobile(1024);

  const { handleCloseModal } = useHandleModalRoute({
    queryKey: 'task_id',
  });
  const taskId = searchParams.get('task_id');
  const isOpen = !!taskId;

  const {
    data: taskData,
    isLoading: isTaskLoading,
    error: taskError,
  } = useFetchTaskDetails({
    projectId: projectId as string,
    taskId: taskId as string,
  });

  const {
    data: epicsResponse,
    isError: epicsError,
    isLoading: isEpicsLoading,
  } = useFetchAllEpics({ projectId: projectId as string });

  const { members } = useFetchMembers(projectId as string);

  const task = taskData?.response?.data?.[0];
  const epicsList = epicsResponse?.response?.data || [];

  // select options
  const statusOptions = taskStatusOptions;

  const epicsOptions = [
    {
      value: '',
      label: 'Select an epic...',
    },
    ...epicsList?.map((epic) => ({
      value: epic.epic_id,
      label: isMobile ? epic?.epic_id : `${epic?.epic_id} (${epic?.title})`,
    })),
  ];

  const membersOptions = [
    {
      value: '',
      label: { name: 'Unassigned' },
      icon: (
        <UserAvatar
          className={`${isMobile ? 'size-6' : 'size-7'} bg-surface-md text-slate-dark! text-label`}
          content={<UnassignIcon className="w-3 text-slate-dark" />}
        />
      ),
    },
    ...(members?.map((member) => ({
      value: member?.user_id,
      label: member?.metadata,
      icon: (
        <UserAvatar
          className="size-7 bg-surface-md text-slate-dark! text-label"
          content={getNameInitials(member?.metadata?.name)}
        />
      ),
    })) || []),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="sm:w-full lg:w-3/4 xl:w-2/3 p-0! lg:p-8! self-end lg:self-center"
    >
      {isTaskLoading || isEpicsLoading ? (
        <LoadingTaskDetails />
      ) : isMobile ? (
        <TaskDetailsMobile
          task={task}
          statusOptions={statusOptions}
          epicsOptions={epicsOptions}
          membersOptions={membersOptions}
          isError={taskError || epicsError}
        />
      ) : (
        <TaskDetailsDesktop
          task={task}
          statusOptions={statusOptions}
          epicsOptions={epicsOptions}
          membersOptions={membersOptions}
          isError={taskError || epicsError}
        />
      )}
    </Modal>
  );
};

export default TaskDetailsModal;
