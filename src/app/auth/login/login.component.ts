import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginUserInterface } from '../../interfaces/loginUser.Interface';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isLoading: boolean = false;
  storeSubscription!: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    //Traigo el store con el tipo del state global de la app
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.storeSubscription = this.store.select('ui')
                              .subscribe(ui => this.isLoading = ui.isLoading)
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  login() {

    if (this.form.invalid) { return; }
    this.store.dispatch( isLoading() );
    const loginUser: LoginUserInterface = this.form.getRawValue();
    
    // Swal.fire({
    //   title: 'Cargando',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.authService.login(loginUser).then(() => {
      // Swal.close()
      this.store.dispatch( stopLoading() );
      this.router.navigateByUrl('/');
    }).catch((error: FirebaseError) => {
      this.store.dispatch( stopLoading() );
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.code
      })
    });

  }

}
