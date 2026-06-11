'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProject } from '@/features/projects/types/project.types';
import Pagination from '@/shared/components/ui/Pagination';
import ProjectsHeader from '@/features/projects/components/ProjectsHeader';
import AddProjectCard from '@/features/projects/components/AddProjectCard';
import EmptyProjects from '@/features/projects/components/EmptyProjects';
import LinkButton from '@/shared/components/ui/LinkButton';
import { useAppDispatch, useAppSelector } from '@/shared/libs/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  fetchPaginatedProjects,
  setCurrentPage,
  resetProjects,
} from '@/shared/libs/store/slices/project.slice';
import LoadingProjects from './LoadingProjects';
import ProjectSkeletonCard from './ProjectSkeletonCard';
import { useMobile } from '@/shared/hooks/shared.hooks';

const DisplayedProjects: React.FC = ({}) => {
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const { isMobile } = useMobile(1024);

  const {
    projects,
    limit,
    currentPage,
    totalCount,
    loading,
    error,
    totalPages,
  } = useAppSelector((state) => state.project);

  const dispatch = useAppDispatch();

  const offset = (currentPage - 1) * limit;

  // reset on unmount
  useEffect(() => {
    return () => {
      dispatch(resetProjects());
    };
  }, [dispatch]);

  // fetch paginated data
  useEffect(() => {
    dispatch(fetchPaginatedProjects({ limit, offset, append: isMobile }));
  }, [currentPage, isMobile, limit, offset, dispatch]);

  // handle hasMore state
  useEffect(() => {
    if (
      (projects?.length === 0 && loading === 'success') ||
      (totalPages !== undefined && currentPage >= totalPages)
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [projects, currentPage, loading, totalPages]);

  // observer for infinite scroll on mobile
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && loading === 'success') {
          dispatch(setCurrentPage(currentPage + 1));
        }
      },
      { threshold: 0, root: null, rootMargin: '0px' }
    );
    // watching target element
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading, currentPage, dispatch]);

  // guard clauses
  if (loading === 'rejected') throw new Error(error!);

  // desktop & initial request on mob
  if (
    (loading === 'pending' && isMobile && projects?.length === 0) ||
    (loading === 'pending' && !isMobile)
  )
    return <LoadingProjects />;

  if (projects?.length === 0 && loading === 'success') return <EmptyProjects />;

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
        {isMobile && loading === 'pending' && <ProjectSkeletonCard />}
      </section>

      {/* pagination with footer on desktop */}
      {!isMobile && (
        <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
          <p className="font-medium text-secondary text-[12px]">
            Showing {projects?.length} of {totalCount} active projects
          </p>
          <Pagination />
        </footer>
      )}

      {/* loadmore on mobile */}
      {isMobile && hasMore && <div ref={observerTarget} className=""></div>}

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
