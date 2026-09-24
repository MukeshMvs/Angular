import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
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
  private readonly statuses: Task['status'][] = ['Open', 'In progress', 'Done'];
  private readonly priorities: Task['priority'][] = ['Low', 'Medium', 'High'];

  private readonly data: Task[] = Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    title: `Sample task ${i + 1}`,
    status: this.statuses[i % 3],
    priority: this.priorities[(i * 7) % 3],
    dueDate: `2026-10-${String((i % 28) + 1).padStart(2, '0')}`,
  }));

  getGrid(q: GridQuery): Observable<GridResult<Task>> {
    let rows = [...this.data];

    const term = q.search.trim().toLowerCase();
    if (term) {
      rows = rows.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(term))
      );
    }

    if (q.sortField) {
      const dir = q.sortDir === 'asc' ? 1 : -1;
      rows.sort((a, b) => {
        const x = (a as any)[q.sortField];
        const y = (b as any)[q.sortField];
        return (x > y ? 1 : x < y ? -1 : 0) * dir;
      });
    }

    const total = rows.length;
    const start = (q.page - 1) * q.pageSize;
    rows = rows.slice(start, start + q.pageSize);

    return of({ rows, total }).pipe(delay(300));
  }
}
