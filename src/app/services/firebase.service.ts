import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);

  guardarLibro(libro: any): Observable<any> {
    const referencia = collection(this.firestore, 'favoritos');
    return from(addDoc(referencia, {
      id_api: libro.id || 'sin-id',
      titulo: libro.titulo || 'Título no disponible',
      imagen: libro.portadaUrl || ''
    }));
  }

  getFavoritos(): Observable<any[]> {
    const referencia = collection(this.firestore, 'favoritos');
    return from(getDocs(referencia)).pipe(
      map(resultado => resultado.docs.map(doc => ({
        id_db: doc.id,
        ...doc.data()
      })))
    );
  }

  borrarLibro(id_db: string): Observable<void> {
    const referencia = doc(this.firestore, 'favoritos', id_db);
    return from(deleteDoc(referencia));
  }
}