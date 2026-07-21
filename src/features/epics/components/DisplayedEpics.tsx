'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import EpicItem from './EpicItem';
import { useParams, useSearchParams } from 'next/navigation';
import EmptyEpics from './EmptyEpics';
import Pagination from '@/shared/components/ui/Pagination';
import { useState } from 'react';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';
import LoadingEpics from './LoadingEpics';
import {
  useHandlePagination,
  useHandleSearch,
  useInfiniteScroll,
  useMobile,
} from '@/shared/hooks/shared.hooks';
import FloatingLink from '@/shared/components/ui/FloatingLink';
import SearchStatus from '@/shared/components/ui/SearchStatus';
import emptyEpicImg from '@/assets/imgs/empty-epics.png';
import errorEpicImg from '@/assets/imgs/alert.png';
import {
  useFetchDesktopPaginatedEpics,
  useFetchMobilePaginatedEpics,
} from '../hooks/epics.hooks';
import EpicModal from './EpicModal';

const DisplayedEpicsDesktop: React.FC = () => {
  const { projectId } = useParams();
  const { isMobile } = useMobile(1024);

  const page = useSearchParams().get('page');
  const epicId = useSearchParams().get('epic_id');

  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);

  const limit = FETCH_LIMIT;
  const offset = (currentPage - 1) * limit;

  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useHandleSearch({
    setCurrentPage,
  });

  // fetch desktop paginated epics
  const {
    data: epics,
    isLoading: isDesktopLoading,
    isFetching: isDesktopFetching,
    error: desktopError,
  } = useFetchDesktopPaginatedEpics({
    limit,
    offset,
    projectId: projectId as string,
    searchTerm: debouncedSearchTerm,
    enabled: !isMobile,
  });

  const desktopEpicsList = epics?.response?.data || [];
  const meta = epics?.response?.meta;

  // fetch mobile infinite scroll epics
  const {
    data: mobileEpicsData,
    isFetching: isMobileFetching,
    isLoading: isMobileLoading,
    hasNextPage,
    fetchNextPage,
    error: mobileError,
  } = useFetchMobilePaginatedEpics({
    limit,
    projectId: projectId as string,
    searchTerm: debouncedSearchTerm,
    enabled: isMobile,
  });

  // merge mobile epics
  const mobileEpicsList =
    mobileEpicsData?.pages.flatMap((page) => page?.response?.data || []) || [];

  // desktop page-click handler
  const { handleCurrentPage } = useHandlePagination({ setCurrentPage });

  // mobile sentinel observer
  const { observerTarget } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: isMobileFetching,
  });

  const activeEpicsList = isMobile ? mobileEpicsList : desktopEpicsList;
  const activeError = isMobile ? mobileError : desktopError;
  const showLoadingScreen = isMobile
    ? isMobileLoading && mobileEpicsList.length === 0
    : isDesktopFetching || (isDesktopLoading && currentPage === 1);

  // handle errors
  if (activeError && !debouncedSearchTerm)
    throw new Error('Failed to fetch epics');

  // handle no data
  if (
    activeEpicsList.length === 0 &&
    !(isMobile ? isMobileFetching : isDesktopFetching) &&
    !debouncedSearchTerm
  )
    return <EmptyEpics />;

  return (
    <>
      <section className="flex flex-col min-h-[80vh]">
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

        {showLoadingScreen ? (
          <LoadingEpics />
        ) : debouncedSearchTerm && activeEpicsList.length === 0 ? (
          // empty search status
          <SearchStatus
            text="No epics found matching your search"
            imgSrc={emptyEpicImg.src}
            variant="empty"
          />
        ) : debouncedSearchTerm && activeError ? (
          <SearchStatus
            text="Failed to fetch epics"
            imgSrc={errorEpicImg.src}
            variant="error"
          />
        ) : (
          <>
            {/* list */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
              {activeEpicsList.map((epic) => (
                <EpicItem epicItem={epic} key={epic?.id} />
              ))}
            </div>
            {/* pagination with footer on desktop */}
            <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center mt-auto">
              <p className="font-medium text-secondary text-body-sm">
                Showing {desktopEpicsList?.length} of {meta?.totalCount} active
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
            <div
              ref={observerTarget}
              className="mt-auto lg:hidden w-full flex items-center justify-center py-4"
            >
              {isMobileFetching && 'Loading More...'}
            </div>
          </>
        )}
      </section>

      {epicId && <EpicModal />}
    </>
  );
};

export default DisplayedEpicsDesktop;
