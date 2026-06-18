import LinkButton from '@/shared/components/ui/LinkButton';
import EmptyTasksIcon from '@/assets/icons/no-tasks.svg';
import PlusIcon from '@/assets/icons/plus.svg';

const EmptyTasks: React.FC = ({}) => {
  return (
    <div className="rounded-lg p-12 border-2 border-dashed border-slate-light/30 bg-surface-low flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="bg-surface-high size-12 rounded-lg flex items-center justify-center">
          <EmptyTasksIcon className="w-4.5 text-primary lg:text-slate-dark/30" />
        </div>
        <p className="text-secondary lg:text-slate-dark max-w-5/6 mx-auto lg:max-w-full lg:font-medium text-center leading-6">
          No tasks have been added to this epic yet
        </p>
        <LinkButton
          href=""
          btnClassName="rounded-sm"
          className="px-4! py-1.5! lg:px-5! lg:py-2!"
        >
          <PlusIcon className="text-white w-2.75" />
          Add task
        </LinkButton>
      </div>
    </div>
  );
};

export default EmptyTasks;
