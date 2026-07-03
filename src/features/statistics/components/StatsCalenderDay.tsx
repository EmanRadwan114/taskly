import { format, isBefore, isPast, isToday, startOfDay } from 'date-fns';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { statusBadgeStyle } from '@/features/tasks/utils/tasks.utils';
import { formateTaskStatus } from '@/shared/utils/functions.client.utils';

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

  return (
    <div
      className={`bg-white rounded-lg min-h-[40vh] flex flex-col gap-3 w-48 p-3 ${isTodayStats ? 'border-2 border-primary' : ''} ${isPastStats ? 'opacity-60' : ''}`}
    >
      {/* date */}
      <div className="flex flex-col gap-1.5 w-full items-center">
        <span>{weekDay}</span>
        <div className="flex gap-1 justify-center">
          <span>{dayNum}</span>
          <span>{month}</span>
        </div>
      </div>
      {/* status tasks */}
      {Object.keys(dailyStats?.statuses || {}).length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <span className="text-body-md font-medium text-secondary-light capitalize">
            no tasks
          </span>
        </div>
      ) : (
        statusArray?.map(([status, count]) => (
          <div
            key={status}
            className={`flex items-center justify-between p-2 rounded-md ${statusBadgeStyle[status]} `}
          >
            <span className="text-body-xs">
              {formateTaskStatus(status as TaskStatusEnum)}
            </span>
            <span>{count}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default StatsCalenderDay;
