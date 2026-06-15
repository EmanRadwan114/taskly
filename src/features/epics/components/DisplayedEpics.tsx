'use client';

import PlusIcon from '@/assets/icons/plus.svg';
import LinkButton from '@/shared/components/ui/LinkButton';
import Search from '@/shared/components/ui/Search';
import EpicItem from './EpicItem';
import { useParams } from 'next/navigation';
import EmptyEpics from './EmptyEpics';
import { useHandleMobilePagination } from '@/shared/hooks/shared.hooks';
import Pagination from '@/shared/components/ui/Pagination';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';

interface IProps {
  epics: IEpics[];
  paginationMetaData: IMetaFetchedData | undefined;
}

const DisplayedEpics: React.FC<IProps> = ({epics, paginationMetaData}) => {
  const { projectId } = useParams();

  const { currentPage, handleCurrentPage, hasMore, isMobile, observerTarget } = useHandleMobilePagination({list:epics, paginationMetaData})


  if (epics?.length === 0) return <EmptyEpics />;

  return (
    <section>
      {/* page header */}
      <header className="lg:justify-between lg:items-center flex gap-16px flex-col lg:flex-row mb-5 lg:mb-10">
        <h1 className="font-semibold text-slate-dark text-[36px] leading-10 tracking-[-0.9px] capitalize flex-1 w-full">
          project epics
        </h1>
        <div className="lg:flex lg:gap-32px lg:items-start">
          {/* search */}
          <Search placeholder="search epic..." />
          {/* new epic btn on desktop*/}
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            className="w-fit! gap-8px! hidden lg:flex"
          >
            <PlusIcon className="text-white w-2.75" />
            new epic
          </LinkButton>

          {/* new epic btn on mobile */}
          <LinkButton
            href={`/project/${projectId}/epics/new`}
            btnClassName="lg:hidden fixed bottom-20 inset-e-24px z-99999 rounded-12px! size-14! shadow-primary!"
          >
            <PlusIcon className="text-white size-3.5" />
          </LinkButton>
        </div>
      </header>
      {/* epic items */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-24px mb-10">
        {epics?.map((epic) => (
          <EpicItem key={epic?.id} epicItem={epic} />
        ))}
      </div>

      {/* pagination with footer on desktop */}
      {!isMobile && (
        <footer className="flex flex-col lg:flex-row justify-center items-center gap-24px lg:justify-between lg:items-center">
          <p className="font-medium text-secondary text-[12px]">
            Showing {epics?.length} of {paginationMetaData?.totalCount} active epics
          </p>
          {paginationMetaData?.totalPages && paginationMetaData?.totalPages > 1 && <Pagination currentPage={currentPage} handleCurrentPage={handleCurrentPage} totalPages={paginationMetaData?.totalPages} />}
        </footer>
      )}

      {/* mobile load more */}
      {isMobile && hasMore && <div ref={observerTarget} className=""></div>}
    </section>
  );
};

export default DisplayedEpics;
