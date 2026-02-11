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
  libro = signal<Libro | null>(null); // aquí guardo el libro
  cargando = signal(true); // flag de carga

  constructor(private route: ActivatedRoute, private librosService: LibrosService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // pillo el id de la url
    if (!id) return; // si no hay id, paso

    this.cargando.set(true); // marco que está cargando
    this.librosService.getLibroById(id).subscribe(data => {
      this.libro.set(data); // guardo el libro
      this.cargando.set(false); // ya terminó
    });
  }

  private firebaseService = inject(FirebaseService);

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