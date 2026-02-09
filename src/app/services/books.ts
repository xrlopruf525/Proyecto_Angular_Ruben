import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// interfaz de libro (solo lo básico que usamos)
export interface Libro {
  title: string;
  author: string;
  coverUrl?: string; // portada opcional
  id: string; // id para detalle
  description?: string;
  first_publish_date?: string;
  number_of_pages?: number | string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient); // inyecto http para pedir cosas

  buscarLibros(query: string): Observable<Libro[]> {
    const url = `https://openlibrary.org/search.json?q=${query}`; // url de búsqueda

    return this.http.get<any>(url).pipe(
      map(res => {
        const primeros = res.docs.slice(0, 10); // me quedo con 10 y ya

        return primeros.map((doc: any) => ({
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : 'Desconocido', // cojo el primer autor
          coverUrl: doc.cover_i 
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : '', // si no hay portada, vacío
          id: doc.key.replace('/works/', '') // limpio el id para usarlo luego
        }));
      })
    );
  }

  getLibroById(id: string): Observable<Libro> {
    const url = `https://openlibrary.org/works/${id}.json`; // detalle por id

    return this.http.get<any>(url).pipe(
      map(res => ({
        title: res.title,
        author: res.by_statement || 'Autor desconocido', // lo que venga, si no pues eso
        coverUrl: res.covers ? `https://covers.openlibrary.org/b/id/${res.covers[0]}-L.jpg` : '',
        description: res.description
                     ? (typeof res.description === 'string' ? res.description : res.description.value)
                     : '', // description puede venir raro
        first_publish_date: res.first_publish_date || 'Desconocido',
        number_of_pages: res.number_of_pages || 'Desconocido',
        id: id
      }))
    );
  }
}