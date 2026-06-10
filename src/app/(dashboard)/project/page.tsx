import Button from '@/shared/components/ui/Button';
import Link from 'next/link';
import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';

export default async function ProjectPage() {
  return (
    <section className="flex flex-col gap-10">
      {/* section header */}
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-4px">
          <h1 className="font-semibold text-[30px] text-slate-dark capitalize">
            Projects
          </h1>
          <p className="text-secondary">Manage and curate your projects</p>
        </div>
        <Button className="lg:w-fit! p-0! font-medium!">
          <Link
            href={'/project/add'}
            className="w-full h-full px-6! py-3! flex gap-1.75 items-center"
          >
            <PlusIcon className="text-white size-2.75" />
            Create New Project
          </Link>
        </Button>
      </header>

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24px">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProjectCard
            project={{
              name: 'Skyline Residence Phase II',
              description:
                'Structural review and aesthetic curation for the high-rise residential complex in the downtown district.',
              createdAt: '12 oct 2026',
            }}
            key={idx}
          />
        ))}
      </section>
    </section>
  );
}
