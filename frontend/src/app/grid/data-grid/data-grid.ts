import { Component, signal } from '@angular/core';
import { GridColumn } from '../grid-models';

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
})
export class DataGrid {
  columns: GridColumn[] = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'title', header: 'Title', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
  ];

  // placeholder rows just to confirm rendering works - real data comes next
  rows = signal<DataGridRow[]>([
    { id: 1, title: 'Sample task 1', status: 'Open' },
    { id: 2, title: 'Sample task 2', status: 'Done' },
    { id: 3, title: 'Sample task 3', status: 'In progress' },
  ]);
}
