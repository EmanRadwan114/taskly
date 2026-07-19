'use client';

import { taskStatusOptions } from '@/features/tasks/data/tasks.data';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IStatusKeys } from '../types/statistics.types';
import { statusBadgeStyle } from '@/features/tasks/utils/tasks.utils';
import { formateTaskStatus } from '@/shared/utils/functions.client.utils';
import { useMobile } from '@/shared/hooks/shared.hooks';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define type for the status object
interface TaskStatusProps {
  totals: IStatusKeys | undefined;
  totalTasks: number | undefined;
}

const emptyStatus = {
  [TaskStatusEnum.TODO]: 0,
  [TaskStatusEnum.IN_PROGRESS]: 0,
  [TaskStatusEnum.DONE]: 0,
  [TaskStatusEnum.BLOCKED]: 0,
  [TaskStatusEnum.IN_REVIEW]: 0,
  [TaskStatusEnum.READY_FOR_PRODUCTION]: 0,
  [TaskStatusEnum.REOPENED]: 0,
  [TaskStatusEnum.READY_FOR_QA]: 0,
};

const statusBgStyle = {
  [TaskStatusEnum.TODO]: 'rgba(255, 99, 132, 1)',
  [TaskStatusEnum.IN_PROGRESS]: 'rgba(54, 162, 235, 1)',
  [TaskStatusEnum.DONE]: 'rgba(75, 192, 192, 1)',
  [TaskStatusEnum.BLOCKED]: 'rgba(255, 165, 0, 1)',
  [TaskStatusEnum.IN_REVIEW]: 'rgba(128, 0, 128, 1)',
  [TaskStatusEnum.READY_FOR_PRODUCTION]: 'rgba(255, 192, 203, 1)',
  [TaskStatusEnum.REOPENED]: 'rgba(0, 100, 0, 1)',
  [TaskStatusEnum.READY_FOR_QA]: 'rgba(139, 69, 19, 1)',
};

export default function TasksStatsChart({
  totals,
  totalTasks,
}: TaskStatusProps) {
  const { isMobile } = useMobile(1024);
  const data = {
    labels:
      Object.keys(totals || emptyStatus).length > 0
        ? Object.keys(totals || emptyStatus)
        : ['no tasks'],
    datasets: [
      {
        label: 'Tasks Count',
        data:
          Object.values(totals || emptyStatus).length > 0
            ? Object.values(totals || emptyStatus)
            : [1],
        cutout: isMobile ? '80%' : '70%',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(255, 192, 203, 1)',
          'rgba(0, 100, 0, 1)',
          'rgba(139, 69, 19, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(255, 192, 203, 1)',
          'rgba(0, 100, 0, 1)',
          'rgba(139, 69, 19, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const tasksByStatus = Object.entries(totals || emptyStatus);
  console.log(tasksByStatus);

  return (
    <section className="bg-white shadow-form p-8 rounded-lg flex flex-col gap-5 lg:gap-10">
      <h3 className="capitalize text-slate-dark font-bold text-heading-6 leading-7">
        Tasks by status
      </h3>
      <div className="flex gap-4 items-center">
        {/* chart */}
        <div
          style={{
            width: isMobile ? '150px ' : '250px',
            height: isMobile ? '150px ' : '250px',
          }}
        >
          <Doughnut data={data} options={options} />
        </div>
        {/* progress bar */}
        <div className="flex flex-col gap-2 flex-1">
          {tasksByStatus?.map(([key, value]) => (
            <div className="flex flex-col gap-1" key={key}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* bullet */}
                  <div
                    className={`size-3 rounded-full`}
                    style={{
                      backgroundColor: statusBgStyle[key as TaskStatusEnum],
                    }}
                  ></div>
                  {/* status */}
                  <span className="text-body-sm font-bold text-slate-dark/70 leading-4">
                    {formateTaskStatus(key as TaskStatusEnum)}
                  </span>
                </div>
                {/* count */}
                <span className="text-slate-dark font-bold text-body-sm leading-4">
                  {value}
                </span>
              </div>
              {!isMobile && (
                <div className="rounded-xl h-1 w-full bg-slate-ligher">
                  <div
                    className={`rounded-xl h-1 ${statusBgStyle[key as TaskStatusEnum]}`}
                    style={{ width: `${(value / (totalTasks || 1)) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
