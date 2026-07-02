'use client';
import Button from '@/shared/components/ui/Button';
import { useMobile } from '@/shared/hooks/shared.hooks';
import { TaskStatusEnum } from '../types/tasks.types';
import { useParams, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/shared/libs/tanstack-query/query-keys';

const TasksScrollError: React.FC<{ status?: TaskStatusEnum }> = ({
  status,
}) => {
  const { projectId } = useParams();
  const tasksViewParam = useSearchParams().get('view');
  const queryClient = useQueryClient();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (tasksViewParam === 'board') {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.tasks.projectTasksByStatus, projectId, status],
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.tasks.projectTasksList, projectId],
          });
        }
      }}
    >
      Retry
    </Button>
  );
};

export default TasksScrollError;
