import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LibrosService, Libro } from '../services/books';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './books.html'
})
export class Books {
  libros = signal<Libro[]>([]); // lista de libros en memoria
  cargando = signal(false); // flag de carga

  private _filtroTitulo = signal(''); // filtro de título
  private _filtroAutor = signal(''); // filtro de autor

  constructor(private librosService: LibrosService, private router: Router) {}

  // getter/setter para ngModel (porque signal)
  get filtroTitulo(): string { return this._filtroTitulo(); }
  set filtroTitulo(valor: string) { this._filtroTitulo.set(valor); }

  get filtroAutor(): string { return this._filtroAutor(); }
  set filtroAutor(valor: string) { this._filtroAutor.set(valor); }

  buscarLibros() {
    const query = this.filtroTitulo || this.filtroAutor || ''; // cojo lo que haya
    if (!query) return; // si no hay nada, no busco

    this.cargando.set(true); // pongo loading

    // buscar en la API usando lo que haya escrito
    this.librosService.buscarLibros(query).subscribe(data => {
      // filtro extra por autor si lo escribiste
      let filtrados = data;
      const autor = this.filtroAutor.toLowerCase();
      if (autor) {
        filtrados = filtrados.filter(libro => libro.author.toLowerCase().includes(autor));
      }

      this.libros.set(filtrados); // guardo resultados
      this.cargando.set(false); // ya terminó
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/home'); // botón volver
  }
}