import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'todo-editor',
    loadComponent: () =>
      import('./todos/todo-editor.component')
  },
  {
    path: '',
    redirectTo: 'todo-editor',
    pathMatch: 'full'
  }
];
