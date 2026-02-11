import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, deleteDoc, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);

  async guardarLibro(libro: any) {
    const referencia = collection(this.firestore, 'favoritos');
    return addDoc(referencia, {
      id_api: libro.id || 'sin-id',
      titulo: libro.titulo || 'Título no disponible',
      imagen: libro.portadaUrl || ''
    });
  }

  async getFavoritos() {
    const referencia = collection(this.firestore, 'favoritos');
    const resultado = await getDocs(referencia);

    return resultado.docs.map(doc => ({
      id_db: doc.id,
      ...doc.data()
    }));
  }

  async borrarLibro(id_db: string) {
    const referencia = doc(this.firestore, 'favoritos', id_db);
    return deleteDoc(referencia);
  }
}