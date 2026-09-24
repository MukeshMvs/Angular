import { Component, OnInit, signal } from '@angular/core';
import {DataGrid} from '../data-grid/data-grid';
import { GridColumn,GridQuery } from '../grid-models';
import { TaskService, Task } from '../task'

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [DataGrid],
  styleUrl: './tasks-page.scss',
  templateUrl: './tasks-page.html',
})
export class TasksPage implements OnInit {

  columns: GridColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Title' },
    { field: 'status', header: 'Status' },
    { field: 'priority', header: 'Priority' },
    { field: 'dueDate', header: 'Due date' },
  ];

  rows = signal<Task[]>([]);
  total = signal(0);
  loading = signal(false);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.load({ page: 1, pageSize: 10, search: '', sortField: '', sortDir: 'asc' });
  }

  load(query: GridQuery) {
    this.loading.set(true);
    this.taskService.getGrid(query).subscribe((res) => {
      this.rows.set(res.rows);
      this.total.set(res.total);
      this.loading.set(false);
    });
  }
}
