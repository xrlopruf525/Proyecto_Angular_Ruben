import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Libro {
  title: string;
  author: string;
  coverUrl?: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);

  buscarLibros(query: string): Observable<Libro[]> {
    const url = `https://openlibrary.org/search.json?q=${query}`;

    return this.http.get<any>(url).pipe(
      map(res => {
        const primeros = res.docs.slice(0, 10);

        return primeros.map((doc: any) => ({
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : 'Desconocido',
          coverUrl: doc.cover_i 
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` 
            : '',
          id: doc.key
        }));
      })
    );
  }
}