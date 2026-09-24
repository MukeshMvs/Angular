import { Component, input, output } from '@angular/core';
import { GridColumn, GridQuery, GridRow, SortDir  } from '../grid-models';

interface DataGridRow extends Record<string, string | number> {
  id: number;
  title: string;
  status: string;
}

@Component({
  imports: [],
  selector: 'app-data-grid',
  styleUrl: './data-grid.scss',
  templateUrl: './data-grid.html',
  standalone: true,
})
export class DataGrid {
  columns = input.required<GridColumn[]>();
  rows = input<GridRow[]>([]);
  total = input(0);
  loading = input(false);

  queryChange = output<GridQuery>();

  search = '';
  page = 1;
  pageSize = 10;
  sortField = '';
  sortDir: SortDir = 'asc';

  onSearch(value: string) {
    this.search = value;
    this.page = 1;
    this.emit();
  }

  goTo(page: number) {
    this.page = page;
    this.emit();
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize));
  }

  toggleSort(field: string) {
    if (this.sortField !== field) {
      this.sortField = field;
      this.sortDir = 'asc';
    } else if (this.sortDir === 'asc') {
      this.sortDir = 'desc';
    } else {
      this.sortField = '';
      this.sortDir = 'asc';
    }
    this.page = 1;
    this.emit();
  }

  sortIcon(field: string): string {
    if (this.sortField !== field) return '';
    return this.sortDir === 'asc' ? ' ▲' : ' ▼';
  }

  private emit() {
    this.queryChange.emit({
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      sortField: this.sortField,
      sortDir: this.sortDir,
    });
  }
}
