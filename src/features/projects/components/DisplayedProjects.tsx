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
import { useEffect } from 'react';
import { fetchPaginatedProjects } from '@/shared/libs/store/slices/project.slice';
import LoadingProjects from './LoadingProjects';
import { useMobile } from '@/shared/hooks/shared.hooks';

const DisplayedProjects: React.FC = ({}) => {
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

  useEffect(() => {
    dispatch(fetchPaginatedProjects({ limit, offset }));
  }, [currentPage]);

  if (loading === 'rejected') throw new Error(error!);

  if (loading === 'pending') return <LoadingProjects />;

  if (projects?.length === 0 && loading === 'success') return <EmptyProjects />;

  const displayCreateProjectCard =
    projects?.length % 3 !== 0 && currentPage === totalPages;

  return (
    <section className="flex flex-col gap-10">
      {/* section header */}
      <ProjectsHeader />

      {/* project list */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24px pb-10 lg:pb-20">
        {projects?.map((project: IProject) => (
          <ProjectCard project={project} key={project.id} />
        ))}
        {displayCreateProjectCard && !isMobile && <AddProjectCard />}
      </section>

      {/* pagination with footer */}
      <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-[12px]">
          Showing {projects?.length} of {totalCount} active projects
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
};

export default DisplayedProjects;
