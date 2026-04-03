import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/item-list/item-list').then(m => m.ItemList)
  },
  {
    path: 'items/:id',
    loadComponent: () =>
      import('./features/item-detail/item-detail').then(m => m.ItemDetail)
  },
  { path: '**', redirectTo: '' }
];