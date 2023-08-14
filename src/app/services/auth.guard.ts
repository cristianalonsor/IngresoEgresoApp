import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean>{
    //VALIDAMOS SI ESTÁ VALIDADO EL USUARIO
    //CON EL TAP EJECUTAMOS EL ROUTER PARA NAVEGAR
    //el state nos devuelve si pasó o no pasó la validación del servicio
    return this.authService.isAuth().pipe(
      tap( state => {
        if( !state ){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}