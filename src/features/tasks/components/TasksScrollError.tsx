'use client';
import Button from '@/shared/components/ui/Button';
import { useMobile } from '@/shared/hooks/shared.hooks';
import { tasksApi } from '@/shared/libs/store/redux-toolkit-query/tasks-api';
import { useAppDispatch } from '@/shared/libs/store/store';
import { TaskStatusEnum } from '../types/tasks.types';
import { useParams } from 'next/navigation';

const TasksScrollError: React.FC<{ status?: TaskStatusEnum }> = ({
  status,
}) => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const { isMobile } = useMobile();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        dispatch(
          tasksApi.util.invalidateTags([
            isMobile
              ? { type: 'ProjectTasks', id: projectId as string }
              : { type: 'ProjectTasksByStatus', id: status },
          ])
        );
      }}
    >
      Retry
    </Button>
  );
};

export default TasksScrollError;
