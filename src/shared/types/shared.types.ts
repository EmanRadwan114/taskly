import React from 'react';

export interface IMetaFetchedData {
  totalCount: number;
  totalPages: number;
}

export interface IUseHandlePagination<T> {
  incomingData: T[];
  meta: IMetaFetchedData | undefined;
  isFetching: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}
