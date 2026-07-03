import TasksStatistics from '@/features/statistics/components/TasksStatistics';

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-0.5">
        <h1 className="font-bold text-slate-dark text-3xl leading-9 letter-spacing-sm capitalize flex-1 w-full">
          Weekly Planner
        </h1>
        <p className="text-secondary leading-6 text-body-lg">
          Manage your deadlines and track team velocity.
        </p>
      </header>
      <TasksStatistics />
    </section>
  );
}
