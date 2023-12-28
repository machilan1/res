export interface Pagination<T> {
  data: T[];
  meta: { limit: number; page: number; total: number };
}
