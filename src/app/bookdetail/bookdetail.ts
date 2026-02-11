import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService, Libro } from '../services/books';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bookdetail.html'
})
export class BookDetail {
  libro = signal<Libro | null>(null);
  cargando = signal(true);

  private firebaseService = inject(FirebaseService);

  constructor(private ruta: ActivatedRoute, private librosService: LibrosService) {}

  ngOnInit() {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (!id) return;

    this.cargando.set(true);
    this.librosService.getLibroPorId(id).subscribe(datos => {
      this.libro.set(datos);
      this.cargando.set(false);
    });
  }

  agregarAFavoritos() {
    const libroActual = this.libro();

    if (libroActual) {
      this.firebaseService.guardarLibro(libroActual)
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Añadido a favoritos!',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(err => {
          console.error('Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'No se pudo guardar en la base de datos',
          });
        });
    }
  }
}