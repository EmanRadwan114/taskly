'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { fetchProjects } from '../services/project.services';

interface IProps {
  projects: IProject[];
  paginationMetaData?: IMetaFetchedData | undefined;
}

const DisplayedProjects: React.FC<IProps> = ({
  projects,
  paginationMetaData,
}) => {
  const {
    isMobile,
    hasMore,
    observerTarget,
    handleCurrentPage,
    currentPage,
    accumulatedList,
  } = useHandlePagination<IProject>({
    list: projects,
    paginationMetaData,
    fetchFn: fetchProjects,
  });

  // conditional rendering
  if (projects?.length === 0) return <EmptyProjects />;

  return (
    <section className="flex flex-col gap-10">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-5 lg:pb-20">
        {/* on mobile use accumulatedList (appends pages), on desktop use projects */}
        {(isMobile ? accumulatedList : projects)?.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>

      {/* pagination footer on desktop */}
      <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-body-sm">
          Showing {projects?.length} of {paginationMetaData?.totalCount} active
          projects
        </p>

        {/* pagination component */}
        {paginationMetaData?.totalPages &&
          paginationMetaData?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              handleCurrentPage={handleCurrentPage}
              totalPages={paginationMetaData?.totalPages}
            />
          )}
      </footer>

      {/* loadmore on mobile */}
      {hasMore && (
        <div ref={observerTarget} className="lg:hidden h-4 w-full">
          Loading More...
        </div>
      )}

      {/* mobile add project btn */}
      <LinkButton
        href={'/project/add'}
        btnClassName="lg:hidden fixed bottom-20 inset-e-6 z-99999 rounded-3! size-14!"
      >
        <PlusIcon className="text-white size-3.5" />
      </LinkButton>
    </section>
  );
};

export default DisplayedProjects;
