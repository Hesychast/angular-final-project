import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'articles', loadComponent: () => import('./components/article-list/article-list.component').then(m => m.ArticleListComponent), pathMatch: 'full' },
  { path: 'articles/:id', loadComponent: () => import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent) },
  { path: 'edit-article/:id', loadComponent: () => import('./components/article-form/article-form.component').then(m => m.ArticleFormComponent) },
  { path: 'add-article', loadComponent: () => import('./components/article-form/article-form.component').then(m => m.ArticleFormComponent) },
  { path: '404/:id', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', redirectTo: '/404' }
];
