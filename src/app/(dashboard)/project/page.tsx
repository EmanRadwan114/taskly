import Button from '@/shared/components/ui/Button';
import Link from 'next/link';
import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { fetchProjects } from '@/features/projects/services/project.services';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { getCookieValue } from '@/shared/utils/functions.utils';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';

export default async function ProjectPage() {
  const accessToken = await getCookieValue(ACCESS_TOKEN_KEY);
  const projects = await fetchProjects(accessToken as string);

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
        {/* desktop add project btn */}
        <Button className="lg:w-fit! p-0! font-medium! hidden lg:flex">
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24px pb-10 lg:pb-20">
        {projects?.map((project: IProject) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>

      {/* pagination */}
      <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-[12px]">
          Showing 5 of 24 active projects
        </p>
        <Pagination />
      </footer>

      {/* mobile add project btn */}
      <Button className="lg:hidden fixed bottom-20 inset-e-24px z-99999 rounded-12px! size-14! p-0!">
        <Link
          href={'/project/add'}
          className="flex justify-center items-center w-full h-full"
        >
          <PlusIcon className="text-white size-3.5" />
        </Link>
      </Button>
    </section>
  );
}
