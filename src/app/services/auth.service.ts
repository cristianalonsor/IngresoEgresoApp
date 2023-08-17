import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoginUserInterface } from '../interfaces/loginUser.Interface';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/store/auth.actions';
import * as ieActions from '../ingreso-egreso/store/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubscription!: Subscription;
  private _user!: Usuario | null;

  constructor(private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>) { }

  get user() {
    return this._user
  }

  initAuthListener() {
    //con este metodo sabremos los atributos del usuario
    this.fireAuth.authState.subscribe(fUser => {

      if (fUser) {
        //Hago referencia al usuario en cuestion y a todos los atributos
        //mediante el observable
        this.authSubscription = this.fireStore.doc(`${fUser.uid}/usuario`).valueChanges()
          .subscribe((uData: any) => {
            
            //Transformo la data del usuario desde firebase a un objeto que sea compatible con la action
            const user = Usuario.fromFirebase(uData)
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          })
      } else {
        this._user = null;
        //Las subscripciones que se llaman más de una vez hay que terminarlas
        this.authSubscription.unsubscribe()
        //purgamos el store al cerrar sesión
        this.store.dispatch(ieActions.unsetItems())
        this.store.dispatch(authActions.unsetUser());
      }

    })
  }

  crearUsuario(correo: string, password: string, name: string) {
    return this.fireAuth.createUserWithEmailAndPassword(correo, password).
      then(({ user }) => {
        const newUser = new Usuario(user?.uid, name, correo)
        return this.fireStore.doc(`${user?.uid}/usuario`).set({ ...newUser })
      })
  }

  login(user: LoginUserInterface) {
    return this.fireAuth.signInWithEmailAndPassword(user.correo, user.password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      map(fUser => fUser != null)
    )
  }
}
