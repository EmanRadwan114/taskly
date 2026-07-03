'use client';

import { taskStatusOptions } from '@/features/tasks/data/tasks.data';
import { TaskStatusEnum } from '@/features/tasks/types/tasks.types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// Define type for the status object
interface TaskStatusProps {
  totals:
    | {
        [TaskStatusEnum.TODO]: number;
        [TaskStatusEnum.IN_PROGRESS]: number;
        [TaskStatusEnum.DONE]: number;
        [TaskStatusEnum.BLOCKED]: number;
        [TaskStatusEnum.IN_REVIEW]: number;
        [TaskStatusEnum.READY_FOR_PRODUCTION]: number;
        [TaskStatusEnum.REOPENED]: number;
        [TaskStatusEnum.READY_FOR_QA]: number;
      }
    | undefined;
}

export default function TasksStatsChart({ totals }: TaskStatusProps) {
  const data = {
    labels: Object.keys(totals),
    datasets: [
      {
        label: 'Tasks Count',
        data: Object.values(totals || {}),
        cutout: '70%',
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 165, 0, 0.5)',
          'rgba(128, 0, 128, 0.5)',
          'rgba(255, 192, 203, 0.5)',
          'rgba(0, 100, 0, 0.5)',
          'rgba(139, 69, 19, 0.5)',
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

  return (
    <div className="bg-white shadow-form p-8 rounded-lg">
      <div style={{ width: '250px', height: '250px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
