export interface IMetaFetchedData {
  totalCount: number;
  totalPages: number;
}

export interface IUseHandlePagination<T = unknown> {
  list: T[];
  paginationMetaData: IMetaFetchedData | undefined;
}
