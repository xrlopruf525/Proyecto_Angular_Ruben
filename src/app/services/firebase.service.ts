import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs, query } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);

  async guardarLibro(libro: any) {
    const colRef = collection(this.firestore, 'favoritos');
    return addDoc(colRef, {
      id_api: libro.id || 'sin-id',
      titulo: libro.title || 'Título no disponible',
      imagen: libro.coverUrl || ''
    });
  }

  // CAMBIO CLAVE: Usamos getDocs para saltarnos el bug de collectionData
  getFavoritos(): Observable<any[]> {
    const colRef = collection(this.firestore, 'favoritos');
    const q = query(colRef);
    
    // Convertimos la promesa de Firebase en un Observable de RxJS
    return from(getDocs(q)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({
          id_db: doc.id,
          ...doc.data()
        }));
      })
    );
  }

  async borrarLibro(id_db: string) {
    const docRef = doc(this.firestore, 'favoritos', id_db);
    return deleteDoc(docRef);
  }
}