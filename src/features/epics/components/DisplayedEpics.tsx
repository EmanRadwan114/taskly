'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import EpicItem from './EpicItem';
import { useParams, useSearchParams } from 'next/navigation';
import EmptyEpics from './EmptyEpics';
import Pagination from '@/shared/components/ui/Pagination';
import { IEpics } from '../types/epics.types';
import { useState } from 'react';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import LoadingEpics from './LoadingEpics';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import { useGetPaginatedEpicsQuery } from '@/shared/libs/store/redux-toolkit-query/epics-api';

interface IProps {
  searchParams: { page: string };
}

const DisplayedEpics: React.FC<IProps> = ({ searchParams }) => {
  const { projectId } = useParams();

  const page = Number(searchParams.page);

  const [currentPage, setCurrentPage] = useState<number>(page || 1);

  const limit = FETCH_LIMIT;
  const offset = ((currentPage || 1) - 1) * limit;

  const {
    data: epics,
    isLoading,
    isFetching,
  } = useGetPaginatedEpicsQuery(
    {
      limit,
      offset,
      projectId: projectId as string,
    },
    { skip: !projectId }
  );

  const incomingEpics = epics?.response?.data || [];
  const meta = epics?.response?.meta;

  const {
    isMobile,
    hasMore,
    observerTarget,
    accumulatedList,
    handleCurrentPage,
  } = useHandlePagination<IEpics>({
    incomingData: incomingEpics,
    meta,
    isFetching,
    setCurrentPage,
    currentPage,
  });

  if (isLoading || isFetching) return <LoadingEpics />;
  if (incomingEpics.length === 0 && !isLoading) return <EmptyEpics />;

  return (
    <section className="flex flex-col min-h-screen">
      {/* page header */}
      <header className="lg:justify-between lg:items-center flex gap-4 flex-col lg:flex-row mb-5 lg:mb-10">
        <h1 className="font-semibold text-slate-dark text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 w-full">
          project epics
        </h1>
        <div className="lg:flex lg:gap-9 lg:items-start">
          {/* search */}
          <Search placeholder="search epic..." />
          {/* new epic btn on desktop*/}
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            className="w-fit! gap-2! hidden lg:flex"
          >
            <PlusIcon className="text-white w-2.75" />
            new epic
          </LinkButton>

          {/* new epic btn on mobile */}
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            className="lg:hidden fixed bottom-20 inset-e-6 z-99 rounded-3! size-14! shadow-primary!"
          >
            <PlusIcon className="text-white size-3.5" />
          </LinkButton>
        </div>
      </header>
      {/* epic items */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
        {(isMobile ? accumulatedList : incomingEpics)?.map((epic) => (
          <EpicItem epicItem={epic} key={epic?.id} />
        ))}
      </div>

      {/* pagination with footer on desktop */}
      <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-body-sm">
          Showing {incomingEpics?.length} of {meta?.totalCount} active epics
        </p>
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
    </section>
  );
};

export default DisplayedEpics;
