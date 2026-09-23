export type SortDir = 'asc' | 'desc';

export interface GridColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
}

export interface GridQuery {
  page: number;
  pageSize: number;
  search: string;
  sortField: string;
  sortDir: SortDir;
}

export interface GridResult<T> {
  rows: T[];
  total: number;
}

export type GridRow = Record<string, any>;
export type RowActionType = 'view' | 'edit';

export interface RowAction {
  action: RowActionType;
  row: GridRow;
}
