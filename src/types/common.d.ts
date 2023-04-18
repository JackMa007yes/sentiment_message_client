interface Pagination {
  limit?: number;
  offset?: number;
}

interface PaginationWrapper<T> {
  limit: number;
  offset: number;
  total: number;
  data: T[];
}
