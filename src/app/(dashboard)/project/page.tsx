import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import {
  fetchWithAuthServer,
  getCookieValue,
} from '@/shared/utils/functions.utils';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import AddProjectCard from '@/features/projects/components/AddProjectCard';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';

export default async function ProjectPage() {
  const accessToken = await getCookieValue(ACCESS_TOKEN_KEY);
  const projects = await fetchWithAuthServer('rest/v1/rpc/get_projects');

  const displayCreateProjectCard = projects?.length % 3 !== 0;

  if (projects.length === 0) return <EmptyProjects />;

  return (
    <section className="flex flex-col gap-10">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24px pb-10 lg:pb-20">
        {projects?.map((project: IProject) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        {displayCreateProjectCard && <AddProjectCard />}
      </section>

      {/* pagination with footer */}
      <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-[12px]">
          Showing 5 of 24 active projects
        </p>
        <Pagination />
      </footer>

      {/* mobile add project btn */}
      <LinkButton
        href={'/project/add'}
        btnClassName="lg:hidden fixed bottom-20 inset-e-24px z-99999 rounded-12px! size-14!"
      >
        <PlusIcon className="text-white size-3.5" />
      </LinkButton>
    </section>
  );
}
