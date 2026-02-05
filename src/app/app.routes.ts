import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Books } from './books/books';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'books', component: Books },
];