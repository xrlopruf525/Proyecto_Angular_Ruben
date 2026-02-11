import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Books } from './books/books';
import { BookDetail } from './bookdetail/bookdetail';
import { Contacto } from './contacto/contacto';
import { Favoritos } from './favoritos/favoritos';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'books', component: Books },
  { path: 'books/:id', component: BookDetail },
  { path: 'contacto', component: Contacto },
  { path: 'favoritos', component: Favoritos },
];