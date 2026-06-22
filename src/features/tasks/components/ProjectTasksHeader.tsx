import Search from '@/shared/components/ui/Search';
import TaskViewSelect from './TaskViewSelect';
import FilterProjectTasks from './FilterProjectTasks';
import LinkButton from '@/shared/components/ui/LinkButton';
import PlusIcon from '@/assets/icons/plus.svg';

const ProjectTasksHeader: React.FC = ({}) => {
  const desktopView = (
    <header className="hidden lg:flex lg:flex-col xl:flex-row xl:justify-between xl:items-end gap-4">
      <div className="hidden lg:flex flex-col gap-1.5">
        <h1 className="font-semibold text-slate-dark board-title">
          Active Workboard
        </h1>
        <p className="text-body leading-5 text-accent-dark">
          Curating Project Alpha's production pipeline and milestones.
        </p>
      </div>
      <div className="flex items-center gap-3 lg:ms-auto">
        <Search placeholder="Search tasks..." />
        <TaskViewSelect />
        <FilterProjectTasks />
      </div>
    </header>
  );

  const mobileView = (
    <header className="flex flex-col lg:hidden gap-6">
      <h1 className="font-semibold text-slate-dark board-title">
        Active Workboard
      </h1>
      <div className="lex flex-col gap-1">
        <Search placeholder="Search tasks..." />
        <LinkButton href="" className="py-2! w-full font-semibold leading-5">
          <PlusIcon className="text-white w-2" />
          Create Task
        </LinkButton>
      </div>
    </header>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};

export default ProjectTasksHeader;
