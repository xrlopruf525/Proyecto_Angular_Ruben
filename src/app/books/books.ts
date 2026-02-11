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
  libros = signal<Libro[]>([]);
  cargando = signal(false);

  private _filtroTitulo = signal('');
  private _filtroAutor = signal('');

  constructor(private librosService: LibrosService, private router: Router) {}

  get filtroTitulo(): string { return this._filtroTitulo(); }
  set filtroTitulo(valor: string) { this._filtroTitulo.set(valor); }

  get filtroAutor(): string { return this._filtroAutor(); }
  set filtroAutor(valor: string) { this._filtroAutor.set(valor); }

  buscarLibros() {
    const consulta = this.filtroTitulo || this.filtroAutor || '';
    if (!consulta) return;

    this.cargando.set(true);

    this.librosService.buscarLibros(consulta).subscribe(datos => {
      let filtrados = datos;
      const autorBuscado = this.filtroAutor.toLowerCase();
      if (autorBuscado) {
        filtrados = filtrados.filter(libro => libro.autor.toLowerCase().includes(autorBuscado));
      }

      this.libros.set(filtrados);
      this.cargando.set(false);
    });
  }

  irAInicio() {
    this.router.navigateByUrl('/home');
  }
}