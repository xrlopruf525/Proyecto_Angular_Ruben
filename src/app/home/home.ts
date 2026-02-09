import { Component, signal } from '@angular/core';  // <-- aquí signal
import { RouterLink } from '@angular/router';
import { Libro, LibrosService } from '../services/books';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  libros = signal<Libro[]>([]);  // aquí guardo los libros destacados

  constructor(private librosService: LibrosService) {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.librosService.buscarLibros('harry potter').subscribe(data => {
      this.libros.set(data.slice(0, 7)); // solo 7 libros
    });
  }
}