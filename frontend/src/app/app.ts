import { Component, signal } from '@angular/core';
import { TasksPage } from './grid/tasks-page/tasks-page';

@Component({
  imports: [TasksPage],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
