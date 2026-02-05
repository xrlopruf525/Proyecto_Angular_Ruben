import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LibrosService, Libro } from '../services/books';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})
export class Books {
  libros: Libro[] = [];
  constructor(private librosService: LibrosService, private router: Router) {}

  ngOnInit() {
    this.librosService.buscarLibros('Harry Potter').subscribe(data => {
      this.libros = data;
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}