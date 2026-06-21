'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingProjects from './LoadingProjects';
import { useGetProjectsQuery } from '@/shared/libs/store/redux-toolkit-query/projects-api';

const DisplayedProjects: React.FC = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page'));

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = ((currentPage || 1) - 1) * limit;

  const {
    data: projects,
    isLoading,
    isFetching,
  } = useGetProjectsQuery({
    limit,
    offset,
  });

  const incomingProjects = projects?.response?.data || [];
  const meta = projects?.response?.meta;

  const {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
  } = useHandlePagination<IProject>({
    incomingData: incomingProjects,
    meta,
    isFetching,
    setCurrentPage,
    currentPage,
  });

  if (isLoading) return <LoadingProjects />;
  if (incomingProjects.length === 0 && !isFetching) return <EmptyProjects />;
  return (
    <section className="flex flex-col gap-10 min-h-screen">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-5 lg:pb-20">
        {/* on mobile use accumulatedList (appends pages), on desktop use projects */}
        {(isMobile ? accumulatedList : incomingProjects)?.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>

      {/* pagination footer on desktop */}
      <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-body-sm">
          Showing {incomingProjects?.length} of {meta?.totalCount} active
          projects
        </p>

        {/* pagination component */}
        {meta?.totalPages && meta?.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            totalPages={meta?.totalPages}
          />
        )}
      </footer>

      {/* loadmore on mobile */}
      {hasMore && !isFetching && (
        <div ref={observerTarget} className="mt-auto lg:hidden w-full">
          Loading More...
        </div>
      )}

      {/* mobile add project btn */}
      <LinkButton
        href={'/project/add'}
        className="lg:hidden fixed bottom-20 inset-e-6 z-99 rounded-3! size-14!"
      >
        <PlusIcon className="text-white size-3.5" />
      </LinkButton>
    </section>
  );
};

export default DisplayedProjects;
