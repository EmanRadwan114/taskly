import EpicForm from '@/features/epics/components/EpicForm';
import Button from '@/shared/components/ui/Button';

export default function Page() {
  return (
    <section className="flex flex-col gap-9 max-w-full lg:max-w-5/6 mx-auto">
      {/* page header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-semibold lg:font-bold text-heading-4 lg:text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 w-full text-slate-dark">
          create new epic
        </h1>
        <p className="max-w-full lg:max-w-2/3 2xl:max-w-1/2">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </header>

      {/* epic form */}
      <EpicForm />
    </section>
  );
}
