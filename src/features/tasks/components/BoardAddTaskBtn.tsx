'use client';

import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/shared/components/ui/Button';
import { useAppDispatch } from '@/shared/libs/store/store';
import { setSelectedStatus } from '@/shared/libs/store/slices/tasks.slice';
import { TaskStatusEnum } from '../types/tasks.types';

interface Props {
  status: TaskStatusEnum;
}

const BoardAddTaskBtn: React.FC<Props> = ({ status }) => {
  const { projectId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setSelectedStatus(status));
        router.push(`/project/${projectId}/tasks/new`);
      }}
      variant="ghost"
      className="p-4! gap-2! border-2 border-slate-light/30 border-dashed w-full! rounded-sm!"
    >
      <PlusBorderIcon className="text-secondary/60 size-4.5" />
      <span className="uppercase text-secondary/60 font-bold text-body-sm letter-spacing-xl leading-4">
        Add New Task
      </span>
    </Button>
  );
};

export default BoardAddTaskBtn;
