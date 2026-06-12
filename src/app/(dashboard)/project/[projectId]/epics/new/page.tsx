import EpicForm from '@/features/epics/components/EpicForm';
import Button from '@/shared/components/ui/Button';

export default function Page() {
  return (
    <section className="flex flex-col gap-32px">
      {/* page header */}
      <header className="flex flex-col gap-8px">
        <h1 className="font-semibold lg:font-bold text-[24px] lg:text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full text-slate-dark">
          create new epic
        </h1>
        <p className="max-w-full lg:max-w-1/2">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </header>

      {/* epic form */}
      <EpicForm />
    </section>
  );
}
