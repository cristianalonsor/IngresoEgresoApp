import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { LoginUserInterface } from '../interfaces/loginUser.Interface';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore) { }

  initAuthListener() {
    //con este metodo sabremos los atributos del usuario
    this.fireAuth.authState.subscribe(user => {
      console.log(user?.uid);
      console.log(user?.email);
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
