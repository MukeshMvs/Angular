import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';
import { GridQuery, GridResult } from './grid-models';

export type Task = {
  id: number;
  title: string;
  status: 'Open' | 'In progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
};

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  getGrid(q: GridQuery): Observable<GridResult<Task>> {
    return this.http.get<GridResult<Task>>(this.baseUrl, {
      params: {
        page: q.page,
        pageSize: q.pageSize,
        search: q.search,
        sortField: q.sortField,
        sortDir: q.sortDir,
      },
    });
  }
}
