interface Pagination {
  limit?: number;
  page?: number;
}

interface PaginationWrapper<T> {
  limit: number;
  page: number;
  total: number;
  data: T[];
}
