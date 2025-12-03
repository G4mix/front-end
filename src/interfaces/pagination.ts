export interface IPagination {
  page: number;
  quantity: number;
}

export interface Paginated<T> {
  page: number;
  quantity: number;
  nextPage: number | null;
  pages: number;
  total: number;
  data: T[];
}
