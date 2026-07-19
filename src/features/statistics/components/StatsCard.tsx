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
  const desktopView = (
    <div className="hidden lg:flex flex-1 justify-between items-center">
      <div className="flex-col gap-1 flex">
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

  const mobileView = (
    <div className="lg:hidden min-w-28">
      <div className="flex flex-col gap-2">
        {icon}
        <h3
          className={`uppercase font-medium lg:font-bold text-body-xs lg:text-body-sm leading-3.75 lg:leading-4 letter-spacing-md ${titleColor}`}
        >
          {title}
        </h3>
        <span className="text-slate-dark font-bold text-heading-5 leading-3">
          {tasksLength}
        </span>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 bg-white rounded-lg shadow-primary flex justify-between items-center gap-4 lg:flex-1">
      {desktopView}
      {mobileView}
    </div>
  );
};

export default StatsCard;
