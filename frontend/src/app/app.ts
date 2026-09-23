import { Component, signal } from '@angular/core';
import { DataGrid } from './grid/data-grid/data-grid';

@Component({
  imports: [DataGrid],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
