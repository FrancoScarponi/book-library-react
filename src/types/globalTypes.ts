export interface PaginationType {
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
    links: {
      first: string;
      last: string;
      next?: string | null;
      prev?: string | null;
    };
  }