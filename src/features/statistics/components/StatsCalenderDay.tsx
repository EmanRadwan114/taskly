import { format, isBefore, isPast, isToday, startOfDay } from 'date-fns';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { statusBadgeStyle } from '@/features/tasks/utils/tasks.utils';
import { formateTaskStatus } from '@/shared/utils/functions.client.utils';
import NoTasksIcon from '@/assets/icons/no-tasks-calendar.svg';

interface IProps {
  dailyStats: { day: string; statuses: Record<TaskStatusEnum, number> };
}

const StatsCalenderDay: React.FC<IProps> = ({ dailyStats }) => {
  const dayNum = format(new Date(dailyStats?.day as string), 'd');
  const weekDay = format(new Date(dailyStats?.day as string), 'E');
  const month = format(new Date(dailyStats?.day as string), 'MMM');

  const statusArray = Object.entries(dailyStats?.statuses || {});
  const isTodayStats = isToday(new Date(dailyStats?.day as string));
  const isPastStats = isBefore(
    new Date(dailyStats?.day as string),
    startOfDay(new Date())
  );

  const desktopView = (
    <div
      className={`hidden lg:flex bg-white rounded-lg min-h-[50vh] flex-col gap-3 w-48 flex-1 p-3 relative shadow-primary ${isTodayStats ? 'border-2 border-primary' : ''} ${isPastStats ? 'opacity-60' : ''}`}
    >
      {isTodayStats && (
        <div className="bg-primary text-white uppercase font-bold text-body-xs leading-3.75 flex justify-center items-center py-0.5 px-2 w-fit m-auto rounded-full absolute inset-s-0 inset-e-0 top-0 -translate-y-1/2">
          Today
        </div>
      )}
      {/* date */}
      <div className="flex flex-col gap-1.5 w-full">
        <span
          className={`font-bold leading-4 text-body-sm uppercase ${isTodayStats ? 'text-primary' : 'text-slate-dark/40'}`}
        >
          {weekDay}
        </span>
        <div
          className={`flex gap-1 leading-7 text-slate-dark ${isTodayStats ? 'text-heading-5 font-extrabold' : 'text-heading-6 font-bold'}`}
        >
          <span>{dayNum}</span>
          <span>{month}</span>
        </div>
      </div>
      {/* status tasks */}
      {Object.keys(dailyStats?.statuses || {}).length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <NoTasksIcon className="text-secondary/40 w-6.5" />
          <span className="text-body-sm font-medium text-secondary-light uppercase">
            no tasks
          </span>
        </div>
      ) : (
        statusArray?.map(([status, count]) => (
          <div
            key={status}
            className={`flex items-center justify-between p-2 rounded-md ${statusBadgeStyle[status]} `}
          >
            <span className="text-label-sm  uppercase text-clip">
              {formateTaskStatus(status as TaskStatusEnum)}
            </span>
            <span className="text-slate-dark font-bold leading-4 text-body-sm">
              {count}
            </span>
          </div>
        ))
      )}
    </div>
  );

  const mobileView = (
    <div
      className={`flex items-center lg:hidden rounded-lg gap-4 p-3 shadow-primary ${isTodayStats ? 'border-s-2 border-s-primary bg-white' : 'bg-surface-low'} ${isPastStats ? 'opacity-60' : ''}`}
    >
      {/* date */}
      <div className="flex flex-col gap-1.5">
        <span
          className={`font-bold leading-4 text-body-sm ${isTodayStats ? 'text-primary' : 'text-slate-dark/40'}`}
        >
          {weekDay}
        </span>
        <div
          className={`flex gap-1 leading-7  ${isTodayStats ? 'text-heading-5 font-extrabold text-primary' : 'text-heading-6 font-bold text-slate-dark/60'}`}
        >
          <span>{dayNum}</span>
          <span>{month}</span>
        </div>
      </div>
      {/* separator */}
      <div className="h-10 bg-slate-light/30 w-px" />
      {/* status tasks */}
      {Object.keys(dailyStats?.statuses || {}).length === 0 ? (
        <div className="flex gap-2 items-center justify-center">
          <NoTasksIcon className="text-slate-dark/60 w-3" />
          <span className="text-body-xs font-medium text-secondary-light capitalize">
            no tasks
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 items-center">
          {statusArray?.map(([status, count]) => (
            <div
              key={status}
              className={`flex items-center justify-between py-0.5 px-1.5 rounded-xs cursor-default ${statusBadgeStyle[status]} `}
              title={`${count} ${formateTaskStatus(status as TaskStatusEnum)} tasks`}
            >
              <span className="text-slate-dark font-bold leading-3.5 text-body-sm">
                {count}
              </span>
            </div>
          ))}
        </div>
      )}
      {isTodayStats && (
        <div className="bg-primary text-white uppercase text-body-xs font-bold ms-auto px-2 py-0.5 rounded-full">
          Today
        </div>
      )}
    </div>
  );

  return (
    <>
      {desktopView}
      {mobileView}
    </>
  );
};

export default StatsCalenderDay;
