import { Component, signal } from '@angular/core';
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
  libros = signal<Libro[]>([]);

  constructor(private librosService: LibrosService) {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.librosService.buscarLibros('harry potter').subscribe(datos => {
      this.libros.set(datos.slice(0, 7));
    });
  }
}