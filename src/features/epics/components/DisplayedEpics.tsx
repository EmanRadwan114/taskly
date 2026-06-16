'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import EpicItem from './EpicItem';
import { useParams } from 'next/navigation';
import EmptyEpics from './EmptyEpics';
import { useHandlePagination } from '@/shared/hooks/shared.hooks';
import Pagination from '@/shared/components/ui/Pagination';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { fetchEpics } from '../services/epics.services';

interface IProps {
  epics: IEpics[];
  paginationMetaData: IMetaFetchedData | undefined;
}

const DisplayedEpics: React.FC<IProps> = ({ epics, paginationMetaData }) => {
  const { projectId } = useParams();

  const {
    isMobile,
    hasMore,
    observerTarget,
    handleCurrentPage,
    currentPage,
    accumulatedList,
  } = useHandlePagination<IEpics>({
    list: epics,
    paginationMetaData,
    fetchFn: async (params) =>
      await fetchEpics({ ...params, projectId: projectId as string }),
  });

  if (epics?.length === 0) return <EmptyEpics />;

  return (
    <section>
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
            btnClassName="lg:hidden fixed bottom-20 inset-e-6 z-99999 rounded-3! size-14! shadow-primary!"
          >
            <PlusIcon className="text-white size-3.5" />
          </LinkButton>
        </div>
      </header>
      {/* epic items */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
        {/* on mobile use accumulatedList (appends pages), on desktop use epics */}
        {(isMobile ? accumulatedList : epics)?.map((epic) => (
          <EpicItem epicItem={epic} key={epic?.id} />
        ))}
      </div>

      {/* pagination with footer on desktop */}
      <footer className="hidden lg:flex flex-col lg:flex-row justify-center items-center gap-6 lg:justify-between lg:items-center">
        <p className="font-medium text-secondary text-body-sm">
          Showing {epics?.length} of {paginationMetaData?.totalCount} active
          epics
        </p>
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
    </section>
  );
};

export default DisplayedEpics;
