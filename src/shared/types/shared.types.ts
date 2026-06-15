export interface IMetaFetchedData {
  totalCount: number;
  totalPages: number;
}

export interface IUseHandleMobilePagination {
  list: unknown[]; 
  paginationMetaData: IMetaFetchedData | undefined; 
}
