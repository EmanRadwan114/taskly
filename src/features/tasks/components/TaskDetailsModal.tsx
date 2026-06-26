'use client';

import { useSearchParams } from 'next/navigation';

const TaskDetailsModal: React.FC = ({}) => {
  const taskId = useSearchParams().get('task_id');

  if (!taskId) return null;

  return (
    <div className="fixed inset-s-0 inset-e-0 top-0 bottom-0 z-1000 h-screen bg-slate-dark/20 p-4 lg:p-8 flex items-center justify-center">
      <div className="bg-white pb-6 lg:pb-8 rounded-lg sm:w-3/4 lg:w-2/3 xl:w-1/2 sm:mx-auto overflow-y-auto max-h-[80vh] modal-container relative flex flex-col gap-5 lg:gap-8 min-h-64"></div>
    </div>
  );
};

export default TaskDetailsModal;
