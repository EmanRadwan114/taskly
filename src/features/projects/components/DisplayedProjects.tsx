'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { useMobile } from '@/shared/hooks/shared.hooks';

interface IProps {
  projects: IProject[];
  meta?: IMetaFetchedData;
}

const DisplayedProjects: React.FC<IProps> = ({projects, meta}) => {
  const {isMobile} = useMobile();

  if (projects?.length === 0) return <EmptyProjects />;

  return (
    <section className="flex flex-col gap-10">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-24px pb-10 lg:pb-20">
        {projects?.map((project: IProject) => (
          <ProjectCard project={project} key={project.id} />
        ))}

        {/* loading on mobile */}
        {/* {isMobile && loading === 'pending' && <ProjectSkeletonCard />} */}
      </section>

      {/* pagination with footer on desktop */}
      {!isMobile && (
        <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
          <p className="font-medium text-secondary text-[12px]">
            Showing {projects?.length} of {meta?.totalCount} active projects
          </p>
          {meta?.totalPages && meta?.totalPages > 1 && <Pagination />}
        </footer>
      )}

      {/* loadmore on mobile */}
      {/* {isMobile && hasMore && <div ref={observerTarget} className=""></div>} */}

      {/* mobile add project btn */}
      <LinkButton
        href={'/project/add'}
        btnClassName="lg:hidden fixed bottom-20 inset-e-24px z-99999 rounded-12px! size-14!"
      >
        <PlusIcon className="text-white size-3.5" />
      </LinkButton>
    </section>
  );
};

export default DisplayedProjects;
