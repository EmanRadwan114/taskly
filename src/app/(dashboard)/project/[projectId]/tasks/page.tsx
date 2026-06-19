import ProjectTasksHeader from '@/features/tasks/components/ProjectTasksHeader';
import TasksBoard from '@/features/tasks/components/TasksBoard';
import TasksList from '@/features/tasks/components/TasksList';

interface Props {
  searchParams: Promise<{ view: string }>;
}
export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <section className="flex flex-col gap-6">
      <ProjectTasksHeader />
      {params?.view === 'board' && <TasksBoard />}
      {params?.view === 'list' && <TasksList />}
    </section>
  );
}
