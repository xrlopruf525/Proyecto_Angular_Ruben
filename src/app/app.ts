import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto_Angular_Ruben');
  constructor(private router: Router) {}

  goToBooks() {
    console.log('Click en Libros'); // debug en consola
    this.router.navigateByUrl('/books'); // fuerza recarga del componente
  }
}

