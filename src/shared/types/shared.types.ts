export interface IMetaFetchedData {
  totalCount: number;
  totalPages: number;
}

export interface IUseHandlePagination<T = unknown> {
  list: T[];
  paginationMetaData: IMetaFetchedData | undefined;
  fetchFn: (params: {
    limit: number;
    offset: number;
    projectId?: string;
  }) => Promise<{ data: T[]; meta: IMetaFetchedData } | null>;
}
