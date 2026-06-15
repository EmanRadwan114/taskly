export interface IMetaFetchedData {
  totalCount: number;
  totalPages: number;
}

export interface IUseHandleMobilePagination {
  list: unknown[]; 
  currentPage: number; 
  paginationMetaData: IMetaFetchedData | undefined; 
  setCurrentPage: (page: number) => void
}
