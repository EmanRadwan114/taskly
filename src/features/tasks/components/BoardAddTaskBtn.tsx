'use client';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusBorderIcon from '@/assets/icons/plus-border.svg';
import { useParams } from 'next/navigation';

const BoardAddTaskBtn: React.FC = ({}) => {
  const { projectId } = useParams();
  return (
    <LinkButton
      href={`/project/${projectId}/tasks/new`}
      btnClassName="border border-slate-lighter/30 border-dashed p-4! w-full! gap-2!"
    >
      <PlusBorderIcon className="text-secondary/60 size-4.5" />
      <span className="uppercase text-secondary/60 font-bold text-body-sm letter-spacing-xl leading-4">
        Add New Task
      </span>
    </LinkButton>
  );
};

export default BoardAddTaskBtn;
