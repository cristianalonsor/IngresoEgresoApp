import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fireStore: AngularFirestore,
    private authService: AuthService) { }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;

    //Borramos la propiedad para no enviarla a firebase
    delete ingresoEgreso.docId;
    
    return this.fireStore.doc(`${uid}/ingresos-egresos`).collection('items')
      .add({ ...ingresoEgreso })
      .then((resp) => console.log('exito', resp))
      .catch(error => console.log('error', error)
      )
  }

  //Estará pendiente de los cambios que pudieran ocurrir a estos items en tiempo real
  initIngresosEgresosItemsListener(uid: string | null | undefined) {

    //OBTENEMOS LOS ELEMENTOS DEL DOCUMENTO AL QUE SE REFERENCIA
    return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(

        map(snapshot => snapshot.map(doc => (
          //Return de un nuevo objeto mapeado con la data que necesitamos desde firebase
          {
            docId: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          })
        ))
      )
  }

  deleteIngresoEgreso(docId: string) {

    const uid = this.authService.user?.uid;
    return this.fireStore.doc(`${uid}/ingresos-egresos/items/${docId}`).delete();
  }
}
