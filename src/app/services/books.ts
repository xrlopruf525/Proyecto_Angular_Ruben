import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// interfaz de libro con los campos que uso
export interface Libro {
  titulo: string;
  autor: string;
  portadaUrl?: string;
  id: string;
  descripcion?: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);

  buscarLibros(consulta: string): Observable<Libro[]> {
    const url = `https://openlibrary.org/search.json?q=${consulta}`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const primeros = res.docs.slice(0, 10);

        return primeros.map((doc: any) => ({
          titulo: doc.title,
          autor: doc.author_name ? doc.author_name[0] : 'Desconocido',
          portadaUrl: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : '',
          id: doc.key.replace('/works/', '')
        }));
      })
    );
  }

  getLibroPorId(id: string): Observable<Libro> {
    const url = `https://openlibrary.org/works/${id}.json`;

    return this.http.get<any>(url).pipe(
      map(res => ({
        titulo: res.title,
        autor: res.by_statement || 'Autor desconocido',
        portadaUrl: res.covers ? `https://covers.openlibrary.org/b/id/${res.covers[0]}-L.jpg` : '',
        descripcion: res.description
                     ? (typeof res.description === 'string' ? res.description : res.description.value)
                     : '',
        id: id
      }))
    );
  }
}