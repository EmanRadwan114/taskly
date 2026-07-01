'use client';
import { useHandleTaskDetailsRoute } from '@/shared/hooks/shared.hooks';
import Button from '@/shared/components/ui/Button';
import Image from 'next/image';
import emptyProjectImg from '@/assets/imgs/projects.png';

const TaskNotFound: React.FC = ({}) => {
  const { handleCloseTaskDetails } = useHandleTaskDetailsRoute();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <Image
          src={emptyProjectImg}
          width={200}
          height={200}
          alt="Empty projects"
        />

        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-secondary font-medium text-center leading-6">
            Task not found
          </p>

          <Button
            variant="ghost"
            className="bg-surface-high! py-2! px-4! rounded-sm! text-slate-dark! font-semibold! leading-5 w-fit!"
            onClick={handleCloseTaskDetails}
          >
            close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskNotFound;
