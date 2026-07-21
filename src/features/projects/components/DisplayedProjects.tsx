'use client';

import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import {
  useHandlePagination,
  useInfiniteScroll,
  useMobile,
} from '@/shared/hooks/shared.hooks';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import { useState } from 'react';
import LoadingProjects from './LoadingProjects';
import FloatingLink from '@/shared/components/ui/FloatingLink';
import {
  useFetchMobilePaginatedProjects,
  useFetchPaginatedProjects,
} from '../hooks/project.hooks';

interface IProps {
  searchParams: { page: string };
}

const DisplayedProjects: React.FC<IProps> = ({ searchParams }) => {
  const page = Number(searchParams.page);
  const { isMobile } = useMobile(1024);

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = (currentPage - 1) * limit;

  // desktop: regular paginated query
  const {
    data: projects,
    isLoading: isDesktopLoading,
    isFetching: isDesktopFetching,
  } = useFetchPaginatedProjects({ limit, offset, enabled: !isMobile });

  const desktopProjectsList: IProject[] = projects?.response?.data || [];
  const meta = projects?.response?.meta;

  // mobile: infinite scroll query
  const {
    data: mobileProjectsData,
    isLoading: isMobileLoading,
    isFetching: isMobileFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFetchMobilePaginatedProjects({ limit, enabled: isMobile });

  const mobileProjectsList: IProject[] =
    mobileProjectsData?.pages.flatMap((page) => page?.response?.data || []) ||
    [];

  // desktop page-click handler
  const { handleCurrentPage } = useHandlePagination({ setCurrentPage });

  // mobile sentinel observer
  const { observerTarget } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const activeProjectsList = isMobile
    ? mobileProjectsList
    : desktopProjectsList;
  const showLoadingScreen = isMobile
    ? isMobileLoading && mobileProjectsList.length === 0
    : isDesktopFetching || (isDesktopLoading && currentPage === 1);

  if (showLoadingScreen) return <LoadingProjects />;
  if (activeProjectsList.length === 0 && !showLoadingScreen)
    return <EmptyProjects />;

  return (
    <section className="flex flex-col gap-10 min-h-[80vh]">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-5 lg:pb-20">
        {activeProjectsList.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>

      {/* desktop pagination footer */}
      <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center mt-auto">
        <p className="font-medium text-secondary text-body-sm">
          Showing {desktopProjectsList.length} of {meta?.totalCount} active
          projects
        </p>

        {meta?.totalPages && meta.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            handleCurrentPage={handleCurrentPage}
            totalPages={meta.totalPages}
          />
        )}
      </footer>

      {/* mobile loadmore sentinel — always rendered so the observer can attach */}
      <div
        ref={observerTarget}
        className="mt-auto lg:hidden w-full flex items-center justify-center py-4"
      >
        {isMobileFetching && 'Loading More...'}
      </div>

      {/* mobile add project btn */}
      <FloatingLink href={'/project/add'} />
    </section>
  );
};

export default DisplayedProjects;
