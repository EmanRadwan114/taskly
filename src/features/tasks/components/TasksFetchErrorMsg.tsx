import WarningIcon from '@/assets/icons/warning.svg';

const TasksFetchErrorMsg: React.FC = ({}) => {
  return (
    <div className="flex items-center justify-center gap-2 text-error-dark py-4 text-body-sm">
      <WarningIcon className="w-4 h-4" />
      <p>Failed to fetch tasks</p>
    </div>
  );
};

export default TasksFetchErrorMsg;
