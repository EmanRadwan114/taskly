import TasksBoard from '@/features/tasks/components/board-view/TasksBoard';
import TasksList from '@/features/tasks/components/list-view/TasksList';

interface Props {
  searchParams: Promise<{ view: string; page: string; task_id: string }>;
}
export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <>
      {params?.view === 'board' && <TasksBoard searchParams={params} />}
      {params?.view === 'list' && <TasksList searchParams={params} />}
    </>
  );
}
