'use client';

import Modal from '@/shared/components/ui/Modal';
import { useParams, useSearchParams } from 'next/navigation';
import { taskStatusOptions } from '../../data/tasks.data';
import UserAvatar from '@/shared/components/ui/UserAvatar';
import { useGetTaskByIdQuery } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { useGetAllEpicsQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';
import { getNameInitials } from '@/shared/utils/functions.client.utils';
import {
  useFetchMembers,
  useMobile,
  useHandleTaskDetailsRoute,
} from '@/shared/hooks/shared.hooks';
import UnassignIcon from '@/assets/icons/unassigned.svg';
import TaskDetailsDesktop from './TaskDetailsDesktop';
import TaskDetailsMobile from './TaskDetailsMobile';
import LoadingTaskDetails from './LoadingTaskDetails';
import FetchDataErrorMsg from '@/shared/components/ui/FetchDataErrorMsg';

const TaskDetailsModal: React.FC = ({}) => {
  const { projectId } = useParams();
  const searchParams = useSearchParams();
  const { isMobile } = useMobile(1024);
  const { handleCloseTaskDetails } = useHandleTaskDetailsRoute();

  const taskId = searchParams.get('task_id');
  const isOpen = !!taskId;

  const {
    data: taskData,
    isLoading: isTaskLoading,
    error: taskError,
  } = useGetTaskByIdQuery(
    { projectId: projectId as string, taskId: taskId as string },
    { skip: !projectId || !taskId }
  );

  const {
    data: epicsResponse,
    isError: epicsError,
    isLoading: isEpicsLoading,
  } = useGetAllEpicsQuery(projectId as string, { skip: !projectId });

  const { members } = useFetchMembers(projectId as string);

  const task = taskData?.response?.data?.[0];
  const epicsList = epicsResponse?.response?.data || [];

  // handlers

  // select options
  const statusOptions = taskStatusOptions;

  const epicsOptions = [
    {
      value: '',
      label: 'Select an epic...',
    },
    ...epicsList?.map((epic) => ({
      value: epic.epic_id,
      label: `${epic?.epic_id} (${epic?.title})`,
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
      onClose={handleCloseTaskDetails}
      className="sm:w-full lg:w-3/4 xl:w-2/3 p-0! lg:p-8! self-end"
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
