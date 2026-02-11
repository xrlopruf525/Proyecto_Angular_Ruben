import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Libro {
  titulo: string;
  autor: string;
  portadaUrl: string;
  id: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://openlibrary.org';

  buscarLibros(consulta: string): Observable<Libro[]> {
    return this.http.get<any>(`${this.apiUrl}/search.json?q=${consulta}`).pipe(
      map(res => res.docs.slice(0, 10).map((doc: any) => this.mapearLibroBusqueda(doc)))
    );
  }

  getLibroPorId(id: string): Observable<Libro> {
    return this.http.get<any>(`${this.apiUrl}/works/${id}.json`).pipe(
      map(res => this.mapearLibroDetalle(res, id))
    );
  }

  private mapearLibroBusqueda(doc: any): Libro {
    return {
      titulo: doc.title,
      autor: doc.author_name?.[0] || 'Desconocido',
      portadaUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
      id: doc.key.replace('/works/', ''),
      descripcion: ''
    };
  }

  private mapearLibroDetalle(res: any, id: string): Libro {
    return {
      titulo: res.title,
      autor: res.by_statement || 'Autor desconocido',
      portadaUrl: res.covers?.[0] ? `https://covers.openlibrary.org/b/id/${res.covers[0]}-L.jpg` : '',
      descripcion: typeof res.description === 'string' ? res.description : res.description?.value || '',
      id
    };
  }
}