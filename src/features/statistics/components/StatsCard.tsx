import { ReactNode } from 'react';

interface IProps {
  tasksLength: number | undefined;
  title: string;
  icon: ReactNode;
  iconBgColor: string;
  titleColor?: string;
}
const StatsCard: React.FC<IProps> = ({
  tasksLength,
  title,
  icon,
  iconBgColor,
  titleColor = 'text-slate-dark/60',
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-primary flex justify-between items-center gap-4">
      <div className="flex flex-col gap-1">
        <h3
          className={`uppercase font-bold text-body-sm leading-4 letter-spacing-md ${titleColor}`}
        >
          {title}
        </h3>
        <span className="text-slate-dark font-bold text-3xl leading-9">
          {tasksLength}
        </span>
      </div>
      <div
        className={`flex items-center justify-center ${iconBgColor} size-12 rounded-md p-2`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
