import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.html'
})
export class Favoritos {
  private firebaseService = inject(FirebaseService);
  misFavoritos: any[] = [];

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    this.firebaseService.getFavoritos().subscribe(data => {
      this.misFavoritos = data;
    });
  }

  eliminar(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El libro se borrará de la base de datos de Firebase",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebaseService.borrarLibro(id).then(() => {
          this.cargarFavoritos();          
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Tu libro ha sido borrado.',
            icon: 'success',
            timer: 1500, 
            showConfirmButton: false
          });
        });
      }
    });
  }
}