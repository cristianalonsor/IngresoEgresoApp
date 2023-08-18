import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) { }


  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this.router.navigateByUrl('/login');
        }
      }),
      //Despues de resolver la promesa una vez, se cancela la subscripción.
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    //VALIDAMOS SI ESTÁ VALIDADO EL USUARIO
    //CON EL TAP EJECUTAMOS EL ROUTER PARA NAVEGAR
    //el state nos devuelve si pasó o no pasó la validación del servicio
    return this.authService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}