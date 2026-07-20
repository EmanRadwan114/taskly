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
import {
  useHandlePagination,
  useHandleSearch,
} from '@/shared/hooks/shared.hooks';
import FloatingLink from '@/shared/components/ui/FloatingLink';
import SearchStatus from '@/shared/components/ui/SearchStatus';
import emptyEpicImg from '@/assets/imgs/empty-epics.png';
import errorEpicImg from '@/assets/imgs/alert.png';
import { useFetchPaginatedEpics } from '../hooks/epics.hooks';
import EpicModal from './EpicModal';

const DisplayedEpics: React.FC = () => {
  const { projectId } = useParams();

  const page = useSearchParams().get('page');
  const epicId = useSearchParams().get('epic_id');

  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);

  const limit = FETCH_LIMIT;
  const offset = (currentPage - 1) * limit;

  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useHandleSearch({
    setCurrentPage,
  });

  const {
    data: epics,
    isLoading,
    isFetching,
    error,
  } = useFetchPaginatedEpics({
    limit,
    offset,
    projectId: projectId as string,
    searchTerm: debouncedSearchTerm,
  });

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

  if (error && !debouncedSearchTerm) throw new Error('Failed to fetch epics');

  if (incomingEpics?.length === 0 && !isLoading && !debouncedSearchTerm)
    return <EmptyEpics />;

  return (
    <>
      <section className="flex flex-col min-h-screen">
        {/* page header */}
        <header className="lg:justify-between lg:items-center flex gap-4 flex-col lg:flex-row mb-5 lg:mb-10">
          <h1 className="font-semibold text-slate-dark text-heading-2 leading-10 letter-spacing-xs capitalize flex-1 w-full">
            project epics
          </h1>
          <div className="lg:flex lg:gap-9 lg:items-start">
            {/* search */}
            <Search
              placeholder="search epic..."
              searchTerm={searchTerm}
              onSetSearchTerm={setSearchTerm}
            />
            {/* new epic btn on desktop*/}
            <LinkButton
              href={`/project/${projectId}/epics/new`}
              className="w-fit! gap-2! hidden lg:flex"
            >
              <PlusIcon className="text-white w-2.75" />
              new epic
            </LinkButton>

            {/* new epic btn on mobile */}
            <FloatingLink href={`/project/${projectId}/epics/new`} />
          </div>
        </header>

        {(isFetching && !isMobile) ||
        (isLoading && currentPage === 1 && isMobile) ? (
          <LoadingEpics />
        ) : debouncedSearchTerm && incomingEpics?.length === 0 ? (
          // empty search status
          <SearchStatus
            text="No epics found matching your search"
            imgSrc={emptyEpicImg.src}
            variant="empty"
          />
        ) : debouncedSearchTerm && error ? (
          <SearchStatus
            text="Failed to fetch epics"
            imgSrc={errorEpicImg.src}
            variant="error"
          />
        ) : (
          <>
            {/* list */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
              {(isMobile ? accumulatedList : incomingEpics)?.map((epic) => (
                <EpicItem epicItem={epic} key={epic?.id} />
              ))}
            </div>
            {/* pagination with footer on desktop */}
            <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
              <p className="font-medium text-secondary text-body-sm">
                Showing {incomingEpics?.length} of {meta?.totalCount} active
                epics
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
            {hasMore && (
              <div
                ref={observerTarget}
                className="mt-auto lg:hidden w-full flex items-center justify-center"
              >
                {isFetching ? 'Loading More...' : ''}
              </div>
            )}
          </>
        )}
      </section>

      {epicId && <EpicModal />}
    </>
  );
};

export default DisplayedEpics;
